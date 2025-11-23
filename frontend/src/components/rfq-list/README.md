# RFQ List Component

RFQ(Request for Quotation) 목록 테이블 컴포넌트입니다.

## 📁 파일 구조

```
rfq-list/
├── index.tsx           # 메인 컴포넌트
├── styles.module.css   # CSS Modules 스타일
├── types.ts            # TypeScript 타입 정의
├── mockData.ts         # Mock 데이터
├── utils.ts            # 유틸리티 함수
└── README.md           # 문서
```

## 🎨 Figma 디자인

- **Figma 노드**: `227:60760`
- **채널**: `6kxxigzx`
- **크기**: 1591px × 764px

## 📊 데이터 구조

### RfqItem Interface

```typescript
export interface RfqItem {
  id: string;
  rfqId: string;
  receivedDate: string;
  deadline: string;
  shipper: string;
  routeCount: number;
  status: RfqStatus;
  assignedTo: {
    name: string;
    email: string;
    avatar?: string;
  };
  contactPerson: {
    name: string;
    email: string;
    avatar?: string;
  };
}
```

### Status Types

```typescript
type RfqStatus = 'NEW' | 'IN_PROGRESS' | 'PENDING' | 'COMPLETED';
```

## 🎯 Mock 데이터 사용법

### 기본 사용

현재 컴포넌트는 `mockData.ts`의 데이터를 자동으로 사용합니다:

```tsx
import { mockRfqData } from './mockData';

// 컴포넌트 내에서 자동으로 map 렌더링
{mockRfqData.map((item) => (
  <div key={item.id}>...</div>
))}
```

### Mock 데이터 수정

`mockData.ts` 파일을 수정하여 데이터를 추가/변경할 수 있습니다:

```typescript
export const mockRfqData: RfqItem[] = [
  {
    id: '1',
    rfqId: 'RFQ-2025-0001',
    receivedDate: 'Jan 6, 2025',
    deadline: 'Jan 6, 2025',
    shipper: 'Asahi Glass',
    routeCount: 3,
    status: 'NEW',
    assignedTo: {
      name: 'Olivia Rhye',
      email: 'olivia@untitledui.com',
      avatar: '/icons/rfq-list/avatar.svg',
    },
    contactPerson: {
      name: 'Olivia Rhye',
      email: 'olivia@untitledui.com',
    },
  },
  // 추가 데이터...
];
```

### API 연동 준비

실제 API 연동 시:

1. `mockData.ts` import 제거
2. Props로 data 전달하도록 컴포넌트 수정:

```tsx
interface RfqListProps {
  data: RfqItem[];
}

export default function RfqList({ data }: RfqListProps) {
  return (
    // ...
    {data.map((item) => (
      <div key={item.id}>...</div>
    ))}
  );
}
```

## 🎨 Status Badge 색상

각 상태별로 정의된 색상:

| Status | 배경색 | 테두리 | 텍스트 |
|--------|--------|--------|--------|
| NEW | `#ceeff1` | `#abefc6` | `#067647` |
| IN_PROGRESS | `#eff6ff` | `#c2dafe` | `#1570ef` |
| PENDING | `#fffaeb` | `#fedf89` | `#dc6803` |
| COMPLETED | `#ecfdf3` | `#abefc6` | `#079455` |

## 🖼️ 아바타 이미지

아바타 이미지는 `/public/icons/rfq-list/` 경로에 저장:

- `avatar.svg` - 첫 번째 사용자
- `avatar-1.svg` ~ `avatar-5.svg` - 추가 사용자

## 📐 컬럼 정렬

| 컬럼 | 헤더 정렬 | 데이터 정렬 |
|------|-----------|-------------|
| RFQ ID | 좌측 | 좌측 |
| Rec'd Date | 중앙 | 좌측 |
| Deadline | 중앙 | 좌측 |
| Shipper | 중앙 | 좌측 |
| Route | 중앙 | 중앙 |
| Status | 중앙 | 좌측 |
| Assigned To | 중앙 | 좌측 |
| Contact Person | 중앙 | 좌측 |
| Actions | 중앙 | 중앙 |

## 🛠️ 유틸리티 함수

### getStatusText

```typescript
getStatusText('IN_PROGRESS') // 'IN PROGRESS'
```

### formatRouteCount

```typescript
formatRouteCount(1) // '1 route'
formatRouteCount(3) // '3 routes'
```

## 📝 참고사항

- Figma 디자인과 정확히 일치하도록 구현
- CSS Variables (Design Tokens) 사용
- Next.js Image 컴포넌트로 이미지 최적화
- Untitled UI 아이콘 라이브러리 사용
