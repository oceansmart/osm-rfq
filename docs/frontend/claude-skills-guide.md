# Claude Skills 사용 가이드

> **OSM RFQ 프로젝트에서 Claude Skills를 활용하여 반복 작업을 자동화하세요**

---

## 📚 Claude Skills란?

**Claude Skills**는 Claude Code의 워크플로우를 커스터마이징하는 **모듈형 기능**입니다.

### 주요 특징

- ✅ **간단한 생성** - SKILL.md 파일 하나로 완성
- ✅ **토큰 효율적** - 각 스킬이 수십 개 토큰만 사용
- ✅ **모듈화** - 필요할 때만 로드
- ✅ **재사용 가능** - 여러 프로젝트에서 공유

---

## 🎯 설치 확인

### Anthropic Skills 마켓플레이스

```bashx
# 마켓플레이스 목록 확인
claude plugin marketplace list

# 출력 예시:
# ❯ anthropic-agent-skills
#   Source: GitHub (anthropics/skills)
```

### 사용 가능한 공식 Skills

OSM RFQ 프로젝트에서 활용할 수 있는 공식 Skills:

```bash
~/.claude/plugins/marketplaces/anthropic-agent-skills/
├── algorithmic-art/        # 알고리즘 아트 생성
├── artifacts-builder/      # 복잡한 HTML 아티팩트 생성
├── brand-guidelines/       # Anthropic 브랜드 가이드라인 적용
├── canvas-design/          # PNG/PDF 디자인 생성
├── document-skills/        # PDF, DOCX, XLSX, PPTX 생성
├── frontend-design/        # 프론트엔드 인터페이스 디자인
├── internal-comms/         # 내부 커뮤니케이션 작성
├── mcp-builder/            # MCP 서버 생성
├── skill-creator/          # 새 스킬 생성 도구
├── slack-gif-creator/      # Slack GIF 애니메이션 생성
└── template-skill/         # 스킬 템플릿
```

---

## 🚀 Skills 사용 방법

### 방법 1: Skill 명령어 사용

```bash
# Claude Code에서 스킬 활성화
/skill skill-creator

# 또는 자연어로 요청
"skill-creator 스킬을 활성화해줘"
```

### 방법 2: 직접 프롬프트

```
"다음 스킬을 실행해줘:
- 스킬명: frontend-design
- 작업: 랜딩 페이지 디자인
- 섹션: Hero, Features, Pricing, CTA"
```

---

## 💡 OSM RFQ에서 유용한 Skills

### 1. frontend-design

**용도**: 프로덕션급 프론트엔드 인터페이스 생성

**사용 예시**:
```bash
/skill frontend-design

"Next.js 컴포넌트를 디자인해줘:
- 컴포넌트: UserCard
- 스타일: Tailwind CSS + CSS Variables
- Variants: default, compact, detailed"
```

**활용 시나리오**:
- 새 페이지 디자인
- 컴포넌트 UI 개선
- 반응형 레이아웃 생성

### 2. mcp-builder

**용도**: Model Context Protocol 서버 생성

**사용 예시**:
```bash
/skill mcp-builder

"Supabase 데이터베이스 연동 MCP 서버를 만들어줘"
```

**활용 시나리오**:
- 외부 API 통합
- 데이터베이스 도구
- 커스텀 서비스 연결

### 3. skill-creator

**용도**: 프로젝트별 커스텀 스킬 생성

**사용 예시**:
```bash
/skill skill-creator

"Figma 디자인 토큰을 CSS Variables로 변환하는 스킬을 만들어줘"
```

**활용 시나리오**:
- 프로젝트 전용 워크플로우
- 반복 작업 자동화
- 팀 표준화

### 4. canvas-design

**용도**: PNG/PDF 디자인 생성

**사용 예시**:
```bash
/skill canvas-design

"OSM RFQ 로고를 디자인해줘 - 파란색 계열, 깔끔한 스타일"
```

**활용 시나리오**:
- 로고 생성
- 아이콘 디자인
- 마케팅 자료

---

## 📦 프로젝트별 커스텀 Skills 디렉토리

### 구조

```
osm-rfq/
└── .claude/
    ├── commands/          # Spec Kit 슬래시 명령어
    └── skills/            # 프로젝트 커스텀 스킬 (향후 추가)
```

### 커스텀 스킬 생성 예정

향후 OSM RFQ 프로젝트에 필요한 커스텀 스킬:

1. **figma-token-converter**
   - Figma Tokens → CSS Variables 변환
   - Figma Tokens → TypeScript types 변환
   - 토큰 동기화 자동화

2. **component-generator**
   - Next.js 컴포넌트 + Storybook 생성
   - TypeScript 타입 자동 정의
   - CSS Variables 스타일링 템플릿

3. **tdd-workflow**
   - Playwright 테스트 우선 작성
   - TDD Red-Green-Refactor 사이클
   - Constitution 체크리스트

---

## 🎨 Skills 작성 구조

### 기본 구조

```
my-skill/
├── SKILL.md          # 필수: 스킬 정의 및 지침
└── references/       # 선택: 상세 문서, 예제
    ├── guide.md
    └── examples/
```

### SKILL.md 예시

```markdown
---
name: figma-token-converter
description: Convert Figma Tokens Studio JSON to CSS Variables and TypeScript types
---

# Figma Token Converter

## Quick Reference

\`\`\`bash
# Convert to CSS Variables
"Figma 토큰을 CSS로 변환해줘"
\`\`\`

## Task Instructions

1. Read tokens from `frontend/figma-tokens/*.json`
2. Convert to CSS Variables
3. Update `frontend/src/app/globals.css`
4. Validate structure

## Core Principles

- Maintain primitive → semantic architecture
- Preserve dark mode overrides
- Follow naming conventions

## Reference Files

[references/conversion-guide.md](references/conversion-guide.md)
```

---

## 🔧 Skills vs Spec Kit 비교

| 항목 | Spec Kit | Claude Skills |
|------|----------|---------------|
| **위치** | `.claude/commands/` | `.claude/skills/` |
| **용도** | 프로젝트 워크플로우 | 도메인별 작업 자동화 |
| **예시** | `/speckit.specify` | `/skill frontend-design` |
| **구조** | Markdown 명령어 | SKILL.md + 리소스 |
| **범위** | 프로젝트 전반 | 특정 작업/도메인 |

### 함께 사용하기

```bash
# 1. Spec Kit으로 기능 명세
/speckit.specify "사용자 프로필 컴포넌트 구현"

# 2. Skills로 디자인 생성
/skill frontend-design
"UserProfile 컴포넌트 UI를 디자인해줘"

# 3. Skills로 컴포넌트 생성
/skill component-generator  # 향후 커스텀 스킬
"UserProfile 컴포넌트와 Storybook을 생성해줘"

# 4. Spec Kit으로 작업 완료
/speckit.tasks
```

---

## 📚 참고 자료

### 공식 문서

- [Anthropic Skills 공식 발표](https://www.anthropic.com/news/skills)
- [Claude Code Skills 문서](https://docs.claude.com/en/docs/claude-code/skills)
- [공식 Skills Repository](https://github.com/anthropics/skills)

### 커뮤니티 리소스

- [Awesome Claude Skills (travisvn)](https://github.com/travisvn/awesome-claude-skills)
- [Superpowers (obra)](https://github.com/obra/superpowers)
- [Awesome Claude Skills (ComposioHQ)](https://github.com/ComposioHQ/awesome-claude-skills)

### 블로그

- [Simon Willison: Claude Skills are awesome](https://simonwillison.net/2025/Oct/16/claude-skills/)

---

## 💻 실전 활용 예제

### 예제 1: 컴포넌트 디자인

```bash
# 1. Frontend Design 스킬 활성화
/skill frontend-design

# 2. 컴포넌트 디자인 요청
"Button 컴포넌트를 디자인해줘:
- Variants: primary, secondary, outline
- Sizes: sm, md, lg
- States: default, hover, active, disabled
- 스타일: Tailwind CSS + OSM RFQ CSS Variables"

# 3. 결과 검토 및 수정
"primary variant를 더 밝게 해줘"
```

### 예제 2: MCP 서버 생성

```bash
# 1. MCP Builder 스킬 활성화
/skill mcp-builder

# 2. MCP 서버 생성
"GitHub API 연동 MCP 서버를 만들어줘:
- 기능: Repository 조회, Issue 생성, PR 확인
- 언어: TypeScript"

# 3. 테스트 및 통합
```

### 예제 3: 커스텀 스킬 생성

```bash
# 1. Skill Creator 활성화
/skill skill-creator

# 2. 새 스킬 요청
"다음 스킬을 만들어줘:
- 이름: component-generator
- 기능: Next.js 컴포넌트 + Storybook + TypeScript 생성
- 적용: OSM RFQ 디자인 시스템 사용"

# 3. 생성된 스킬을 .claude/skills/에 저장
```

---

## 🎯 Best Practices

### 1. Progressive Disclosure (점진적 공개)

스킬은 3단계로 구성:

**Level 1: 짧은 설명** (YAML frontmatter)
```yaml
description: 200자 이하 간단한 설명
```

**Level 2: 빠른 참조** (SKILL.md)
- ~50줄 길이
- 1-2개 코드 블록

**Level 3: 상세 문서** (references/)
- 완전한 가이드
- 예제 모음

### 2. 명확한 Task Instructions

```markdown
## Task Instructions

1. Step 1: 구체적 작업
2. Step 2: 다음 단계
3. Step 3: 검증
```

### 3. Core Principles 정의

```markdown
## Core Principles

- Constitution 준수
- 디자인 토큰 사용
- 테스트 우선
```

---

## 🚧 향후 계획

### Phase 1: 필수 스킬 생성

1. ✅ `.claude/skills/` 디렉토리 준비 완료
2. ⏳ figma-token-converter 스킬 생성
3. ⏳ component-generator 스킬 생성
4. ⏳ tdd-workflow 스킬 생성

### Phase 2: 고급 스킬

5. ⏳ api-generator 스킬 (백엔드 구축 후)
6. ⏳ spec-kit-helper 스킬
7. ⏳ 추가 프로젝트별 스킬

### Phase 3: 팀 공유

8. ⏳ 스킬 문서화
9. ⏳ 팀 워크플로우 통합
10. ⏳ 베스트 프랙티스 수립

---

## 📝 스킬 작성 체크리스트

### 필수 요소

- ✅ YAML frontmatter (name, description)
- ✅ Quick Reference
- ✅ Task Instructions
- ✅ 200자 이하 description

### 권장 요소

- ✅ Core Principles
- ✅ Reference Files
- ✅ Examples
- ✅ Error Handling

### 지양할 것

- ❌ 너무 긴 설명 (150줄 초과)
- ❌ 많은 코드 블록 (3개 이상)
- ❌ 상세한 API 문서 (references/로 분리)

---

## 🎉 결론

Claude Skills를 활용하면:

- ✅ **워크플로우 자동화** - 반복 작업 제거
- ✅ **팀 표준화** - 일관된 작업 방식
- ✅ **생산성 향상** - 빠른 개발 속도
- ✅ **품질 개선** - Constitution 준수

**OSM RFQ 프로젝트에 맞는 커스텀 스킬을 만들어 보세요!** 🚀

---

**작성일**: 2025-11-18
**버전**: 1.0.0
**관련 문서**: [CLAUDE.md](/CLAUDE.md), [Constitution](/.specify/memory/constitution.md)
