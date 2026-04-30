import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Bell,
  BookOpen,
  Brain,
  CheckCircle2,
  Download,
  FileText,
  Layers,
  Search,
  Sparkles,
  Timer,
  Upload
} from "lucide-react";
import { initialWrongNotes, subjectCatalog, subjects, tabs } from "./data";
import type { Question, Subject, TabId, WrongNote } from "./types";
import "./tailwind.css";
import "../styles.css";

const reviewSteps = ["1일 후", "3일 후", "7일 후", "14일 후", "30일 후"];

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="progress" aria-label={`진도 ${value}%`}>
      <span style={{ width: `${value}%` }} />
    </div>
  );
}

function Pill({ children, tone }: { children: React.ReactNode; tone?: "warn" }) {
  return <span className={`pill ${tone ?? ""}`}>{children}</span>;
}

function Coach({ current }: { current: Subject }) {
  return (
    <aside className="panel coach">
      <span className="eyebrow">AI 코치</span>
      <h3>지금 봐야 할 포인트</h3>
      <p>
        {current.concepts[0]}와 {current.concepts[1]}를 연결해서 보면 문제 변형에 강해집니다.
      </p>
      <div className="coach-actions">
        {["쉽게 설명", "3줄 요약", "문제 만들기", "암기카드", "오답 이유"].map((action) => (
          <button key={action}>{action}</button>
        ))}
      </div>
      <div className="mini-card">
        <strong>오늘의 코칭</strong>
        <p>{current.weak}</p>
      </div>
    </aside>
  );
}

function Dashboard({ current }: { current: Subject }) {
  const loop = ["자료 입력", "AI 필기", "중요 표시", "문제 생성", "풀이", "오답 분석", "반복 복습", "성적 향상"];
  return (
    <section className="dashboard-grid">
      <article className="panel wide">
        <div className="panel-title">
          <div>
            <span className="eyebrow">Study Loop</span>
            <h2>오늘 공부 흐름</h2>
          </div>
          <Pill tone="warn">AI 결과는 검토 필요</Pill>
        </div>
        <div className="learning-loop">{loop.map((step) => <span key={step}>{step}</span>)}</div>
      </article>

      <article className="panel">
        <span className="eyebrow">오늘 할 일</span>
        <h3>{current.title} 45분 플랜</h3>
        <ul className="task-list">
          <li><input type="checkbox" defaultChecked /> {current.concepts[0]} 필기 읽기</li>
          <li><input type="checkbox" /> 암기카드 {current.flashcards.length}개 확인</li>
          <li><input type="checkbox" /> CBT 문제 1세트 풀기</li>
          <li><input type="checkbox" /> 오답노트 2개 다시 풀기</li>
        </ul>
      </article>

      <article className="panel">
        <span className="eyebrow">시험 D-day</span>
        <h3>{current.exam}</h3>
        <div className="d-day-list">
          {current.plan.map((task) => (
            <span key={task.day}>{task.day} · {task.title}</span>
          ))}
        </div>
      </article>

      <article className="panel">
        <span className="eyebrow">자료 분석 결과</span>
        <h3>AI가 중요도를 붙인 개념</h3>
        <div className="analysis-list">
          <span>★ 매우 중요: {current.concepts[0]}</span>
          <span>⚠ 헷갈림: {current.concepts[1]}</span>
          <span>출제 예상: {current.question.concept}</span>
        </div>
      </article>

      <article className="panel">
        <span className="eyebrow">집중 모드</span>
        <h3>25분 집중 세션</h3>
        <div className="timer">25:00</div>
        <div className="button-row">
          <button className="primary"><Timer size={16} />시작</button>
          <button>50분</button>
        </div>
      </article>
    </section>
  );
}

function Materials({ current }: { current: Subject }) {
  return (
    <section className="room-grid">
      <article className="panel wide">
        <div className="panel-title">
          <div>
            <span className="eyebrow">자료 추가</span>
            <h2>{current.title} 자료를 넣으면 필기, 문제, 복습 일정으로 바꿉니다</h2>
          </div>
          <Pill tone="warn">본인이 사용 권한을 가진 자료만 업로드하세요.</Pill>
        </div>
        <div className="upload-grid">
          <div className="upload-box">
            <Upload size={22} />
            <strong>내 파일 업로드</strong>
            <p>PDF, 이미지, 필기자료, 강의자료, 시험지, 기출문제를 분석합니다.</p>
            <input type="file" />
          </div>
          <div className="upload-box">
            <BookOpen size={22} />
            <strong>추천 공개 교재 선택</strong>
            <p>공개 라이선스 자료를 과목, 난이도, 언어별로 고릅니다.</p>
            <div className="filter-row">
              <select><option>{current.title}</option><option>전체 과목</option></select>
              <select><option>중급</option><option>초급</option><option>고급</option></select>
              <select><option>한국어</option><option>English</option></select>
            </div>
          </div>
          <div className="upload-box">
            <FileText size={22} />
            <strong>텍스트 직접 입력</strong>
            <textarea placeholder="개념, 문제, 강의 내용을 붙여넣으면 AI 필기와 문제로 변환됩니다." />
          </div>
        </div>
        <div className="analysis-preview">
          <h3>업로드 후 생성되는 결과 예시</h3>
          <div className="analysis-list">
            <span>핵심 요약 5줄</span>
            <span>시험 출제 가능 개념</span>
            <span>헷갈리는 개념 경고</span>
            <span>예상 문제 10개</span>
            <span>암기카드 자동 생성</span>
          </div>
        </div>
      </article>
      <Coach current={current} />
    </section>
  );
}

function Resources({ current }: { current: Subject }) {
  const [query, setQuery] = useState("");
  const filtered = current.resources.filter((resource) =>
    `${resource.title} ${resource.provider} ${resource.kind} ${resource.level} ${resource.language}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <section className="dashboard-grid">
      <article className="panel wide">
        <div className="panel-title">
          <div>
            <span className="eyebrow">추천 자료</span>
            <h2>{current.title}에 맞는 공개 교재와 학습 자료</h2>
          </div>
          <div className="search-box">
            <Search size={16} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="교재, 난이도, 언어 검색" />
          </div>
        </div>
        <div className="resource-grid">
          {filtered.map((resource) => (
            <article className="resource-card" key={resource.title}>
              <span>{resource.provider} · {resource.kind}</span>
              <h3>{resource.title}</h3>
              <p>{resource.note}</p>
              <div className="resource-meta">
                <Pill>{resource.level}</Pill>
                <Pill>{resource.language}</Pill>
                <Pill tone="warn">{resource.license}</Pill>
              </div>
              <button className="primary">이 자료로 공부 시작</button>
            </article>
          ))}
        </div>
      </article>
    </section>
  );
}

function Notes({ current }: { current: Subject }) {
  return (
    <section className="room-grid">
      <article className="panel wide note-paper">
        <span className="eyebrow">AI 필기</span>
        <h2>{current.title} 자동 필기</h2>
        <div className="style-grid">
          {["시험 직전 요약형", "개념 자세히 설명형", "암기 카드형", "교수님 판서 스타일", "초보자 설명형", "1등급 학생 정리형"].map((style, index) => (
            <button className={index === 0 ? "selected" : ""} key={style}>{style}</button>
          ))}
        </div>
        <div className="note-block" contentEditable suppressContentEditableWarning>
          <h3>{current.concepts[0]}</h3>
          <p>
            <mark>시험에 자주 나오는 핵심은 정의, 조건, 예외 상황을 구분하는 것</mark>입니다.
            {current.template} 방식으로 정리하면 개념과 문제 풀이가 연결됩니다.
          </p>
          <ul>
            <li>핵심 요약: {current.concepts.join(", ")}</li>
            <li>암기 키워드: 정의, 조건, 비교, 예외</li>
            <li>헷갈리는 개념: {current.weak}</li>
          </ul>
        </div>
        <div className="button-row">
          {["쉽게 설명", "시험에 나오게 설명", "한 줄 요약", "예시 들어 설명"].map((label) => <button key={label}>{label}</button>)}
          <button className="primary">문제로 바꿔줘</button>
        </div>
      </article>
      <Coach current={current} />
    </section>
  );
}

function Concepts({ current }: { current: Subject }) {
  return (
    <section className="card-grid">
      {current.concepts.map((concept, index) => (
        <article className="concept-card" contentEditable suppressContentEditableWarning key={concept}>
          <div>{index === 0 ? "★ 매우 중요" : index === 1 ? "⚠ 헷갈림" : "중요"}</div>
          <h3>{concept}</h3>
          <p>{concept}는 {current.title}에서 문제로 변형되기 쉬운 개념입니다. 정의, 조건, 반례를 함께 암기하세요.</p>
        </article>
      ))}
    </section>
  );
}

function Flashcards({ current }: { current: Subject }) {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <section className="dashboard-grid">
      <article className="panel wide">
        <span className="eyebrow">암기카드</span>
        <h2>{current.title} 핵심 카드</h2>
        <div className="flashcard-grid">
          {current.flashcards.map((card, index) => (
            <button className={`flashcard ${openIndex === index ? "active" : ""}`} onClick={() => setOpenIndex(index)} key={card.front}>
              <strong>{card.front}</strong>
              <span>{openIndex === index ? card.back : "눌러서 답 보기"}</span>
            </button>
          ))}
        </div>
      </article>
      <article className="panel">
        <span className="eyebrow">복습 규칙</span>
        <h3>틀린 카드는 내일 다시</h3>
        <p>모르는 카드로 표시하면 1일 후, 3일 후, 7일 후 복습 일정에 자동 배치됩니다.</p>
      </article>
    </section>
  );
}

function Variants({ current }: { current: Subject }) {
  const q = current.question;
  return (
    <section className="room-grid">
      <article className="panel wide">
        <span className="eyebrow">기출 변형</span>
        <h2>정답 개념은 유지하고 표현만 바꿉니다</h2>
        <div className="rule-box">
          원본 정답 개념: <strong>{q.concept}</strong><br />
          문제 표현, 보기, 상황, 예시만 변경합니다. 정답 개념은 바뀌면 안 됩니다.
        </div>
        <QuestionCard question={q} />
      </article>
      <Coach current={current} />
    </section>
  );
}

function QuestionCard({ question }: { question: Question }) {
  return (
    <div className="question-card">
      <span>{question.type} · {question.difficulty}</span>
      <h3>{question.prompt}</h3>
      <ol>{question.choices.map((choice) => <li key={choice}>{choice}</li>)}</ol>
      <p><strong>정답:</strong> {question.choices[question.answer]}</p>
      <p><strong>해설:</strong> {question.explanation}</p>
      <p><strong>오답 선지 분석:</strong> 정답 개념과 맞지 않는 조건, 정의, 관계를 제거합니다.</p>
    </div>
  );
}

function Solve({ current, addWrongNote }: { current: Subject; addWrongNote: (note: WrongNote) => void }) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [solved, setSolved] = useState(false);
  const q = current.question;
  const answered = solved && selectedAnswer !== null;
  const correct = selectedAnswer === q.answer;

  function grade() {
    if (!solved && selectedAnswer !== null && selectedAnswer !== q.answer) {
      addWrongNote({
        subject: current.title,
        concept: q.concept,
        mine: q.choices[selectedAnswer],
        answer: q.choices[q.answer],
        reason: "정답 개념과 보기 조건을 연결하지 못했습니다."
      });
    }
    setSolved(true);
  }

  return (
    <section className="room-grid">
      <article className="panel wide">
        <div className="panel-title">
          <div><span className="eyebrow">CBT 문제 풀이</span><h2>{current.title} 실전 세트</h2></div>
          <Pill>{q.difficulty}</Pill>
        </div>
        <div className="exam-toolbar">
          <button className="selected">시험 모드</button>
          <button>시간 제한</button>
          <button onClick={() => { setSelectedAnswer(null); setSolved(false); }}>다시 풀기</button>
          <span>남은 시간 09:42</span>
        </div>
        <div className="question-card">
          <span>{q.type} · 관련 개념 {q.concept}</span>
          <h3>{q.prompt}</h3>
          <div className="choice-list">
            {q.choices.map((choice, index) => (
              <button className={selectedAnswer === index ? "picked" : ""} onClick={() => { setSelectedAnswer(index); setSolved(false); }} key={choice}>
                <span>{index + 1}</span>{choice}
              </button>
            ))}
          </div>
          <button className="primary" onClick={grade}>채점</button>
          {answered && (
            <div className={`result ${correct ? "correct" : "wrong"}`}>
              <strong>{correct ? "정답입니다." : "오답노트에 자동 저장되었습니다."}</strong>
              <p>{q.explanation}</p>
            </div>
          )}
        </div>
      </article>
      <Coach current={current} />
    </section>
  );
}

function WrongNotes({ current, notes }: { current: Subject; notes: WrongNote[] }) {
  return (
    <section className="dashboard-grid">
      <article className="panel wide">
        <span className="eyebrow">오답노트</span>
        <h2>AI가 약점을 문장으로 정리합니다</h2>
        <p>{current.weak}</p>
      </article>
      {notes.map((note, index) => (
        <article className="wrong-card" key={`${note.subject}-${note.concept}-${index}`}>
          <span>{note.subject} · {note.concept}</span>
          <h3>내 답: {note.mine} / 정답: {note.answer}</h3>
          <p>틀린 이유: {note.reason}</p>
          <div className="button-row">
            <button>다시 풀기</button>
            <button className="primary">비슷한 변형 문제 생성</button>
          </div>
        </article>
      ))}
    </section>
  );
}

function Review({ current }: { current: Subject }) {
  return (
    <section className="dashboard-grid">
      <article className="panel wide">
        <span className="eyebrow">망각 곡선 복습</span>
        <h2>틀린 문제는 더 자주, 맞힌 문제는 더 길게</h2>
        <div className="timeline">
          {reviewSteps.map((step, index) => (
            <div key={step}><strong>{step}</strong><span>{current.concepts[index % current.concepts.length]}</span></div>
          ))}
        </div>
      </article>
      <article className="panel">
        <span className="eyebrow">집중 복습</span>
        <h3>{current.concepts[1]}</h3>
        <p>최근 오답률이 높아 내일 알림 학습에 포함됩니다.</p>
      </article>
    </section>
  );
}

function Alerts() {
  return (
    <section className="dashboard-grid">
      <article className="panel wide">
        <span className="eyebrow">알림 학습 목업</span>
        <h2>웹 푸시, 이메일, 추후 카카오 알림톡 확장</h2>
        <div className="notification-list">
          {["오늘의 개념 3개", "OX 문제 3개", "어제 틀린 문제 복습", "시험 D-day 요약", "과목별 암기 카드", "길가면서 푸는 미니 문제"].map((item) => (
            <label key={item}><input type="checkbox" defaultChecked /> {item}</label>
          ))}
        </div>
      </article>
      <article className="panel">
        <span className="eyebrow">로그인 설계</span>
        <h3>카카오 · 이메일 · 게스트</h3>
        <p>1차 MVP는 게스트 체험 흐름으로 구성하고, 계정별 저장소 구조를 분리합니다.</p>
      </article>
    </section>
  );
}

function DownloadPage() {
  const device = /iPhone|iPad/i.test(navigator.userAgent)
    ? "iOS/iPadOS"
    : /Android/i.test(navigator.userAgent)
      ? "Android"
      : /Mac/i.test(navigator.userAgent)
        ? "macOS"
        : /Windows/i.test(navigator.userAgent)
          ? "Windows"
          : "Web";
  return (
    <section className="dashboard-grid">
      <article className="panel wide">
        <span className="eyebrow">멀티 플랫폼 설치</span>
        <h2>1차는 웹앱 + PWA, 이후 데스크톱과 모바일 앱으로 확장</h2>
        <div className="download-grid">
          {["웹에서 바로 시작", "Windows 다운로드", "Mac 다운로드", "Android 설치", "iPhone/iPad 설치"].map((item, index) => (
            <button className={index === 0 ? "primary" : ""} key={item}><Download size={16} />{item}</button>
          ))}
        </div>
      </article>
      <article className="panel"><span className="eyebrow">기기 감지</span><h3>{device} 환경</h3><p>PWA 설치 준비 구조가 포함되어 있습니다.</p></article>
    </section>
  );
}

function createSubjectTemplate(title: string): Subject {
  return {
    id: `custom-${Date.now()}`,
    title,
    field: "사용자 과목",
    group: "맞춤",
    exam: "시험일 미설정",
    progress: 0,
    readiness: 35,
    color: "blue",
    template: `${title} 맞춤 템플릿: 개념 요약 + 예상 문제 + 반복 복습`,
    materials: [],
    concepts: ["핵심 개념", "빈출 포인트", "헷갈리는 개념", "시험 직전 암기"],
    weak: `${title}의 취약 개념을 학습 기록 기반으로 분석합니다.`,
    question: {
      type: "객관식",
      difficulty: "보통",
      prompt: `${title}에서 가장 먼저 정리해야 할 항목은?`,
      choices: ["핵심 정의", "무관한 사례", "임의의 암기", "시험 범위 밖 내용"],
      answer: 0,
      explanation: "새 과목은 핵심 정의와 출제 범위를 먼저 잡아야 이후 문제 생성 정확도가 올라갑니다.",
      concept: "학습 템플릿"
    },
    resources: subjects[0].resources,
    flashcards: [
      { front: "핵심 정의", back: `${title}에서 문제로 자주 바뀌는 기본 개념` },
      { front: "빈출 포인트", back: "교재와 기출에서 반복 등장하는 조건과 예외" },
      { front: "오답 원인", back: "개념 혼동, 조건 누락, 계산 실수 중 하나로 분류" }
    ],
    plan: [
      { day: "오늘", title: "범위 설정", detail: "시험 범위와 자료를 먼저 등록합니다." },
      { day: "D-7", title: "예상 문제", detail: "핵심 개념별 문제를 생성합니다." },
      { day: "D-1", title: "최종 요약", detail: "암기카드와 오답노트만 확인합니다." }
    ]
  };
}

function App() {
  const [customSubjects, setCustomSubjects] = useState<Subject[]>([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState("os");
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [subjectInput, setSubjectInput] = useState("");
  const [catalogQuery, setCatalogQuery] = useState("");
  const [wrongNotes, setWrongNotes] = useState<WrongNote[]>(initialWrongNotes);
  const allSubjects = useMemo(() => [...subjects, ...customSubjects], [customSubjects]);
  const current = allSubjects.find((item) => item.id === selectedSubjectId) ?? subjects[0];
  const filteredCatalog = subjectCatalog.filter((name) => name.includes(catalogQuery.trim()));

  function createSubject(title = subjectInput) {
    const trimmed = title.trim();
    if (!trimmed) return;
    const created = createSubjectTemplate(trimmed);
    setCustomSubjects((prev) => [...prev, created]);
    setSelectedSubjectId(created.id);
    setActiveTab("overview");
    setSubjectInput("");
    setCatalogQuery("");
  }

  const pages: Record<TabId, React.ReactNode> = {
    overview: <Dashboard current={current} />,
    materials: <Materials current={current} />,
    resources: <Resources current={current} />,
    notes: <Notes current={current} />,
    concepts: <Concepts current={current} />,
    flashcards: <Flashcards current={current} />,
    variants: <Variants current={current} />,
    solve: <Solve current={current} addWrongNote={(note) => setWrongNotes((prev) => [note, ...prev])} />,
    wrong: <WrongNotes current={current} notes={wrongNotes} />,
    review: <Review current={current} />,
    alerts: <Alerts />,
    download: <DownloadPage />
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <img src="/assets/icon.svg" alt="" />
          <div><strong>StudyPilot AI</strong><span>공부하면 점수가 오르는 시스템</span></div>
        </div>
        <nav><button className="ghost">게스트 체험</button><button className="kakao"><Bell size={16} />카카오 로그인</button></nav>
      </header>

      <main>
        <aside className="sidebar">
          <div className="create-card">
            <span className="eyebrow">과목 생성</span>
            <input value={subjectInput} onChange={(event) => setSubjectInput(event.target.value)} placeholder="예: 임상병리학, 토익, 알고리즘" />
            <button className="primary" onClick={() => createSubject()}><Brain size={16} />AI 템플릿 추천</button>
          </div>

          <div className="create-card">
            <span className="eyebrow">전과목 탐색</span>
            <input value={catalogQuery} onChange={(event) => setCatalogQuery(event.target.value)} placeholder="과목 검색" />
            <div className="catalog-list">
              {filteredCatalog.slice(0, 10).map((name) => (
                <button key={name} onClick={() => createSubject(name)}>{name}</button>
              ))}
            </div>
          </div>

          <div className="subject-list">
            {allSubjects.map((item) => (
              <button className={`subject-card ${item.id === selectedSubjectId ? "active" : ""}`} onClick={() => setSelectedSubjectId(item.id)} key={item.id}>
                <div className="subject-head"><span className={`subject-dot ${item.color}`} /><span>{item.group}</span></div>
                <strong>{item.title}</strong><small>{item.exam}</small><ProgressBar value={item.progress} />
                <div className="subject-meta"><span>진도 {item.progress}%</span><span>준비도 {item.readiness}%</span></div>
              </button>
            ))}
          </div>
        </aside>

        <section className="content">
          <div className="hero">
            <div>
              <span className="eyebrow">{current.field}</span>
              <h1>{current.title}</h1>
              <p>{current.template}</p>
            </div>
            <div className="hero-stats">
              <div><CheckCircle2 size={22} /><strong>{current.progress}%</strong><span>진도율</span></div>
              <div><Timer size={22} /><strong>{current.readiness}%</strong><span>시험 준비도</span></div>
            </div>
          </div>

          <div className="study-strip">
            <div><Sparkles size={18} /><strong>추천 다음 행동</strong><span>{current.plan[0].detail}</span></div>
            <div><Layers size={18} /><strong>암기카드</strong><span>{current.flashcards.length}개 준비됨</span></div>
            <div><BookOpen size={18} /><strong>추천 자료</strong><span>{current.resources.length}개</span></div>
          </div>

          <div className="tabs">{tabs.map(([id, label]) => <button className={activeTab === id ? "active" : ""} onClick={() => setActiveTab(id)} key={id}>{label}</button>)}</div>
          {pages[activeTab]}
        </section>
      </main>
    </div>
  );
}

createRoot(document.getElementById("app")!).render(<App />);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js").catch(() => undefined);
  });
}
