# TextEditor Component Storybook Stories 구현 가이드

아래의 조건을 모두 적용하여, 아래의 요구사항을 모두 구현할 것.
구현 결과를 체크리스트로 반환할 것.

---

## 📋 조건-프로젝트

### OSM RFQ 프로젝트 표준을 준수할 것

- **Design System**: Untitled UI PRO 기반
- **Styling**: Tailwind CSS v4 + CSS Variables
- **Component Library**: React Aria Components + Tiptap Editor
- **Documentation**: Storybook 9.1.13

---

## 📂 조건-파일경로

```
참고할 TSX 파일경로: frontend/src/commons/components/text-editor/index.tsx
구현될 STORIES 파일경로: frontend/src/commons/components/text-editor/index.stories.tsx
```

---

## 🎯 핵심요구사항

### TextEditor 컴포넌트의 모든 variants를 Storybook Stories로 구현할 것

**TextEditor는 Tiptap 기반 리치 텍스트 에디터 컴포넌트입니다:**
- WYSIWYG 편집 기능 (Bold, Italic, Lists, Links, Images)
- 글자 수 제한 (Character Count)
- 툴바 (Formatting Toolbar)
- 라벨 및 힌트 텍스트
- 플레이스홀더 지원
- 비활성화 및 에러 상태
- 키보드 단축키 (Cmd+K for links)

---

## 📊 구현 범위

### 1. Compound Components (6가지)

| Component | Description |
|-----------|-------------|
| `TextEditor.Root` | 메인 에디터 래퍼 및 Context Provider |
| `TextEditor.Label` | 에디터 라벨 |
| `TextEditor.Toolbar` | 포맷팅 툴바 (Bold, Italic, Lists, Align, Link, Image) |
| `TextEditor.Content` | 실제 에디터 콘텐츠 영역 |
| `TextEditor.HintText` | 힌트 텍스트 및 글자 수 표시 |
| `TextEditor.Tooltip` | 툴바 버튼 툴팁 |

### 2. Props (TextEditor.Root)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isDisabled` | `boolean` | `false` | 에디터 비활성화 |
| `isInvalid` | `boolean` | `false` | 에러 상태 표시 |
| `limit` | `number` | `undefined` | 글자 수 제한 |
| `placeholder` | `string` | `"Write something..."` | 빈 에디터 플레이스홀더 |
| `className` | `string` | - | 루트 컨테이너 CSS 클래스 |
| `inputClassName` | `string` | - | 에디터 입력 영역 CSS 클래스 |
| `content` | `string` | - | 초기 HTML 콘텐츠 |
| `onUpdate` | `function` | - | 에디터 업데이트 콜백 |

### 3. States (3가지)

| State | Description |
|-------|-------------|
| `Default` | 기본 활성 상태 |
| `Disabled` | 비활성화 (읽기 전용) |
| `Invalid` | 에러 상태 (빨간 테두리) |

### 4. Features

- **Rich Text Formatting**:
  - Bold, Italic, Underline
  - Headings (H1, H2, H3)
  - Lists (Bullet, Ordered)
  - Text Alignment (Left, Center, Right)
  - Blockquotes
  - Links (Cmd+K shortcut)
  - Images

- **Character Count**:
  - `limit` prop으로 글자 수 제한
  - 실시간 남은 글자 수 표시
  - 초과 시 에러 상태

- **Accessibility**:
  - aria-labelledby로 라벨 연결
  - aria-describedby로 힌트 텍스트 연결
  - 키보드 네비게이션 지원

---

## ⚙️ 기술 요구사항

- TypeScript strict mode 준수
- Tiptap React Editor v2 사용
- Tiptap Extensions:
  - StarterKit (기본 포맷팅)
  - TextAlign (텍스트 정렬)
  - Image (이미지 삽입)
  - Placeholder (플레이스홀더)
  - CharacterCount (글자 수)
- React 18 기능 활용 (useEditor, useContext)
- 접근성 (a11y) 검증 포함

---

## 🛠️ 구현 요구사항

### Storybook 구조

```typescript
// index.stories.tsx 구조
import type { Meta, StoryObj } from '@storybook/nextjs';
import { TextEditor } from './index';

const meta: Meta<typeof TextEditor.Root> = {
  title: 'Commons/Components/TextEditor',
  component: TextEditor.Root,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: { /* ... */ },
};

export default meta;
type Story = StoryObj<typeof TextEditor.Root>;
```

### 필수 Stories (14개)

1. **Default** - 기본 에디터 (라벨 + 툴바 + 콘텐츠 + 힌트)
2. **WithPlaceholder** - 커스텀 플레이스홀더
3. **WithCharacterLimit** - 글자 수 제한 (100자, 500자)
4. **WithHintText** - 커스텀 힌트 텍스트
5. **DisabledState** - 비활성화 상태
6. **InvalidState** - 에러 상태
7. **WithoutToolbar** - 툴바 없는 간단한 에디터
8. **WithoutLabel** - 라벨 없는 에디터
9. **ControlledEditor** - 제어 컴포넌트 (useState)
10. **DifferentSizes** - 다양한 크기 (400px, 600px, 800px)
11. **PrefilledContent** - 미리 채워진 HTML 콘텐츠
12. **FormIntegration** - 폼 통합 예시
13. **UseCases** - 실제 사용 예시 (Blog, Comment, Product Description)
14. **Playground** - 모든 props 조작 가능

### 구현 예시

```typescript
// 1. Default
export const Default: Story = {
  render: () => (
    <div className="w-[600px]">
      <TextEditor.Root>
        <TextEditor.Label>Description</TextEditor.Label>
        <TextEditor.Toolbar />
        <TextEditor.Content />
        <TextEditor.HintText />
      </TextEditor.Root>
    </div>
  ),
};

// 3. WithCharacterLimit
export const WithCharacterLimit: Story = {
  render: () => (
    <div className="w-[600px]">
      <TextEditor.Root limit={100} placeholder="Enter up to 100 characters...">
        <TextEditor.Label>Short Description</TextEditor.Label>
        <TextEditor.Toolbar />
        <TextEditor.Content />
        <TextEditor.HintText />
      </TextEditor.Root>
    </div>
  ),
};

// 9. ControlledEditor
export const ControlledEditor: Story = {
  render: () => {
    const [content, setContent] = useState('<p>Initial content</p>');

    return (
      <div className="w-[600px] space-y-4">
        <TextEditor.Root
          content={content}
          onUpdate={({ editor }) => {
            setContent(editor.getHTML());
          }}
        >
          <TextEditor.Label>Controlled Editor</TextEditor.Label>
          <TextEditor.Toolbar />
          <TextEditor.Content />
          <TextEditor.HintText />
        </TextEditor.Root>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-semibold mb-2">HTML Output:</h4>
          <pre className="text-xs overflow-auto">{content}</pre>
        </div>
      </div>
    );
  },
};
```

---

## ✅ 검증 체크리스트

### 기능 검증

- [ ] 기본 에디터 렌더링 (라벨 + 툴바 + 콘텐츠 + 힌트)
- [ ] 리치 텍스트 포맷팅 동작 (Bold, Italic, Lists, Links)
- [ ] 글자 수 제한 및 남은 글자 수 표시
- [ ] 플레이스홀더 표시 확인
- [ ] 비활성화 상태에서 편집 불가
- [ ] 에러 상태 시 빨간 테두리 표시
- [ ] 툴바 버튼 클릭 시 포맷 적용
- [ ] 키보드 단축키 동작 (Cmd+K for links)
- [ ] 이미지 삽입 기능
- [ ] 제어 컴포넌트로 HTML 출력 확인

### Storybook 통합

- [ ] Controls 패널에서 모든 props 조작 가능
  - isDisabled: boolean
  - isInvalid: boolean
  - limit: number
  - placeholder: string
  - className: string
  - inputClassName: string
- [ ] A11y 애드온 경고 없음
- [ ] 각 Story가 의미있는 이름과 설명 포함

### 접근성 검증

- [ ] 라벨이 aria-labelledby로 에디터와 연결
- [ ] 힌트 텍스트가 aria-describedby로 연결
- [ ] 키보드 네비게이션 지원 (Tab, Enter, Cmd+K)
- [ ] 툴바 버튼에 aria-label 설정
- [ ] Focus ring 표시 확인

### 타입 안전성

- [ ] TypeScript strict mode 에러 없음
- [ ] TextEditorRootProps 타입 정상 동작
- [ ] Tiptap Editor 타입 정상 동작
- [ ] useEditorContext hook 타입 안전성 확인

### 실전 사용성

- [ ] UseCases Story가 실제 사용 패턴 시연
  - Blog Post Editor
  - Comment Box
  - Product Description
- [ ] FormIntegration Story가 폼 통합 예시 제공
- [ ] 각 패턴이 프로젝트에서 바로 복사 가능

---

## 🎨 TextEditor 컴포넌트 특징

### 1. Compound Component Pattern

TextEditor는 여러 하위 컴포넌트를 조합하여 사용하는 복합 컴포넌트입니다:

```typescript
<TextEditor.Root>
  <TextEditor.Label>Label</TextEditor.Label>
  <TextEditor.Toolbar />
  <TextEditor.Content />
  <TextEditor.HintText />
</TextEditor.Root>
```

### 2. Tiptap Extensions

다양한 Tiptap 확장을 사용하여 리치 텍스트 편집 기능을 제공합니다:
- **StarterKit**: 기본 포맷팅 (Bold, Italic, Lists, Headings)
- **TextAlign**: 텍스트 정렬 (Left, Center, Right)
- **Image**: 이미지 삽입
- **Placeholder**: 빈 에디터 플레이스홀더
- **CharacterCount**: 글자 수 계산

### 3. Context API

`EditorContext`를 사용하여 하위 컴포넌트 간 에디터 상태를 공유합니다:

```typescript
const EditorContext = createContext<EditorContextType | null>(null);

export const useEditorContext = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useEditorContext must be used within a EditorProvider");
  }
  return context;
};
```

### 4. Character Count

`limit` prop과 `CharacterCount` 확장을 사용하여 글자 수 제한 기능을 제공합니다:

```typescript
const charactersLeft = typeof limit === "number"
  ? limit - editor.storage?.characterCount?.characters()
  : 0;
const exceedsLimit = charactersLeft < 0;
```

---

## 💡 사용 예시

### 기본 에디터

```typescript
<TextEditor.Root>
  <TextEditor.Label>Description</TextEditor.Label>
  <TextEditor.Toolbar />
  <TextEditor.Content />
  <TextEditor.HintText />
</TextEditor.Root>
```

### 글자 수 제한

```typescript
<TextEditor.Root limit={500}>
  <TextEditor.Label>Bio</TextEditor.Label>
  <TextEditor.Toolbar />
  <TextEditor.Content />
  <TextEditor.HintText />
</TextEditor.Root>
```

### 비활성화 상태

```typescript
<TextEditor.Root isDisabled>
  <TextEditor.Label>Read-only Content</TextEditor.Label>
  <TextEditor.Toolbar />
  <TextEditor.Content />
</TextEditor.Root>
```

### 에러 상태

```typescript
<TextEditor.Root isInvalid>
  <TextEditor.Label>Invalid Content</TextEditor.Label>
  <TextEditor.Toolbar />
  <TextEditor.Content />
  <TextEditor.HintText>Please fix the errors above</TextEditor.HintText>
</TextEditor.Root>
```

### 제어 컴포넌트

```typescript
const [content, setContent] = useState('<p>Initial content</p>');

<TextEditor.Root
  content={content}
  onUpdate={({ editor }) => {
    setContent(editor.getHTML());
  }}
>
  <TextEditor.Label>Controlled Editor</TextEditor.Label>
  <TextEditor.Toolbar />
  <TextEditor.Content />
  <TextEditor.HintText />
</TextEditor.Root>
```

### 미리 채워진 콘텐츠

```typescript
<TextEditor.Root
  content={`
    <h2>Welcome</h2>
    <p>This is <strong>pre-filled</strong> content.</p>
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
    </ul>
  `}
>
  <TextEditor.Label>Article</TextEditor.Label>
  <TextEditor.Toolbar />
  <TextEditor.Content />
</TextEditor.Root>
```

---

## 🔧 Tiptap Extensions 설정

### StarterKit 설정

```typescript
StarterKit.configure({
  blockquote: {
    HTMLAttributes: {
      class: "my-3.5 border-l-4 border-secondary pl-4",
    },
  },
  bulletList: {
    HTMLAttributes: {
      class: "list-disc ml-7",
    },
  },
  orderedList: {
    HTMLAttributes: {
      class: "list-decimal ml-7",
    },
  },
  link: {
    openOnClick: false,
    autolink: true,
    defaultProtocol: "https",
    HTMLAttributes: {
      class: "text-primary underline",
    },
  },
})
```

### TextAlign 설정

```typescript
TextAlign.configure({
  types: ["heading", "paragraph"],
})
```

### Image 설정

```typescript
Image.configure({
  HTMLAttributes: {
    class: "my-3",
  },
})
```

### Placeholder 설정

```typescript
Placeholder.configure({
  placeholder: ({ node }) => {
    if (node.type.name === "bulletList" || node.type.name === "orderedList") return "";
    return placeholder;
  },
  emptyEditorClass:
    "first:before:text-placeholder first:before:float-left first:before:content-[attr(data-placeholder)] first:before:pointer-events-none first:before:absolute",
})
```

---

**구현 완료 후 위 체크리스트를 모두 검증하고 결과를 반환하세요!**
