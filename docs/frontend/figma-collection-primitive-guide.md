# Figma Collection "Primitive" 생성 가이드

> **Untitled UI 스타일의 Color System을 Figma Collection으로 구축하는 방법**

---

## 📚 개요

**목표**: Figma에서 "Primitive" Collection을 생성하여 Blue와 Neutral 색상 팔레트를 Variables로 관리

**Collection 구조**:
```
Collection: Primitive
├── Variable: Color (Mode: Default)
    ├── blue-900: #0014C4
    ├── blue-800: #002AD6
    ├── blue-700: #0035E2
    ├── blue-600: #0040F1
    ├── blue-500: #004FFF ⭐ Default
    ├── blue-400: #4062FF
    ├── blue-300: #667FFF
    ├── blue-200: #94A3FF
    ├── blue-100: #C0C5FF
    ├── blue-50: #E6E8FF
    ├── Neutral1100: #000000
    ├── Neutral1000: #17191A
    ├── Neutral900: #2F3133
    ├── Neutral800: #464A4D
    ├── Neutral700: #5E6366
    ├── Neutral600: #757B80
    ├── Neutral500: #8C9499
    ├── Neutral400: #A4ADB2
    ├── Neutral300: #BBC5CC
    ├── Neutral200: #E8EEF2
    ├── Neutral100: #F2F8FC
    └── Neutral0: #FFFFFF
```

---

## 🚀 작업 계획 (5단계)

### 📋 Step 1: Figma Collection 생성

#### 1-1. Figma 파일 준비

```
1. Figma 파일 열기
2. 좌측 패널에서 "Variables" 아이콘 클릭
3. "Create collection" 버튼 클릭
4. Collection 이름: "Primitive"
```

#### 1-2. Mode 설정

```
1. Collection "Primitive" 선택
2. Default mode 확인 (기본값)
3. 추후 Dark mode 추가 가능
```

---

### 🎨 Step 2: Blue 색상 팔레트 생성

#### 2-1. Variable 생성 (Blue)

```
Primitive Collection에서:

1. "Create variable" 클릭
2. Name: "blue-50"
3. Type: Color
4. Value: #E6E8FF
5. Save

위 단계를 반복:
- blue-100: #C0C5FF
- blue-200: #94A3FF
- blue-300: #667FFF
- blue-400: #4062FF
- blue-500: #004FFF (⭐ Primary로 표시)
- blue-600: #0040F1
- blue-700: #0035E2
- blue-800: #002AD6
- blue-900: #0014C4
```

#### 2-2. 빠른 생성 방법

**CSV Import 활용**:

1. CSV 파일 생성:

```csv
collection,mode,variable,type,value
Primitive,Default,blue-50,color,#E6E8FF
Primitive,Default,blue-100,color,#C0C5FF
Primitive,Default,blue-200,color,#94A3FF
Primitive,Default,blue-300,color,#667FFF
Primitive,Default,blue-400,color,#4062FF
Primitive,Default,blue-500,color,#004FFF
Primitive,Default,blue-600,color,#0040F1
Primitive,Default,blue-700,color,#0035E2
Primitive,Default,blue-800,color,#002AD6
Primitive,Default,blue-900,color,#0014C4
```

2. Figma에서:
   - Variables 패널
   - "Import" 버튼
   - CSV 파일 선택

---

### 🌑 Step 3: Neutral 색상 팔레트 생성

#### 3-1. Variable 생성 (Neutral)

```
같은 Primitive Collection에서:

- Neutral0: #FFFFFF (⭐ White)
- Neutral100: #F2F8FC
- Neutral200: #E8EEF2
- Neutral300: #BBC5CC
- Neutral400: #A4ADB2
- Neutral500: #8C9499
- Neutral600: #757B80
- Neutral700: #5E6366
- Neutral800: #464A4D
- Neutral900: #2F3133
- Neutral1000: #17191A
- Neutral1100: #000000 (⭐ Black)
```

#### 3-2. CSV 전체 (Blue + Neutral)

```csv
collection,mode,variable,type,value,description
Primitive,Default,blue-50,color,#E6E8FF,Lightest blue
Primitive,Default,blue-100,color,#C0C5FF,
Primitive,Default,blue-200,color,#94A3FF,
Primitive,Default,blue-300,color,#667FFF,
Primitive,Default,blue-400,color,#4062FF,
Primitive,Default,blue-500,color,#004FFF,Primary blue
Primitive,Default,blue-600,color,#0040F1,
Primitive,Default,blue-700,color,#0035E2,
Primitive,Default,blue-800,color,#002AD6,
Primitive,Default,blue-900,color,#0014C4,Darkest blue
Primitive,Default,Neutral0,color,#FFFFFF,White
Primitive,Default,Neutral100,color,#F2F8FC,
Primitive,Default,Neutral200,color,#E8EEF2,
Primitive,Default,Neutral300,color,#BBC5CC,
Primitive,Default,Neutral400,color,#A4ADB2,
Primitive,Default,Neutral500,color,#8C9499,Mid gray
Primitive,Default,Neutral600,color,#757B80,
Primitive,Default,Neutral700,color,#5E6366,
Primitive,Default,Neutral800,color,#464A4D,
Primitive,Default,Neutral900,color,#2F3133,
Primitive,Default,Neutral1000,color,#17191A,
Primitive,Default,Neutral1100,color,#000000,Black
```

---

### 🔧 Step 4: Variable 사용 설정

#### 4-1. Scoping 설정

각 Variable의 용도 지정:

**Blue 색상**:
- ✅ Fill (배경색)
- ✅ Stroke (테두리)
- ✅ Text (텍스트 색상)

**Neutral 색상**:
- ✅ Fill
- ✅ Stroke
- ✅ Text

#### 4-2. Aliasing (선택사항)

Semantic 색상으로 Alias 생성:

```
Collection: Semantic
├── primary: → blue-500
├── primary-hover: → blue-600
├── text-primary: → Neutral1100
├── text-secondary: → Neutral700
├── bg-primary: → Neutral0
└── border-default: → Neutral200
```

---

### ✅ Step 5: 검증 및 문서화

#### 5-1. 테스트

```
1. 새 Frame 생성
2. Fill에 blue-500 Variable 적용
3. 색상이 #004FFF로 표시되는지 확인
4. Text에 Neutral700 Variable 적용
5. 색상이 #5E6366으로 표시되는지 확인
```

#### 5-2. 문서화

**README.md 생성**:

```markdown
# Primitive Color System

## Blue Palette
- Primary: blue-500 (#004FFF)
- Range: blue-50 ~ blue-900
- Usage: 브랜드 색상, CTA, 링크

## Neutral Palette
- White: Neutral0 (#FFFFFF)
- Black: Neutral1100 (#000000)
- Range: Neutral100 ~ Neutral1000
- Usage: 텍스트, 배경, 테두리

## 사용 방법
1. Variables 패널 열기
2. Primitive Collection 선택
3. 원하는 Variable을 컴포넌트에 적용
```

---

## 💻 자동 생성 방법 (Plugin 활용)

### Figma Plugin: "Variables Import Export"

#### 1. Plugin 설치

```
1. Figma → Plugins → Browse plugins
2. "Variables Import Export" 검색
3. Install
```

#### 2. JSON 파일 준비

**primitive-colors.json**:

```json
{
  "collections": [
    {
      "name": "Primitive",
      "modes": [
        {
          "name": "Default",
          "variables": [
            {
              "name": "blue-50",
              "type": "COLOR",
              "value": "#E6E8FF"
            },
            {
              "name": "blue-100",
              "type": "COLOR",
              "value": "#C0C5FF"
            },
            {
              "name": "blue-200",
              "type": "COLOR",
              "value": "#94A3FF"
            },
            {
              "name": "blue-300",
              "type": "COLOR",
              "value": "#667FFF"
            },
            {
              "name": "blue-400",
              "type": "COLOR",
              "value": "#4062FF"
            },
            {
              "name": "blue-500",
              "type": "COLOR",
              "value": "#004FFF",
              "scopes": ["ALL_FILLS", "ALL_STROKES", "TEXT_FILL"]
            },
            {
              "name": "blue-600",
              "type": "COLOR",
              "value": "#0040F1"
            },
            {
              "name": "blue-700",
              "type": "COLOR",
              "value": "#0035E2"
            },
            {
              "name": "blue-800",
              "type": "COLOR",
              "value": "#002AD6"
            },
            {
              "name": "blue-900",
              "type": "COLOR",
              "value": "#0014C4"
            },
            {
              "name": "Neutral0",
              "type": "COLOR",
              "value": "#FFFFFF",
              "scopes": ["ALL_FILLS", "ALL_STROKES"]
            },
            {
              "name": "Neutral100",
              "type": "COLOR",
              "value": "#F2F8FC"
            },
            {
              "name": "Neutral200",
              "type": "COLOR",
              "value": "#E8EEF2"
            },
            {
              "name": "Neutral300",
              "type": "COLOR",
              "value": "#BBC5CC"
            },
            {
              "name": "Neutral400",
              "type": "COLOR",
              "value": "#A4ADB2"
            },
            {
              "name": "Neutral500",
              "type": "COLOR",
              "value": "#8C9499"
            },
            {
              "name": "Neutral600",
              "type": "COLOR",
              "value": "#757B80"
            },
            {
              "name": "Neutral700",
              "type": "COLOR",
              "value": "#5E6366"
            },
            {
              "name": "Neutral800",
              "type": "COLOR",
              "value": "#464A4D"
            },
            {
              "name": "Neutral900",
              "type": "COLOR",
              "value": "#2F3133"
            },
            {
              "name": "Neutral1000",
              "type": "COLOR",
              "value": "#17191A"
            },
            {
              "name": "Neutral1100",
              "type": "COLOR",
              "value": "#000000",
              "scopes": ["ALL_FILLS", "TEXT_FILL"]
            }
          ]
        }
      ]
    }
  ]
}
```

#### 3. Plugin으로 Import

```
1. Figma에서 "Variables Import Export" 플러그인 실행
2. "Import" 탭 선택
3. primitive-colors.json 파일 업로드
4. "Import" 클릭
→ 자동으로 모든 Variable 생성됨!
```

---

## 🎯 React 프로젝트에 적용

### 방법 1: CSS Variables로 Export

#### Figma에서 Export

```
1. Variables 패널
2. Primitive Collection 선택
3. "Export" → "CSS Variables"
```

#### CSS 파일 생성

**src/styles/primitive-colors.css**:

```css
@layer base {
  :root {
    /* Blue Colors */
    --blue-50: #E6E8FF;
    --blue-100: #C0C5FF;
    --blue-200: #94A3FF;
    --blue-300: #667FFF;
    --blue-400: #4062FF;
    --blue-500: #004FFF;  /* Primary */
    --blue-600: #0040F1;
    --blue-700: #0035E2;
    --blue-800: #002AD6;
    --blue-900: #0014C4;

    /* Neutral Colors */
    --neutral-0: #FFFFFF;
    --neutral-100: #F2F8FC;
    --neutral-200: #E8EEF2;
    --neutral-300: #BBC5CC;
    --neutral-400: #A4ADB2;
    --neutral-500: #8C9499;
    --neutral-600: #757B80;
    --neutral-700: #5E6366;
    --neutral-800: #464A4D;
    --neutral-900: #2F3133;
    --neutral-1000: #17191A;
    --neutral-1100: #000000;
  }
}
```

### 방법 2: Tailwind Config로 변환

**tailwind.config.ts**:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      colors: {
        blue: {
          50: "#E6E8FF",
          100: "#C0C5FF",
          200: "#94A3FF",
          300: "#667FFF",
          400: "#4062FF",
          500: "#004FFF",  // Default
          600: "#0040F1",
          700: "#0035E2",
          800: "#002AD6",
          900: "#0014C4",
        },
        neutral: {
          0: "#FFFFFF",
          100: "#F2F8FC",
          200: "#E8EEF2",
          300: "#BBC5CC",
          400: "#A4ADB2",
          500: "#8C9499",
          600: "#757B80",
          700: "#5E6366",
          800: "#464A4D",
          900: "#2F3133",
          1000: "#17191A",
          1100: "#000000",
        },
      },
    },
  },
};

export default config;
```

### 방법 3: TypeScript 상수

**src/constants/colors.ts**:

```typescript
/**
 * Primitive Color System
 * Figma Collection: Primitive
 */

export const BLUE = {
  50: "#E6E8FF",
  100: "#C0C5FF",
  200: "#94A3FF",
  300: "#667FFF",
  400: "#4062FF",
  500: "#004FFF",  // Default
  600: "#0040F1",
  700: "#0035E2",
  800: "#002AD6",
  900: "#0014C4",
} as const;

export const NEUTRAL = {
  0: "#FFFFFF",
  100: "#F2F8FC",
  200: "#E8EEF2",
  300: "#BBC5CC",
  400: "#A4ADB2",
  500: "#8C9499",
  600: "#757B80",
  700: "#5E6366",
  800: "#464A4D",
  900: "#2F3133",
  1000: "#17191A",
  1100: "#000000",
} as const;

export const PRIMITIVE_COLORS = {
  blue: BLUE,
  neutral: NEUTRAL,
} as const;

// Type-safe 사용
type BlueShade = keyof typeof BLUE;
type NeutralShade = keyof typeof NEUTRAL;
```

---

## 🔄 자동화 스크립트

### Figma REST API로 Collection 자동 생성

**✨ 새로운 방법: TypeScript 스크립트 사용**

이제 Figma REST API를 사용하여 Primitive Collection을 완전 자동으로 생성할 수 있습니다!

**상세 가이드**: [Figma API 자동화 가이드](./figma-api-automation-guide.md)

**빠른 시작**:

1. **환경 설정**:
```bash
# .env 파일 생성
cp .env.example .env

# Figma Access Token과 File Key 입력
nano .env
```

2. **스크립트 실행**:
```bash
# Primitive Collection 생성 (Blue + Neutral 22개 색상)
npm run figma:create-primitive

# 기존 Variables 업데이트
npm run figma:update-primitive
```

3. **Figma에서 확인**:
- Variables 패널 열기
- "Primitive" Collection 확인
- 모든 색상 Variables 확인 (22개)

**스크립트 위치**:
- [scripts/figma/create-primitive-collection.ts](../scripts/figma/create-primitive-collection.ts)
- [scripts/figma/update-primitive-variables.ts](../scripts/figma/update-primitive-variables.ts)

**장점**:
- ✅ 수동 작업 없이 22개 색상 자동 등록
- ✅ 버전 관리 가능 (Git으로 코드 관리)
- ✅ CI/CD 파이프라인 통합 가능
- ✅ 대규모 디자인 시스템 관리 용이

---

## 📊 Collection 시각화 Frame 생성

### UI 표시용 Frame

**Figma에서 생성**:

```
Frame: "1. Primitive (Color)"
├── Frame: "blue" (304 × 395)
│   ├── Text: "blue" (24px, Bold)
│   └── Table:
│       ├── Header: Name | Default
│       ├── Row: blue-900 | [색상칩] #0014C4
│       ├── Row: blue-800 | [색상칩] #002AD6
│       ├── ...
│       └── Row: blue-50 | [색상칩] #E6E8FF
└── Frame: "Neutral colors" (304 × 459)
    ├── Text: "Neutral colors" (24px, Bold)
    └── Table:
        ├── Header: Name | Default
        ├── Row: Neutral1100 | [색상칩] #000000
        ├── ...
        └── Row: Neutral0 | [색상칩] #FFFFFF
```

**자동 생성 프롬프트**:

```
"Figma Collection Primitive의 모든 색상을 시각화하는 Frame을 생성해줘

구조:
1. 제목 "1. Primitive (Color)" (24px, Bold)
2. 두 개의 테이블:
   - Blue 색상 (10개)
   - Neutral 색상 (12개)

각 Row:
- Variable 이름 (14px, Regular)
- 색상 칩 (16×16px, rounded-sm)
- Hex 코드 (14px, Regular)

레이아웃:
- width: 1152px
- padding: 40px
- gap: 40px
- 테이블 간격: 24px
"
```

---

## 🎨 Figma Plugin으로 생성

### Figma Plugin: "Figma Tokens"

#### 1. Plugin 설치

```
Figma → Plugins → "Figma Tokens"
```

#### 2. Token JSON 생성

**tokens.json**:

```json
{
  "primitive": {
    "blue": {
      "50": { "value": "#E6E8FF", "type": "color" },
      "100": { "value": "#C0C5FF", "type": "color" },
      "200": { "value": "#94A3FF", "type": "color" },
      "300": { "value": "#667FFF", "type": "color" },
      "400": { "value": "#4062FF", "type": "color" },
      "500": { "value": "#004FFF", "type": "color" },
      "600": { "value": "#0040F1", "type": "color" },
      "700": { "value": "#0035E2", "type": "color" },
      "800": { "value": "#002AD6", "type": "color" },
      "900": { "value": "#0014C4", "type": "color" }
    },
    "neutral": {
      "0": { "value": "#FFFFFF", "type": "color" },
      "100": { "value": "#F2F8FC", "type": "color" },
      "200": { "value": "#E8EEF2", "type": "color" },
      "300": { "value": "#BBC5CC", "type": "color" },
      "400": { "value": "#A4ADB2", "type": "color" },
      "500": { "value": "#8C9499", "type": "color" },
      "600": { "value": "#757B80", "type": "color" },
      "700": { "value": "#5E6366", "type": "color" },
      "800": { "value": "#464A4D", "type": "color" },
      "900": { "value": "#2F3133", "type": "color" },
      "1000": { "value": "#17191A", "type": "color" },
      "1100": { "value": "#000000", "type": "color" }
    }
  }
}
```

#### 3. Import

```
1. Figma Tokens 플러그인 실행
2. "Load from file" 선택
3. tokens.json 업로드
4. "Create Variables" 클릭
→ 자동으로 Primitive Collection 생성!
```

---

## 📝 작업 체크리스트

### ✅ Figma 작업

- [ ] Primitive Collection 생성
- [ ] Blue 색상 10개 Variable 추가
- [ ] Neutral 색상 12개 Variable 추가
- [ ] Scoping 설정 (Fill, Stroke, Text)
- [ ] 시각화 Frame 생성
- [ ] README 문서 작성

### ✅ React 프로젝트 연동

- [ ] primitive-colors.css 생성
- [ ] tailwind.config.ts 업데이트
- [ ] TypeScript 상수 파일 생성
- [ ] 기존 컴포넌트에 적용
- [ ] 테스트 (모든 색상 사용 확인)

---

## 🚀 Claude Code 활용 프롬프트

### Collection 생성 요청

```
"Figma에서 Primitive Collection을 생성하는 방법을 단계별로 알려줘

Collection 이름: Primitive
Variables:
- Blue 색상: blue-50 ~ blue-900 (10개)
- Neutral 색상: Neutral0 ~ Neutral1100 (12개)

모든 색상 hex 코드:
[Blue]
blue-50: #E6E8FF
blue-100: #C0C5FF
... (생략)

[Neutral]
Neutral0: #FFFFFF
Neutral100: #F2F8FC
... (생략)

추가 요청:
1. CSV 파일 생성
2. JSON 파일 생성
3. 시각화 Frame 생성 방법
"
```

### React 연동 요청

```
"Figma Collection Primitive의 색상 시스템을
React 프로젝트에 적용해줘

생성할 파일:
1. src/styles/primitive-colors.css - CSS Variables
2. tailwind.config.ts - Tailwind 색상 확장
3. src/constants/colors.ts - TypeScript 상수

모든 파일에 22개 색상 포함:
- blue-50 ~ blue-900 (10개)
- Neutral0 ~ Neutral1100 (12개)

사용 예시도 만들어줘:
- Button에 blue-500 사용
- Text에 Neutral700 사용
- Background에 Neutral0 사용
"
```

---

## 🎯 결론

**Figma Collection "Primitive" 생성 방법**:

1. ✅ **수동**: Variables 패널에서 하나씩 생성
2. ✅ **CSV Import**: CSV 파일로 일괄 생성
3. ✅ **Plugin**: Figma Tokens 플러그인 사용
4. ✅ **API**: Figma REST API로 자동화

**가장 빠른 방법**: **Figma Tokens Plugin** + **JSON 파일**

**총 소요 시간**: ~10분 🚀
