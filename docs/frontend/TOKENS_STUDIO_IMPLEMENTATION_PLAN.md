# Tokens Studio를 활용한 Primitive Variables 생성 작업 계획서

> **목표**: Tokens Studio (Figma Tokens) Plugin을 사용하여 Primitive Collection의 22개 색상을 Figma Variables로 자동 생성
> **소요 시간**: 약 10분
> **난이도**: 쉬움 ⭐⭐☆☆☆

---

## 📋 프로젝트 개요

### 목적
- Primitive Color System (Blue 10개 + Neutral 12개)을 Figma Variables로 자동 생성
- REST API 없이 Plugin을 통한 빠르고 쉬운 구현
- Design Tokens 형식으로 버전 관리 가능

### 현재 상황
- ✅ Figma 파일: [Larissa_](https://www.figma.com/design/3DgQpyTIzUmNxaSE0Vq9Ov/Larissa_)
- ✅ JSON 토큰 파일 준비 완료: [figma-tokens/primitive-tokens.json](../figma-tokens/primitive-tokens.json)
- ⚠️ REST API 접근 불가 (Enterprise 플랜 필요)
- ✅ 대안: Tokens Studio Plugin 사용

---

## 🎯 작업 단계 (5단계)

### 1단계: Tokens Studio Plugin 설치 (2분)

#### 설치 방법

**방법 A: Figma Community에서 설치**
```
1. Figma 열기
2. 좌측 상단 메뉴 → Plugins → Browse plugins in Community
3. "Tokens Studio for Figma" 검색
4. Install 버튼 클릭
```

**방법 B: 직접 링크**
- [Tokens Studio Plugin](https://www.figma.com/community/plugin/843461159747178978/Tokens-Studio-for-Figma)
- "Try it out" 클릭

#### 플러그인 실행
```
1. Figma에서 Larissa_ 파일 열기
2. ⌘ + / (Mac) 또는 Ctrl + / (Windows)
3. "Tokens Studio" 입력
4. 플러그인 실행
```

---

### 2단계: JSON 토큰 파일 준비 확인 (1분)

#### 파일 위치
```
figma-tokens/primitive-tokens.json
```

#### 파일 내용 확인
```bash
# VS Code에서 열기
code figma-tokens/primitive-tokens.json

# 또는 내용 출력
cat figma-tokens/primitive-tokens.json
```

#### JSON 구조 (Design Tokens 표준)
```json
{
  "primitive": {
    "blue": {
      "50": {
        "value": "#E6E8FF",
        "type": "color",
        "description": "Lightest blue shade"
      },
      ...
    },
    "neutral": {
      "0": {
        "value": "#FFFFFF",
        "type": "color",
        "description": "White"
      },
      ...
    }
  }
}
```

---

### 3단계: Tokens Studio에 JSON 가져오기 (3분)

#### 3-1. Settings 탭 이동

Plugin 창에서:
```
1. 좌측 사이드바 → Settings (⚙️) 아이콘 클릭
2. "Add new" 버튼 클릭
```

#### 3-2. Storage 타입 선택

```
Storage 옵션:
- Local document (권장) ✅
- JSONbin
- GitHub
- GitLab
- URL

선택: "Local document"
→ 파일을 Figma 문서 내부에 저장
```

#### 3-3. JSON 파일 내용 복사

**Mac 사용자**:
```bash
# 클립보드로 복사
cat figma-tokens/primitive-tokens.json | pbcopy
```

**Windows 사용자**:
```powershell
# 클립보드로 복사
Get-Content figma-tokens/primitive-tokens.json | Set-Clipboard
```

**또는 수동 복사**:
1. VS Code에서 `figma-tokens/primitive-tokens.json` 열기
2. 전체 선택 (⌘ + A / Ctrl + A)
3. 복사 (⌘ + C / Ctrl + C)

#### 3-4. Plugin에 붙여넣기

```
1. Tokens Studio Plugin → Settings
2. 입력 영역에 JSON 붙여넣기
3. "Save" 버튼 클릭
```

#### 3-5. 확인

```
✅ 성공 시:
- "Tokens loaded successfully" 메시지 표시
- Tokens 탭에 "primitive" 폴더 생성됨
```

---

### 4단계: Figma Variables 생성 (2분)

#### 4-1. Tokens 확인

```
1. Plugin 좌측 사이드바 → Tokens 탭
2. 폴더 구조 확인:
   📁 primitive
   ├── 📁 blue
   │   ├── 50: #E6E8FF
   │   ├── 100: #C0C5FF
   │   ├── ... (총 10개)
   │   └── 900: #0014C4
   └── 📁 neutral
       ├── 0: #FFFFFF
       ├── 100: #F2F8FC
       ├── ... (총 12개)
       └── 1100: #000000
```

#### 4-2. Variables 생성

**방법 A: Create Variables 버튼**
```
1. Plugin 하단의 "Create variables" 버튼 클릭
2. 설정 확인:
   - Create collection: ✅ Yes
   - Collection name: "primitive" (자동)
   - Create modes: Default (자동)
3. "Create" 버튼 클릭
```

**방법 B: 컨텍스트 메뉴**
```
1. "primitive" 폴더 우클릭
2. "Create variables from tokens" 선택
3. 설정 확인 후 "Create" 클릭
```

#### 4-3. 생성 완료 확인

```
✅ 성공 메시지:
"22 variables created successfully in collection 'primitive'"

생성된 Variables:
- Collection: Primitive
- Mode: Default
- Variables: 22개
  • primitive/blue/50
  • primitive/blue/100
  • ... (blue 10개)
  • primitive/neutral/0
  • primitive/neutral/100
  • ... (neutral 12개)
```

---

### 5단계: Variables 확인 및 테스트 (2분)

#### 5-1. Variables 패널 확인

```
1. Figma 우측 패널 → Variables 탭
2. "primitive" Collection 확인
3. 모든 Variables 확인 (22개)
```

#### 5-2. 실제 사용 테스트

**Blue 색상 테스트**:
```
1. Rectangle 생성 (R)
2. Fill 색상 클릭
3. Variables 아이콘 (🔗) 클릭
4. "primitive/blue/500" 선택
5. 결과: #004FFF 색상 적용 ✅
```

**Neutral 색상 테스트**:
```
1. Text 생성 (T)
2. 텍스트 입력: "Hello World"
3. Text color 클릭
4. Variables 아이콘 (🔗) 클릭
5. "primitive/neutral/700" 선택
6. 결과: #5E6366 색상 적용 ✅
```

---

## 📊 JSON 토큰 파일 상세 구조

### Design Tokens 표준 형식

```json
{
  "primitive": {                    // Collection 이름
    "blue": {                        // 카테고리 (그룹)
      "50": {                        // Token 이름
        "value": "#E6E8FF",          // 실제 값
        "type": "color",             // 타입 지정
        "description": "Lightest"    // 설명 (선택)
      }
    }
  }
}
```

### Variable 이름 매핑

Token 경로가 Variable 이름이 됩니다:

| JSON 경로 | Figma Variable 이름 |
|-----------|---------------------|
| `primitive.blue.50` | `primitive/blue/50` |
| `primitive.blue.500` | `primitive/blue/500` |
| `primitive.neutral.0` | `primitive/neutral/0` |
| `primitive.neutral.700` | `primitive/neutral/700` |

### 지원되는 Token 타입

```json
{
  "tokens": {
    "color-token": {
      "value": "#004FFF",
      "type": "color"           // ✅ 색상
    },
    "spacing-token": {
      "value": "16px",
      "type": "spacing"         // ✅ 간격
    },
    "font-size-token": {
      "value": "14px",
      "type": "fontSize"        // ✅ 폰트 크기
    },
    "border-radius-token": {
      "value": "8px",
      "type": "borderRadius"    // ✅ 모서리 반경
    }
  }
}
```

---

## 🔄 Variables 업데이트 방법

### 색상 값 변경 시

#### 1. JSON 파일 수정
```json
{
  "primitive": {
    "blue": {
      "500": {
        "value": "#0050FF",  // 새로운 색상
        "type": "color"
      }
    }
  }
}
```

#### 2. Tokens Studio에서 Reload
```
1. Plugin Settings 탭
2. JSON 다시 복사 & 붙여넣기
3. "Save" 클릭
```

#### 3. Variables 업데이트
```
1. Tokens 탭
2. "Update variables" 버튼 클릭
3. 자동으로 기존 Variables 값 변경됨 ✅
```

#### 4. 자동 반영
```
✅ 컴포넌트에 적용된 색상도 자동 변경!
- Button에 primitive/blue/500 사용 중
→ 자동으로 새 색상 #0050FF 적용
```

---

## 💡 고급 기능

### 1. Alias (참조) 사용

다른 Token을 참조:

```json
{
  "primitive": {
    "blue": {
      "500": {
        "value": "#004FFF",
        "type": "color"
      }
    }
  },
  "semantic": {
    "primary": {
      "value": "{primitive.blue.500}",  // Primitive 참조
      "type": "color"
    },
    "primary-hover": {
      "value": "{primitive.blue.600}",
      "type": "color"
    }
  }
}
```

**생성 결과**:
```
Variables:
- primitive/blue/500 = #004FFF
- semantic/primary = → primitive/blue/500 (Alias)
```

### 2. 다크 모드 지원

여러 Mode 정의:

```json
{
  "$themes": [
    {
      "id": "light",
      "name": "Light Mode",
      "selectedTokenSets": {
        "primitive": "enabled",
        "semantic-light": "enabled"
      }
    },
    {
      "id": "dark",
      "name": "Dark Mode",
      "selectedTokenSets": {
        "primitive": "enabled",
        "semantic-dark": "enabled"
      }
    }
  ],
  "semantic-light": {
    "background": {
      "value": "#FFFFFF",
      "type": "color"
    }
  },
  "semantic-dark": {
    "background": {
      "value": "#000000",
      "type": "color"
    }
  }
}
```

### 3. GitHub 동기화

Token 파일을 GitHub와 자동 동기화:

```
1. Tokens Studio → Settings
2. Storage type: "GitHub" 선택
3. Repository 연결:
   - Repository: your-username/design-tokens
   - Branch: main
   - Path: tokens/
4. Personal Access Token 입력
5. "Save" → 자동 동기화 활성화 ✅
```

**장점**:
- ✅ 팀원과 Token 공유
- ✅ 버전 관리 (Git History)
- ✅ Pull Request로 변경 검토
- ✅ CI/CD 통합 가능

---

## 📋 작업 체크리스트

### ✅ 준비 단계
- [x] Figma 파일 확인 (Larissa_)
- [x] JSON 토큰 파일 생성 완료
- [ ] Tokens Studio Plugin 설치

### ✅ Plugin 설정
- [ ] Tokens Studio 실행
- [ ] Settings → Add new
- [ ] Local document 선택
- [ ] JSON 파일 붙여넣기
- [ ] Save 클릭

### ✅ Variables 생성
- [ ] Tokens 탭에서 primitive 폴더 확인
- [ ] Blue 10개 토큰 확인
- [ ] Neutral 12개 토큰 확인
- [ ] "Create variables" 클릭
- [ ] 22개 Variables 생성 확인

### ✅ 검증
- [ ] Variables 패널에서 Primitive Collection 확인
- [ ] Rectangle에 blue-500 적용 테스트
- [ ] Text에 neutral-700 적용 테스트
- [ ] 모든 Variables 작동 확인

### ✅ 문서화
- [ ] 스크린샷 캡처 (Variables 패널)
- [ ] 팀원에게 공유
- [ ] 사용 가이드 작성

---

## 🚨 트러블슈팅

### 문제 1: Plugin이 JSON을 인식하지 못함

**증상**:
```
❌ "Invalid JSON format" 오류
```

**원인**:
- JSON 문법 오류
- 따옴표 누락
- 쉼표 오류

**해결**:
```bash
# JSON 유효성 검사
cat figma-tokens/primitive-tokens.json | jq .

# 오류가 있으면 수정 위치 표시
```

### 문제 2: Variables가 중복 생성됨

**증상**:
```
⚠️ primitive/blue/500 (1)
⚠️ primitive/blue/500 (2)
```

**원인**:
- "Create variables" 여러 번 클릭

**해결**:
```
1. Figma Variables 패널
2. Primitive Collection 전체 삭제
3. Plugin에서 다시 "Create variables" 클릭
```

### 문제 3: Token 이름이 의도와 다름

**증상**:
```
예상: primitive/blue/500
실제: primitive-blue-500
```

**원인**:
- JSON 구조가 올바르지 않음

**해결**:
```json
// ❌ 잘못된 구조 (배열)
{
  "primitive": [
    { "name": "blue-500", "value": "#004FFF" }
  ]
}

// ✅ 올바른 구조 (중첩 객체)
{
  "primitive": {
    "blue": {
      "500": {
        "value": "#004FFF",
        "type": "color"
      }
    }
  }
}
```

---

## 🎯 다음 단계

Variables 생성 완료 후:

### 1. Semantic Collection 생성
```json
{
  "semantic": {
    "primary": {
      "value": "{primitive.blue.500}",
      "type": "color"
    },
    "text": {
      "primary": {
        "value": "{primitive.neutral.1100}",
        "type": "color"
      },
      "secondary": {
        "value": "{primitive.neutral.700}",
        "type": "color"
      }
    }
  }
}
```

### 2. 컴포넌트에 적용
- Button: primary color
- Input: border color
- Text: text color

### 3. CSS Variables Export
Tokens Studio의 Export 기능 사용:
```
1. Plugin → Settings
2. "Export" 탭
3. Format: "CSS Variables" 선택
4. Export 클릭
```

생성 결과:
```css
:root {
  --primitive-blue-500: #004FFF;
  --primitive-neutral-700: #5E6366;
  /* ... */
}
```

### 4. React 프로젝트 연동
```typescript
// src/styles/tokens.css
@import './generated-tokens.css';

// 사용
.button-primary {
  background-color: var(--primitive-blue-500);
  color: var(--primitive-neutral-0);
}
```

---

## 📚 추가 리소스

### 공식 문서
- [Tokens Studio Docs](https://docs.tokens.studio/)
- [Design Tokens Standard](https://design-tokens.github.io/community-group/)
- [Figma Variables Guide](https://help.figma.com/hc/en-us/articles/15339657135383)

### 비디오 튜토리얼
- [Tokens Studio 시작하기](https://www.youtube.com/watch?v=Ka1I5TphDb0)
- [Variables와 Tokens 연동](https://www.youtube.com/watch?v=2f5qWqbcCNc)

### 커뮤니티
- [Tokens Studio Discord](https://discord.gg/tokens-studio)
- [Figma Community Forum](https://forum.figma.com/)

---

## 📊 작업 타임라인

| 단계 | 작업 | 소요 시간 | 담당 |
|------|------|----------|------|
| 1 | Plugin 설치 | 2분 | 개발자 |
| 2 | JSON 파일 확인 | 1분 | 개발자 |
| 3 | Token 가져오기 | 3분 | 개발자 |
| 4 | Variables 생성 | 2분 | 개발자 |
| 5 | 검증 및 테스트 | 2분 | 개발자 |
| **총계** | | **10분** | |

---

## ✅ 성공 기준

작업 완료 조건:

1. ✅ Tokens Studio Plugin 설치 완료
2. ✅ JSON 토큰 파일이 Plugin에 로드됨
3. ✅ Figma Variables 패널에 "Primitive" Collection 생성
4. ✅ 22개 Variables 모두 생성 확인:
   - Blue: 10개 (50-900)
   - Neutral: 12개 (0-1100)
5. ✅ 실제 컴포넌트에 Variables 적용 가능
6. ✅ 색상 값이 올바르게 표시됨

---

## 🎉 결론

**Tokens Studio를 사용한 Variables 생성의 장점**:

| 항목 | REST API | Tokens Studio |
|------|----------|---------------|
| 난이도 | 어려움 | ✅ 쉬움 |
| 소요 시간 | 환경 설정 포함 30분 | ✅ 10분 |
| Enterprise 플랜 | 필요 | ✅ 불필요 (무료) |
| 버전 관리 | Git | ✅ Git + GitHub 연동 |
| 업데이트 | 스크립트 재실행 | ✅ Plugin에서 Update |
| 팀 협업 | 코드 공유 | ✅ GitHub 동기화 |
| 다크 모드 | 추가 구현 필요 | ✅ 기본 지원 |

**✅ Tokens Studio가 최적의 선택입니다!**

---

**작성일**: 2025-01-04
**작성자**: Claude Code
**버전**: 1.0.0
**상태**: 실행 준비 완료 ✅
