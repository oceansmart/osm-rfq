#!/usr/bin/env node

/**
 * 문서 규칙 검증 스크립트
 *
 * 이 스크립트는:
 * 1. docs/ 디렉토리의 모든 .md 파일을 검색
 * 2. mkdocs.yml의 nav 섹션에 등록되어 있는지 확인
 * 3. 파일명 규칙 검증
 * 4. 필수 메타데이터 검증
 */

const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, '../docs');
const MKDOCS_CONFIG = path.join(__dirname, '../mkdocs.yml');

// 제외할 파일들
const EXCLUDED_FILES = [
  'index.md',    // MkDocs 홈페이지
  'tags.md',     // 태그 목록 페이지
  'README.md'    // index.md와 충돌하므로 제외
];

// 파일명 규칙
const NAMING_RULES = {
  // 중요 가이드: 대문자로 시작, 언더스코어 구분
  important: /^[A-Z][A-Z_]+\.md$/,
  // 일반 가이드: 소문자, 하이픈 구분
  general: /^[a-z][a-z0-9-]+\.md$/
};

/**
 * docs/ 디렉토리의 모든 .md 파일 찾기
 */
function findMarkdownFiles(dir) {
  const files = [];

  function traverse(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      const relativePath = path.relative(DOCS_DIR, fullPath);

      if (entry.isDirectory()) {
        // stylesheets, javascripts 디렉토리 제외
        if (!['stylesheets', 'javascripts'].includes(entry.name)) {
          traverse(fullPath);
        }
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        if (!EXCLUDED_FILES.includes(entry.name)) {
          files.push(relativePath);
        }
      }
    }
  }

  traverse(dir);
  return files;
}

/**
 * mkdocs.yml의 nav 섹션 파싱
 * YAML 파서 대신 정규표현식으로 nav 섹션만 추출
 */
function parseNavigation() {
  const content = fs.readFileSync(MKDOCS_CONFIG, 'utf8');

  const navFiles = new Set();

  // nav: 섹션 찾기
  const navStart = content.indexOf('nav:');
  if (navStart === -1) {
    return navFiles;
  }

  // nav: 섹션의 끝 찾기 (다음 최상위 키가 나올 때까지)
  const afterNav = content.substring(navStart);
  const navEndMatch = afterNav.match(/\n\n[a-z_]+:/);
  const navSection = navEndMatch
    ? afterNav.substring(0, navEndMatch.index)
    : afterNav;

  // .md 파일 참조 찾기 (콜론 뒤에 나오는 파일명)
  // 형식: "      - 제목: filename.md" 또는 "  - 홈: index.md"
  const filePattern = /:\s+([A-Z_a-z0-9-]+\.md)(?:\s|$)/g;
  let match;

  while ((match = filePattern.exec(navSection)) !== null) {
    navFiles.add(match[1]);
  }

  return navFiles;
}

/**
 * 파일명 규칙 검증
 */
function validateFileName(fileName) {
  const baseName = path.basename(fileName);

  if (NAMING_RULES.important.test(baseName) || NAMING_RULES.general.test(baseName)) {
    return { valid: true };
  }

  return {
    valid: false,
    message: `파일명 규칙 위반: ${baseName}
  - 중요 가이드: 대문자_언더스코어 (예: SKILL_CREATOR_GUIDE.md)
  - 일반 가이드: 소문자-하이픈 (예: figma-api-automation-guide.md)`
  };
}

/**
 * 문서 메타데이터 검증 (선택사항)
 */
function validateMetadata(filePath) {
  const content = fs.readFileSync(path.join(DOCS_DIR, filePath), 'utf8');

  // YAML frontmatter 확인
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return {
      valid: true,
      warning: `${filePath}: 메타데이터(frontmatter) 없음 (선택사항)`
    };
  }

  const frontmatter = match[1];
  const warnings = [];

  // 간단한 정규표현식으로 title과 description 확인
  if (!/^\s*title:/m.test(frontmatter)) {
    warnings.push('title 필드 권장');
  }

  if (!/^\s*description:/m.test(frontmatter)) {
    warnings.push('description 필드 권장');
  }

  return {
    valid: true,
    warnings: warnings.length > 0 ? warnings : null
  };
}

/**
 * 메인 검증 로직
 */
function main() {
  console.log('📚 문서 규칙 검증 중...\n');

  let hasErrors = false;
  const warnings = [];

  // 1. docs/ 디렉토리의 모든 .md 파일 찾기
  const markdownFiles = findMarkdownFiles(DOCS_DIR);
  console.log(`✓ ${markdownFiles.length}개의 문서 파일 발견\n`);

  // 2. mkdocs.yml의 nav 섹션 파싱
  const navFiles = parseNavigation();
  console.log(`✓ ${navFiles.size}개의 문서가 mkdocs.yml에 등록됨\n`);

  // 3. 등록되지 않은 파일 찾기
  const unregisteredFiles = markdownFiles.filter(file => !navFiles.has(file));

  if (unregisteredFiles.length > 0) {
    console.error('❌ mkdocs.yml에 등록되지 않은 문서:\n');
    unregisteredFiles.forEach(file => {
      console.error(`   - ${file}`);
    });
    console.error('\n💡 해결 방법: mkdocs.yml의 nav 섹션에 다음을 추가하세요:\n');
    unregisteredFiles.forEach(file => {
      const fileName = path.basename(file, '.md');
      const displayName = fileName
        .replace(/_/g, ' ')
        .replace(/-/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());
      console.error(`      - ${displayName}: ${file}`);
    });
    console.error('');
    hasErrors = true;
  }

  // 4. 파일명 규칙 검증
  console.log('📝 파일명 규칙 검증 중...\n');
  markdownFiles.forEach(file => {
    const result = validateFileName(file);
    if (!result.valid) {
      console.error(`❌ ${result.message}\n`);
      hasErrors = true;
    }
  });

  // 5. 메타데이터 검증 (경고만)
  console.log('🏷️  메타데이터 검증 중...\n');
  markdownFiles.forEach(file => {
    const result = validateMetadata(file);
    if (result.warning) {
      warnings.push(result.warning);
    }
    if (!result.valid) {
      console.error(`❌ ${result.message}\n`);
      hasErrors = true;
    }
  });

  // 6. 결과 출력
  if (warnings.length > 0) {
    console.log('⚠️  경고 (선택사항):\n');
    warnings.forEach(warning => console.log(`   ${warning}`));
    console.log('');
  }

  if (hasErrors) {
    console.error('❌ 문서 규칙 검증 실패!\n');
    process.exit(1);
  } else {
    console.log('✅ 모든 문서가 규칙을 준수합니다!\n');
    process.exit(0);
  }
}

// 스크립트 실행
if (require.main === module) {
  main();
}

module.exports = {
  findMarkdownFiles,
  parseNavigation,
  validateFileName,
  validateMetadata
};
