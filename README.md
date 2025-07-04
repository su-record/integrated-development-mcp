# 통합 개발 툴킷 MCP 🚀

모든 개발 도구를 하나로 통합한 MCP (2025년 7월 최신 버전)

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

### Smithery CLI 사용
```bash
npx @smithery/cli run @su-recorde/integrated-development-mcp --key YOUR_KEY
```

### Claude Desktop 설정
```json
{
  "mcpServers": {
    "total-dev-toolkit": {
      "command": "npx",
      "args": [
        "-y",
        "@smithery/cli@latest",
        "run",
        "@su-recorde/integrated-development-mcp",
        "--key",
        "YOUR-KEY"
      ],
      "env": {
        "GITHUB_TOKEN": "ghp_xxxxx",
        "SUPABASE_URL": "https://xxxxx.supabase.co",
        "SUPABASE_ANON_KEY": "eyJxxxxx"
      }
    }
  }
}
```

## 🛠️ 주요 도구

총 40개 이상의 도구 제공:
- 프로젝트 생성 및 관리
- 컴포넌트 자동 생성
- 테스트 코드 생성
- 배포 자동화
- 코드 변환 (React ↔ Flutter)
- 성능 최적화

## 📄 라이선스

MIT
