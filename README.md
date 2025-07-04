# 통합 개발 툴킷 MCP 🚀

[![npm version](https://badge.fury.io/js/@su-record%2Fintegrated-development-mcp.svg)](https://www.npmjs.com/package/@su-record/integrated-development-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

모든 개발 도구를 하나로 통합한 강력한 MCP (Model Context Protocol) 서버

## ✨ 주요 기능

하나의 MCP로 모든 개발 작업을 처리하세요:

- 🧠 **스마트 사고 도구** - 체계적인 문제 해결과 사고 정리
- 📝 **컨텍스트 관리** - 프로젝트 컨텍스트 저장 및 로드
- ⏰ **시간 관리** - 타이머 설정과 시간대 변환
- 🎨 **프론트엔드 개발** - React, Vue, Next.js 프로젝트 및 컴포넌트 생성
- 📱 **모바일 개발** - Flutter 앱과 위젯 개발
- 🔧 **백엔드 개발** - FastAPI, Express API 서버 구축
- 🗄️ **데이터베이스** - Supabase 통합 및 테이블 관리
- 🌐 **웹 도구** - 웹 스크래핑과 HTML 가져오기
- 🔄 **코드 변환** - React ↔ Flutter 컴포넌트 자동 변환

## 📦 설치

```bash
npm install -g @su-record/integrated-development-mcp
```

## 🚀 사용 방법

### Claude Desktop / Cursor 설정

MCP 설정 파일에 다음 내용을 추가하세요:

```json
{
  "mcpServers": {
    "integrated-dev": {
      "command": "npx",
      "args": ["-y", "@su-record/integrated-development-mcp"],
      "env": {
        "GITHUB_TOKEN": "ghp_your_token_here",
        "SUPABASE_URL": "https://your-project.supabase.co",
        "SUPABASE_ANON_KEY": "your_anon_key_here"
      }
    }
  }
}
```

> 💡 **팁**: `-y` 플래그를 추가하여 자동 설치를 활성화합니다.

### 환경 변수 (선택사항)

| 변수 | 설명 | 필수 |
|------|------|------|
| `GITHUB_TOKEN` | GitHub API 접근용 토큰 | ❌ |
| `SUPABASE_URL` | Supabase 프로젝트 URL | ❌ |
| `SUPABASE_ANON_KEY` | Supabase Anon Key | ❌ |

> 💡 환경 변수 없이도 대부분의 기능을 사용할 수 있습니다!

## 🛠️ 사용 가능한 도구들

### 사고 및 컨텍스트 도구
- **sequential_thinking** - 복잡한 문제를 단계별로 분석
- **clear_thought** - 생각을 명확하게 정리
- **save_context** - 현재 작업 컨텍스트 저장
- **load_context** - 저장된 컨텍스트 불러오기

### 시간 관리 도구
- **set_timer** - 작업 타이머 설정
- **get_timezone** - 세계 시간대 변환

### 프론트엔드 개발
- **create_web_app** - React/Vue/Next.js 앱 생성
- **create_component** - 컴포넌트 자동 생성
- **install_shadcn** - Shadcn UI 컴포넌트 설치
- **create_ui_component** - 커스텀 UI 컴포넌트 생성

### 모바일 개발
- **create_flutter_app** - Flutter 프로젝트 생성
- **create_widget** - Flutter 위젯 생성

### 백엔드 개발
- **create_api** - REST API 서버 생성
- **setup_supabase** - Supabase 프로젝트 설정
- **create_table** - 데이터베이스 테이블 생성

### 통합 도구
- **create_fullstack_app** - 풀스택 애플리케이션 생성
- **convert_component** - React ↔ Flutter 변환
- **create_repo** - GitHub 레포지토리 생성
- **web_scrape** - 웹페이지 데이터 추출
- **fetch_html** - HTML 콘텐츠 가져오기

## 💡 활용 예시

### React 컴포넌트 생성
```typescript
create_component({
  name: "UserProfile",
  type: "react",
  framework: "next",
  typescript: true,
  props: ["user", "onEdit"]
})
```

### Flutter 앱 생성
```typescript
create_flutter_app({
  name: "my_app",
  package: "com.example.myapp",
  features: ["navigation", "state"]
})
```

### 풀스택 프로젝트 생성
```typescript
create_fullstack_app({
  name: "saas-starter",
  frontend: "next",
  backend: "fastapi",
  database: "supabase",
  auth: true
})
```

## 🤝 기여하기

버그 리포트와 기능 제안은 [GitHub Issues](https://github.com/su-record/integrated-development-mcp/issues)에서 받고 있습니다.

## 📄 라이선스

MIT License - 자유롭게 사용하세요!

---

<p align="center">By <a href="https://github.com/su-record">Su</a> × <a href="https://claude.ai">Claude</a> 🤖</p>