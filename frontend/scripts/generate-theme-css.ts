#!/usr/bin/env tsx
/**
 * Theme CSS Generator
 *
 * color.ts에서 CSS Variables를 자동 생성하여 theme.css를 업데이트합니다.
 *
 * Usage:
 *   npm run generate:theme
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// color.ts에서 함수들을 import (ESM 방식)
async function main() {
  const colorModule = await import('../src/commons/constants/color.js');

  const { generateCSSString, generateSemanticCSSVariables } = colorModule;

  // 1. Primitive Colors CSS 생성
  const primitiveCSS = generateCSSString();

  // 2. Semantic Colors CSS 생성 (Light mode)
  const semanticLightVars = generateSemanticCSSVariables('light');
  const semanticLightCSS = Object.entries(semanticLightVars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n');

  // 3. Semantic Colors CSS 생성 (Dark mode)
  const semanticDarkVars = generateSemanticCSSVariables('dark');
  const semanticDarkCSS = Object.entries(semanticDarkVars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n');

  // 4. 기존 theme.css 읽기
  const themeCssPath = path.join(__dirname, '../src/styles/theme.css');
  let existingCSS = '';

  try {
    existingCSS = fs.readFileSync(themeCssPath, 'utf-8');
  } catch (error) {
    console.warn('⚠️  theme.css not found, creating new file');
  }

  // 5. Auto-generated 섹션 찾기 및 교체
  const autoGenStart = '/* AUTO-GENERATED COLORS - START */';
  const autoGenEnd = '/* AUTO-GENERATED COLORS - END */';

  const newColorSection = `${autoGenStart}
  /* ============================================================================
     PRIMITIVE COLORS
     Auto-generated from color.ts
     DO NOT EDIT MANUALLY
     ============================================================================ */

${primitiveCSS}

  /* ============================================================================
     SEMANTIC COLORS - LIGHT MODE
     ============================================================================ */

${semanticLightCSS}
${autoGenEnd}`;

  let newCSS: string;

  if (existingCSS.includes(autoGenStart)) {
    // 기존 auto-generated 섹션을 교체
    const regex = new RegExp(
      `${autoGenStart}[\\s\\S]*?${autoGenEnd}`,
      'g'
    );
    newCSS = existingCSS.replace(regex, newColorSection);
  } else {
    // 새로 추가 (theme.css가 없거나 auto-generated 섹션이 없는 경우)
    newCSS = `@theme {
${newColorSection}
}`;
  }

  // 6. theme.css 파일 저장
  fs.writeFileSync(themeCssPath, newCSS, 'utf-8');

  console.log('✅ theme.css generated successfully!');
  console.log(`📁 Location: ${themeCssPath}`);
  console.log(`📊 Generated ${Object.keys(semanticLightVars).length} semantic variables`);
}

main().catch(error => {
  console.error('❌ Error generating theme.css:', error);
  process.exit(1);
});
