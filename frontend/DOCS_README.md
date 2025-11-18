# 문서 서버 안내

이 프로젝트의 문서는 **루트 레벨 통합 문서 서버**를 사용합니다.

## 📚 문서 위치

Frontend 문서는 다음 위치에서 관리됩니다:
```
/Users/kimjongwook/project/osm-rfq/docs/frontend/
```

## 🚀 문서 서버 실행

Frontend 디렉토리에서:
```bash
npm run docs:serve
```

또는 루트 디렉토리에서:
```bash
cd /Users/kimjongwook/project/osm-rfq
npm run docs:serve
```

## 📝 문서 작성

Frontend 관련 문서를 작성할 때는 루트의 `docs/frontend/` 디렉토리에 작성하세요:

- **컴포넌트 문서**: `docs/frontend/components/`
- **디자인 시스템**: `docs/frontend/design-system/`
- **API 연동**: `docs/frontend/api/`

## 🔧 설정 파일

문서 서버 설정은 루트 레벨의 `mkdocs.yml`에서 관리됩니다.

## ⚠️ 주의사항

`frontend/mkdocs.yml` 파일은 더 이상 사용되지 않습니다.
모든 문서 관련 작업은 루트 레벨 문서 서버를 통해 수행하세요.
