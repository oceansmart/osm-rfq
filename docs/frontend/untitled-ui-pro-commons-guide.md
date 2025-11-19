# Untitled UI PRO 컴포넌트 기반 공통 컴포넌트 전략 가이드

> **PRO 버전 구매자 전용 가이드**
> Untitled UI PRO 컴포넌트를 OSM RFQ `commons/components/` 구조로 통합

**계정 정보**: redpoint2761@seoultech.ac.kr

---

## 🎯 전략 개요

### 핵심 원칙

1. **PRO CLI를 전면 활용** - 1,325개 컴포넌트 모두 CLI로 설치
2. **OSM 구조 유지** - `commons/components/` 패턴 준수
3. **점진적 마이그레이션** - 필요한 컴포넌트부터 순차 설치
4. **표준 API 사용** - Untitled UI 제공 API 그대로 활용

### 비용 대비 효과
| 항목 | PRO 없이 | PRO 사용 시 |
|------|---------|------------|
| **개발 시간** | 100시간 | 10시간 |
| **컴포넌트 수** | 7개 (수동) | 1,325개 (CLI) |
| **접근성 구현** | 직접 구현 | React Aria 내장 |
| **유지보수** | 어려움 | Untitled UI 업데이트 자동 |
| **비용** | 무료 (시간 많음) | $199/year (시간 절약) |

---

## 📦 CLI 기반 전체 컴포넌트 사용 전략

### 전략 요약

- **모든 컴포넌트를 CLI로 설치** (수동 구현 없음)
- CLI 설치 위치: `src/components/ui/`
- OSM 최종 위치: `src/commons/components/`
- 필요한 컴포넌트부터 우선순위에 따라 설치

### 주요 컴포넌트 CLI 명령어

| 컴포넌트 | CLI 명령어 | 우선순위 |
|---------|-----------|---------|
| Button | `npx untitledui add button` | P0 |
| Input | `npx untitledui add input` | P0 |
| Modal/Dialog | `npx untitledui add dialog` | P0 |
| Dropdown | `npx untitledui add dropdown-menu` | P1 |
| Select | `npx untitledui add select` | P1 |
| Checkbox | `npx untitledui add checkbox` | P1 |
| Radio | `npx untitledui add radio-group` | P1 |
| Toggle | `npx untitledui add switch` | P1 |
| Tabs | `npx untitledui add tabs` | P2 |
| Tooltip | `npx untitledui add tooltip` | P2 |
| Popover | `npx untitledui add popover` | P2 |
| DataTable | `npx untitledui add data-table` | P2 |
| Dashboard | `npx untitledui add dashboard-sidebar` | P3 |
| Calendar | `npx untitledui add calendar` | P3 |
| Chart | `npx untitledui add chart` | P3 |
| Command Palette | `npx untitledui add command` | P3 |
| File Upload | `npx untitledui add file-upload` | P3 |

---

## 🚀 단계별 실행 계획

### Phase 1: 환경 설정 ✅

#### 1.1 PRO CLI 로그인

```bash
cd /Users/kimjongwook/project/osm-rfq/frontend

# PRO 계정 로그인
npx untitledui@latest login
# 이메일: redpoint2761@seoultech.ac.kr
# 비밀번호 입력
```

#### 1.2 PRO Icons 설정

```bash
# .npmrc 파일 생성 (프로젝트 루트)
cat > .npmrc << 'EOF'
@untitledui-pro:registry=https://pkg.untitledui.com
//pkg.untitledui.com/:_authToken=YOUR_TOKEN_HERE
EOF

# PRO Icons 설치
npm install @untitledui-pro/icons
```

**토큰 발급 방법**:

1. https://www.untitledui.com/account 접속
2. "Access Tokens" 메뉴
3. "Generate New Token" 클릭
4. `.npmrc`의 `YOUR_TOKEN_HERE`에 붙여넣기

#### 1.3 필수 패키지 확인

```bash
# 이미 설치된 패키지 (1단계 완료)
npm list clsx tailwind-merge react-aria-components tailwindcss-animate

# 추가 필요 패키지
npm install @tailwindcss/typography
```

---

### Phase 2: P0 컴포넌트 CLI 설치 및 마이그레이션

#### 2.1 Button CLI 설치

##### Step 1: 기존 수동 구현 제거

```bash
rm -rf src/commons/components/button
```

##### Step 2: CLI로 설치

```bash
npx untitledui add button
# → src/components/ui/button.tsx 생성됨
```

##### Step 3: OSM 구조로 이동

```bash
mkdir -p src/commons/components/button
mv src/components/ui/button.tsx src/commons/components/button/index.tsx
```

##### Step 4: Import 경로 업데이트

파일 내부의 import 경로를 `@/components/ui` → `@/commons/components`로 변경

#### 2.2 Input CLI 설치

```bash
npx untitledui add input
mkdir -p src/commons/components/input
mv src/components/ui/input.tsx src/commons/components/input/index.tsx
```

#### 2.3 Dialog (Modal) CLI 설치

```bash
npx untitledui add dialog
mkdir -p src/commons/components/modal
mv src/components/ui/dialog.tsx src/commons/components/modal/index.tsx
```

---

### Phase 3: P1/P2 컴포넌트 순차 설치

#### 3.1 P1 컴포넌트 설치

```bash
# Dropdown
npx untitledui add dropdown-menu
mkdir -p src/commons/components/dropdown
mv src/components/ui/dropdown-menu.tsx src/commons/components/dropdown/index.tsx

# Select
npx untitledui add select
mkdir -p src/commons/components/select
mv src/components/ui/select.tsx src/commons/components/select/index.tsx

# Checkbox
npx untitledui add checkbox
mkdir -p src/commons/components/checkbox
mv src/components/ui/checkbox.tsx src/commons/components/checkbox/index.tsx

# Radio
npx untitledui add radio-group
mkdir -p src/commons/components/radio
mv src/components/ui/radio-group.tsx src/commons/components/radio/index.tsx

# Toggle (Switch)
npx untitledui add switch
mkdir -p src/commons/components/toggle
mv src/components/ui/switch.tsx src/commons/components/toggle/index.tsx
```

#### 3.2 P2 컴포넌트 설치

```bash
# Tabs
npx untitledui add tabs
mkdir -p src/commons/components/tabs
mv src/components/ui/tabs.tsx src/commons/components/tabs/index.tsx

# Tooltip
npx untitledui add tooltip
mkdir -p src/commons/components/tooltip
mv src/components/ui/tooltip.tsx src/commons/components/tooltip/index.tsx

# Popover
npx untitledui add popover
mkdir -p src/commons/components/popover
mv src/components/ui/popover.tsx src/commons/components/popover/index.tsx

# DataTable
npx untitledui add data-table
mkdir -p src/commons/components/data-table
mv src/components/ui/data-table.tsx src/commons/components/data-table/index.tsx
```

---

### Phase 4: 자동화 스크립트 (선택사항)

#### 마이그레이션 자동화 스크립트

**파일**: `scripts/migrate-untitled-component.sh`

```bash
#!/bin/bash

COMPONENT_NAME=$1
CLI_NAME=$2
CLI_PATH="src/components/ui/${CLI_NAME}.tsx"
OSM_PATH="src/commons/components/${COMPONENT_NAME}"

echo "Migrating ${CLI_NAME} to OSM structure at ${OSM_PATH}..."

# 1. CLI로 설치
npx untitledui add ${CLI_NAME}

# 2. OSM 디렉토리 생성
mkdir -p ${OSM_PATH}

# 3. 파일 이동
mv ${CLI_PATH} ${OSM_PATH}/index.tsx

# 4. Import 경로 자동 변경
sed -i '' "s|@/components/ui|@/commons/components|g" ${OSM_PATH}/index.tsx

echo "✅ Migration complete: ${OSM_PATH}/index.tsx"
```

**사용 방법**:

```bash
chmod +x scripts/migrate-untitled-component.sh
./scripts/migrate-untitled-component.sh button button
./scripts/migrate-untitled-component.sh dropdown dropdown-menu
./scripts/migrate-untitled-component.sh radio radio-group
```

---

## 🔧 OSM 구조 적용 가이드

### Import 경로 매핑

#### tailwind.config.ts 설정
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",  // Untitled UI 원본
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/commons/**/*.{js,ts,jsx,tsx,mdx}",      // OSM 구조
  ],
  // ... 나머지 설정
};
```

#### tsconfig.json paths 설정
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/commons/*": ["./src/commons/*"],
      "@/components/ui/*": ["./src/components/ui/*"]  // PRO 컴포넌트용
    }
  }
}
```

---

## 📋 실행 계획표

### Week 1: 환경 설정 및 P0 컴포넌트

- [ ] Day 1: PRO CLI 로그인 및 Icons 설정
- [ ] Day 2: Button CLI 설치 → OSM 마이그레이션
- [ ] Day 3: Input CLI 설치 → OSM 마이그레이션
- [ ] Day 4: Dialog CLI 설치 → OSM 마이그레이션
- [ ] Day 5: P0 컴포넌트 Storybook 및 테스트

### Week 2: P1 컴포넌트 설치

- [ ] Day 1: Dropdown, Select CLI 설치 → OSM 마이그레이션
- [ ] Day 2: Checkbox, Radio CLI 설치 → OSM 마이그레이션
- [ ] Day 3: Toggle (Switch) CLI 설치 → OSM 마이그레이션
- [ ] Day 4: P1 컴포넌트 Storybook 작성
- [ ] Day 5: P1 컴포넌트 테스트 및 문서화

### Week 3: P2/P3 컴포넌트 설치

- [ ] Day 1: Tabs, Tooltip, Popover CLI 설치
- [ ] Day 2: DataTable CLI 설치 및 샘플 구현
- [ ] Day 3: Dashboard, Calendar CLI 설치
- [ ] Day 4: Chart, Command, File Upload CLI 설치
- [ ] Day 5: P2/P3 컴포넌트 테스트 및 문서화

### Week 4: 최종 검증 및 문서화

- [ ] Day 1-2: 전체 컴포넌트 Storybook 정리
- [ ] Day 3-4: E2E 테스트 작성
- [ ] Day 5: 팀 온보딩 문서 작성

---

## ✅ 확정 전 체크리스트

### 기술적 검증
- [ ] PRO 계정 로그인 테스트
- [ ] CLI 설치 정상 작동 확인
- [ ] OSM 구조 마이그레이션 스크립트 테스트
- [ ] Build 및 TypeScript 컴파일 확인
- [ ] Storybook 정상 작동 확인

### 팀 합의
- [ ] Reference API 유지 방침 확인
- [ ] Tier 1/2/3 분류 기준 동의
- [ ] 일정 계획 검토 및 승인
- [ ] 역할 분담 (CLI 설치, OSM 마이그레이션, 테스트)

### 문서화
- [ ] 이 가이드 팀 공유
- [ ] Confluence/Notion에 백업
- [ ] 예제 코드 Storybook에 등록
- [ ] 트러블슈팅 가이드 작성

---

## 🎯 다음 단계

**즉시 시작 가능한 작업 순서**:

1. ✅ **Phase 1: 환경 설정** - PRO CLI 로그인 및 Icons 설정
2. 🚀 **Phase 2: P0 컴포넌트** - Button, Input, Dialog CLI 설치 및 마이그레이션
3. ⚡ **Phase 3: P1 컴포넌트** - Dropdown, Select, Checkbox, Radio, Toggle 설치
4. 📊 **Phase 4: P2/P3 컴포넌트** - 복잡한 컴포넌트 설치

**시작 명령어**:

```bash
# 1. PRO 로그인
cd /Users/kimjongwook/project/osm-rfq/frontend
npx untitledui@latest login

# 2. 로그인 확인
npx untitledui@latest --version

# 3. 사용 가능한 컴포넌트 목록 확인
npx untitledui@latest list

# 4. 첫 번째 컴포넌트 설치 (Button)
rm -rf src/commons/components/button
npx untitledui add button
mkdir -p src/commons/components/button
mv src/components/ui/button.tsx src/commons/components/button/index.tsx
```

---

**작성일**: 2025-11-19
**버전**: 2.0.0 (Tier 분류 제거, CLI 전면 활용)
**PRO 계정**: redpoint2761@seoultech.ac.kr
**전략**: 모든 컴포넌트를 CLI로 설치 후 OSM 구조로 마이그레이션
