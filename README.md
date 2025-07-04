# 통합 개발 툴킷 MCP 🚀

모든 개발 도구를 하나로 통합한 MCP (Model Context Protocol)

## 🎯 특징

기존 인기 MCP들의 기능을 하나로 통합:
- 🧠 **사고 도구** (Sequential Thinking, Clear Thought)
- 📝 **컨텍스트 관리** (Context7 스타일)
- ⏰ **시간 관리** (타이머, 시간대 변환)
- 🎨 **UI 개발** (Shadcn UI 통합)
- 🐙 **GitHub** (레포지토리 관리)
- 🌐 **브라우저 도구** (스크래핑, 자동화)
- 🌐 **프론트엔드** (React, Vue, Next.js 등)
- 📱 **Flutter** (크로스플랫폼 모바일)
- 🐍 **Python** (FastAPI, Django)
- 🗄️ **Supabase** (데이터베이스)
- 🔄 **통합 기능** (풀스택 프로젝트)

## 📦 설치

### NPM 사용 (권장)
```bash
npm install -g @su-record/integrated-development-mcp
```

### Claude Desktop 설정

#### Windows
`%APPDATA%\Claude\claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "integrated-dev": {
      "command": "integrated-dev-mcp",
      "env": {
        "GITHUB_TOKEN": "ghp_xxxxx",
        "SUPABASE_URL": "https://xxxxx.supabase.co",
        "SUPABASE_ANON_KEY": "eyJxxxxx"
      }
    }
  }
}
```

#### Mac/Linux
`~/.config/Claude/claude_desktop_config.json` (Mac: `~/Library/Application Support/Claude/`):
```json
{
  "mcpServers": {
    "integrated-dev": {
      "command": "integrated-dev-mcp",
      "env": {
        "GITHUB_TOKEN": "ghp_xxxxx",
        "SUPABASE_URL": "https://xxxxx.supabase.co",
        "SUPABASE_ANON_KEY": "eyJxxxxx"
      }
    }
  }
}
```

### Cursor 설정

`~/.cursor/config/mcp.json`:
```json
{
  "mcpServers": {
    "integrated-dev": {
      "command": "integrated-dev-mcp",
      "env": {
        "GITHUB_TOKEN": "ghp_xxxxx",
        "SUPABASE_URL": "https://xxxxx.supabase.co",
        "SUPABASE_ANON_KEY": "eyJxxxxx"
      }
    }
  }
}
```

### 환경 변수 설명

| 변수 | 설명 | 필수 여부 |
|------|------|-----------|
| `GITHUB_TOKEN` | GitHub Personal Access Token | 선택 (GitHub 기능 사용 시) |
| `SUPABASE_URL` | Supabase 프로젝트 URL | 선택 (Supabase 기능 사용 시) |
| `SUPABASE_ANON_KEY` | Supabase Anon Key | 선택 (Supabase 기능 사용 시) |

### Smithery 사용 (대안)
```bash
npx @smithery/cli run @su-record/integrated-development-mcp
```

## 🛠️ 주요 도구

총 20개의 강력한 도구 제공:

### 사고 및 컨텍스트 도구
- `sequential_thinking` - 단계별 사고 과정 정리
- `clear_thought` - 명확한 사고 정리
- `save_context` - 컨텍스트 저장
- `load_context` - 저장된 컨텍스트 불러오기

### 시간 관리
- `set_timer` - 타이머 설정
- `get_timezone` - 시간대 변환

### UI/프론트엔드 개발
- `install_shadcn` - Shadcn UI 컴포넌트 설치
- `create_ui_component` - UI 컴포넌트 생성
- `create_web_app` - 웹 애플리케이션 생성
- `create_component` - React/Vue 컴포넌트 생성

### 모바일 개발
- `create_flutter_app` - Flutter 앱 생성
- `create_widget` - Flutter 위젯 생성

### 백엔드 개발
- `create_api` - API 서버 생성 (FastAPI/Express)
- `setup_supabase` - Supabase 프로젝트 설정
- `create_table` - 데이터베이스 테이블 생성

### 통합 기능
- `create_fullstack_app` - 풀스택 애플리케이션 생성
- `convert_component` - React ↔ Flutter 컴포넌트 변환
- `create_repo` - GitHub 레포지토리 생성
- `web_scrape` - 웹 스크래핑
- `fetch_html` - HTML 가져오기

## 💡 사용 예시

```javascript
// React 컴포넌트 생성
await create_component({
  name: "UserProfile",
  type: "react",
  framework: "next",
  typescript: true
});

// Flutter 앱 생성
await create_flutter_app({
  name: "my_app",
  package: "com.example.myapp",
  template: "material"
});

// 풀스택 앱 생성
await create_fullstack_app({
  name: "awesome-project",
  frontend: "next",
  backend: "fastapi",
  database: "supabase"
});
```

## 🤝 기여

이슈와 PR은 언제나 환영합니다!

## 📄 라이선스

MIT

---

Made with ❤️ by Su