# Avatar Component Storybook Stories 구현 가이드

아래의 조건을 모두 적용하여, 아래의 요구사항을 모두 구현할 것.
구현 결과를 체크리스트로 반환할 것.

---

## 📋 조건-프로젝트

### OSM RFQ 프로젝트 표준을 준수할 것

- **Design System**: Untitled UI PRO 기반
- **Styling**: Tailwind CSS v4 + CSS Variables
- **Component Library**: React Aria Components
- **Documentation**: Storybook 9.1.13

---

## 📂 조건-파일경로

```
참고할 TSX 파일경로: frontend/src/commons/components/avatar/index.tsx
구현될 STORIES 파일경로: frontend/src/commons/components/avatar/index.stories.tsx
```

---

## 🎯 핵심요구사항

### Avatar 컴포넌트의 모든 variants를 Storybook Stories로 구현할 것

**Avatar는 사용자 프로필 이미지를 표시하는 컴포넌트입니다:**
- 이미지, 이니셜, 아이콘 플레이스홀더 지원
- 온라인/오프라인 상태 표시
- 인증 배지 (Verified Tick)
- 회사 아이콘 배지
- 라벨과 함께 표시 (AvatarLabelGroup)
- 대형 프로필 사진 (AvatarProfilePhoto)
- 추가 버튼 (AvatarAddButton)

---

## 📊 구현 범위

### 1. Size Variants (7가지)

| Size | Dimensions | Use Case |
|------|-----------|----------|
| `xxs` | `16px × 16px` | 아주 작은 아이콘 |
| `xs` | `24px × 24px` | 작은 목록 아이템 |
| `sm` | `32px × 32px` | 댓글, 채팅 |
| `md` | `40px × 40px` | 기본 아바타, 목록 |
| `lg` | `48px × 48px` | 헤더, 프로필 카드 |
| `xl` | `56px × 56px` | 대형 프로필 |
| `2xl` | `64px × 64px` | 최대 크기 |

### 2. Content Types (4가지)

| Type | Description |
|------|-------------|
| `Image` | src prop으로 이미지 URL 전달 |
| `Initials` | initials prop으로 텍스트 표시 (예: "OR") |
| `Icon` | placeholderIcon prop으로 커스텀 아이콘 |
| `Default` | User01 아이콘 (기본 플레이스홀더) |

### 3. Status Indicators (3가지)

| Indicator | Description |
|-----------|-------------|
| `Online` | status="online" - 녹색 점 |
| `Offline` | status="offline" - 회색 점 |
| `Verified` | verified={true} - 파란색 체크 배지 |

### 4. Compound Components (3가지)

- **AvatarLabelGroup**: 아바타 + 제목 + 부제목
- **AvatarProfilePhoto**: 대형 프로필 사진 (sm, md, lg 사이즈만)
- **AvatarAddButton**: 사용자 추가 버튼 (xs, sm, md 사이즈만)

---

## ⚙️ 기술 요구사항

- TypeScript strict mode 준수
- React 18 기능 활용 (useState for image fallback)
- Untitled UI 디자인 토큰 활용
- 접근성 (a11y) 검증 포함
  - alt text for images
  - aria-label for buttons
  - Semantic HTML (figure/figcaption for LabelGroup)

---

## 🛠️ 구현 요구사항

### Storybook 구조

```typescript
// index.stories.tsx 구조
import type { Meta, StoryObj } from '@storybook/nextjs';
import { Avatar } from './index';
import { AvatarLabelGroup } from './avatar-label-group';
import { AvatarProfilePhoto } from './avatar-profile-photo';
import { AvatarAddButton, AvatarCompanyIcon } from './base-components';

const meta: Meta<typeof Avatar> = {
  title: 'Commons/Components/Avatar',
  component: Avatar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: { /* ... */ },
};

export default meta;
type Story = StoryObj<typeof Avatar>;
```

### 필수 Stories (12개)

1. **Default** - 기본 Avatar (이니셜)
2. **AllSizes** - 7가지 사이즈 비교 (xxs ~ 2xl)
3. **WithImage** - 이미지 포함
4. **WithInitials** - 이니셜 표시
5. **WithStatus** - 온라인/오프라인 상태
6. **WithBadge** - 회사 아이콘 배지
7. **WithVerified** - 인증 틱
8. **ProfilePhoto** - 대형 프로필 사진
9. **LabelGroup** - 라벨이 있는 아바타
10. **AddButton** - 추가 버튼
11. **UseCases** - 실제 사용 예시 (팀 멤버, 사용자 프로필)
12. **Playground** - 모든 props 조작 가능

### 구현 예시

```typescript
// 1. Default
export const Default: Story = {
  args: {
    initials: 'OU',
    size: 'md',
  },
};

// 3. WithImage
export const WithImage: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar src="https://i.pravatar.cc/150?img=11" alt="Olivia Rhye" size="md" />
      <Avatar src="https://i.pravatar.cc/150?img=12" alt="Phoenix Baker" size="md" />
      <Avatar src="https://i.pravatar.cc/150?img=13" alt="Lana Steiner" size="md" />
    </div>
  ),
};

// 5. WithStatus
export const WithStatus: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-semibold mb-3">Online</h3>
        <div className="flex items-center gap-4">
          <Avatar src="https://i.pravatar.cc/150?img=21" alt="Avatar" size="md" status="online" />
          <Avatar src="https://i.pravatar.cc/150?img=22" alt="Avatar" size="lg" status="online" />
        </div>
      </div>
    </div>
  ),
};

// 9. LabelGroup
export const LabelGroup: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[300px]">
      <AvatarLabelGroup
        src="https://i.pravatar.cc/150?img=61"
        alt="Olivia Rhye"
        size="md"
        title="Olivia Rhye"
        subtitle="olivia@untitledui.com"
      />
    </div>
  ),
};
```

---

## ✅ 검증 체크리스트

### 기능 검증

- [ ] 7가지 사이즈 (xxs ~ 2xl) 모두 렌더링 확인
- [ ] 이미지 로드 실패 시 fallback (이니셜/아이콘) 표시 확인
- [ ] 이니셜 텍스트 정상 표시
- [ ] 온라인/오프라인 상태 점 표시 확인
- [ ] Verified tick 배지 표시 확인
- [ ] 회사 아이콘 배지 (AvatarCompanyIcon) 표시 확인
- [ ] Contrast border 동작 확인
- [ ] AvatarLabelGroup 제목/부제목 표시 확인
- [ ] AvatarProfilePhoto 대형 사이즈 (sm, md, lg) 확인
- [ ] AvatarAddButton 클릭 동작 및 Tooltip 확인

### Storybook 통합

- [ ] Controls 패널에서 모든 props 조작 가능
  - size: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  - src: string
  - alt: string
  - initials: string
  - status: 'online' | 'offline'
  - verified: boolean
  - contrastBorder: boolean
  - focusable: boolean
- [ ] A11y 애드온 경고 없음
- [ ] 각 Story가 의미있는 이름과 설명 포함

### 접근성 검증

- [ ] 이미지에 alt 속성 설정
- [ ] AvatarAddButton에 aria-label 설정
- [ ] AvatarLabelGroup이 semantic HTML 사용 (figure/figcaption)
- [ ] Focus ring 동작 확인 (focusable={true}일 때)
- [ ] Tooltip이 스크린리더에 읽힘 (AvatarAddButton)

### 타입 안전성

- [ ] TypeScript strict mode 에러 없음
- [ ] AvatarProps 타입 정상 동작
- [ ] AvatarSize 타입 제약 확인
- [ ] Compound components 타입 안전성 확인

### 실전 사용성

- [ ] UseCases Story가 실제 사용 패턴 시연
  - Team Members List
  - User Profile Card
- [ ] 각 패턴이 프로젝트에서 바로 복사 가능
- [ ] 이미지 URL이 실제 플레이스홀더 서비스 사용 (pravatar.cc, clearbit.com)

---

## 🎨 Avatar 컴포넌트 특징

### 1. Image Fallback Pattern

Avatar는 이미지 로드 실패 시 자동으로 fallback을 표시합니다:
- `useState`로 로드 실패 추적
- `onError` 핸들러로 실패 감지
- 우선순위: Image → Initials → Custom Icon → Default Icon

```typescript
const [isFailed, setIsFailed] = useState(false);

// Image 로드 실패 시 isFailed = true
if (src && !isFailed) {
  return <img onError={() => setIsFailed(true)} />;
}

// Fallback: initials → placeholderIcon → User01
if (initials) return <span>{initials}</span>;
if (PlaceholderIcon) return <PlaceholderIcon />;
return <User01 />;
```

### 2. Contrast Border

```typescript
<Avatar src="..." contrastBorder={true} />
// 아바타 주변에 미세한 테두리 (outline)
```

### 3. Status Indicators

```typescript
// Online/Offline status
<Avatar src="..." status="online" />
<Avatar src="..." status="offline" />

// Verified badge
<Avatar src="..." verified={true} />
```

### 4. Compound Components

```typescript
// AvatarLabelGroup - 제목/부제목과 함께
<AvatarLabelGroup
  src="..."
  size="md"
  title="Olivia Rhye"
  subtitle="olivia@untitledui.com"
  status="online"
/>

// AvatarProfilePhoto - 대형 프로필 사진
<AvatarProfilePhoto
  src="..."
  size="lg"
  verified={true}
/>

// AvatarAddButton - 사용자 추가 버튼
<AvatarAddButton size="md" title="Add team member" />
```

---

## 💡 사용 예시

### 기본 아바타 (이니셜)

```typescript
<Avatar initials="OR" size="md" />
```

### 이미지 아바타

```typescript
<Avatar
  src="https://i.pravatar.cc/150?img=1"
  alt="Olivia Rhye"
  size="md"
/>
```

### 온라인 상태 표시

```typescript
<Avatar
  src="https://i.pravatar.cc/150?img=1"
  alt="Olivia Rhye"
  size="md"
  status="online"
/>
```

### 인증 배지

```typescript
<Avatar
  src="https://i.pravatar.cc/150?img=1"
  alt="Olivia Rhye"
  size="md"
  verified={true}
/>
```

### 회사 아이콘 배지

```typescript
<Avatar
  src="https://i.pravatar.cc/150?img=1"
  alt="Olivia Rhye"
  size="md"
  badge={
    <AvatarCompanyIcon
      src="https://logo.clearbit.com/google.com"
      alt="Google"
      size="md"
    />
  }
/>
```

### 라벨 그룹

```typescript
<AvatarLabelGroup
  src="https://i.pravatar.cc/150?img=1"
  alt="Olivia Rhye"
  size="md"
  title="Olivia Rhye"
  subtitle="olivia@untitledui.com"
  status="online"
/>
```

### 프로필 사진

```typescript
<AvatarProfilePhoto
  src="https://i.pravatar.cc/300?img=1"
  alt="Profile"
  size="lg"
  verified={true}
/>
```

### 추가 버튼

```typescript
<div className="flex items-center gap-2">
  <Avatar src="..." size="md" />
  <Avatar src="..." size="md" />
  <Avatar src="..." size="md" />
  <AvatarAddButton size="md" title="Add team member" />
</div>
```

---

**구현 완료 후 위 체크리스트를 모두 검증하고 결과를 반환하세요!**
