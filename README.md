# StudyPilot AI

AI 기반 전과목 시험공부 플랫폼 MVP입니다.

현재 버전은 실제 AI API 연결 전, mock 데이터로 전체 학습 흐름을 체험할 수 있는 정적 PWA 웹앱입니다.

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

## 실행 방법

의존성 설치 없이 실행할 수 있습니다.

```powershell
python -m http.server 5173
```

브라우저에서 접속:

```text
http://localhost:5173
```

Python이 없다면 `index.html`을 직접 열어도 대부분의 UI를 확인할 수 있습니다. 단, PWA service worker는 로컬 서버에서 확인하는 것을 권장합니다.

## 향후 개발 방향

1. React + Vite + TypeScript로 전환
2. Supabase/PostgreSQL 저장소 연결
3. Kakao OAuth 및 이메일 로그인 연결
4. OpenAI API 기반 자료 분석/문제 생성
5. PDF.js, OCR, Whisper 기반 자료/강의 분석
6. Web Push 및 이메일 알림
7. Kakao AlimTalk 확장 구조 추가
