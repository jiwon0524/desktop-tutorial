const subjects = [
  {
    id: "os",
    title: "운영체제",
    field: "컴퓨터공학",
    exam: "중간고사 D-12",
    progress: 68,
    readiness: 72,
    color: "blue",
    template: "개념 구조도 + 코드/시스템 예시 + CBT 문제",
    materials: ["프로세스와 스레드 강의자료.pdf", "교착상태 기출 20문항"],
    concepts: ["프로세스 상태 전이", "교착상태 4조건", "스케줄링 알고리즘"],
    weak: "교착상태 조건 문제를 자주 틀립니다.",
    question: {
      type: "객관식",
      difficulty: "보통",
      prompt: "교착상태가 발생하기 위한 필요 조건이 아닌 것은?",
      choices: ["상호 배제", "점유와 대기", "선점 가능", "환형 대기"],
      answer: 2,
      explanation: "교착상태의 4가지 필요 조건은 상호 배제, 점유와 대기, 비선점, 환형 대기입니다. 선점 가능은 교착상태를 깨는 방향입니다.",
      concept: "교착상태 4조건"
    }
  },
  {
    id: "se",
    title: "소프트웨어공학",
    field: "대학생",
    exam: "기말 프로젝트 D-21",
    progress: 54,
    readiness: 61,
    color: "green",
    template: "프로세스 비교표 + 사례형 문제 + 서술형 대비",
    materials: ["요구사항 분석 노트", "UML 정리"],
    concepts: ["요구사항 명세", "애자일", "테스트 케이스"],
    weak: "검증과 확인의 차이를 헷갈립니다.",
    question: {
      type: "OX",
      difficulty: "쉬움",
      prompt: "확인(validation)은 제품이 명세대로 만들어졌는지 검사하는 활동이다.",
      choices: ["O", "X"],
      answer: 1,
      explanation: "명세대로 만들었는지는 검증(verification), 사용자가 원하는 제품인지 확인하는 것은 확인(validation)입니다.",
      concept: "Verification vs Validation"
    }
  },
  {
    id: "db",
    title: "데이터베이스",
    field: "컴퓨터공학",
    exam: "SQL 시험 D-9",
    progress: 73,
    readiness: 66,
    color: "purple",
    template: "관계대수 + SQL 빈칸 + 조인 비교 훈련",
    materials: ["정규화 요약", "SQL JOIN 문제집"],
    concepts: ["정규화", "자연조인", "트랜잭션 격리성"],
    weak: "자연조인과 세타조인을 헷갈립니다.",
    question: {
      type: "SQL",
      difficulty: "어려움",
      prompt: "학생 테이블과 수강 테이블에서 같은 학번을 기준으로 학생 이름과 과목명을 조회하는 JOIN 조건을 고르세요.",
      choices: ["ON 학생.학번 = 수강.학번", "ON 학생.이름 = 수강.과목명", "WHERE 학번 IS NULL", "GROUP BY 과목명"],
      answer: 0,
      explanation: "두 테이블의 공통 키인 학번을 기준으로 조인해야 학생별 수강 과목을 연결할 수 있습니다.",
      concept: "JOIN 조건"
    }
  },
  {
    id: "math",
    title: "수학",
    field: "고등학생/대학생",
    exam: "모의고사 D-15",
    progress: 47,
    readiness: 58,
    color: "orange",
    template: "공식 정리 + 단계별 풀이 + 유사 문제",
    materials: ["미분 공식 노트", "수열 기출"],
    concepts: ["극한", "미분계수", "등비수열"],
    weak: "풀이 중 부호 실수가 반복됩니다.",
    question: {
      type: "수학 풀이",
      difficulty: "보통",
      prompt: "f(x)=x^2+3x일 때 f'(2)의 값은?",
      choices: ["5", "6", "7", "8"],
      answer: 2,
      explanation: "f'(x)=2x+3이므로 f'(2)=7입니다.",
      concept: "도함수"
    }
  },
  {
    id: "english",
    title: "영어",
    field: "어학/수능/토익",
    exam: "단어 시험 D-5",
    progress: 81,
    readiness: 75,
    color: "teal",
    template: "단어장 + 문법 포인트 + 독해 선지 분석",
    materials: ["토익 Part 5 오답", "수능 독해 지문"],
    concepts: ["관계대명사", "분사구문", "문장 삽입"],
    weak: "문장 삽입 문제에서 연결사를 놓칩니다.",
    question: {
      type: "객관식",
      difficulty: "보통",
      prompt: "빈칸에 가장 알맞은 접속사는? The data was limited, ___ the conclusion was reliable.",
      choices: ["because", "although", "therefore", "unless"],
      answer: 1,
      explanation: "제한된 데이터와 신뢰 가능한 결론은 양보 관계이므로 although가 자연스럽습니다.",
      concept: "양보 접속사"
    }
  }
];

const reviewSteps = ["1일 후", "3일 후", "7일 후", "14일 후", "30일 후"];
const state = {
  selectedSubjectId: "os",
  activeTab: "overview",
  selectedAnswer: null,
  solved: false,
  wrongNotes: [
    {
      subject: "데이터베이스",
      concept: "자연조인",
      mine: "세타조인",
      answer: "자연조인",
      reason: "공통 속성 자동 매칭 조건을 놓침"
    }
  ],
  customSubjects: []
};

const tabs = [
  ["overview", "개요"],
  ["materials", "자료 추가"],
  ["notes", "AI 필기"],
  ["concepts", "중요 개념"],
  ["variants", "기출 변형"],
  ["solve", "문제 풀이"],
  ["wrong", "오답노트"],
  ["review", "복습 일정"],
  ["alerts", "알림 학습"],
  ["download", "설치"]
];

function subject() {
  return [...subjects, ...state.customSubjects].find((item) => item.id === state.selectedSubjectId) || subjects[0];
}

function setState(patch) {
  Object.assign(state, patch);
  render();
}

function progressBar(value) {
  return `<div class="progress"><span style="width:${value}%"></span></div>`;
}

function pill(text, tone = "") {
  return `<span class="pill ${tone}">${text}</span>`;
}

function renderSubjectCards() {
  return [...subjects, ...state.customSubjects]
    .map(
      (item) => `
        <button class="subject-card ${item.id === state.selectedSubjectId ? "active" : ""}" data-subject="${item.id}">
          <div class="subject-head">
            <span class="subject-dot ${item.color}"></span>
            <span>${item.field}</span>
          </div>
          <strong>${item.title}</strong>
          <small>${item.exam}</small>
          ${progressBar(item.progress)}
          <div class="subject-meta">
            <span>진도 ${item.progress}%</span>
            <span>준비도 ${item.readiness}%</span>
          </div>
        </button>
      `
    )
    .join("");
}

function renderDashboard(current) {
  return `
    <section class="dashboard-grid">
      <article class="panel wide">
        <div class="panel-title">
          <div>
            <span class="eyebrow">Today Loop</span>
            <h2>자료 입력에서 반복 복습까지 한 번에</h2>
          </div>
          ${pill("AI 결과는 검토 필요", "warn")}
        </div>
        <div class="learning-loop">
          ${["자료 입력", "AI 필기", "중요 표시", "문제 생성", "풀이", "오답 분석", "반복 복습", "성적 향상"]
            .map((step) => `<span>${step}</span>`)
            .join("")}
        </div>
      </article>
      <article class="panel">
        <span class="eyebrow">오늘 할 일</span>
        <h3>${current.title} 집중 플랜</h3>
        <ul class="task-list">
          <li><input type="checkbox" checked /> ${current.concepts[0]} 10분 복습</li>
          <li><input type="checkbox" /> 기출 변형 5문제 풀기</li>
          <li><input type="checkbox" /> 오답노트 2개 재풀이</li>
        </ul>
      </article>
      <article class="panel">
        <span class="eyebrow">시험 D-day</span>
        <h3>${current.exam}</h3>
        <div class="d-day-list">
          <span>D-7 전체 개념 1회독</span>
          <span>D-3 오답노트 집중</span>
          <span>D-1 핵심 암기 카드</span>
        </div>
      </article>
      <article class="panel">
        <span class="eyebrow">약점 분석</span>
        <h3>${current.weak}</h3>
        <p>오늘 추천: ${current.concepts[1]} 변형 문제와 해설을 먼저 확인하세요.</p>
      </article>
      <article class="panel">
        <span class="eyebrow">집중 모드</span>
        <h3>25분 시험 루틴</h3>
        <div class="timer">25:00</div>
        <div class="button-row">
          <button class="primary">시작</button>
          <button>50분</button>
        </div>
      </article>
    </section>
  `;
}

function renderMaterials(current) {
  return `
    <section class="room-grid">
      <article class="panel wide">
        <div class="panel-title">
          <div>
            <span class="eyebrow">자료 추가</span>
            <h2>${current.title} 자료를 넣으면 AI가 공부 흐름을 만듭니다</h2>
          </div>
          ${pill("본인이 사용 권한을 가진 자료만 업로드하세요.", "warn")}
        </div>
        <div class="upload-grid">
          <div class="upload-box">
            <strong>내 파일 업로드</strong>
            <p>PDF, 이미지, 필기자료, 강의자료, 시험지, 기출문제</p>
            <input type="file" aria-label="자료 업로드" />
          </div>
          <div class="upload-box">
            <strong>무료/오픈 교재</strong>
            <p>OpenStax, 공개 강의자료, 오픈 텍스트북 연동 설계</p>
            <div class="filter-row">
              <select><option>${current.title}</option><option>전체 과목</option></select>
              <select><option>중급</option><option>초급</option><option>고급</option></select>
              <select><option>한국어</option><option>English</option></select>
            </div>
          </div>
          <div class="upload-box">
            <strong>텍스트 직접 입력</strong>
            <textarea placeholder="개념, 문제, 강의 내용을 붙여넣으세요."></textarea>
          </div>
        </div>
      </article>
      ${renderCoach(current)}
    </section>
  `;
}

function renderNotes(current) {
  return `
    <section class="room-grid">
      <article class="panel wide note-paper">
        <span class="eyebrow">AI 필기</span>
        <h2>${current.title} 자동 필기</h2>
        <div class="style-grid">
          ${["시험 직전 요약형", "개념 자세히 설명형", "암기 카드형", "교수님 판서 스타일", "초보자 설명형", "1등급 학생 정리형"]
            .map((style, index) => `<button class="${index === 0 ? "selected" : ""}">${style}</button>`)
            .join("")}
        </div>
        <div class="note-block" contenteditable="true">
          <h3>${current.concepts[0]}</h3>
          <p><mark>시험에 자주 나오는 핵심은 정의, 조건, 예외 상황을 구분하는 것</mark>입니다. ${current.template} 방식으로 정리하면 개념과 문제 풀이가 연결됩니다.</p>
          <ul>
            <li>핵심 요약: ${current.concepts.join(", ")}</li>
            <li>암기 키워드: 정의, 조건, 비교, 예외</li>
            <li>헷갈리는 개념: ${current.weak}</li>
          </ul>
        </div>
        <div class="button-row">
          <button>쉽게 설명</button>
          <button>시험에 나오게 설명</button>
          <button>한 줄 요약</button>
          <button>예시 들어 설명</button>
          <button class="primary">문제로 바꿔줘</button>
        </div>
      </article>
      ${renderCoach(current)}
    </section>
  `;
}

function renderConcepts(current) {
  return `
    <section class="card-grid">
      ${current.concepts
        .map(
          (concept, index) => `
            <article class="concept-card" contenteditable="true">
              <div>${index === 0 ? "★ 매우 중요" : index === 1 ? "⚠ 헷갈림" : "중요"}</div>
              <h3>${concept}</h3>
              <p>${concept}는 ${current.title}에서 문제로 변형되기 쉬운 개념입니다. 정의, 조건, 반례를 함께 암기하세요.</p>
            </article>
          `
        )
        .join("")}
    </section>
  `;
}

function renderVariants(current) {
  return `
    <section class="room-grid">
      <article class="panel wide">
        <span class="eyebrow">기출 변형</span>
        <h2>정답 개념은 유지하고 표현만 바꿉니다</h2>
        <div class="rule-box">
          원본 정답 개념: <strong>${current.question.concept}</strong><br />
          변형 규칙: 문제 표현, 보기, 상황, 예시만 변경. 정답 개념은 절대 변경하지 않음.
        </div>
        <div class="question-card">
          <span>${current.question.type} · ${current.question.difficulty}</span>
          <h3>${current.question.prompt}</h3>
          <ol>
            ${current.question.choices.map((choice) => `<li>${choice}</li>`).join("")}
          </ol>
          <p><strong>정답:</strong> ${current.question.choices[current.question.answer]}</p>
          <p><strong>해설:</strong> ${current.question.explanation}</p>
          <p><strong>오답 선지 분석:</strong> 정답 개념과 맞지 않는 조건, 정의, 관계를 제거합니다.</p>
        </div>
      </article>
      ${renderCoach(current)}
    </section>
  `;
}

function renderSolve(current) {
  const q = current.question;
  const answered = state.solved && state.selectedAnswer !== null;
  const correct = state.selectedAnswer === q.answer;
  return `
    <section class="room-grid">
      <article class="panel wide">
        <div class="panel-title">
          <div>
            <span class="eyebrow">CBT 문제 풀이</span>
            <h2>${current.title} 실전 세트</h2>
          </div>
          ${pill(q.difficulty)}
        </div>
        <div class="exam-toolbar">
          <button class="selected">시험 모드</button>
          <button>시간 제한</button>
          <button>다시 풀기</button>
          <span>남은 시간 09:42</span>
        </div>
        <div class="question-card">
          <span>${q.type} · 관련 개념 ${q.concept}</span>
          <h3>${q.prompt}</h3>
          <div class="choice-list">
            ${q.choices
              .map(
                (choice, index) => `
                  <button class="${state.selectedAnswer === index ? "picked" : ""}" data-answer="${index}">
                    <span>${index + 1}</span>${choice}
                  </button>
                `
              )
              .join("")}
          </div>
          <button class="primary" data-grade>채점</button>
          ${
            answered
              ? `<div class="result ${correct ? "correct" : "wrong"}">
                  <strong>${correct ? "정답입니다." : "오답노트에 자동 저장되었습니다."}</strong>
                  <p>${q.explanation}</p>
                </div>`
              : ""
          }
        </div>
      </article>
      ${renderCoach(current)}
    </section>
  `;
}

function renderWrong(current) {
  const notes = state.wrongNotes
    .map(
      (note) => `
        <article class="wrong-card">
          <span>${note.subject} · ${note.concept}</span>
          <h3>내 답: ${note.mine} / 정답: ${note.answer}</h3>
          <p>틀린 이유: ${note.reason}</p>
          <div class="button-row">
            <button>다시 풀기</button>
            <button class="primary">비슷한 변형 문제 생성</button>
          </div>
        </article>
      `
    )
    .join("");
  return `
    <section class="dashboard-grid">
      <article class="panel wide">
        <span class="eyebrow">오답노트</span>
        <h2>AI가 약점을 문장으로 정리합니다</h2>
        <p>${current.weak}</p>
      </article>
      ${notes}
    </section>
  `;
}

function renderReview(current) {
  return `
    <section class="dashboard-grid">
      <article class="panel wide">
        <span class="eyebrow">망각 곡선 복습</span>
        <h2>틀린 문제는 더 자주, 맞힌 문제는 더 길게</h2>
        <div class="timeline">
          ${reviewSteps.map((step, index) => `<div><strong>${step}</strong><span>${current.concepts[index % current.concepts.length]}</span></div>`).join("")}
        </div>
      </article>
      <article class="panel">
        <span class="eyebrow">집중 복습</span>
        <h3>${current.concepts[1]}</h3>
        <p>최근 오답률이 높아 내일 알림 학습에 포함됩니다.</p>
      </article>
    </section>
  `;
}

function renderAlerts(current) {
  return `
    <section class="dashboard-grid">
      <article class="panel wide">
        <span class="eyebrow">알림 학습 목업</span>
        <h2>웹 푸시, 이메일, 추후 카카오 알림톡 확장</h2>
        <div class="notification-list">
          ${["오늘의 개념 3개", "OX 문제 3개", "어제 틀린 문제 복습", "시험 D-day 요약", "과목별 암기 카드", "길가면서 푸는 미니 문제"]
            .map((item) => `<label><input type="checkbox" checked /> ${item}</label>`)
            .join("")}
        </div>
      </article>
      <article class="panel">
        <span class="eyebrow">로그인 설계</span>
        <h3>카카오 · 이메일 · 게스트</h3>
        <p>1차 MVP는 게스트 체험 흐름으로 구성하고, 계정별 저장소 구조를 분리합니다.</p>
      </article>
    </section>
  `;
}

function renderDownload() {
  return `
    <section class="dashboard-grid">
      <article class="panel wide">
        <span class="eyebrow">멀티 플랫폼 설치</span>
        <h2>1차는 웹앱 + PWA, 이후 데스크톱과 모바일 앱으로 확장</h2>
        <div class="download-grid">
          ${["웹에서 바로 시작", "Windows 다운로드", "Mac 다운로드", "Android 설치", "iPhone/iPad 설치"]
            .map((item, index) => `<button class="${index === 0 ? "primary" : ""}">${item}</button>`)
            .join("")}
        </div>
      </article>
      <article class="panel">
        <span class="eyebrow">기기 감지</span>
        <h3 id="deviceLabel">현재 기기 확인 중</h3>
        <p>PWA 설치 프롬프트와 service worker 준비 구조가 포함되어 있습니다.</p>
      </article>
    </section>
  `;
}

function renderCoach(current) {
  return `
    <aside class="panel coach">
      <span class="eyebrow">AI 코치</span>
      <h3>현재 페이지 핵심</h3>
      <p>${current.concepts[0]}와 ${current.concepts[1]}를 연결해서 봐야 합니다.</p>
      <div class="coach-actions">
        <button>설명</button>
        <button>요약</button>
        <button>문제 만들기</button>
        <button>암기카드</button>
        <button>쉽게 설명</button>
      </div>
      <div class="mini-card">
        <strong>시험 포인트</strong>
        <p>${current.question.concept}는 보기만 바꿔 반복 출제되기 쉽습니다.</p>
      </div>
    </aside>
  `;
}

function renderMain() {
  const current = subject();
  const pages = {
    overview: renderDashboard,
    materials: renderMaterials,
    notes: renderNotes,
    concepts: renderConcepts,
    variants: renderVariants,
    solve: renderSolve,
    wrong: renderWrong,
    review: renderReview,
    alerts: renderAlerts,
    download: renderDownload
  };

  return `
    <div class="app-shell">
      <header class="topbar">
        <div class="brand">
          <img src="./assets/icon.svg" alt="" />
          <div>
            <strong>StudyPilot AI</strong>
            <span>공부하면 점수가 오르는 시스템</span>
          </div>
        </div>
        <nav>
          <button class="ghost">게스트 체험</button>
          <button class="kakao">카카오 로그인</button>
        </nav>
      </header>

      <main>
        <aside class="sidebar">
          <div class="create-card">
            <span class="eyebrow">과목 생성</span>
            <input id="subjectInput" placeholder="예: 정보처리기사, 간호학" />
            <button class="primary" data-create-subject>AI 템플릿 추천</button>
          </div>
          <div class="subject-list">${renderSubjectCards()}</div>
        </aside>

        <section class="content">
          <div class="hero">
            <div>
              <span class="eyebrow">${current.field}</span>
              <h1>${current.title}</h1>
              <p>${current.template}</p>
            </div>
            <div class="hero-stats">
              <div><strong>${current.progress}%</strong><span>진도율</span></div>
              <div><strong>${current.readiness}%</strong><span>시험 준비도</span></div>
            </div>
          </div>
          <div class="tabs">
            ${tabs.map(([id, label]) => `<button class="${state.activeTab === id ? "active" : ""}" data-tab="${id}">${label}</button>`).join("")}
          </div>
          ${pages[state.activeTab](current)}
        </section>
      </main>
    </div>
  `;
}

function bindEvents() {
  document.querySelectorAll("[data-subject]").forEach((button) => {
    button.addEventListener("click", () =>
      setState({ selectedSubjectId: button.dataset.subject, selectedAnswer: null, solved: false })
    );
  });

  document.querySelectorAll("[data-tab]").forEach((button) => {
    button.addEventListener("click", () => setState({ activeTab: button.dataset.tab }));
  });

  document.querySelectorAll("[data-answer]").forEach((button) => {
    button.addEventListener("click", () => setState({ selectedAnswer: Number(button.dataset.answer), solved: false }));
  });

  const gradeButton = document.querySelector("[data-grade]");
  if (gradeButton) {
    gradeButton.addEventListener("click", () => {
      const current = subject();
      if (!state.solved && state.selectedAnswer !== null && state.selectedAnswer !== current.question.answer) {
        state.wrongNotes.unshift({
          subject: current.title,
          concept: current.question.concept,
          mine: current.question.choices[state.selectedAnswer],
          answer: current.question.choices[current.question.answer],
          reason: "정답 개념과 보기 조건을 연결하지 못함"
        });
      }
      state.solved = true;
      render();
    });
  }

  const createButton = document.querySelector("[data-create-subject]");
  const input = document.querySelector("#subjectInput");
  if (createButton && input) {
    createButton.addEventListener("click", () => {
      const title = input.value.trim();
      if (!title) return;
      const id = `custom-${Date.now()}`;
      state.customSubjects.push({
        id,
        title,
        field: "사용자 과목",
        exam: "시험일 미설정",
        progress: 0,
        readiness: 35,
        color: "blue",
        template: `${title} 맞춤 템플릿: 개념 요약 + 예상 문제 + 반복 복습`,
        materials: [],
        concepts: ["핵심 개념", "빈출 포인트", "헷갈리는 개념"],
        weak: `${title}의 취약 개념을 학습 기록 기반으로 분석합니다.`,
        question: {
          type: "객관식",
          difficulty: "보통",
          prompt: `${title}에서 가장 먼저 정리해야 할 항목은?`,
          choices: ["핵심 정의", "무관한 사례", "임의의 암기", "시험 범위 밖 내용"],
          answer: 0,
          explanation: "새 과목은 핵심 정의와 출제 범위를 먼저 잡아야 이후 문제 생성 정확도가 올라갑니다.",
          concept: "학습 템플릿"
        }
      });
      setState({ selectedSubjectId: id, activeTab: "overview", selectedAnswer: null, solved: false });
    });
  }

  const deviceLabel = document.querySelector("#deviceLabel");
  if (deviceLabel) {
    const ua = navigator.userAgent;
    const device = /iPhone|iPad/i.test(ua)
      ? "iOS/iPadOS"
      : /Android/i.test(ua)
        ? "Android"
        : /Mac/i.test(ua)
          ? "macOS"
          : /Windows/i.test(ua)
            ? "Windows"
            : "Web";
    deviceLabel.textContent = `${device} 환경`;
  }
}

function render() {
  document.querySelector("#app").innerHTML = renderMain();
  bindEvents();
}

render();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  });
}
