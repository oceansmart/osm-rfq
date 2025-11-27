# RFQ Draft Rate Refactoring & Mock Data Guide

> **Version**: 1.0.0
> **Last Updated**: 2025-11-26
> **Description**: 정적 하드코딩된 테이블(Container4 등)을 목업 데이터 기반의 동적 컴포넌트로 리팩토링하기 위한 가이드




## 조건-규칙

- `@.claude/rules/010_common.md` (독립적 컴포넌트, 네이밍 준수)
- `@.claude/rules/030-ui.md` (UI 정확성 유지, 디자인 토큰 활용)

---

## 1. Mock Data 생성 요구사항

### 1.1 데이터 구조 정의 (TypeScript Interface)
`frontend/src/components/rfq-quotation-generator/types.ts` (또는 적절한 위치)에 정의.

```typescript
export interface SuggestedOceanFreight {
  id: string;
  cargoType: string; // 'DRY' | 'RF' | 'DG' | 'OOG'
  price20: number;
  price40: number;
  priceHC: number;
  price45: number;
  isSelected: boolean;
}
```

### 1.2 목업 데이터 생성
`frontend/src/components/rfq-quotation-generator/mocks.ts` (또는 적절한 위치)에 생성.

- **데이터 예시**:
  ```typescript
  export const MOCK_SUGGESTED_RATES: SuggestedOceanFreight[] = [
    {
      id: '1',
      cargoType: 'DRY',
      price20: 100000,
      price40: 100000,
      priceHC: 100000,
      price45: 100000,
      isSelected: true,
    },
    // ... 추가 데이터
  ];
  ```

---

## 2. 컴포넌트 리팩토링 요구사항

### 2.1 대상 컴포넌트
- **파일**: `frontend/src/components/rfq-quotation-generator/index.tsx` 내부의 
`Container4` 


- **현재 상태**: `<tbody>` 내 `<tr>`이 하드코딩되어 있음.

### 2.2 리팩토링 지침
1. **데이터 바인딩**: 위에서 생성한 목업 데이터를 `Container4` 컴포넌트에서 import하여 사용.
2. **반복 렌더링**: `MOCK_SUGGESTED_RATES.map((item) => ...)`을 사용하여 `<tr>`을 동적으로 생성.
3. **스타일 유지**:
   - 기존 CSS 클래스(`styles.tdSize`, `styles.cargoTypeSelect` 등)를 그대로 적용하여 **UI 변경이 없어야 함**.
   - 숫자 표시는 `item.price20.toLocaleString()` 등을 사용하여 3자리 콤마 포맷 적용.
4. **타입 안전성**: `map` 함수 내에서 타입 정의(`SuggestedOceanFreight`)를 준수.

---


### 2.3 요구사항 


1. 먼저 `frontend/src/components/rfq-quotation-generator/types.ts` 파일을 생성하고 네이밍 규칙을 준수하여  인터페이스를 정의하세요.
2. `frontend/src/components/rfq-quotation-generator/mocks.ts` 파일을 생성하고 테스트용 목업 데이터를 디자인된 데이터를 우선 생성 (동일해야함)
3. `index.tsx`의 대상  컴포넌트가 이 목업 데이터를 사용하여 테이블 Row를 렌더링하도록 수정하세요.
4. 숫자는 `toLocaleString()`으로 포맷팅하고, 기존 CSS 클래스를 그대로 유지하여 디자인이 바뀌지 않게(매우중요) 하세요.
```
