# StudyPilot AI

AI 기반 전과목 시험공부 플랫폼 MVP입니다.

현재 버전은 실제 AI API 연결 전, mock 데이터로 전체 학습 흐름을 체험할 수 있는 React + Vite + TypeScript 기반 PWA 웹앱입니다.

## 포함 기능

- 메인 대시보드
- 과목 생성/선택 UI
- 예시 과목 5개: 운영체제, 소프트웨어공학, 데이터베이스, 수학, 영어
- 자료 추가 화면: 파일 업로드, 공개 교재 선택, 텍스트 직접 입력
- AI 필기/요약 mock UI
- 중요 개념 표시와 편집 가능한 학습 카드
- 기출 변형 문제 생성 UI
- CBT 스타일 문제 풀이
- 오답노트 자동 저장 mock
- 망각 곡선 기반 복습 일정
- 알림 학습 목업
- 시험 D-day 계획
- 집중 모드 타이머
- 약점 분석 대시보드
- 다운로드/PWA 안내 페이지

## 기술 스택

- React
- Vite
- TypeScript
- Tailwind CSS 설정 포함
- PWA manifest/service worker
- mock data 기반 프론트엔드 MVP

## 실행 방법

의존성을 설치한 뒤 개발 서버를 실행합니다.

```powershell
npm install
npm run dev
```

브라우저에서 접속:

```text
http://localhost:5173
```

정식 Vite 앱이므로 `index.html`을 직접 여는 방식이 아니라 개발 서버로 실행하는 것을 권장합니다.

## 향후 개발 방향

1. Supabase/PostgreSQL 저장소 연결
2. Kakao OAuth 및 이메일 로그인 연결
3. OpenAI API 기반 자료 분석/문제 생성
4. PDF.js, OCR, Whisper 기반 자료/강의 분석
5. Web Push 및 이메일 알림
6. Kakao AlimTalk 확장 구조 추가
7. Windows/macOS/Android/iOS 패키징
