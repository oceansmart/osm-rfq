# 스크립트 가이드

OSM RFQ 프로젝트의 빌드 스크립트 및 자동화 도구 가이드입니다.

## 📋 목차

- [디자인 토큰 생성](#디자인-토큰-생성)
- [Figma 토큰 동기화](#figma-토큰-동기화)

---

## 디자인 토큰 생성

### generate-design-tokens.ts

**위치**: `scripts/generate-design-tokens.ts`

**용도**: TypeScript 디자인 토큰 파일에서 CSS Variables를 자동 생성합니다.

#### 실행 방법

```bash
# 수동 실행
npm run generate:tokens

# 빌드 시 자동 실행
npm run build

# 기존 명령어 (별칭)
npm run generate:theme
```

#### 생성되는 CSS Variables

| 토큰 타입 | 변수 개수 | 예시 |
|-----------|-----------|------|
| Spacing | 17개 | `--spacing-xl: 16px;` |
| Radius | 11개 | `--radius-md: 8px;` |
| Typography | 26개+ | `--text-xs: 12px;` |
| Widths | 3개 | `--max-width-container: 1280px;` |
| Colors | 100개+ | `--color-blue-600: rgb(58 92 243);` |

#### 트러블슈팅

**Q: "tsx: command not found" 에러**

A: npx를 사용하세요:
```bash
npx tsx scripts/generate-design-tokens.ts
```

---

## 📚 관련 문서

- [Design Token Single Source of Truth](/docs/frontend/design-tokens-single-source.md)
- [Color System Single Source](/docs/frontend/color-system-single-source.md)

---

**마지막 업데이트**: 2025-11-21
