# OSM RFQ Program Structure

> OSM RFQ 시스템 프로그램 구조 정의
>
> **Version**: 1.0.0
> **Last Updated**: 2025-11-19
> **Naming Standard**: [osm-naming-convention.md](/.claude/rules/osm-naming-convention.md)

---

## 프로그램 목록

| No | 카테고리 | 기능명 | 상세 설명 | 프로그램명 (.tsx) | 경로명 |
|----|---------|--------|----------|------------------|--------|
| 1 | Dashboard | Dashboard | 주요 정과 지표 실시간 표시: 신규 RFQ 수, 진행 중, 대기, 발송 완료 건수 | `page.tsx` | `/frontend/src/app/(dashboard)/page.tsx` |
| 2 | Request for quotation | RFQ Management List | 등록된 모든 RFQ를 테이블 형태로 조회. 상태별 필터링 (전수/분석/Draft/발송/완료), 화주별, 담당자별, 기간별 필터링 지원. 정렬, 검색, 페이지네이션 기능. 각 RFQ의 마감일, 우선순위, 진행 상태 실시간 표시 | `page.tsx` | `/frontend/src/app/rfq/page.tsx` |
| 3 | Request for quotation | RFQ Management List - Detail | 개별 RFQ의 전체 정보를 탭 구조로 제공: Overview(기본 정보), Analysis(AI 분석 결과), Draft(작성 중인 견적), History(처리 이력), Documents(첨부파일). 구간별 상세 정보, 요구사항 체크리스트, 타임라인 표시 | `page.tsx` | `/frontend/src/app/rfq/[id]/page.tsx` |
| 4 | Request for quotation | Email Preview | 화주로부터 수신된 RFQ 이메일을 자동으로 감지하고 시스템에 등록. 첨부파일(Excel, PDF) 자동 다운로드 및 저장. IMAP/POP3 프로토콜 지원. 수신 규칙 설정 가능 (발신자, 제목 키워드 등) 수신된 e-mail 수신확인 | `page.tsx` | `/frontend/src/app/rfq/email-preview/page.tsx` |
| 5 | bidding draft | Create Draft Rate | 구간별 운임 입력 폼 제공: Ocean Freight, BAF/FAF, THC(POL/POD), PSS/EBS 등 항충료, Free Time, Payment Terms, Transit Time 등 서비스 조건. 입력값 실시간 검증 (마진율, 정책 준수). AI 추천값 원클릭 적용 가능. 다중 구간 순차 작성 지원 | `page.tsx` | `/frontend/src/app/bidding/draft/create/page.tsx` |
| 6 | bidding draft | Quotation Generator | 작성된 운임 데이터를 확주 템플릿에 자동 삽입하여 Excel/PDF 파일 생성. 구간별, 컨테이너별 운임 표 자동 구성. 부대 조건 (Validity, Payment Terms, Free Time 등) 자동 반영. 미리보기 기능. 다중 포맷 지원 (XLSX, PDF, CSV) | `page.tsx` | `/frontend/src/app/bidding/quotation/page.tsx` |
| 7 | bidding draft | Email Composition | AI 기반 이메일 본문 자동 생성: 인사말, 견적 요약, 주요 특징 강조, 마무리 인사 등 자연스러운 문장 구성. 화주별 톤&매너 학습 및 반영. 다국어 지원 (한글, 영어, 일본어). 템플릿 기반 편집 가능. 품질 체크 (문법, 필수 정보 누락) | `page.tsx` | `/frontend/src/app/bidding/email/page.tsx` |

---

## 디렉토리 구조

### App Router Structure (Next.js 14)

```
frontend/src/app/
├── (dashboard)/                    # Dashboard 그룹 (레이아웃 공유)
│   ├── layout.tsx                  # Dashboard Layout
│   └── page.tsx                    # [1] Dashboard (홈)
│
├── rfq/                            # RFQ 관리
│   ├── layout.tsx                  # RFQ Layout (공통 네비게이션)
│   ├── page.tsx                    # [2] RFQ Management List
│   ├── [id]/
│   │   └── page.tsx                # [3] RFQ Detail
│   └── email-preview/
│       └── page.tsx                # [4] Email Preview
│
└── bidding/                        # Bidding 관리
    ├── layout.tsx                  # Bidding Layout
    ├── draft/
    │   └── create/
    │       └── page.tsx            # [5] Create Draft Rate
    ├── quotation/
    │   └── page.tsx                # [6] Quotation Generator
    └── email/
        └── page.tsx                # [7] Email Composition
```

### Components Structure

```
frontend/src/components/
├── dashboard/                      # [1] Dashboard 컴포넌트
│   ├── index.tsx                   # Dashboard 메인
│   ├── stats-card/
│   │   └── index.tsx               # 통계 카드 컴포넌트
│   ├── rfq-chart/
│   │   └── index.tsx               # RFQ 차트
│   └── recent-activities/
│       └── index.tsx               # 최근 활동 목록
│
├── rfq-list/                       # [2] RFQ 목록 컴포넌트
│   ├── index.tsx                   # RFQ List 메인
│   ├── rfq-table/
│   │   └── index.tsx               # RFQ 테이블
│   ├── rfq-filters/
│   │   └── index.tsx               # 필터 컴포넌트
│   ├── hooks/
│   │   ├── index.binding.hook.ts   # 데이터 바인딩
│   │   ├── index.filter.hook.ts    # 필터링
│   │   ├── index.search.hook.ts    # 검색
│   │   └── index.pagination.hook.ts # 페이지네이션
│   └── tests/
│       ├── index.binding.hook.spec.ts
│       └── index.filter.hook.spec.ts
│
├── rfq-detail/                     # [3] RFQ 상세 컴포넌트
│   ├── index.tsx                   # RFQ Detail 메인
│   ├── overview-tab/
│   │   └── index.tsx               # Overview 탭
│   ├── analysis-tab/
│   │   └── index.tsx               # AI Analysis 탭
│   ├── draft-tab/
│   │   └── index.tsx               # Draft 탭
│   ├── history-tab/
│   │   └── index.tsx               # History 탭
│   ├── documents-tab/
│   │   └── index.tsx               # Documents 탭
│   └── hooks/
│       ├── index.binding.hook.ts
│       └── index.tab.hook.ts       # 탭 전환
│
├── email-preview/                  # [4] Email Preview 컴포넌트
│   ├── index.tsx                   # Email Preview 메인
│   ├── email-viewer/
│   │   └── index.tsx               # 이메일 뷰어
│   ├── attachment-list/
│   │   └── index.tsx               # 첨부파일 목록
│   └── hooks/
│       ├── index.binding.hook.ts
│       └── index.parse.hook.ts     # 이메일 파싱
│
├── draft-rate/                     # [5] Create Draft Rate 컴포넌트
│   ├── index.tsx                   # Draft Rate 메인
│   ├── rate-form/
│   │   └── index.tsx               # 운임 입력 폼
│   ├── service-form/
│   │   └── index.tsx               # 서비스 조건 폼
│   ├── ai-suggestion/
│   │   └── index.tsx               # AI 추천값
│   └── hooks/
│       ├── index.binding.hook.ts
│       ├── index.validation.hook.ts # 입력 검증
│       └── index.ai.hook.ts        # AI 연동
│
├── quotation-generator/            # [6] Quotation Generator 컴포넌트
│   ├── index.tsx                   # Generator 메인
│   ├── template-selector/
│   │   └── index.tsx               # 템플릿 선택
│   ├── preview-panel/
│   │   └── index.tsx               # 미리보기
│   ├── export-options/
│   │   └── index.tsx               # 내보내기 옵션
│   └── hooks/
│       ├── index.binding.hook.ts
│       ├── index.generate.hook.ts  # 견적서 생성
│       └── index.export.hook.ts    # 파일 내보내기
│
└── email-composition/              # [7] Email Composition 컴포넌트
    ├── index.tsx                   # Composition 메인
    ├── email-editor/
    │   └── index.tsx               # 이메일 편집기
    ├── ai-writer/
    │   └── index.tsx               # AI 본문 생성
    ├── template-selector/
    │   └── index.tsx               # 템플릿 선택
    └── hooks/
        ├── index.binding.hook.ts
        ├── index.ai.hook.ts        # AI 작성
        └── index.send.hook.ts      # 이메일 전송
```

### Commons Components

```
frontend/src/commons/components/
├── button/
│   ├── index.tsx
│   └── index.stories.tsx
├── input/
│   ├── index.tsx
│   └── index.stories.tsx
├── table/                          # RFQ 테이블용
│   ├── index.tsx
│   └── index.stories.tsx
├── tab/                            # RFQ Detail 탭용
│   ├── index.tsx
│   └── index.stories.tsx
├── filter/                         # 필터링용
│   ├── index.tsx
│   └── index.stories.tsx
├── pagination/                     # 페이지네이션
│   ├── index.tsx
│   └── index.stories.tsx
├── file-upload/                    # 파일 업로드
│   ├── index.tsx
│   └── index.stories.tsx
└── modal/
    ├── index.tsx
    └── index.stories.tsx
```

---

## URL Routing

### Public Routes

| URL | 프로그램 | 설명 |
|-----|---------|------|
| `/` | Dashboard | 대시보드 홈 |
| `/rfq` | RFQ Management List | RFQ 목록 |
| `/rfq/:id` | RFQ Detail | RFQ 상세 (동적 라우팅) |
| `/rfq/email-preview` | Email Preview | 이메일 미리보기 |
| `/bidding/draft/create` | Create Draft Rate | 견적 작성 |
| `/bidding/quotation` | Quotation Generator | 견적서 생성 |
| `/bidding/email` | Email Composition | 이메일 작성 |

### API Routes

```
frontend/src/app/api/
├── rfq/
│   ├── route.ts                    # GET /api/rfq (목록)
│   ├── [id]/
│   │   └── route.ts                # GET /api/rfq/:id (상세)
│   └── email/
│       └── route.ts                # POST /api/rfq/email (이메일 파싱)
│
├── bidding/
│   ├── draft/
│   │   └── route.ts                # POST /api/bidding/draft (저장)
│   ├── quotation/
│   │   └── route.ts                # POST /api/bidding/quotation (생성)
│   └── email/
│       └── route.ts                # POST /api/bidding/email (전송)
│
└── ai/
    ├── analyze/
    │   └── route.ts                # POST /api/ai/analyze (AI 분석)
    └── suggest/
        └── route.ts                # POST /api/ai/suggest (AI 추천)
```

---

## 네이밍 규칙 적용 예시

### ✅ 올바른 네이밍

#### 1. Dashboard Component
```typescript
// 경로: /frontend/src/components/dashboard/index.tsx
export function Dashboard() {
  const { stats, isLoading } = useDashboardBinding();

  return (
    <div className="container-responsive">
      <h1 className="typo-display-large">대시보드</h1>
      <StatsCard stats={stats} />
    </div>
  );
}
```

#### 2. RFQ List Hook
```typescript
// 경로: /frontend/src/components/rfq-list/hooks/index.filter.hook.ts
export interface UseRfqFilterReturn {
  filters: RfqFilters;
  setFilter: (key: string, value: string) => void;
  resetFilters: () => void;
}

export function useRfqFilter(): UseRfqFilterReturn {
  const [filters, setFilters] = useState<RfqFilters>({});
  // ...
}
```

#### 3. RFQ Detail Tab Component
```typescript
// 경로: /frontend/src/components/rfq-detail/overview-tab/index.tsx
interface OverviewTabProps {
  rfqId: string;
}

export function OverviewTab({ rfqId }: OverviewTabProps) {
  const { rfqData } = useRfqBinding(rfqId);
  // ...
}
```

### ❌ 잘못된 네이밍

```typescript
// ❌ 파일명에 대문자 사용
/frontend/src/components/RFQList/index.tsx

// ❌ snake_case 사용
/frontend/src/components/rfq_list/index.tsx

// ❌ Hook 파일명에 use prefix
/frontend/src/components/rfq-list/hooks/useRfqFilter.ts

// ❌ 약어 전체 대문자
export function RFQList() {}              // Rfq ✅
export interface RFQItem {}               // RfqItem ✅
```

---

## TypeScript Types

### RFQ Domain Types

```typescript
// 경로: /frontend/src/commons/types/rfq.types.ts

export interface RfqItem {
  id: string;
  title: string;
  status: RfqStatus;
  shipper: string;
  deadline: Date;
  priority: RfqPriority;
  createdAt: Date;
  updatedAt: Date;
}

export type RfqStatus =
  | 'received'      // 접수
  | 'analyzing'     // 분석 중
  | 'draft'         // 작성 중
  | 'sent'          // 발송 완료
  | 'completed';    // 완료

export type RfqPriority = 'high' | 'medium' | 'low';

export interface RfqFilters {
  status?: RfqStatus;
  shipper?: string;
  assignee?: string;
  startDate?: Date;
  endDate?: Date;
}
```

### Bidding Domain Types

```typescript
// 경로: /frontend/src/commons/types/bidding.types.ts

export interface DraftRate {
  id: string;
  rfqId: string;
  oceanFreight: number;
  baf: number;
  faf: number;
  thcPol: number;
  thcPod: number;
  pss: number;
  ebs: number;
  freeTime: number;
  paymentTerms: string;
  transitTime: number;
  validity: Date;
}

export interface QuotationTemplate {
  id: string;
  name: string;
  format: QuotationFormat;
  fields: string[];
}

export type QuotationFormat = 'xlsx' | 'pdf' | 'csv';
```

---

## 구현 우선순위

### Phase 1: Core Features (필수)
1. **Dashboard** - 기본 대시보드
2. **RFQ Management List** - RFQ 목록 및 필터링
3. **RFQ Detail** - RFQ 상세 정보 (Overview 탭 위주)

### Phase 2: Bidding Features
4. **Create Draft Rate** - 견적 작성 기능
5. **Quotation Generator** - 견적서 생성 (Excel/PDF)

### Phase 3: Advanced Features
6. **Email Preview** - 이메일 파싱 및 자동 등록
7. **Email Composition** - AI 기반 이메일 작성

### Phase 4: Enhancement
- AI Analysis (RFQ Detail 탭)
- AI Suggestion (Draft Rate 자동 추천)
- History & Documents (RFQ Detail 탭)

---

## 참고 문서

- **Naming Convention**: [.claude/rules/osm-naming-convention.md](/.claude/rules/osm-naming-convention.md)
- **Frontend Rules**: [.claude/rules/frontend-common.md](/.claude/rules/frontend-common.md)
- **Design Tokens**: [/frontend/src/commons/constants/](/frontend/src/commons/constants/)
- **Spec Kit Guide**: [/docs/frontend/speckit-guide.md](/docs/frontend/speckit-guide.md)

---

**Last Updated**: 2025-11-19
**Maintained By**: Ocean Smart Development Team
