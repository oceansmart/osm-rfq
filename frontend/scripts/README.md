# Mock 일기 데이터 설정 가이드

로컬스토리지에 테스트용 일기 데이터를 생성하는 스크립트입니다.

---

## 📊 생성되는 데이터

- **총 개수**: 36개
- **페이지당 표시**: 12개 (3행 4열)
- **예상 페이지 수**: 3페이지
- **감정 타입**: HAPPY, SAD, ANGRY, SURPRISE (순환)

### 데이터 포맷

```typescript
interface DiaryCardData {
  id: number;
  title: string;
  content: string;
  emotion: 'HAPPY' | 'SAD' | 'ANGRY' | 'SURPRISE' | 'ETC';
  createdAt: string; // ISO 8601 형식
}
```

### 예시 데이터

```json
[
  {
    "id": 1,
    "title": "행복한 하루 1",
    "content": "오늘은 정말 행복한 날이었다 (일기 번호: 1)",
    "emotion": "HAPPY",
    "createdAt": "2025-11-17T00:00:00.000Z"
  },
  {
    "id": 2,
    "title": "슬픈 하루 2",
    "content": "슬픈 일이 있었다 (일기 번호: 2)",
    "emotion": "SAD",
    "createdAt": "2025-11-16T00:00:00.000Z"
  }
]
```

---

## 🚀 사용 방법

### 방법 1: HTML 파일 실행 (추천)

가장 간단하고 직관적인 방법입니다.

1. **파일 열기**
   ```bash
   open scripts/setup-mock-diaries.html
   ```

   또는 브라우저에서 직접 파일 열기:
   - Chrome/Edge: `Cmd+O` (Mac) 또는 `Ctrl+O` (Windows)
   - 파일 선택: `scripts/setup-mock-diaries.html`

2. **버튼 클릭**
   - 🚀 **Mock 데이터 생성 및 저장**: 36개 데이터 생성
   - 📖 **현재 데이터 조회**: 저장된 데이터 확인
   - 🗑️ **데이터 삭제**: 모든 데이터 삭제

3. **페이지 새로고침**
   ```
   http://localhost:3000/diaries
   ```

### 방법 2: 브라우저 콘솔에서 실행

개발 서버가 실행 중일 때 사용합니다.

1. **개발 서버 실행**
   ```bash
   npm run dev
   ```

2. **브라우저에서 페이지 열기**
   ```
   http://localhost:3000/diaries
   ```

3. **개발자 도구 열기**
   - Chrome/Edge: `F12` 또는 `Cmd+Option+I` (Mac)
   - Safari: `Cmd+Option+C` (Mac, 개발자 메뉴 활성화 필요)

4. **콘솔 탭에서 스크립트 복사 & 붙여넣기**

   ```javascript
   // Emotion Enum
   const Emotion = {
     HAPPY: 'HAPPY',
     SAD: 'SAD',
     ANGRY: 'ANGRY',
     SURPRISE: 'SURPRISE',
     ETC: 'ETC',
   };

   // Mock 데이터 생성 함수
   function generateMockDiaries(count = 36) {
     const emotions = [Emotion.HAPPY, Emotion.SAD, Emotion.ANGRY, Emotion.SURPRISE];
     const titles = {
       HAPPY: ['행복한 하루', '즐거운 주말', '기쁜 소식', '행복한 순간', '웃음 가득한 날', '즐거운 여행', '행복한 만남', '기분 좋은 아침', '즐거운 저녁'],
       SAD: ['슬픈 하루', '우울한 날', '슬픈 이야기', '눈물의 기록', '아쉬운 순간', '슬픈 추억', '우울한 저녁', '슬픈 기억', '아픈 마음'],
       ANGRY: ['화나는 일', '짜증나는 하루', '분노의 기록', '화가 난 순간', '억울한 일', '짜증나는 상황', '화난 하루', '분한 마음', '속상한 일'],
       SURPRISE: ['놀라운 발견', '깜짝 놀란 일', '예상치 못한 일', '놀라운 소식', '깜짝 이벤트', '놀라운 순간', '예기치 않은 만남', '놀라운 경험', '깜짝 선물'],
     };
     const contents = {
       HAPPY: ['오늘은 정말 행복한 날이었다', '좋은 일이 가득한 하루였다', '기분이 너무 좋았다', '행복한 시간을 보냈다', '즐거운 경험을 했다'],
       SAD: ['슬픈 일이 있었다', '우울한 기분이었다', '마음이 아팠다', '슬픈 일을 겪었다', '눈물이 났다'],
       ANGRY: ['오늘 화가 났다', '짜증나는 일이 있었다', '화가 나서 참기 힘들었다', '분한 일을 겪었다', '속상한 일이 있었다'],
       SURPRISE: ['놀라운 일이 생겼다', '깜짝 놀랐다', '예상치 못한 일이 일어났다', '놀라운 경험을 했다', '정말 놀라웠다'],
     };
     const diaries = [];
     const today = new Date();
     for (let i = 1; i <= count; i++) {
       const emotion = emotions[(i - 1) % emotions.length];
       const titleList = titles[emotion];
       const contentList = contents[emotion];
       const title = titleList[(i - 1) % titleList.length];
       const content = contentList[(i - 1) % contentList.length];
       const createdDate = new Date(today);
       createdDate.setDate(today.getDate() - (i - 1));
       diaries.push({
         id: i,
         title: `${title} ${i}`,
         content: `${content} (일기 번호: ${i})`,
         emotion: emotion,
         createdAt: createdDate.toISOString(),
       });
     }
     return diaries;
   }

   // 실행
   const mockDiaries = generateMockDiaries(36);
   localStorage.setItem('diaries', JSON.stringify(mockDiaries));
   console.log(`✅ ${mockDiaries.length}개의 일기 데이터가 저장되었습니다.`);
   console.table(mockDiaries.slice(0, 5));
   ```

5. **페이지 새로고침**
   ```
   F5 또는 Cmd+R
   ```

### 방법 3: JavaScript 파일 로드 (Node.js)

서버 사이드에서 사용할 경우 (권장하지 않음, 브라우저 사용 권장)

```javascript
const {
  generateMockDiaries,
  saveDiariesToLocalStorage,
} = require('./scripts/setup-mock-diaries.js');

const mockDiaries = generateMockDiaries(36);
console.log(mockDiaries);
```

---

## 📋 주요 함수

### `generateMockDiaries(count)`

Mock 일기 데이터를 생성합니다.

**파라미터**:
- `count` (number): 생성할 데이터 개수 (기본값: 36)

**반환값**:
- `DiaryCardData[]`: 일기 데이터 배열

**예시**:
```javascript
const diaries = generateMockDiaries(50); // 50개 생성
```

### `saveDiariesToLocalStorage(diaries)`

로컬스토리지에 일기 데이터를 저장합니다.

**파라미터**:
- `diaries` (DiaryCardData[]): 저장할 일기 데이터 배열

**반환값**:
- `boolean`: 성공 여부

**예시**:
```javascript
const diaries = generateMockDiaries(36);
saveDiariesToLocalStorage(diaries);
```

### `getDiariesFromLocalStorage()`

로컬스토리지에서 일기 데이터를 조회합니다.

**반환값**:
- `DiaryCardData[]`: 저장된 일기 데이터 배열

**예시**:
```javascript
const diaries = getDiariesFromLocalStorage();
console.table(diaries);
```

### `clearDiariesFromLocalStorage()`

로컬스토리지의 일기 데이터를 삭제합니다.

**예시**:
```javascript
clearDiariesFromLocalStorage();
```

---

## 🧪 테스트용 데이터 커스터마이징

### 데이터 개수 변경

```javascript
// 50개 생성 (약 5페이지)
const diaries = generateMockDiaries(50);
localStorage.setItem('diaries', JSON.stringify(diaries));
```

### 특정 감정만 생성

```javascript
function generateHappyDiaries(count) {
  const diaries = [];
  const today = new Date();

  for (let i = 1; i <= count; i++) {
    const createdDate = new Date(today);
    createdDate.setDate(today.getDate() - (i - 1));

    diaries.push({
      id: i,
      title: `행복한 하루 ${i}`,
      content: `오늘은 정말 행복한 날이었다 (일기 번호: ${i})`,
      emotion: 'HAPPY',
      createdAt: createdDate.toISOString(),
    });
  }

  return diaries;
}

const happyDiaries = generateHappyDiaries(12);
localStorage.setItem('diaries', JSON.stringify(happyDiaries));
```

### 검색 테스트용 데이터

```javascript
const searchTestDiaries = [
  {
    id: 1,
    title: '행복한 하루',
    content: '오늘은 정말 행복했다',
    emotion: 'HAPPY',
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: '행복한 주말',
    content: '주말이 행복했다',
    emotion: 'HAPPY',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 3,
    title: '슬픈 하루',
    content: '오늘은 슬펐다',
    emotion: 'SAD',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
];

localStorage.setItem('diaries', JSON.stringify(searchTestDiaries));
```

---

## 🔍 디버깅

### 데이터 확인

```javascript
// 콘솔에서 실행
const data = localStorage.getItem('diaries');
console.log(JSON.parse(data));
```

### 데이터 개수 확인

```javascript
const data = localStorage.getItem('diaries');
const diaries = JSON.parse(data);
console.log(`총 ${diaries.length}개의 일기가 저장되어 있습니다.`);
```

### 로컬스토리지 전체 삭제

```javascript
localStorage.clear();
console.log('로컬스토리지가 모두 삭제되었습니다.');
```

---

## 📌 주의사항

1. **브라우저 제한**
   - 로컬스토리지는 도메인당 약 5-10MB 제한이 있습니다
   - 너무 많은 데이터 생성 시 브라우저가 느려질 수 있습니다

2. **데이터 영구성**
   - 로컬스토리지 데이터는 브라우저를 닫아도 유지됩니다
   - 브라우저 캐시를 지우면 데이터가 삭제됩니다

3. **개발 환경**
   - `http://localhost:3000`과 `http://127.0.0.1:3000`은 다른 도메인으로 취급됩니다
   - 같은 URL을 사용해야 데이터를 공유할 수 있습니다

4. **날짜 형식**
   - `createdAt`은 ISO 8601 형식을 사용합니다
   - 예: `2025-11-17T00:00:00.000Z`

---

## 🎯 페이지네이션 테스트 시나리오

### 시나리오 1: 기본 페이지네이션 (36개 데이터)

```javascript
const diaries = generateMockDiaries(36);
localStorage.setItem('diaries', JSON.stringify(diaries));
```

- 페이지 1: 1~12번 일기
- 페이지 2: 13~24번 일기
- 페이지 3: 25~36번 일기

### 시나리오 2: 4페이지 생성 (48개 데이터)

```javascript
const diaries = generateMockDiaries(48);
localStorage.setItem('diaries', JSON.stringify(diaries));
```

- 페이지 1~3: 각 12개
- 페이지 4: 12개

### 시나리오 3: 마지막 페이지 부분 채움 (38개 데이터)

```javascript
const diaries = generateMockDiaries(38);
localStorage.setItem('diaries', JSON.stringify(diaries));
```

- 페이지 1~3: 각 12개
- 페이지 4: 2개

---

## 🤝 문제 해결

### Q: 데이터가 표시되지 않아요

**A**: 다음을 확인하세요:
1. 페이지를 새로고침했나요? (F5 또는 Cmd+R)
2. 올바른 URL에 접속했나요? (`http://localhost:3000/diaries`)
3. 개발 서버가 실행 중인가요? (`npm run dev`)

### Q: 페이지 번호가 표시되지 않아요

**A**:
1. 최소 13개 이상의 데이터가 있어야 2페이지가 표시됩니다
2. 36개 데이터로 3페이지 테스트를 권장합니다

### Q: 데이터를 삭제하고 싶어요

**A**:
1. HTML 파일에서 "🗑️ 데이터 삭제" 버튼 클릭
2. 또는 콘솔에서 `localStorage.removeItem('diaries')` 실행

---

## 📚 관련 문서

- [페이지네이션 구현 가이드](../docs/diaries-pagination-implementation-guide.md)
- [일기 데이터 구조](../src/components/diaries/hooks/index.binding.hook.ts)
- [Emotion Enum](../src/commons/constants/enum.ts)

---

## 📝 변경 이력

- **2025-11-17**: 초안 작성
  - Mock 데이터 생성 스크립트 작성
  - HTML UI 도구 추가
  - 사용 가이드 문서 작성
