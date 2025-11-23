# Untitled UI Component Installer

Untitled UI PRO 컴포넌트를 OSM RFQ 프로젝트 구조로 자동 설치하고 Storybook Stories를 생성합니다.

---

## ⚠️ 워크플로우 준수 경고

**이 Skill의 모든 6단계는 자동으로 실행되어야 합니다.**

특히 **Step 5 (Stories 생성)**와 **Step 6 (Prompts 문서 생성)**는:

- ❌ 사용자에게 수동 작업 요청 금지
- ❌ "선택적" 또는 "권장" 단계로 간주 금지
- ✅ **반드시 자동 실행** (Read → Write tool 사용)
- ✅ 완료 후 파일 생성 확인 필수

**과거 문제 사례**:

1. **Tooltip 설치 (2025-11-19)**:
   - Step 5, 6을 건너뛰어 불완전한 설치 발생
   - 원인: 명확한 자동 실행 지침을 "수동" 단계로 오인

2. **Input 설치 (2025-11-20)**:
   - CLI가 5개 파일로 분산 생성 (input.tsx, label.tsx, hint-text.tsx, input-group.tsx, input-payment.tsx)
   - Tooltip import 경로 오류: `@/commons/components/tooltip/tooltip` (잘못됨)
   - 표준 폴더 구조 미준수: 단일 index.tsx 통합 필요
   - 원인: Step 4.5 이후 **폴더 구조 표준 검증** 누락

3. **Avatar 설치 (2025-11-20)**:
   - CLI가 8개 파일로 분산 생성 (index.tsx, avatar-label-group.tsx, avatar-profile-photo.tsx, base-components/*)
   - Step 4.7 (폴더 구조 표준 검증) 실행하지 않음
   - 여러 파일 상태 그대로 Step 5로 진행
   - 원인: **Step 4.7 자동 실행 누락**, 검증 로직 미실행

4. **TextEditor 설치 (2025-11-20)**:
   - CLI가 6개 파일로 분산 생성 (index.tsx, text-editor-button.tsx, text-editor-character-count.tsx, text-editor-extensions.tsx, text-editor-toolbar.tsx, text-editor-tooltip.tsx)
   - Step 4.7 (폴더 구조 표준 검증) 실행하지 않음
   - Import 경로 오류: `@/components/base/input/*`, `@/components/base/tooltip/*` (표준 위배)
   - 복잡한 컴포넌트(13개 extension 컴포넌트)도 단일 파일로 통합 필요
   - 원인: **Step 4.7 자동 실행 누락**, 복잡도에 관계없이 통합 원칙 적용 필수

**재발 방지**:

- ✅ 각 단계에 "⚠️ 필수 자동 실행" 마크 추가
- ✅ "실행 방법" 섹션에 구체적인 tool 사용 순서 명시
- ✅ Step 4.6 추가 - Import 경로 상세 검증 (하위 경로 제거)
- ✅ Step 4.7 추가 - 폴더 구조 표준 검증 및 자동 통합
- ✅ **Step 4.7 실행 강제**: "⚠️ 중요" 경고 추가, AI 통합 프로세스 6단계 상세 명시
- ✅ **과거 문제 사례 4개 문서화**: Tooltip, Input, Avatar, TextEditor 사례 추가
- ✅ **복잡도 무관 통합 원칙**: 파일 수, 컴포넌트 수에 관계없이 단일 index.tsx로 통합

**Step 4.7 실행 확인 방법**:

```bash
# 검증: index.tsx 외 추가 .tsx 파일이 있는지 확인
find src/commons/components/[component-name] \
  -maxdepth 1 -name "*.tsx" ! -name "index.tsx" ! -name "*.stories.tsx" | wc -l

# 결과가 0이어야 함 (표준 준수)
# 결과가 0이 아니면 Step 4.7 누락 → 즉시 통합 작업 실행
```

---

## 🎯 목적

단일 Untitled UI PRO 컴포넌트를:

1. CLI로 설치
2. OSM 구조(`src/commons/components/`)로 마이그레이션
3. Import 경로 자동 변경 (기본)
4. 의존성 컴포넌트 자동 감지 및 피드백
5. **NEW**: Import 경로 상세 검증 (하위 경로 제거)
6. **NEW**: 폴더 구조 표준 검증 및 자동 통합 (단일 index.tsx)
7. Storybook Stories 자동 생성 (Button 패턴 기반)
8. Prompts 가이드 문서 생성 (`prompts/[component].stories.md`)

---

## ⚠️ 중요 제약사항

### 컴포넌트 생성 위치 제한

**허용되는 경로**: `/src/commons/components/` **만**

**금지되는 경로**:
- ❌ `/src/components/base/`
- ❌ `/src/components/ui/`
- ❌ `/src/components/` (하위 디렉토리 없이)
- ❌ 기타 모든 경로

**위반 시 처리**:
1. 사용자에게 에러 메시지 표시
2. 올바른 경로로 자동 마이그레이션
3. 비표준 경로는 절대 생성하지 않음

---

## 📦 지원 컴포넌트 매핑

| 컴포넌트 이름 | CLI 명령어 | OSM 경로 |
|--------------|-----------|---------|
| Button | `button` | `commons/components/button` |
| Input | `input` | `commons/components/input` |
| Modal | `dialog` | `commons/components/modal` |
| Dropdown | `dropdown-menu` | `commons/components/dropdown` |
| Select | `select` | `commons/components/select` |
| Checkbox | `checkbox` | `commons/components/checkbox` |
| Radio | `radio-group` | `commons/components/radio` |
| Toggle | `switch` | `commons/components/toggle` |
| Tabs | `tabs` | `commons/components/tabs` |
| Tooltip | `tooltip` | `commons/components/tooltip` |
| Popover | `popover` | `commons/components/popover` |
| DataTable | `data-table` | `commons/components/data-table` |
| Calendar | `calendar` | `commons/components/calendar` |
| DatePicker | `date-picker` | `commons/components/date-picker` |
| Command | `command` | `commons/components/command` |
| Sheet | `sheet` | `commons/components/sheet` |

**신규 컴포넌트 추가**: 이 테이블만 업데이트하면 자동 인식

---

## 🔄 워크플로우

### Step 1: 컴포넌트 식별

사용자 요청에서 컴포넌트 이름 추출:
- "Dropdown 설치" → Dropdown
- "npx untitledui add dropdown-menu" → Dropdown (CLI 명령어에서 매핑)

### Step 2: 환경 검증

```bash
# 1. 작업 디렉토리 이동
cd /Users/kimjongwook/project/osm-rfq/frontend

# 2. 중복 설치 방지
if [ -d "src/commons/components/[component-name]" ]; then
  echo "⚠️ 이미 설치된 컴포넌트입니다."
  exit 1
fi
```

### Step 3: CLI 설치

```bash
# 매핑 테이블에서 CLI 명령어 찾기
npx untitledui add ${CLI_COMMAND}

# 예: npx untitledui add dropdown-menu
# 결과: 다양한 경로에 생성 가능 (Step 3.5에서 확인)
```

### Step 3.5: CLI 생성 경로 검증 및 탐색

**중요**: CLI가 예상치 못한 경로에 생성할 수 있음

```bash
# 가능한 생성 경로 탐색
echo "🔍 CLI로 생성된 파일 탐색 중..."

FOUND_FILE=$(find src/components -name "*${CLI_FILENAME}*" -type f 2>/dev/null | head -1)

if [ -z "$FOUND_FILE" ]; then
  echo "❌ CLI로 생성된 파일을 찾을 수 없습니다."
  echo "예상 파일명: ${CLI_FILENAME}.tsx"
  exit 1
fi

echo "✓ 발견된 파일: $FOUND_FILE"
```

**사용자 피드백 예시**:
```
🔍 CLI로 생성된 파일 탐색 중...
✓ 발견된 파일: src/components/base/buttons/button-utility.tsx

⚠️ 비표준 경로 감지
  생성 위치: src/components/base/buttons/
  표준 위치: src/commons/components/button-utility/

→ 자동으로 표준 경로로 마이그레이션합니다.
```

### Step 4: OSM 구조 마이그레이션

```bash
# 1. OSM 디렉토리 생성
mkdir -p src/commons/components/${COMPONENT_NAME}

# 2. 파일 이동 (Step 3.5에서 찾은 경로 사용)
mv ${FOUND_FILE} \
   src/commons/components/${COMPONENT_NAME}/index.tsx

# 3. Import 경로 정규화 (모든 가능한 경로 변환)
sed -i '' "s|@/components/ui|@/commons/components|g" \
   src/commons/components/${COMPONENT_NAME}/index.tsx
sed -i '' "s|@/components/base|@/commons/components|g" \
   src/commons/components/${COMPONENT_NAME}/index.tsx
```

### Step 4.5: 의존성 컴포넌트 감지 및 피드백 (⚠️ 필수 자동 실행)

**중요**: `/commons/components` 외부 참조를 자동 감지하여 사용자에게 알림

```bash
# 1. import 문 분석
echo "🔍 의존성 컴포넌트 검사 중..."

EXTERNAL_IMPORTS=$(grep -E "from ['\"]@/" src/commons/components/${COMPONENT_NAME}/index.tsx | \
  grep -v "@/commons/components" | \
  grep -v "@/utils" | \
  grep -v "@/styles" | \
  grep -E "@/(components|lib)" || true)

# 2. 외부 참조 발견 시 사용자 피드백
if [ -n "$EXTERNAL_IMPORTS" ]; then
  echo ""
  echo "⚠️ 누락된 의존성 컴포넌트 발견"
  echo ""
  echo "$EXTERNAL_IMPORTS" | while read -r line; do
    # import 경로에서 컴포넌트 이름 추출
    DEP_PATH=$(echo "$line" | sed -E "s/.*from ['\"]@\/([^'\"]+)['\"].*/\1/")
    DEP_COMPONENT=$(basename "$DEP_PATH" | sed 's/\.tsx$//')

    echo "  📦 $DEP_COMPONENT"
    echo "     import from: @/$DEP_PATH"
    echo ""
  done

  echo "📋 해결 방법:"
  echo "  1. 위 컴포넌트들을 먼저 설치하세요"
  echo "  2. 설치 완료 후 현재 컴포넌트를 재설치하세요"
  echo ""
  echo "예시: \"Tooltip 컴포넌트를 설치해주세요\""
  echo ""
  echo "❌ 의존성 누락으로 설치를 중단합니다."
  exit 1
fi

echo "✓ 모든 의존성이 /commons/components에 존재합니다."
```

### Step 4.6: Import 경로 상세 검증 (⚠️ 필수 자동 실행)

**목적**: 하위 경로 참조를 제거하여 표준 import 경로 준수

**문제 사례**:

- ❌ `import { Tooltip } from "@/commons/components/tooltip/tooltip"`
- ✅ `import { Tooltip } from "@/commons/components/tooltip"`

**실행 방법**:

```bash
echo "🔍 Import 경로 상세 검증 중..."

# 1. 하위 경로 패턴 감지
SUBPATH_IMPORTS=$(grep -E "from ['\"]@/commons/components/[^/]+/[^'\"]+['\"]" \
  src/commons/components/${COMPONENT_NAME}/index.tsx || true)

if [ -n "$SUBPATH_IMPORTS" ]; then
  echo ""
  echo "⚠️ 비표준 Import 경로 발견"
  echo ""
  echo "$SUBPATH_IMPORTS"
  echo ""
  echo "→ 자동으로 표준 경로로 수정합니다."

  # 2. 자동 수정: 하위 경로 제거
  # 예: @/commons/components/tooltip/tooltip → @/commons/components/tooltip
  sed -i '' -E 's|@/commons/components/([^/]+)/[^"'"'"']+|@/commons/components/\1|g' \
    src/commons/components/${COMPONENT_NAME}/index.tsx

  echo "✓ Import 경로 수정 완료"
fi

echo "✓ Import 경로 검증 완료"
```

**검증 결과 예시**:
```
⚠️ 비표준 Import 경로 발견

import { Tooltip, TooltipTrigger } from "@/commons/components/tooltip/tooltip";
import { Label } from "@/commons/components/input/label";

→ 자동으로 표준 경로로 수정합니다.
✓ Import 경로 수정 완료
```

### Step 4.7: 폴더 구조 표준 검증 및 자동 통합 (⚠️ 필수 자동 실행)

**⚠️ 중요**: 이 단계는 **모든 컴포넌트 설치 시 반드시 실행**해야 합니다. 건너뛰지 마세요!

**목적**: Button/Badge 패턴 준수 - 모든 컴포넌트를 단일 index.tsx로 통합

**표준 구조**:
```
component-name/
  ├─ index.tsx          # 모든 컴포넌트 통합
  ├─ index.stories.tsx  # Storybook
  └─ prompts/           # AI 가이드
```

**비표준 구조 (자동 통합 필요)**:
```
component-name/
  ├─ index.tsx          # Export hub만
  ├─ component-a.tsx    # ← 통합 필요
  ├─ component-b.tsx    # ← 통합 필요
  └─ component-c.tsx    # ← 통합 필요
```

**실행 방법**:

```bash
echo "🔍 폴더 구조 표준 검증 중..."

# 1. index.tsx 외 추가 .tsx 파일 감지
EXTRA_FILES=$(find src/commons/components/${COMPONENT_NAME} \
  -maxdepth 1 -name "*.tsx" ! -name "index.tsx" ! -name "*.stories.tsx" || true)

if [ -n "$EXTRA_FILES" ]; then
  echo ""
  echo "⚠️ 비표준 폴더 구조 감지"
  echo ""
  echo "발견된 파일:"
  echo "$EXTRA_FILES" | while read -r file; do
    echo "  - $(basename $file)"
  done
  echo ""
  echo "📋 표준 구조 (Button/Badge 패턴):"
  echo "  - 모든 컴포넌트는 단일 index.tsx에 통합"
  echo "  - 하위 컴포넌트는 같은 파일 내 export"
  echo ""
  echo "→ 자동 통합을 시작합니다."
  echo ""

  # 2. 사용자에게 수동 통합 안내 (AI가 Read/Write tool 사용)
  echo "⚠️ 이 단계는 AI가 자동으로 처리합니다:"
  echo "  1. Read tool로 각 파일 읽기"
  echo "  2. index.tsx에 통합"
  echo "  3. Write tool로 새 index.tsx 작성"
  echo "  4. 개별 파일 삭제 (rm 명령)"
  echo ""

  # 중요: 여기서 워크플로우 중단하고 AI에게 통합 작업 위임
  exit 2  # Exit code 2 = 통합 필요
fi

echo "✓ 폴더 구조 표준 준수"
```

**⚠️ AI 통합 프로세스 (비표준 구조 감지 시 자동 실행)**:

**실행 조건**: 위 Bash 스크립트에서 `EXTRA_FILES`가 발견되면 즉시 아래 프로세스 실행

**AI가 직접 수행해야 하는 작업**:

1. **Read tool 사용**: 모든 .tsx 파일 읽기 (한 번에 여러 파일 읽기)
   ```typescript
   // 예시: Avatar 설치 시
   Read: avatar-label-group.tsx
   Read: avatar-profile-photo.tsx
   Read: base-components/avatar-online-indicator.tsx
   Read: base-components/avatar-company-icon.tsx
   // ... 모든 파일 읽기
   ```

2. **분석**: 각 파일의 export 컴포넌트 및 의존성 파악
   - Export된 컴포넌트 목록 추출
   - 컴포넌트 간 의존성 순서 파악
   - Import 문 분석

3. **통합**: 단일 index.tsx로 병합
   - Import 문 통합 (중복 제거)
   - 컴포넌트 순서: **하위 → 상위** (의존성 순)
   - 주석 블록으로 구분:
     ```typescript
     // ============================================================================
     // ComponentName
     // ============================================================================
     ```
   - Types는 최상단에 모음
   - 각 컴포넌트의 styles/constants는 컴포넌트 바로 위에 배치

4. **Write tool 사용**: 새 index.tsx 작성
   ```typescript
   Write: src/commons/components/[component-name]/index.tsx
   ```

5. **Bash tool 사용**: 개별 파일 및 폴더 삭제
   ```bash
   rm -rf src/commons/components/[component-name]/avatar-label-group.tsx
   rm -rf src/commons/components/[component-name]/avatar-profile-photo.tsx
   rm -rf src/commons/components/[component-name]/base-components/
   ```

6. **Storybook import 수정** (필요 시)
   ```typescript
   // Before
   import { AvatarLabelGroup } from './avatar-label-group';
   import { AvatarCompanyIcon } from './base-components';

   // After
   import { AvatarLabelGroup, AvatarCompanyIcon } from './index';
   ```

**통합 예시**:

```typescript
// index.tsx (통합 후)
"use client";

import { ... } from "react";
import { ... } from "react-aria-components";

// ============================================================================
// HintText Component
// ============================================================================
export const HintText = ({ ... }) => { ... };

// ============================================================================
// Label Component
// ============================================================================
export const Label = ({ ... }) => { ... };

// ============================================================================
// Input Component
// ============================================================================
export const Input = ({ ... }) => { ... };
```

**사용자 피드백 예시**:
```
⚠️ 누락된 의존성 컴포넌트 발견

  📦 Tooltip
     import from: @/components/base/tooltip/tooltip

📋 해결 방법:
  1. 위 컴포넌트들을 먼저 설치하세요
  2. 설치 완료 후 현재 컴포넌트를 재설치하세요

예시: "Tooltip 컴포넌트를 설치해주세요"

❌ 의존성 누락으로 설치를 중단합니다.
```

### Step 5: Storybook Stories 생성 (⚠️ 필수 자동 실행)

**중요**: 이 단계는 **반드시 자동으로 실행**되어야 합니다. 사용자에게 수동 작업을 요청하지 마세요.

**참조**: [Button Stories](../../frontend/src/commons/components/button/index.stories.tsx)

**생성 위치**: `src/commons/components/[component-name]/index.stories.tsx`

**실행 방법**:
1. Button Stories 파일을 읽어 패턴 파악
2. 설치된 컴포넌트의 TypeScript 타입 분석
3. 아래 템플릿을 기반으로 컴포넌트별 Stories 파일 생성
4. Write tool로 파일 작성 완료

**템플릿**:

```typescript
import type { Meta, StoryObj } from '@storybook/nextjs';
import { [ComponentName] } from './index';

const meta: Meta<typeof [ComponentName]> = {
  title: 'Commons/Components/[ComponentName]',
  component: [ComponentName],
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    // 컴포넌트별 props 정의 (TypeScript에서 자동 추출)
  },
};

export default meta;
type Story = StoryObj<typeof [ComponentName]>;

export const Default: Story = {
  args: { /* 기본 props */ },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {/* 모든 variants 시연 */}
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {/* disabled, error, loading 등 */}
    </div>
  ),
};

export const Playground: Story = {
  args: { /* 사용자 조작 가능 */ },
};
```

### Step 6: Prompts 가이드 문서 생성 (⚠️ 필수 자동 실행)

**중요**: 이 단계는 **반드시 자동으로 실행**되어야 합니다. 사용자에게 수동 작업을 요청하지 마세요.

**참조**: [Button Prompts](../../frontend/src/commons/components/button/prompts/button.stories.md)

**생성 위치**: `src/commons/components/[component-name]/prompts/[component-name].stories.md`

**실행 방법**:

1. Bash tool로 prompts 디렉토리 생성:

   ```bash
   mkdir -p src/commons/components/[component-name]/prompts
   ```

2. Button Prompts 파일을 읽어 구조 파악
3. 아래 템플릿을 기반으로 컴포넌트별 가이드 문서 생성
4. **컴포넌트별 커스터마이징** 섹션(Lines 307-358)에서 해당 컴포넌트의 variants/triggers/a11y 정보 추출
5. Write tool로 파일 작성 완료

**템플릿**:

```markdown
# [ComponentName] Component Storybook Stories 구현 가이드

## 📋 조건-프로젝트

- **Design System**: Untitled UI PRO 기반
- **Styling**: Tailwind CSS v4 + CSS Variables
- **Component Library**: React Aria Components
- **Documentation**: Storybook 9.1.13

## 📂 조건-파일경로

\`\`\`
참고할 TSX 파일경로: frontend/src/commons/components/[component-name]/index.tsx
구현될 STORIES 파일경로: frontend/src/commons/components/[component-name]/index.stories.tsx
\`\`\`

## 🎯 핵심요구사항

### [ComponentName] 컴포넌트의 모든 variants를 Storybook Stories로 구현할 것

## 📊 구현 범위

[컴포넌트별 variants 및 props 정의]

## ✅ 검증 체크리스트

### 기능 검증
- [ ] 모든 variants 렌더링 확인
- [ ] 상태 전환 동작 확인
- [ ] 접근성 검증 (키보드 내비게이션, 스크린리더)

### Storybook 통합
- [ ] Controls 패널에서 모든 props 조작 가능
- [ ] A11y 애드온 경고 없음

### 타입 안전성
- [ ] TypeScript strict mode 에러 없음

**구현 완료 후 체크리스트를 반환하세요!**
```

#### 컴포넌트별 가이드 커스터마이징

**Dropdown**:
- Variants: Menu items, Nested menus, Icon leading/trailing
- States: Open/Closed, Disabled items, Selected state
- A11y: 키보드 내비게이션 (Arrow keys, Enter, Escape)

**Select**:
- Variants: Single select, Multiple select, Searchable
- States: Open/Closed, Disabled, Error, Loading
- A11y: ARIA attributes, 키보드 지원

**Checkbox**:
- Variants: Sizes (sm, md, lg), Indeterminate state
- States: Checked, Unchecked, Disabled, Error
- A11y: Label association, Keyboard support

**Radio**:
- Variants: Sizes, Orientation (horizontal, vertical)
- States: Selected, Unselected, Disabled
- A11y: RadioGroup role, Keyboard navigation

**Toggle (Switch)**:
- Variants: Sizes, With labels
- States: On, Off, Disabled, Loading
- A11y: Switch role, State announcements

**Tabs**:
- Variants: Horizontal, Vertical, With icons
- States: Active, Inactive, Disabled
- A11y: TabList/Tab/TabPanel roles, Arrow navigation

**Tooltip**:
- Variants: Positions (top, right, bottom, left)
- Triggers: Hover, Focus, Click
- A11y: aria-describedby, Keyboard accessibility

**Popover**:
- Variants: Positions, Arrow/No arrow
- Triggers: Click, Hover, Focus
- Content: Text, Rich content, Interactive elements

**DataTable**:
- Features: Sorting, Filtering, Pagination
- States: Loading, Empty, Error
- A11y: Table roles, Column headers, Row selection

**Calendar**:
- Variants: Single date, Date range, Month picker
- States: Selected, Today, Disabled dates
- A11y: Grid role, Date announcements

---

## ✅ 검증 체크리스트

**⚠️ 모든 단계는 순서대로 실행하고 검증해야 합니다.**

```bash
# 1. OSM 구조 이동 확인
[ -f "src/commons/components/[component-name]/index.tsx" ]

# 2. Import 경로 정규화 확인 (기본)
! grep -q "@/components/base" src/commons/components/[component-name]/index.tsx
! grep -q "@/components/ui" src/commons/components/[component-name]/index.tsx

# 3. 의존성 컴포넌트 확인
# /commons/components 외부 참조가 없어야 함 (utils, styles 제외)

# 4. Import 경로 상세 검증 (하위 경로 제거)
! grep -qE "@/commons/components/[^/]+/[^\"']+" src/commons/components/[component-name]/index.tsx

# ⚠️ 5. 폴더 구조 표준 검증 (단일 index.tsx) - 필수!
FILE_COUNT=$(find src/commons/components/[component-name] -maxdepth 1 -name "*.tsx" ! -name "index.tsx" ! -name "*.stories.tsx" | wc -l)
[ "$FILE_COUNT" -eq 0 ]
# ❌ 이 검증이 실패하면 Step 4.7 누락 → 즉시 통합 작업 실행!

# 6. Storybook Stories 생성 확인
[ -f "src/commons/components/[component-name]/index.stories.tsx" ]

# 7. Prompts 가이드 문서 생성 확인
[ -f "src/commons/components/[component-name]/prompts/[component-name].stories.md" ]

# 8. TypeScript 컴파일 확인
npx tsc --noEmit
```

**검증 실패 시 조치**:

| 검증 항목 | 실패 시 조치 |
|---------|------------|
| #5 (폴더 구조) | **즉시 Step 4.7 AI 통합 프로세스 실행** |
| #6 (Stories) | Step 5 재실행 |
| #7 (Prompts) | Step 6 재실행 |
| #8 (TypeScript) | Import 경로 및 타입 수정 |

---

## 📤 출력 형식

### 성공 시

```
✅ [ComponentName] 컴포넌트 설치 완료

📁 생성된 파일:
  ├─ src/commons/components/[component-name]/index.tsx
  ├─ src/commons/components/[component-name]/index.stories.tsx
  └─ src/commons/components/[component-name]/prompts/[component-name].stories.md

🔍 검증 결과:
  ✓ Step 1-3: CLI 설치 및 경로 탐색
  ✓ Step 4: OSM 마이그레이션
  ✓ Step 4.5: 의존성 컴포넌트 확인
  ✓ Step 4.6: Import 경로 상세 검증 (하위 경로 제거)
  ✓ Step 4.7: 폴더 구조 표준 검증 (단일 index.tsx) ⚠️ 필수!
  ✓ Step 5: Storybook Stories 생성
  ✓ Step 6: Prompts 가이드 문서 생성
  ✓ TypeScript 컴파일

🎨 Storybook 확인:
  http://localhost:6006/?path=/story/commons-components-[component-name]--default

📚 생성된 Stories:
  ├─ Default
  ├─ AllVariants
  ├─ States
  └─ Playground
```

### 의존성 누락 시

```
⚠️ [ComponentName] 컴포넌트 설치 실패

❌ 누락된 의존성 컴포넌트:
  - Tooltip (import from: @/components/base/tooltip/tooltip)

📋 해결 방법:
  1. "Tooltip 컴포넌트를 설치해주세요"
  2. Tooltip 설치 완료 후 [ComponentName] 재설치

💡 올바른 순서:
  1단계: Tooltip 설치
  2단계: [ComponentName] 설치
```

---

## 🔧 트러블슈팅

### CLI 로그인 에러

```bash
cd /Users/kimjongwook/project/osm-rfq/frontend
npx untitledui@latest login
# 이메일: redpoint2761@seoultech.ac.kr
```

### CLI 생성 파일을 찾을 수 없음

```bash
# 수동으로 찾기
find src/components -name "*[component-name]*" -type f

# 발견된 경로를 OSM 구조로 이동
mv [발견된경로] src/commons/components/[component-name]/index.tsx
```

### 의존성 컴포넌트 에러

**증상**: Import에서 `/components/base/` 참조

**해결**:
1. 참조된 컴포넌트 먼저 설치
2. 현재 컴포넌트 재설치
3. Import 경로 자동 변경됨

### Storybook 컴파일 에러

```bash
# 캐시 삭제
rm -rf node_modules/.cache
npm run storybook
```

---

**작성일**: 2025-11-20
**버전**: 5.2.0 (TextEditor 사례 추가 및 복잡도 무관 통합 원칙 명시)
**작성자**: OSM RFQ Development Team

**변경 이력**:

- v5.2.0 (2025-11-20): **TextEditor 사례 추가 및 복잡도 무관 통합 원칙 명시**
  - TextEditor 설치 시 발생한 문제 (6개 파일, 1141 lines 분산) 재발 방지
  - 과거 문제 사례 4개 문서화 (Tooltip, Input, Avatar, TextEditor)
  - **복잡도 무관 통합 원칙**: 파일 수, 컴포넌트 수(13개 extensions), 코드 라인 수에 관계없이 단일 index.tsx로 통합
  - TextEditor 통합 사례: 6개 파일 → 단일 index.tsx (1141 lines)
- v5.1.0 (2025-11-20): **Step 4.7 실행 강제 및 문서화 개선**
  - Avatar 설치 시 발생한 문제 (8개 파일 분산, Step 4.7 누락) 재발 방지
  - "⚠️ 중요" 경고 추가, AI 통합 프로세스 6단계 상세 명시
  - 과거 문제 사례 3개 문서화 (Tooltip, Input, Avatar)
  - 검증 체크리스트에 실패 시 조치 테이블 추가
  - Step 4.7 실행 확인 방법 추가
- v5.0.0 (2025-11-20): **Step 4.6, 4.7 추가** - Import 경로 상세 검증, 폴더 구조 표준 검증 및 자동 통합
  - Input 설치 시 발생한 문제 (5개 파일 분산, Tooltip import 오류) 재발 방지
  - Button/Badge 패턴 준수 강제화 (단일 index.tsx)
- v4.0.0 (2025-11-20): Step 5/6 자동 실행 명시, Storybook import `@storybook/nextjs`로 변경
- v3.0.0 (2025-11-20): 의존성 감지 추가 (Step 4.5)
- v2.0.0: CLI 생성 경로 탐색 추가 (Step 3.5)
- v1.0.0: 초기 버전
