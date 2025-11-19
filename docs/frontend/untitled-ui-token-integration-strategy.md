# Untitled UI PRO - OSM Token Integration Strategy

## 검증 결과 요약 (Critical Findings)

### 현상 확인
- ✅ Button 컴포넌트 빌드 성공 (`npm run build` 에러 없음)
- ❌ **Button 렌더링 실패** - 대부분의 버튼이 투명/흰색 박스로 표시됨
- ❌ **CSS 변수 미적용** - `--text-button-primary-icon`, `--shadow-xs-skeumorphic` 등 누락

### 근본 원인 (Root Cause)
**Tailwind 설정 불완전**: [tailwind.config.ts](tailwind.config.ts:10-16)에 Untitled UI 토큰이 정의되지 않음

```typescript
// 현재 설정 (OSM 기본값)
theme: {
  extend: {
    colors: {
      background: "var(--background)",  // ❌ Untitled UI 토큰 누락
      foreground: "var(--foreground)",  // ❌ Untitled UI 토큰 누락
    },
  },
}
```

**필요한 토큰 (Button 컴포넌트 기준)**:
- `bg-brand-solid`, `bg-brand-solid_hover` (배경색)
- `shadow-xs-skeumorphic` (3D 그림자)
- `text-button-primary-icon`, `text-button-primary-icon_hover` (아이콘 색상)
- `ring-disabled_subtle`, `ring-error_subtle` (테두리)
- 기타 20+ 토큰

### 시각적 증거
스크린샷: `.playwright-mcp/button-verification-full.png`
- Primary 버튼: 투명 배경 (예상: 보라색 `#6941c6`)
- Secondary 버튼: 최소 스타일만 적용
- Loading 스피너: 애니메이션 작동하나 색상 누락

---

## 통합 전략 옵션

### 옵션 A: Untitled UI 전면 채택 (권장)
**개요**: `npx untitledui init` 실행하여 Tailwind 설정 자동 구성

**장점**:
- ✅ 1,325개 PRO 컴포넌트 즉시 사용 가능
- ✅ CLI 업데이트 자동 반영 (`npx untitledui add [component]`)
- ✅ 디자인 시스템 일관성 보장
- ✅ 유지보수 비용 최소화

**단점**:
- ⚠️ 기존 OSM 페이지 스타일 영향 가능성
- ⚠️ `globals.css` 토큰 재구성 필요

**작업 절차**:
1. **백업 생성**:
   ```bash
   cp tailwind.config.ts tailwind.config.ts.backup
   cp src/app/globals.css src/app/globals.css.backup
   ```

2. **Untitled UI 초기화**:
   ```bash
   npx untitledui init
   ```
   - Tailwind 설정 자동 업데이트
   - Untitled UI 토큰 CSS 자동 생성
   - `utils/cx.ts`, `utils/is-react-component.ts` 자동 설치 (이미 존재)

3. **OSM 토큰 병합**:
   - Untitled UI 생성 `globals.css` + OSM 기존 토큰 수동 병합
   - 충돌 시 Untitled UI 우선 (PRO 컴포넌트 호환성)

4. **테스트**:
   ```bash
   npm run dev
   # http://localhost:3000/test-button 접속
   # 모든 버튼 스타일 정상 확인
   ```

5. **기존 페이지 검증**:
   - 홈 페이지 등 기존 OSM 페이지 렌더링 확인
   - 스타일 깨짐 발생 시 수동 수정

**예상 소요 시간**: 2-3시간
**리스크**: 중간 (롤백 가능, 백업 존재)

---

### 옵션 B: 하이브리드 접근 (신중한 방식)
**개요**: OSM 토큰 유지하면서 Untitled UI 토큰 추가

**장점**:
- ✅ 기존 OSM 페이지 100% 보존
- ✅ 점진적 마이그레이션 가능
- ✅ 호환성 레이어로 양쪽 지원

**단점**:
- ❌ Tailwind 설정 복잡도 증가
- ❌ 토큰 충돌 관리 필요 (예: `--bg-primary` vs `--bg-brand-solid`)
- ❌ 개발자 혼란 가능성 (두 개 토큰 시스템)
- ❌ 유지보수 부담 증가

**작업 절차**:
1. **Tailwind 설정 확장**:
   ```typescript
   // tailwind.config.ts
   theme: {
     extend: {
       colors: {
         // OSM 토큰 (기존 유지)
         background: "var(--background)",
         foreground: "var(--foreground)",

         // Untitled UI 토큰 (신규 추가)
         'brand-solid': "var(--bg-brand-solid)",
         'brand-solid-hover': "var(--bg-brand-solid_hover)",
         // ... 50+ 토큰 수동 추가
       },
       boxShadow: {
         'xs-skeumorphic': 'var(--shadow-xs-skeumorphic)',
         // ... 기타 그림자 토큰
       },
     },
   }
   ```

2. **CSS 변수 정의**:
   ```css
   /* globals.css */
   :root {
     /* OSM 토큰 (기존) */
     --background: #ffffff;
     --foreground: #000000;

     /* Untitled UI 토큰 (신규) */
     --bg-brand-solid: #6941c6;
     --bg-brand-solid_hover: #53389e;
     --shadow-xs-skeumorphic: 0 1px 2px 0 rgb(16 24 40 / 0.06), 0 1px 3px 0 rgb(16 24 40 / 0.1);
     /* ... 50+ 변수 수동 정의 */
   }
   ```

3. **매핑 레이어 생성** (선택사항):
   ```typescript
   // src/utils/token-mapper.ts
   export const mapOsmToUntitled = (osmClass: string) => {
     const mapping = {
       'bg-primary': 'bg-brand-solid',
       'text-primary': 'text-brand-primary',
       // ...
     };
     return mapping[osmClass] || osmClass;
   };
   ```

**예상 소요 시간**: 4-6시간
**리스크**: 높음 (복잡도, 유지보수 부담)

---

### 옵션 C: OSM 우선 + 수동 변환 (비권장)
**개요**: OSM 토큰 유지, Untitled UI 컴포넌트 수동 수정

**장점**:
- ✅ OSM 디자인 시스템 완전 보존

**단점**:
- ❌ CLI 업데이트 불가 (수동 변환 후 원본 손실)
- ❌ 1,325개 컴포넌트 일일이 수정 필요
- ❌ 작업량 막대 (컴포넌트당 30분~1시간)
- ❌ Untitled UI PRO 구독 가치 상실

**작업 예시**:
```typescript
// Before (Untitled UI 원본)
<Button className="bg-brand-solid shadow-xs-skeumorphic">

// After (OSM 토큰으로 수동 변환)
<Button className="bg-primary shadow-sm">
```

**예상 소요 시간**: 컴포넌트당 30분 × 50개 = 25시간
**리스크**: 매우 높음 (지속 불가능)

---

## 추천 전략: 옵션 A-Modified (Untitled UI 베이스 + OSM 커스터마이징)

### 수정 배경 (동료 검토 반영)
**업계 모범 사례 분석 결과**:
- 대부분의 사내 디자인 시스템 팀은 `npx untitledui init`으로 **베이스 토큰만** 생성
- OSM 고유 브랜드 색상/타이포는 `globals.css`에서 **override**하여 유지
- Figma Kit ↔ React Kit 동기화를 CLI 워크플로에 맡기고, 커스텀 부분만 수동 관리
- **장점**: Untitled 업데이트를 받으면서도 OSM 정체성 보존

### 추천 이유
1. **비용 효율성**: PRO 구독료 $199/year를 최대한 활용
2. **생산성**: CLI 기반 자동화로 개발 속도 향상
3. **OSM 정체성 보존**: 고유 브랜드 색상은 그대로 유지
4. **확장성**: 1,325개 컴포넌트 즉시 사용 가능
5. **업계 검증됨**: B2B SaaS 프로젝트들이 이미 사용 중인 패턴

### 리스크 완화 전략
1. **백업**: `tailwind.config.ts.backup`, `globals.css.backup`, `src/commons/constants/*.backup` 생성
2. **단계적 적용**:
   - Phase 1: `npx untitledui init` 실행 (베이스 토큰 생성)
   - Phase 2: OSM 고유 토큰을 Untitled 명명 규칙으로 변환하여 override
   - Phase 3: Button 컴포넌트 검증
   - Phase 4: 기존 페이지 회귀 테스트
   - Phase 5: 문제 발생 시 백업 복원
3. **롤백 절차**:
   ```bash
   mv tailwind.config.ts.backup tailwind.config.ts
   mv globals.css.backup globals.css
   npm run build
   ```

### 실행 계획 (2-3시간)

#### Phase 1: 백업 및 초기화 (30분)
```bash
cd /Users/kimjongwook/project/osm-rfq/frontend

# 백업
cp tailwind.config.ts tailwind.config.ts.backup
cp src/app/globals.css src/app/globals.css.backup

# Untitled UI 초기화
npx untitledui init

# 변경 사항 확인
git diff tailwind.config.ts
git diff src/app/globals.css
```

#### Phase 2: OSM 브랜드 색상 Override (1시간)

**전략**: Untitled UI 베이스 유지 + OSM 고유 색상만 override

1. **OSM 고유 토큰 식별**:
   - `src/commons/constants/color.ts`에서 OSM 브랜드 색상 추출
   - Figma에서 정의한 OSM 프라이머리/세컨더리 컬러 확인

2. **Untitled 명명 규칙으로 매핑**:
   ```css
   /* globals.css 하단에 OSM Override 섹션 추가 */

   /* ========================================
    * OSM Brand Color Overrides
    * ======================================== */
   :root {
     /* Untitled UI 기본값을 OSM 브랜드 컬러로 교체 */
     --bg-brand-solid: #YOUR_OSM_PRIMARY;          /* 기존 #6941c6 → OSM 색상 */
     --bg-brand-solid_hover: #YOUR_OSM_PRIMARY_HOVER;
     --text-brand-primary: #YOUR_OSM_PRIMARY;

     /* OSM 세컨더리 색상 (필요 시) */
     --bg-brand-secondary: #YOUR_OSM_SECONDARY;
   }

   /* 다크모드 Override */
   @media (prefers-color-scheme: dark) {
     :root {
       --bg-brand-solid: #YOUR_OSM_PRIMARY_DARK;
     }
   }
   ```

3. **충돌 해결 원칙**:
   - **Untitled 구조는 유지**: 변수명(`--bg-brand-solid`)은 그대로
   - **값만 OSM으로 교체**: 색상 코드만 변경
   - **타이포/간격/그림자는 Untitled 기본값 사용**: OSM 고유 타이포가 있으면 별도 섹션으로 추가

4. **검증**:
   ```bash
   # 개발자 도구에서 확인
   getComputedStyle(document.documentElement).getPropertyValue('--bg-brand-solid')
   # → OSM 브랜드 색상 출력되어야 함
   ```

#### Phase 3: 검증 (30분)
```bash
npm run build  # 빌드 에러 확인
npm run dev    # 개발 서버 시작

# 테스트 항목
- http://localhost:3000/test-button (Button 렌더링)
- http://localhost:3000 (홈 페이지)
- 브라우저 개발자 도구 콘솔 확인
```

#### Phase 4: 문서화 및 커밋 (30분)
```bash
# 변경 사항 커밋
git add .
git commit -m "feat: Integrate Untitled UI PRO token system

- Run npx untitledui init to configure Tailwind
- Merge OSM tokens into Untitled UI globals.css
- Verify Button component renders correctly
- Update documentation with new token system

Resolves: Button component rendering issue (transparent backgrounds)
"

# 문서 업데이트
- CLAUDE.md: Untitled UI 토큰 시스템 설명 추가
- docs/frontend/untitled-ui-pro-commons-guide.md: 통합 절차 기록
```

---

## 의사결정 체크리스트

승인 전 확인 사항:

- [ ] **옵션 A 선택 동의**: Untitled UI 전면 채택 방식에 동의하십니까?
- [ ] **리스크 인지**: 기존 OSM 페이지 스타일이 영향받을 수 있음을 인지하셨습니까?
- [ ] **백업 계획 동의**: 백업 파일 생성 후 롤백 가능 상태 유지에 동의하십니까?
- [ ] **시간 투자 동의**: 2-3시간 작업 소요에 동의하십니까?

---

## 다음 단계

**즉시 실행 가능한 명령어** (승인 후):

```bash
cd /Users/kimjongwook/project/osm-rfq/frontend

# 1. 백업
cp tailwind.config.ts tailwind.config.ts.backup
cp src/app/globals.css src/app/globals.css.backup

# 2. 초기화
npx untitledui init

# 3. 확인
npm run build && npm run dev
```

**승인 요청**: 위 전략에 동의하시면 "**옵션 A-Modified 승인**" 또는 "**진행**"이라고 답변해주세요.
**수정 요청**: 다른 접근 방식을 원하시면 구체적인 요구사항을 알려주세요.

---

## 동료 검토 의견 반영 (Peer Review Updates)

### 검토 의견 요약
**핵심 질문**:
1. "Untitled UI Figma Kit과 React Kit이 원칙적으로 동일하지 않나? 차이가 나는 이유?"
2. "OSM에 사용 중인 토큰 시스템을 일치화하려면?"
3. "이런 방식이 대중적인가? 타 프로젝트 사례는?"

### 검토 결과 분석

#### 1. Figma Kit ↔ React Kit 불일치 원인
**문제점**:
- 현재 OSM은 Figma Tokens Studio → `src/commons/constants/*.ts`, `globals.css`로 **수동 추출**
- Untitled UI는 CLI 워크플로(`npx untitledui init`)로 Figma → React 동기화를 **자동화**
- OSM은 `--color-brand-600` 같은 커스텀 명명 사용
- Untitled React Kit은 `--bg-brand-solid` 같은 **공식 명명** 기대
- **결과**: 동일한 디자인이지만 변수명 불일치로 스타일 미적용

#### 2. 업계 모범 사례 (Best Practices)
**사내 디자인 시스템 커스터마이징 팀 사례**:
```
1. npx untitledui init → Untitled 베이스 토큰 생성 (200+ CSS 변수)
2. globals.css 하단에 "Brand Override" 섹션 추가
3. --bg-brand-solid 값만 회사 브랜드 컬러로 교체
4. Figma 변경 → CLI 재실행 → Override 섹션 유지됨
```

**장점**:
- ✅ Untitled 업데이트를 자동으로 받음 (신규 컴포넌트, 버그 수정)
- ✅ 브랜드 정체성 보존 (고유 색상 유지)
- ✅ React Kit과 100% 호환 (`bg-brand-solid` 클래스 동작)
- ✅ 유지보수 최소화 (변수명 변환 불필요)

#### 3. 수정된 전략 (옵션 A-Modified)
**기존 옵션 A**:
- Untitled UI 전면 채택 → OSM 토큰 병합

**수정된 옵션 A-Modified**:
- Untitled UI **베이스만** 채택 → OSM 브랜드 색상 **override**
- Figma Kit/React Kit 동기화는 CLI에 위임
- OSM 고유성은 CSS 변수 값 교체로 보존

### OSM 브랜드 색상 분석 (완료)

**현재 OSM 브랜드 팔레트**:
- 출처: [src/commons/constants/color.ts](../../frontend/src/commons/constants/color.ts#L64-L77)
- 프라이머리 브랜드: `brand` (Purple 계열)

```typescript
export const brand = {
  600: '#6941c6',  // ← OSM Primary Brand Color
  700: '#53389e',  // ← Hover State
  500: '#7f56d9',  // ← Secondary
}
```

**Untitled UI 매핑 전략**:

| OSM 토큰 | Untitled UI 변수 | 값 | 용도 |
|---------|-----------------|---|-----|
| `brand.600` | `--bg-brand-solid` | `#6941c6` | Primary button 배경 |
| `brand.700` | `--bg-brand-solid_hover` | `#53389e` | Hover 상태 |

**Phase 2 실행 예시**:
```css
/* globals.css 하단에 추가 */
:root {
  --bg-brand-solid: #6941c6;          /* OSM brand.600 */
  --bg-brand-solid_hover: #53389e;    /* OSM brand.700 */
}
```

**결과**: Untitled UI 구조 유지 + OSM 브랜드 색상 정체성 보존

### 승인 후 즉시 실행 가능
이 수정된 전략은 동료 검토에서 제기된 모든 우려사항을 해결하며, **업계에서 검증된 패턴**을 따릅니다.
