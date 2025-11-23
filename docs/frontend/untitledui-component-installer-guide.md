# Untitled UI Component Installer Skill 사용 가이드

Untitled UI PRO 컴포넌트를 OSM RFQ 프로젝트에 자동으로 설치하고 Storybook을 생성하는 Claude Skill입니다.

---

## 📋 개요

**Untitled UI Component Installer**는 다음 작업을 자동화합니다:

1. ✅ Untitled UI CLI로 컴포넌트 설치
2. ✅ OSM 구조(`src/commons/components/`)로 마이그레이션
3. ✅ Import 경로 자동 변경
4. ✅ Storybook Stories 자동 생성 (Button 패턴 기반)
5. ✅ Prompts 가이드 문서 자동 생성 (`prompts/` 디렉토리)
6. ✅ TypeScript 및 A11y 검증

**시간 절약**: 수동 작업 30분 → Skill 실행 5분 (6배 빠름)

---

## 🚀 기본 사용법

### Skill 실행 방법

**중요**: `/skill` 명령어는 사용하지 않습니다. 대신 자연어로 요청하세요.

```
방법 1: 자연어 (권장)
"Dropdown 컴포넌트를 설치해줘"
"Select 설치"

방법 2: CLI 명령어 직접 지정
"npx untitledui add dropdown-menu"

방법 3: 명시적 스킬 요청
"untitledui-component-installer 스킬로 Dropdown 설치"
```

**잘못된 사용법**:
```
❌ /skill untitledui-component-installer
   → "Unknown slash command" 에러 발생
```

### 실행 결과

```
✅ Dropdown 컴포넌트 설치 완료

📁 생성된 파일:
  ├─ src/commons/components/dropdown/index.tsx
  ├─ src/commons/components/dropdown/index.stories.tsx
  └─ src/commons/components/dropdown/prompts/dropdown.stories.md

🔍 검증 결과:
  ✓ CLI 설치
  ✓ OSM 마이그레이션
  ✓ Import 경로 변경
  ✓ Storybook Stories 생성
  ✓ Prompts 가이드 문서 생성
  ✓ TypeScript 컴파일
  ✓ A11y 검증

🎨 Storybook 확인:
  http://localhost:6006/?path=/story/commons-components-dropdown--default
```

---

## 📦 지원 컴포넌트

### P0: 필수 컴포넌트 (3개)

| 컴포넌트 | CLI 명령어 | 사용 예시 |
|---------|-----------|----------|
| Button | `button` | 액션, 제출, 링크 |
| Input | `input` | 텍스트, 이메일, 비밀번호 |
| Modal | `dialog` | 확인, 폼, 상세보기 |

### P1: 폼 컴포넌트 (5개)

| 컴포넌트 | CLI 명령어 | 사용 예시 |
|---------|-----------|----------|
| Dropdown | `dropdown-menu` | 액션 메뉴, 설정 |
| Select | `select` | 국가, 카테고리 선택 |
| Checkbox | `checkbox` | 약관 동의, 필터 |
| Radio | `radio-group` | 결제 방법, 배송 옵션 |
| Toggle | `switch` | 알림, 다크모드 |

### P2: UI 컴포넌트 (4개)

| 컴포넌트 | CLI 명령어 | 사용 예시 |
|---------|-----------|----------|
| Tabs | `tabs` | 프로필 섹션, 설정 |
| Tooltip | `tooltip` | 도움말, 부가 정보 |
| Popover | `popover` | 더보기 메뉴, 상세 정보 |
| DataTable | `data-table` | 사용자 목록, 주문 내역 |

### P3: 고급 컴포넌트 (4개)

| 컴포넌트 | CLI 명령어 | 사용 예시 |
|---------|-----------|----------|
| Calendar | `calendar` | 날짜 선택 |
| DatePicker | `date-picker` | 예약, 일정 |
| Command | `command` | 검색, 빠른 실행 |
| Sheet | `sheet` | 상세보기, 설정 패널 |

**총 16개 컴포넌트 지원** (확장 가능)

---

## 🔧 워크플로우

Skill이 실행하는 6단계 작업:

### Step 1: 컴포넌트 식별

사용자 요청에서 컴포넌트 이름 추출 및 CLI 명령어 매핑

### Step 2: 환경 검증

```bash
cd /Users/kimjongwook/project/osm-rfq/frontend

# 중복 설치 방지
if [ -d "src/commons/components/dropdown" ]; then
  echo "⚠️ 이미 설치된 컴포넌트입니다."
  exit 1
fi
```

### Step 3: CLI 설치

```bash
npx untitledui add dropdown-menu
# 결과: src/components/ui/dropdown-menu.tsx
```

### Step 4: OSM 구조 마이그레이션

```bash
mkdir -p src/commons/components/dropdown
mv src/components/ui/dropdown-menu.tsx \
   src/commons/components/dropdown/index.tsx
sed -i '' "s|@/components/ui|@/commons/components|g" \
   src/commons/components/dropdown/index.tsx
```

### Step 5: Storybook Stories 생성

Button 패턴 기반 자동 생성:

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './index';

const meta: Meta<typeof Dropdown> = {
  title: 'Commons/Components/Dropdown',
  component: Dropdown,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Default: Story = { args: { /* ... */ } };
export const AllVariants: Story = { /* ... */ };
export const States: Story = { /* ... */ };
export const Playground: Story = { /* ... */ };
```

### Step 6: Prompts 가이드 문서 생성

```bash
mkdir -p src/commons/components/dropdown/prompts
# 생성: src/commons/components/dropdown/prompts/dropdown.stories.md
```

**생성되는 문서**:

```markdown
# Dropdown Component Storybook Stories 구현 가이드

## 📋 조건-프로젝트
- Design System: Untitled UI PRO 기반
- Styling: Tailwind CSS v4 + CSS Variables
- Component Library: React Aria Components

## 📊 구현 범위
- Variants: Menu items, Nested menus, Icon leading/trailing
- States: Open/Closed, Disabled items, Selected state
- A11y: 키보드 내비게이션 (Arrow keys, Enter, Escape)

## ✅ 검증 체크리스트
- [ ] 모든 variants 렌더링 확인
- [ ] 키보드 내비게이션 동작 확인
- [ ] A11y 애드온 경고 없음
```

---

## ✅ 검증 체크리스트

설치 완료 후 자동 검증 항목:

- [ ] CLI 설치 성공
- [ ] OSM 구조 이동 완료
- [ ] Import 경로 변경 완료
- [ ] Storybook Stories 생성
- [ ] **Prompts 가이드 문서 생성**
- [ ] TypeScript 컴파일 성공
- [ ] Storybook 빌드 성공
- [ ] A11y 검증 통과

---

## 🐛 트러블슈팅

### 1. CLI 로그인 에러

```bash
cd /Users/kimjongwook/project/osm-rfq/frontend
npx untitledui@latest login
# 이메일: redpoint2761@seoultech.ac.kr
```

### 2. Import 경로 미변경

```bash
sed -i '' "s|@/components/ui|@/commons/components|g" \
  src/commons/components/dropdown/index.tsx
```

### 3. Storybook 컴파일 에러

```bash
rm -rf node_modules/.cache
npm run storybook
```

### 4. 중복 설치 에러

```bash
rm -rf src/commons/components/dropdown
# Skill 재실행
```

---

## 🔄 신규 컴포넌트 추가

### Skill 파일 수정

**파일**: `.claude/skills/untitledui-component-installer.md`

**"지원 컴포넌트 매핑" 테이블에 추가**:

```markdown
| DateRangePicker | `date-range-picker` | `commons/components/date-range-picker` |
```

### Skill 재실행

```bash
"DateRangePicker 설치해줘"
```

자동으로 새 컴포넌트가 인식됩니다!

---

## 📊 실전 예시

### 시나리오: RFQ 폼 페이지 개발

**필요한 컴포넌트**: Input, Select, Checkbox, DataTable

#### Step 1: 컴포넌트 설치

```bash
"Input 설치"
"Select 설치"
"Checkbox 설치"
"DataTable 설치"
```

#### Step 2: Storybook 확인

```bash
cd frontend
npm run storybook
# http://localhost:6006
```

#### Step 3: 페이지에서 사용

```tsx
import { Input } from '@/commons/components/input';
import { Select } from '@/commons/components/select';
import { Checkbox } from '@/commons/components/checkbox';
import { DataTable } from '@/commons/components/data-table';

export default function RFQFormPage() {
  return (
    <form>
      <Input label="Company Name" />
      <Select label="Industry" options={industries} />
      <Checkbox>I agree to terms</Checkbox>
      <DataTable columns={columns} data={rfqs} />
    </form>
  );
}
```

---

## 🎯 베스트 프랙티스

### 1. Storybook 우선 확인

설치 후 바로 Storybook에서 컴포넌트 동작 확인:

```bash
npm run storybook
# → Commons → Components → [컴포넌트명]
```

### 2. Git 커밋 전략

관련 컴포넌트를 그룹으로 커밋:

```bash
git add src/commons/components/
git commit -m "feat: Add P1 form components"
git push
```

### 3. TypeScript 타입 활용

자동완성 지원:

```tsx
<Select
  placeholder="선택하세요"
  options={[
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
  ]}
  onChange={(value) => console.log(value)}  // ✅ 타입 안전
/>
```

---

## 📚 관련 문서

- **Skill 소스**: [.claude/skills/untitledui-component-installer.md](../../.claude/skills/untitledui-component-installer.md)
- **Button 참조**: [Button Component](../../frontend/src/commons/components/button/index.tsx)
- **Button Stories**: [Button Stories](../../frontend/src/commons/components/button/index.stories.tsx)
- **Button Prompts**: [Button Prompts](../../frontend/src/commons/components/button/prompts/button.stories.md)
- **PRO 가이드**: [Untitled UI PRO Commons Guide](./untitled-ui-pro-commons-guide.md)
- **아이콘 시스템**: [하이브리드 아이콘 관리 시스템](./하이브리드%20아이콘%20관리%20시스템.md)

---

## 🤝 지원

### Skill 관련 문의

- **Skill 파일**: `.claude/skills/untitledui-component-installer.md`
- **이슈 리포트**: GitHub Issues

### Untitled UI PRO

- **계정**: redpoint2761@seoultech.ac.kr
- **공식 문서**: [https://www.untitledui.com/docs](https://www.untitledui.com/docs)

---

**작성일**: 2025-11-20
**버전**: 2.0.0 (최적화)
**작성자**: OSM RFQ Development Team
