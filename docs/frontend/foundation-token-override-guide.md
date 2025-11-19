# Foundation Token Override Guide

> **목적**: Figma 디자인에서 Foundation 토큰(색상, 타이포그래피 등) 오버라이드가 필요할 때 안전하게 적용하는 방법을 안내합니다.

---

## 개요

Untitled UI 통합 후, OSM 브랜드 정체성을 유지하면서 Figma 디자인 변경사항을 반영해야 할 때가 있습니다. 이 가이드는 6단계 프로세스를 통해 안전하고 체계적으로 토큰을 오버라이드하는 방법을 제공합니다.

### 오버라이드 전략

```
Untitled UI 베이스 토큰 (1,350+ variables)
         ↓
    OSM Override 섹션 (선택적 오버라이드)
         ↓
   최종 디자인 시스템 (OSM RFQ)
```

**핵심 원칙**:
- ✅ Untitled UI **구조는 유지** (변수명 그대로)
- ✅ **값만 OSM으로 교체** (색상 코드/폰트만 변경)
- ✅ **필요한 토큰만** 오버라이드 (전체 팔레트 X)
- ✅ Git 히스토리로 추적 가능하게 커밋

---

## 6단계 프로세스

### **1단계: Figma에서 토큰 확인**

디자이너로부터 변경 요청을 받았을 때:

1. **Figma Tokens Studio에서 토큰 이름 확인**
   - 예: `color/error/600`, `typography/fontFamily/display`

2. **OSM constants 파일에서 해당 토큰 찾기**
   ```bash
   # 색상 토큰
   frontend/src/commons/constants/color.ts

   # 타이포그래피 토큰
   frontend/src/commons/constants/typography.ts

   # 기타 토큰
   frontend/src/commons/constants/spacing.ts
   frontend/src/commons/constants/radius.ts
   frontend/src/commons/constants/widths.ts
   frontend/src/commons/constants/containers.ts
   ```

3. **변경 필요 여부 판단**
   - 브랜드 정체성 관련 (Primary/Secondary 색상, 폰트) → 오버라이드 필요
   - 시스템 공통 (Spacing, Radius 등) → Untitled UI 기본값 유지 권장

---

### **2단계: Untitled UI 변수명 매핑**

OSM constants 토큰을 Untitled UI CSS 변수명으로 매핑합니다.

#### 색상 매핑 규칙

| OSM Token | Untitled UI Variable | 예시 |
|-----------|---------------------|------|
| `brand.600` | `--color-brand-600` | Primary brand color |
| `brand.700` | `--color-brand-700` | Hover state |
| `error.600` | `--color-error-600` | Error primary |
| `success.700` | `--color-success-700` | Success hover |
| `warning.500` | `--color-warning-500` | Warning base |

#### 타이포그래피 매핑 규칙

| OSM Token | Untitled UI Variable | 예시 |
|-----------|---------------------|------|
| `fontFamilies.display` | `--font-display` | Headline font |
| `fontFamilies.body` | `--font-body` | Body text font |
| `fontSizes.textMd` | `--font-size-text-md` | 16px |
| `fontWeights.semibold` | `--font-weight-semibold` | 600 |

**변환 도구**:
- HEX → RGB: Chrome DevTools Color Picker → "Copy as CSS" → `rgb()` 선택
- Figma 토큰 → CSS 변수: [Untitled UI 공식 문서](https://untitledui.com/docs/tokens) 참고

---

### **3단계: theme.css에 오버라이드 추가**

[frontend/src/styles/theme.css](../../frontend/src/styles/theme.css) 파일 하단의 OSM Override 섹션에 추가:

```css
@theme {
    /* ============================
       Untitled UI Base Tokens
       (1,350+ variables)
       ============================ */

    /* ... Untitled UI 기본 토큰들 ... */

    /* ============================
       OSM Brand Overrides
       ============================ */

    /* OSM Primary Brand Colors */
    --color-brand-600: rgb(105 65 198);  /* #6941c6 */
    --color-brand-700: rgb(83 56 158);   /* #53389e */

    /* OSM Error Colors (새로 추가하는 예시) */
    --color-error-600: rgb(217 45 32);   /* #d92d20 */

    /* OSM Success Colors (새로 추가하는 예시) */
    --color-success-700: rgb(2 122 72);  /* #027a48 */

    /* OSM Typography - Font Families */
    --font-display: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    --font-body: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

#### 주의사항

1. **RGB 형식 사용**: Tailwind v4는 `rgb()` 형식 사용 (공백으로 구분)
   ```css
   /* ✅ 올바른 형식 */
   --color-brand-600: rgb(105 65 198);

   /* ❌ 잘못된 형식 */
   --color-brand-600: #6941c6;
   --color-brand-600: rgb(105, 65, 198);
   ```

2. **폰트 Fallback**: 시스템 폰트 fallback 포함
   ```css
   --font-display: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
   ```

3. **주석 작성**: 각 오버라이드에 OSM 토큰 참조 주석 추가
   ```css
   --color-brand-600: rgb(105 65 198);  /* OSM brand.600 = #6941c6 */
   ```

---

### **4단계: 브라우저에서 검증**

1. **개발 서버 시작**
   ```bash
   cd frontend
   npm run dev
   ```

2. **브라우저 DevTools 열기** (F12)

3. **Elements 탭 → 컴포넌트 선택**

4. **Computed 탭에서 확인**
   ```javascript
   // Console에서 직접 확인
   getComputedStyle(document.documentElement).getPropertyValue('--color-brand-600')
   // 결과: "rgb(105 65 198)" 출력되어야 함
   ```

5. **컴포넌트 렌더링 확인**
   - Button 컴포넌트가 올바른 색상으로 표시되는지 확인
   - Hover 상태에서 올바른 색상으로 변경되는지 확인

---

### **5단계: 타입스크립트 타입 검증** (선택사항)

OSM constants 파일의 타입 정의가 올바른지 확인:

```bash
cd frontend
npm run type-check  # 또는 npx tsc --noEmit
```

**타입 에러 예시**:
```typescript
// ❌ 에러: 존재하지 않는 shade
const invalidColor = brand[650];  // Type error

// ✅ 정상: 올바른 shade
const validColor = brand[600];
```

---

### **6단계: Git 커밋 및 문서화**

1. **변경사항 확인**
   ```bash
   git status
   git diff frontend/src/styles/theme.css
   ```

2. **커밋 메시지 작성**
   ```bash
   git add frontend/src/styles/theme.css
   git commit -m "feat(design-tokens): Override error/success colors for OSM brand

   - Add --color-error-600 override (OSM brand error color)
   - Add --color-success-700 override (OSM brand success hover)
   - Maintain Untitled UI structure, only override values

   Related Figma tokens:
   - color/error/600: #d92d20
   - color/success/700: #027a48"
   ```

3. **푸시 및 PR 생성**
   ```bash
   git push origin main
   # 또는 feature 브랜치
   gh pr create --title "Override error/success colors" --body "..."
   ```

4. **문서 업데이트** (필요 시)
   - [untitled-ui-token-integration-strategy.md](./untitled-ui-token-integration-strategy.md) 업데이트
   - 오버라이드된 토큰 목록 추가

---

## 실전 예시

### 예시 1: Error 컬러 오버라이드

**시나리오**: Figma에서 `error.600` 컬러를 OSM 브랜드 레드로 변경 요청

#### 1. Figma 토큰 확인
```typescript
// frontend/src/commons/constants/color.ts
export const error = {
  600: '#d92d20',  // ← 오버라이드 대상
}
```

#### 2. Untitled UI 변수명 매핑
- OSM: `error.600` → Untitled: `--color-error-600`

#### 3. theme.css 오버라이드
```css
@theme {
    /* OSM Error Color Override */
    --color-error-600: rgb(217 45 32);  /* OSM error.600 = #d92d20 */
}
```

#### 4. 검증
```bash
npm run dev
# DevTools에서 --color-error-600 확인
```

#### 5. 커밋
```bash
git commit -m "feat(design-tokens): Override error-600 color for OSM brand"
```

---

### 예시 2: Font Family 오버라이드

**시나리오**: OSM 커스텀 폰트(DM Sans, Poppins) 적용

#### 1. Figma 토큰 확인
```typescript
// frontend/src/commons/constants/typography.ts
export const fontFamilies = {
  display: 'DM Sans',  // ← Headlines
  body: 'Poppins',     // ← Body text
}
```

#### 2. Untitled UI 변수명 매핑
- OSM: `fontFamilies.display` → Untitled: `--font-display`
- OSM: `fontFamilies.body` → Untitled: `--font-body`

#### 3. theme.css 오버라이드
```css
@theme {
    /* OSM Typography - Font Families */
    --font-display: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    --font-body: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

#### 4. 검증
```javascript
// DevTools Console
getComputedStyle(document.body).fontFamily
// → "Poppins, -apple-system, ..."
```

---

## OSM Constants 토큰 참조

### 현재 오버라이드된 토큰

| 카테고리 | 토큰 | 오버라이드 여부 | 파일 위치 |
|---------|------|----------------|----------|
| **Color** | `brand.600`, `brand.700` | ✅ 오버라이드됨 | [color.ts](../../frontend/src/commons/constants/color.ts#L64-L77) |
| **Typography** | `fontFamilies.display`, `fontFamilies.body` | ✅ 오버라이드됨 | [typography.ts](../../frontend/src/commons/constants/typography.ts#L23-L26) |
| **Spacing** | `spacing.*` | ❌ Untitled 기본값 | [spacing.ts](../../frontend/src/commons/constants/spacing.ts#L22-L40) |
| **Radius** | `radius.*` | ❌ Untitled 기본값 | [radius.ts](../../frontend/src/commons/constants/radius.ts#L22-L34) |
| **Widths** | `widths.*` | ❌ Untitled 기본값 | [widths.ts](../../frontend/src/commons/constants/widths.ts#L23-L36) |
| **Containers** | `containers.*` | ❌ Untitled 기본값 | [containers.ts](../../frontend/src/commons/constants/containers.ts#L22-L26) |

### 오버라이드 권장 대상

**우선순위 1 (브랜드 정체성)**:
- ✅ Primary/Secondary 브랜드 색상 (`brand.*`)
- ✅ 폰트 패밀리 (`fontFamilies.*`)

**우선순위 2 (상태 색상)**:
- ⚠️ Error/Warning/Success 색상 (필요 시)
- ⚠️ Gray 팔레트 (필요 시)

**우선순위 3 (시스템 토큰)**:
- ❌ Spacing/Radius/Widths (Untitled UI 기본값 유지 권장)
- ❌ Typography scales (Untitled UI 기본값 유지 권장)

---

## 트러블슈팅

### 문제 1: 오버라이드가 적용되지 않음

**증상**: theme.css에 오버라이드를 추가했지만 색상이 변경되지 않음

**원인**:
1. RGB 형식 오류
2. 변수명 오타
3. CSS 우선순위 문제

**해결 방법**:
```bash
# 1. 형식 확인
--color-brand-600: rgb(105 65 198);  # ✅ 공백으로 구분
--color-brand-600: rgb(105, 65, 198);  # ❌ 쉼표 사용 X

# 2. 변수명 확인
--color-brand-600  # ✅ Untitled UI 공식 변수명
--brand-600        # ❌ 잘못된 변수명

# 3. DevTools에서 computed style 확인
getComputedStyle(element).getPropertyValue('--color-brand-600')
```

---

### 문제 2: 폰트가 로딩되지 않음

**증상**: 폰트 오버라이드를 추가했지만 시스템 폰트가 표시됨

**원인**:
1. Google Fonts 미로딩
2. 폰트명 오타
3. Fallback 미설정

**해결 방법**:
```typescript
// 1. app/layout.tsx에서 Google Fonts 로드 확인
import { DM_Sans, Poppins } from 'next/font/google';

// 2. theme.css에서 fallback 설정
--font-display: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

---

### 문제 3: 타입 에러 발생

**증상**: TypeScript 컴파일 에러

**원인**: constants 파일의 타입 정의와 불일치

**해결 방법**:
```typescript
// 올바른 shade 사용
const color = brand[600];  // ✅
const color = brand[650];  // ❌ Type error: 650은 존재하지 않음

// 타입 체크 실행
npm run type-check
```

---

## 체크리스트

오버라이드 작업 완료 시 다음 항목을 확인하세요:

- [ ] 1단계: Figma에서 토큰 이름 확인 완료
- [ ] 2단계: Untitled UI 변수명 매핑 완료
- [ ] 3단계: theme.css에 오버라이드 추가 완료
- [ ] 4단계: 브라우저 DevTools에서 검증 완료
- [ ] 5단계: TypeScript 타입 체크 통과
- [ ] 6단계: Git 커밋 및 문서 업데이트 완료
- [ ] 커밋 메시지에 Figma 토큰 참조 포함
- [ ] PR 생성 및 리뷰 요청
- [ ] Storybook에서 컴포넌트 확인

---

## 관련 문서

- [Untitled UI Token Integration Strategy](./untitled-ui-token-integration-strategy.md)
- [OSM Design System](./osm-design-system.md)
- [Tailwind CSS v4 Migration](./tailwind-v4-migration.md)
- [Untitled UI Official Docs](https://untitledui.com/docs/tokens)

---

## 변경 이력

| 날짜 | 작성자 | 변경 내용 |
|------|--------|----------|
| 2025-01-XX | OSM Team | 초안 작성 |
| 2025-01-XX | OSM Team | Error/Success 색상 오버라이드 예시 추가 |
| 2025-01-XX | OSM Team | Font Family 오버라이드 예시 추가 |
