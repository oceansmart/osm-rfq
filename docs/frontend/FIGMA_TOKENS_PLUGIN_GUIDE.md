# Figma Tokens Plugin 사용 가이드

> **목적**: REST API 없이 JSON 파일로 Figma Variables 자동 생성
> **소요 시간**: 5분
> **비용**: 무료

---

## 📦 준비물

✅ **JSON 파일 준비 완료**: [figma-tokens/primitive-tokens.json](../figma-tokens/primitive-tokens.json)
- Blue 색상 10개
- Neutral 색상 12개
- 총 22개 색상 정의

---

## 🚀 단계별 가이드

### 1단계: Figma Tokens Plugin 설치

1. **Figma 파일 열기**
   - [Larissa_ 파일](https://www.figma.com/design/3DgQpyTIzUmNxaSE0Vq9Ov/Larissa_) 접속

2. **Plugin 설치**
   - 방법 1: Figma 메뉴 → Plugins → Browse plugins in Community
   - 방법 2: 직접 링크 → [Figma Tokens Plugin](https://www.figma.com/community/plugin/843461159747178978/Figma-Tokens)
   - "Install" 버튼 클릭

3. **Plugin 실행**
   - `⌘ + /` (Mac) 또는 `Ctrl + /` (Windows)
   - "Figma Tokens" 검색
   - 플러그인 실행

---

### 2단계: JSON 파일 가져오기

1. **Plugin 창에서 Settings 탭 선택**

2. **"Add new" 클릭**
   - Storage type: "JSON File" 선택

3. **JSON 파일 내용 복사**

   프로젝트 폴더에서 파일 복사:
   ```bash
   # Mac
   cat figma-tokens/primitive-tokens.json | pbcopy

   # 또는 파일 직접 열기
   code figma-tokens/primitive-tokens.json
   ```

4. **JSON 붙여넣기**
   - Plugin 창의 JSON 입력 영역에 붙여넣기
   - "Save" 클릭

---

### 3단계: Variables 생성

1. **Tokens 탭으로 이동**
   - 왼쪽 사이드바에서 "primitive" 폴더 확인
   - "blue" 10개 토큰 표시
   - "neutral" 12개 토큰 표시

2. **Create Variables 클릭**
   - Plugin 하단의 "Create variables" 버튼 클릭
   - 또는 우측 상단 ⋮ 메뉴 → "Create variables"

3. **설정 확인**
   - Collection name: "primitive" (자동)
   - Mode: "Default" (자동)
   - "Create" 버튼 클릭

4. **완료! 🎉**
   - Variables 패널 열기 (우측 패널)
   - "primitive" Collection 확인
   - 22개 Variables 확인

---

## 🎨 생성 결과 확인

### Variables 패널에서 확인

1. **Variables 패널 열기**
   - 우측 패널 → Variables 탭
   - 또는 `⌘ + /` → "Variables"

2. **Primitive Collection 확인**
   ```
   📁 Primitive
   ├── 🔵 primitive/blue/50
   ├── 🔵 primitive/blue/100
   ├── 🔵 primitive/blue/200
   ├── 🔵 primitive/blue/300
   ├── 🔵 primitive/blue/400
   ├── 🔵 primitive/blue/500 (Primary)
   ├── 🔵 primitive/blue/600
   ├── 🔵 primitive/blue/700
   ├── 🔵 primitive/blue/800
   ├── 🔵 primitive/blue/900
   ├── ⚫ primitive/neutral/0 (White)
   ├── ⚫ primitive/neutral/100
   ├── ⚫ primitive/neutral/200
   ├── ⚫ primitive/neutral/300
   ├── ⚫ primitive/neutral/400
   ├── ⚫ primitive/neutral/500
   ├── ⚫ primitive/neutral/600
   ├── ⚫ primitive/neutral/700
   ├── ⚫ primitive/neutral/800
   ├── ⚫ primitive/neutral/900
   ├── ⚫ primitive/neutral/1000
   └── ⚫ primitive/neutral/1100 (Black)
   ```

3. **Variable 사용하기**
   - 아무 레이어 선택
   - Fill 색상 클릭
   - Variables 아이콘 (🔗) 클릭
   - "primitive/blue/500" 선택

---

## 📝 JSON 파일 구조 설명

### 기본 구조

```json
{
  "primitive": {                    // Collection 이름
    "blue": {                        // 카테고리
      "500": {                       // Variable 이름
        "value": "#004FFF",          // 색상 값
        "type": "color",             // 타입
        "description": "Primary"     // 설명 (선택사항)
      }
    }
  }
}
```

### 생성되는 Variable 이름

JSON 경로가 Variable 이름이 됩니다:
- `primitive.blue.500` → `primitive/blue/500`
- `primitive.neutral.0` → `primitive/neutral/0`

---

## 🔄 업데이트 방법

색상 값을 변경하고 싶을 때:

1. **JSON 파일 수정**
   ```json
   "500": {
     "value": "#0050FF",  // 새로운 색상
     "type": "color"
   }
   ```

2. **Plugin에서 다시 가져오기**
   - Figma Tokens Plugin 열기
   - Settings → JSON 업데이트
   - "Update variables" 클릭

3. **자동 동기화**
   - 기존 Variables 자동 업데이트
   - 컴포넌트에 적용된 색상도 자동 변경

---

## 💡 고급 기능

### 1. Alias (참조) 사용

다른 Variable 참조:
```json
{
  "semantic": {
    "primary": {
      "value": "{primitive.blue.500}",  // primitive/blue/500 참조
      "type": "color"
    }
  }
}
```

### 2. 다크 모드 지원

여러 Mode 정의:
```json
{
  "$themes": [
    {
      "id": "light",
      "name": "Light",
      "$figmaStyleReferences": {}
    },
    {
      "id": "dark",
      "name": "Dark",
      "$figmaStyleReferences": {}
    }
  ],
  "semantic": {
    "background": {
      "value": "#FFFFFF",
      "$extensions": {
        "mode": {
          "dark": "#000000"
        }
      },
      "type": "color"
    }
  }
}
```

### 3. GitHub 동기화

Token 파일을 GitHub에 저장하고 자동 동기화:
1. Plugin Settings → Add new
2. Storage type: "GitHub" 선택
3. Repository 연결
4. 자동 동기화 설정

---

## 🎯 다음 단계

Variables 생성이 완료되었으니:

1. ✅ **컴포넌트에 적용**
   - Button, Input 등에 Variables 적용
   - Fill: `primitive/blue/500`
   - Border: `primitive/neutral/300`

2. ✅ **Semantic Collection 생성**
   - Primary, Secondary, Error 등
   - Primitive Variables 참조

3. ✅ **CSS Variables Export**
   - Figma Tokens Plugin의 Export 기능 사용
   - CSS, SCSS, JavaScript 등으로 변환

4. ✅ **React 프로젝트 연동**
   - Export한 CSS Variables 적용
   - Tailwind Config 업데이트

---

## 📚 추가 리소스

- [Figma Tokens 공식 문서](https://docs.tokens.studio/)
- [YouTube 튜토리얼](https://www.youtube.com/watch?v=Ka1I5TphDb0)
- [Design Tokens 가이드](https://www.designtokens.org/)

---

## ⚠️ 주의사항

1. **Variable 이름 변경**
   - Figma에서 직접 Variable 이름 변경 시
   - JSON 파일과 동기화 끊김
   - JSON 파일에서만 수정 권장

2. **중복 생성 방지**
   - 같은 JSON을 여러 번 가져오면 중복 생성
   - 기존 Collection 삭제 후 재생성
   - 또는 "Update" 기능 사용

3. **백업**
   - 중요한 변경 전 Figma 파일 복사본 생성
   - JSON 파일 Git으로 버전 관리

---

**모든 준비가 완료되었습니다!** 🎉

이제 Figma Tokens Plugin을 사용하여 5분 안에 22개 색상 Variables를 생성할 수 있습니다!
