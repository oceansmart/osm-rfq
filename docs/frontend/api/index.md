# Frontend API 연동

OSM RFQ Frontend에서 Backend API와 통신하는 방법을 안내합니다.

## 🔗 API 클라이언트

TanStack Query (React Query)를 사용하여 API 통신을 관리합니다.

## 📝 설정

### 1. 환경 변수

`.env.local` 파일에 API URL을 설정합니다:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 2. API 클라이언트 설정

```typescript
// src/commons/api/client.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiClient = {
  get: async <T>(endpoint: string): Promise<T> => {
    const response = await fetch(`${API_URL}${endpoint}`);
    if (!response.ok) throw new Error('API Error');
    return response.json();
  },

  post: async <T>(endpoint: string, data: unknown): Promise<T> => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('API Error');
    return response.json();
  },
};
```

## 🎯 React Query 사용

### 데이터 조회 (GET)

```typescript
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/commons/api/client';

interface User {
  id: string;
  name: string;
  email: string;
}

export function useUsers() {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => apiClient.get<User[]>('/api/users'),
  });
}

// 컴포넌트에서 사용
function UserList() {
  const { data: users, isLoading, error } = useUsers();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {users?.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### 데이터 변경 (POST, PUT, DELETE)

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/commons/api/client';

interface CreateUserInput {
  name: string;
  email: string;
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserInput) =>
      apiClient.post<User>('/api/users', data),
    onSuccess: () => {
      // 사용자 목록 갱신
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}

// 컴포넌트에서 사용
function CreateUserForm() {
  const createUser = useCreateUser();

  const handleSubmit = (data: CreateUserInput) => {
    createUser.mutate(data, {
      onSuccess: () => {
        alert('사용자가 생성되었습니다!');
      },
      onError: (error) => {
        alert(`오류: ${error.message}`);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* 폼 필드 */}
    </form>
  );
}
```

## 📚 API 엔드포인트

향후 Backend API 문서에서 제공될 예정입니다.

### 예상 엔드포인트

- `GET /api/users` - 사용자 목록 조회
- `GET /api/users/:id` - 특정 사용자 조회
- `POST /api/users` - 사용자 생성
- `PUT /api/users/:id` - 사용자 수정
- `DELETE /api/users/:id` - 사용자 삭제

## 🔐 인증

향후 인증 시스템 구현 시 추가될 예정입니다.

```typescript
// 예상 구조
const token = localStorage.getItem('auth_token');

const response = await fetch(`${API_URL}${endpoint}`, {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});
```

## 🛠️ 에러 처리

```typescript
import { useQuery } from '@tanstack/react-query';

function MyComponent() {
  const { data, error, isError } = useQuery({
    queryKey: ['data'],
    queryFn: fetchData,
    retry: 3, // 실패 시 3번 재시도
    retryDelay: 1000, // 1초 대기
  });

  if (isError) {
    return <ErrorMessage error={error} />;
  }

  return <div>{/* 정상 렌더링 */}</div>;
}
```

## 📖 더 알아보기

- [TanStack Query 문서](https://tanstack.com/query/latest)
- [Backend API 문서](../../backend/api/index.md)
