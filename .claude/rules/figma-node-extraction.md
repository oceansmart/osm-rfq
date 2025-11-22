# Figma 노드 및 채널 정보 추출 규칙

> Figma URL에서 node-id와 채널 정보를 추출하여 MCP 도구에 전달하는 규칙
>
> **Version**: 1.0.0
> **Last Updated**: 2025-11-22
> **Status**: ✅ Active

---

## 📋 목적

사용자가 Figma 링크 또는 채널 정보를 제공할 때, Claude가 자동으로 node-id와 channel을 추출하여 MCP (Model Context Protocol) 도구에 전달할 수 있도록 합니다.

---

## 🔍 노드 ID 추출

### 입력 패턴

사용자가 다음과 같은 형식으로 Figma URL을 제공하는 경우:

```
https://www.figma.com/design/YC4nEYbBPIkTa0XKIf9bMu/Request-for-Quotation?node-id=166-9842&t=2D8U0kCoCHf76Crd-4
https://www.figma.com/design/YC4nEYbBPIkTa0XKIf9bMu/Request-for-Quotation?node-id=157-9648&t=2D8U0kCoCHf76Crd-4
https://www.figma.com/design/YC4nEYbBPIkTa0XKIf9bMu/Request-for-Quotation?node-id=157-9252&t=2D8U0kCoCHf76Crd-4
```

### 추출 패턴

**정규 표현식**: `node-id=([0-9:-]+)`

**추출 결과**:
```
166-9842
157-9648
157-9252
```

### Node ID 포맷 변환

Figma URL의 `node-id`는 하이픈(`-`) 구분자를 사용하지만, MCP 도구에 전달할 때는 콜론(`:`)으로 변환해야 합니다.

**변환 규칙**:
```
URL Format:     166-9842  →  MCP Format:  166:9842
URL Format:     157-9648  →  MCP Format:  157:9648
URL Format:     157-9252  →  MCP Format:  157:9252
```

**변환 예시**:
```typescript
// ✅ 올바른 변환
const urlNodeId = "166-9842";
const mcpNodeId = urlNodeId.replace(/-/g, ':');  // "166:9842"

// ❌ 잘못된 사용 (변환하지 않음)
const nodeId = "166-9842";  // MCP 도구에 그대로 전달 - 오류 발생
```

---

## 📡 채널 정보 추출

### 입력 패턴

사용자가 다음과 같은 형식으로 채널 정보를 제공하는 경우:

```
Connected to server in channel: xpin8e0d
```

### 추출 패턴

**정규 표현식**: `channel:\s*([a-zA-Z0-9]+)`

**추출 결과**:
```
xpin8e0d
```

---

## 🛠️ MCP 도구 활용

### 1. Figma 노드 정보 가져오기

**도구**: `mcp__TalkToFigma__get_node_info`

```typescript
// ✅ 단일 노드 정보 가져오기
mcp__TalkToFigma__get_node_info({
  nodeId: "166:9842"  // 하이픈을 콜론으로 변환한 값
});
```

### 2. 여러 노드 정보 가져오기

**도구**: `mcp__TalkToFigma__get_nodes_info`

```typescript
// ✅ 여러 노드 정보 한 번에 가져오기
mcp__TalkToFigma__get_nodes_info({
  nodeIds: [
    "166:9842",
    "157:9648",
    "157:9252"
  ]
});
```

### 3. 채널 연결

**도구**: `mcp__TalkToFigma__join_channel`

```typescript
// ✅ Figma 채널 연결
mcp__TalkToFigma__join_channel({
  channel: "xpin8e0d"
});
```

---

## 📝 프롬프트 패턴

### 패턴 1: 노드 ID만 제공된 경우

**사용자 입력**:
```
노드 추출
https://www.figma.com/design/YC4nEYbBPIkTa0XKIf9bMu/Request-for-Quotation?node-id=166-9842&t=2D8U0kCoCHf76Crd-4
https://www.figma.com/design/YC4nEYbBPIkTa0XKIf9bMu/Request-for-Quotation?node-id=157-9648&t=2D8U0kCoCHf76Crd-4
```

**Claude 처리 순서**:

1. URL에서 `node-id` 추출
2. 하이픈을 콜론으로 변환
3. `get_nodes_info` 도구 호출
4. 노드 정보를 사용자에게 요약 제공

```typescript
// 1. 추출된 node-id (URL 형식)
const nodeIdsFromUrl = [
  "166-9842",
  "157-9648"
];

// 2. MCP 형식으로 변환
const mcpNodeIds = nodeIdsFromUrl.map(id => id.replace(/-/g, ':'));
// ["166:9842", "157:9648"]

// 3. MCP 도구 호출
mcp__TalkToFigma__get_nodes_info({
  nodeIds: mcpNodeIds
});
```

### 패턴 2: 채널 정보만 제공된 경우

**사용자 입력**:
```
채널 추출
Connected to server in channel: xpin8e0d
```

**Claude 처리 순서**:

1. 텍스트에서 `channel: <id>` 추출
2. `join_channel` 도구 호출
3. 연결 성공 메시지 제공

```typescript
// 1. 추출된 channel
const channel = "xpin8e0d";

// 2. MCP 도구 호출
mcp__TalkToFigma__join_channel({
  channel: channel
});
```

### 패턴 3: 노드 + 채널 정보 모두 제공된 경우

**사용자 입력**:
```
노드와 채널 정보
Connected to server in channel: xpin8e0d

노드 추출:
https://www.figma.com/design/YC4nEYbBPIkTa0XKIf9bMu/Request-for-Quotation?node-id=166-9842&t=2D8U0kCoCHf76Crd-4
https://www.figma.com/design/YC4nEYbBPIkTa0XKIf9bMu/Request-for-Quotation?node-id=157-9648&t=2D8U0kCoCHf76Crd-4
```

**Claude 처리 순서**:

1. 채널 연결 (`join_channel`)
2. 노드 정보 가져오기 (`get_nodes_info`)
3. 종합 정보 제공

```typescript
// 1. 채널 연결
mcp__TalkToFigma__join_channel({
  channel: "xpin8e0d"
});

// 2. 노드 정보 가져오기
mcp__TalkToFigma__get_nodes_info({
  nodeIds: [
    "166:9842",
    "157:9648"
  ]
});
```

---

## ⚠️ 주의사항

### 1. Node ID 포맷 변환 필수

```typescript
// ❌ 잘못된 사용 (하이픈 그대로 전달)
mcp__TalkToFigma__get_node_info({
  nodeId: "166-9842"  // 오류 발생
});

// ✅ 올바른 사용 (콜론으로 변환)
mcp__TalkToFigma__get_node_info({
  nodeId: "166:9842"  // 정상 동작
});
```

### 2. 채널 연결 우선순위

노드 정보를 가져오기 전에 채널에 먼저 연결해야 합니다.

```typescript
// ✅ 올바른 순서
await mcp__TalkToFigma__join_channel({ channel: "xpin8e0d" });
await mcp__TalkToFigma__get_nodes_info({ nodeIds: ["166:9842"] });

// ❌ 잘못된 순서 (채널 연결 없이 노드 정보 요청)
await mcp__TalkToFigma__get_nodes_info({ nodeIds: ["166:9842"] });  // 오류 발생
```

### 3. 여러 노드 처리 최적화

단일 노드 요청보다 `get_nodes_info`를 사용하여 한 번에 여러 노드를 가져오는 것이 효율적입니다.

```typescript
// ❌ 비효율적 (여러 번 요청)
for (const nodeId of nodeIds) {
  await mcp__TalkToFigma__get_node_info({ nodeId });
}

// ✅ 효율적 (한 번에 요청)
await mcp__TalkToFigma__get_nodes_info({ nodeIds });
```

---

## 🔄 자동화 워크플로우

### Step 1: 사용자 입력 인식

Claude는 다음 패턴을 자동으로 인식합니다:

1. `https://www.figma.com/design/...?node-id=...` 형식의 URL
2. `Connected to server in channel: ...` 형식의 채널 정보

### Step 2: 정보 추출

- **Node ID**: URL의 `node-id` 파라미터 값 (하이픈을 콜론으로 변환)
- **Channel**: `channel:` 다음의 영숫자 문자열

### Step 3: MCP 도구 호출

- 채널 정보가 있으면 먼저 `join_channel` 호출
- 노드 ID가 있으면 `get_nodes_info` 호출 (여러 노드는 배열로)

### Step 4: 결과 제공

사용자에게 다음 정보를 제공:

- 추출된 노드 ID 목록
- 연결된 채널 정보
- 노드의 주요 속성 (이름, 타입, 크기 등)

---

## 📊 예시 시나리오

### 시나리오 1: 레이아웃 컴포넌트 구현

**사용자**:
```
다음 Figma 노드들을 분석해서 Layout 컴포넌트를 구현해줘

Connected to server in channel: xpin8e0d

https://www.figma.com/design/YC4nEYbBPIkTa0XKIf9bMu/Request-for-Quotation?node-id=166-9842&t=2D8U0kCoCHf76Crd-4
https://www.figma.com/design/YC4nEYbBPIkTa0XKIf9bMu/Request-for-Quotation?node-id=157-9648&t=2D8U0kCoCHf76Crd-4
```

**Claude 처리**:

1. **채널 연결**:
   ```typescript
   mcp__TalkToFigma__join_channel({ channel: "xpin8e0d" });
   ```

2. **노드 정보 가져오기**:
   ```typescript
   mcp__TalkToFigma__get_nodes_info({
     nodeIds: ["166:9842", "157:9648"]
   });
   ```

3. **노드 분석 및 구현**:
   - 노드 구조 파악
   - CSS Modules 작성
   - React 컴포넌트 구현

4. **결과 제공**:
   - Layout 컴포넌트 코드
   - styles.module.css 파일
   - 구현 설명

---

## ✅ 체크리스트

작업 시작 전:

- [ ] Figma URL에서 `node-id` 추출
- [ ] **하이픈(`-`)을 콜론(`:`)으로 변환** (MCP 도구 요구사항)
- [ ] 채널 정보 추출 (있는 경우)
- [ ] 채널 연결 (우선 실행)
- [ ] 노드 정보 가져오기 (변환된 node-id 사용)

---

## 📚 참고 자료

- **MCP TalkToFigma 도구**: [도구 문서](https://github.com/figma/model-context-protocol)
- **OSM CSS 규칙**: [osm-css-styling-rules.md](.claude/rules/osm-css-styling-rules.md)
- **Figma 디자인**: [Request-for-Quotation](https://www.figma.com/design/YC4nEYbBPIkTa0XKIf9bMu/)

---

**Last Updated**: 2025-11-22
**Maintained By**: Ocean Smart Development Team
