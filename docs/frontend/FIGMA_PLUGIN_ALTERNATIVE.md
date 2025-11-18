# Figma Variables 생성 대안: Plugin 사용

> **상황**: REST API가 Enterprise 플랜 전용이어서 접근 불가

---

## 🔄 대안 방법

### 방법 1: Style Dictionary + Figma Tokens Plugin

**추천 플러그인**: [Figma Tokens](https://www.figma.com/community/plugin/843461159747178978/Figma-Tokens)

**장점**:
- ✅ 무료
- ✅ JSON 파일에서 Variables 자동 생성
- ✅ 동기화 자동화 가능

**사용 방법**:

1. **tokens.json 생성**:
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

2. **Figma Tokens Plugin 설치**
3. **tokens.json 가져오기**
4. **Create Variables 클릭**

---

### 방법 2: 수동 생성 (빠른 방법)

Figma에서 직접 생성:

1. **Variables 패널 열기**: `⌘ + /` → "Variables"
2. **Collection 생성**: "Primitive"
3. **Variables 추가**:
   - Blue 10개
   - Neutral 12개

**소요 시간**: 약 10-15분

---

### 방법 3: Figma MCP 활용

Figma MCP를 사용해 시각화 자동화:

```typescript
// Variables는 수동 생성 후
// MCP로 색상 테이블 자동 생성
```

---

## 📋 현재 상황 정리

| 항목 | 상태 |
|------|------|
| REST API 접근 | ❌ Enterprise 플랜 필요 |
| Figma 플랜 | ⚠️ 확인 필요 |
| 대안 1: Figma Tokens Plugin | ✅ 사용 가능 |
| 대안 2: 수동 생성 | ✅ 사용 가능 |

---

현재 Figma 플랜을 알려주시면 최적의 방법을 제안해드리겠습니다!
