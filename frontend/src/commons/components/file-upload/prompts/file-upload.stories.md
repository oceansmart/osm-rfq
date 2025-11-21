# FileUpload Component Storybook Stories 구현 가이드

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
참고할 TSX 파일경로: frontend/src/commons/components/file-upload/index.tsx
구현될 STORIES 파일경로: frontend/src/commons/components/file-upload/index.stories.tsx
```

---

## 🎯 핵심요구사항

### FileUpload 컴포넌트의 모든 variants를 Storybook Stories로 구현할 것

---

## 📊 구현 범위

### 1. Compound Components (5가지)

- `FileUpload.Root` - 컨테이너
- `FileUpload.DropZone` - 드래그 앤 드롭 영역
- `FileUpload.List` - 파일 목록 컨테이너
- `FileUpload.ListItemProgressBar` - 프로그레스 바 스타일
- `FileUpload.ListItemProgressFill` - 프로그레스 필 스타일

### 2. DropZone Variants

| Variant | Props | Description |
|---------|-------|-------------|
| Default | `allowsMultiple={true}` | 여러 파일 업로드 |
| Single File | `allowsMultiple={false}` | 단일 파일만 허용 |
| Images Only | `accept="image/*"` | 이미지 파일만 허용 |
| PDFs Only | `accept=".pdf"` | PDF 파일만 허용 |
| Disabled | `isDisabled={true}` | 업로드 비활성화 |

### 3. Upload States (3가지)

- **Uploading** - 진행 중 (progress: 1-99%)
- **Complete** - 업로드 완료 (progress: 100%)
- **Failed** - 업로드 실패 (failed: true)

### 4. File Types

**Documents:**
- PDF, DOCX, XLSX

**Images:**
- JPG, PNG, SVG

**Media:**
- MP4, MP3

### 5. Progress Variants (2가지)

- **Progress Bar** - `FileListItemProgressBar` (default variant)
- **Progress Fill** - `FileListItemProgressFill` (solid variant)

---

## ⚙️ 기술 요구사항

- TypeScript strict mode 준수
- File validation 로직 구현 (accept, maxSize)
- Drag & Drop API 활용
- Motion/React 애니메이션 통합 (AnimatePresence)
- Untitled UI 디자인 토큰 활용
- 접근성 (a11y) 검증 포함
  - File input keyboard support
  - Screen reader announcements
  - ARIA attributes (aria-valuenow, aria-valuemin, aria-valuemax)

---

## 🛠️ 구현 요구사항

### Storybook 구조

```typescript
// index.stories.tsx 구조
import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import {
  FileUpload,
  FileUploadDropZone,
  FileListItemProgressBar,
  FileListItemProgressFill,
} from './index';

const meta: Meta<typeof FileUploadDropZone> = {
  title: 'Commons/Components/FileUpload',
  component: FileUploadDropZone,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    hint: { control: 'text' },
    isDisabled: { control: 'boolean' },
    accept: { control: 'text' },
    allowsMultiple: { control: 'boolean' },
    maxSize: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof FileUploadDropZone>;

// Stories...
```

### 필수 Stories

1. **Default** - 기본 드롭존
2. **CompleteUploadFlowProgressBar** - 드롭존 + 파일 목록 (Progress Bar)
3. **CompleteUploadFlowProgressFill** - 드롭존 + 파일 목록 (Progress Fill)
4. **FileUploadStatesProgressBar** - 업로드 중/완료/실패 (Progress Bar)
5. **FileUploadStatesProgressFill** - 업로드 중/완료/실패 (Progress Fill)
6. **FileTypes** - 다양한 파일 타입 (PDF, DOCX, PNG, JPG, MP4)
7. **DropZoneVariants** - 드롭존 variants (Single/Multiple, Accept, Disabled)
8. **ProgressBarVsProgressFill** - 두 가지 프로그레스 스타일 비교
9. **Playground** - 모든 props 조작 가능

---

## ✅ 검증 체크리스트

### 기능 검증
- [ ] DropZone 드래그 앤 드롭 동작 확인
- [ ] 파일 선택 (Click to upload) 동작 확인
- [ ] Multiple files 업로드 확인
- [ ] Single file 제한 확인
- [ ] File type validation (accept prop) 확인
- [ ] File size validation (maxSize prop) 확인
- [ ] Progress Bar 애니메이션 확인
- [ ] Progress Fill 애니메이션 확인
- [ ] Delete 버튼 동작 확인
- [ ] Retry 버튼 동작 확인 (실패 시)
- [ ] Disabled state 스타일 적용 확인

### Storybook 통합
- [ ] Controls 패널에서 모든 props 조작 가능
- [ ] Args 기반 스토리 구성
- [ ] A11y 애드온 경고 없음
- [ ] File icon 렌더링 확인 (@untitledui/file-icons)

### 타입 안전성
- [ ] TypeScript strict mode 에러 없음
- [ ] Props 자동완성 동작
- [ ] FileListItemProps 타입 정확히 처리

### 접근성
- [ ] File input 키보드 지원 (Tab, Enter)
- [ ] Screen reader 파일명 읽기
- [ ] ARIA progressbar 속성 적용
- [ ] Disabled state ARIA 처리

---

## 🎨 디자인 토큰 참조

### FileUpload 컴포넌트가 사용하는 토큰

**DropZone:**
- `bg-primary` - 드롭존 배경
- `ring-secondary` - 기본 테두리
- `ring-brand` - 드래그 오버 시 테두리
- `ring-disabled_subtle` - 비활성화 상태

**Progress:**
- `bg-secondary` - 프로그레스 필 배경
- `text-success-primary` - 완료 상태 색상
- `text-error-primary` - 실패 상태 색상
- `text-quaternary` - 업로드 중 색상

---

## 📚 참고 문서

- [FileUpload Component Source](../index.tsx)
- [Untitled UI PRO Commons Guide](../../../../../../docs/frontend/untitled-ui-pro-commons-guide.md)
- [Foundation Token Override Guide](../../../../../../docs/frontend/foundation-token-override-guide.md)
- [Storybook 공식 문서](https://storybook.js.org/docs/react/writing-stories/introduction)
- [File API MDN](https://developer.mozilla.org/en-US/docs/Web/API/File)
- [Drag and Drop API MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)

---

## 🚀 실행 방법

```bash
cd frontend
npm run storybook
# → http://localhost:6006
```

Navigate to: **Commons → Components → FileUpload**

---

## 💡 구현 팁

1. **State 관리 (useState)**
   ```typescript
   const [files, setFiles] = useState<Array<{
     id: string;
     name: string;
     size: number;
     progress: number;
     failed?: boolean;
     type: string;
   }>>([]);
   ```

2. **파일 추가 핸들러**
   ```typescript
   const handleDropFiles = (fileList: FileList) => {
     const newFiles = Array.from(fileList).map((file) => ({
       id: Math.random().toString(36).substr(2, 9),
       name: file.name,
       size: file.size,
       progress: 0,
       type: file.name.split('.').pop() || 'empty',
     }));
     setFiles((prev) => [...prev, ...newFiles]);
   };
   ```

3. **파일 삭제 핸들러**
   ```typescript
   const handleDelete = (id: string) => {
     setFiles((prev) => prev.filter((file) => file.id !== id));
   };
   ```

4. **Progress 시뮬레이션 (선택사항)**
   ```typescript
   useEffect(() => {
     const interval = setInterval(() => {
       setFiles((prev) =>
         prev.map((file) =>
           file.progress < 100
             ? { ...file, progress: Math.min(file.progress + 10, 100) }
             : file
         )
       );
     }, 500);
     return () => clearInterval(interval);
   }, []);
   ```

5. **File Type Mapping**
   ```typescript
   // @untitledui/file-icons 지원 타입
   type: 'pdf' | 'docx' | 'xlsx' | 'png' | 'jpg' | 'svg' | 'mp4' | 'mp3' | 'empty'
   ```

---

## 🔍 특별 고려사항

### Compound Component 패턴

FileUpload는 Compound Component 패턴을 사용하므로, 여러 서브 컴포넌트를 조합하여 사용합니다:

```tsx
<FileUpload.Root>
  <FileUpload.DropZone
    hint="SVG, PNG, JPG or GIF (max. 800x400px)"
    allowsMultiple
    onDropFiles={handleDropFiles}
  />
  <FileUpload.List>
    {files.map((file) => (
      <FileUpload.ListItemProgressBar
        key={file.id}
        name={file.name}
        size={file.size}
        progress={file.progress}
        type={file.type}
        onDelete={() => handleDelete(file.id)}
      />
    ))}
  </FileUpload.List>
</FileUpload.Root>
```

### File Icon Variants

`@untitledui/file-icons`는 2가지 variant를 지원합니다:
- **default** - Progress Bar에서 사용 (투명 배경)
- **solid** - Progress Fill에서 사용 (단색 배경)

```tsx
// Progress Bar
<FileListItemProgressBar fileIconVariant="default" />

// Progress Fill
<FileListItemProgressFill fileIconVariant="solid" />
```

### Animation

`motion/react`의 `AnimatePresence`를 사용하여 파일 목록 추가/삭제 시 부드러운 애니메이션을 제공합니다.

---

**구현 완료 후 체크리스트를 반환하세요!**
