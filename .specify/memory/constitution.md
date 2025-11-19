# OSM RFQ Constitution

## Core Principles

### I. Design System Consistency
모든 UI 컴포넌트는 Figma Tokens Studio에서 정의된 디자인 토큰을 기반으로 구현되어야 합니다.

- CSS Variables 기반 디자인 토큰 시스템 준수
- 임의의 색상/타이포그래피 값 사용 금지
- `.typo-*` 유틸리티 클래스를 사용한 일관된 타이포그래피
- Light/Dark 모드 자동 지원 (semantic tokens 활용)
- Figma 디자인 변경 시 토큰 동기화 필수

### II. Test-Driven Development (NON-NEGOTIABLE)
모든 기능은 테스트 우선으로 개발되어야 합니다.

- **E2E 테스트**: Playwright로 핵심 사용자 플로우 커버
- **컴포넌트 테스트**: Storybook으로 모든 컴포넌트 문서화
- **테스트 커버리지**: 80% 이상 유지
- **TDD 사이클**: Red → Green → Refactor 엄격히 준수
- 테스트 없이 PR 머지 불가

### III. TypeScript Strict Mode
타입 안정성을 최우선으로 합니다.

- TypeScript strict 모드 필수
- `any` 타입 사용 금지 (정당한 사유 없이)
- Props interface 명시적 정의
- Zod를 사용한 런타임 validation
- ESLint 에러 0개 유지

### IV. Component Architecture
재사용 가능하고 독립적인 컴포넌트를 작성합니다.

- 컴포넌트는 50줄 이하로 유지 (복잡도 관리)
- 상속보다 조합(Composition) 우선
- Props drilling 최소화 (Context API 활용)
- 비즈니스 로직과 UI 분리
- 모든 컴포넌트는 `.stories.tsx` 필수

### V. Spec-Driven Development
모든 기능은 명세서 기반으로 개발됩니다.

- Constitution → Specify → Clarify → Plan → Tasks → Implement 워크플로우 준수
- 구현 전 spec.md 필수 작성
- 불명확한 요구사항은 Clarify 단계에서 해결
- tasks.md를 체크리스트로 활용하여 진행 상황 추적
- 명세서 없는 기능 개발 금지

## Code Quality Standards

### Documentation
- **통합 문서 서버**: MkDocs를 통한 Frontend/Backend 통합 문서
- **컴포넌트 문서**: Storybook에 모든 variant 문서화
- **API 문서**: OpenAPI 3.0 스펙 작성
- **README**: 각 주요 디렉토리에 README.md 작성
- **코드 주석**: 복잡한 로직은 반드시 주석 작성

### Performance
- **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- **번들 크기**: 각 페이지 200KB 이하 (gzipped)
- **이미지 최적화**: Next.js Image 컴포넌트 사용
- **Code Splitting**: 동적 import 활용

### Accessibility
- **WCAG 2.1 AA**: 준수 필수
- **Semantic HTML**: 의미있는 HTML 태그 사용
- **키보드 네비게이션**: 모든 인터랙티브 요소 접근 가능
- **스크린 리더**: ARIA 속성 적절히 사용
- **색상 대비**: 4.5:1 이상 유지

## Development Workflow

### Branch Strategy
- **main**: 프로덕션 배포용
- **Feature branches**: `001-feature-name` 형식 (Spec Kit 자동 생성)
- **Protected branch**: main은 PR을 통해서만 병합
- **Linear history**: Squash merge 권장

### Commit Messages
```
feat: 새 기능 추가
fix: 버그 수정
docs: 문서 변경
style: 코드 포맷팅 (기능 변경 없음)
refactor: 리팩토링
test: 테스트 추가/수정
chore: 빌드 설정, 패키지 관리
```

### Code Review
- **모든 PR**: 최소 1명 이상 승인 필요
- **체크리스트**:
  - [ ] Constitution 준수 확인
  - [ ] 테스트 통과 (E2E + Unit)
  - [ ] 타입 에러 0개
  - [ ] Storybook 스토리 추가
  - [ ] 접근성 검증
  - [ ] 성능 체크

### Quality Gates
PR 머지 전 필수 통과 조건:
1. ✅ `npm run build` 성공
2. ✅ `npm run lint` 에러 0개
3. ✅ `npm run test:e2e` 통과
4. ✅ TypeScript 컴파일 에러 0개
5. ✅ Storybook 빌드 성공

## Technology Stack Constraints

### Frontend
- **Framework**: Next.js 14.2.33 (App Router만 사용)
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS 3.4.1 + CSS Variables
- **State Management**: TanStack Query (서버 상태), Context API (UI 상태)
- **Forms**: React Hook Form + Zod
- **Testing**: Playwright (E2E), Storybook (컴포넌트)

### Backend (향후)
- 백엔드 기술 스택이 결정되면 추가 예정

### Design System
- **Tokens**: Figma Tokens Studio
- **Theme**: next-themes (dark mode)
- **Typography**: 반응형 타이포그래피 스케일
- **Colors**: Semantic color tokens

## Security Requirements

### Authentication & Authorization
- **인증**: 향후 정의 예정
- **권한**: 역할 기반 접근 제어 (RBAC)
- **세션**: HttpOnly 쿠키 사용

### Data Protection
- **입력 검증**: Zod로 모든 입력 validation
- **XSS 방지**: React 기본 escaping + DOMPurify (필요 시)
- **CSRF 방지**: CSRF 토큰 사용
- **SQL Injection**: Prepared statements (백엔드)

### Dependencies
- **정기 업데이트**: 월 1회 의존성 업데이트
- **취약점 스캔**: `npm audit` 주기적 실행
- **최소 의존성**: 불필요한 패키지 설치 금지

## Governance

### Constitution Authority
이 Constitution은 모든 개발 관행보다 우선합니다.

- **모든 PR**: Constitution 준수 여부 검증
- **예외 처리**: 정당한 사유가 있을 경우 팀 합의 필요
- **복잡도 관리**: 복잡한 구현은 반드시 문서화 및 정당화

### Amendment Process
Constitution 수정 절차:

1. **제안**: 변경 사유 및 영향 범위 문서화
2. **검토**: 팀 전체 검토 및 논의
3. **승인**: 팀 합의 후 승인
4. **마이그레이션**: 기존 코드 마이그레이션 계획 수립
5. **적용**: 버전 업데이트 및 Last Amended 날짜 갱신

### Compliance Verification
- **PR 체크리스트**: Constitution 항목 확인
- **자동화**: Pre-commit hooks로 린트/타입 체크
- **정기 감사**: 분기별 코드베이스 Constitution 준수 검토

---

**Version**: 1.0.0 | **Ratified**: 2025-11-18 | **Last Amended**: 2025-11-18
