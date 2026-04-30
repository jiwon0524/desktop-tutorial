import React, { useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Bell,
  BookOpen,
  Brain,
  CheckCircle2,
  Download,
  FileText,
  MonitorUp,
  Plus,
  Search,
  Sparkles,
  Timer,
  Trash2,
  Upload
} from "lucide-react";
import { initialWrongNotes, subjects } from "./data";
import type { Question, Subject, TabId, WrongNote } from "./types";
import "./tailwind.css";
import "../styles.css";

const reviewSteps = ["1일 후", "3일 후", "7일 후", "14일 후", "30일 후"];

const tabs: Array<[TabId, string]> = [
  ["overview", "학습 홈"],
  ["analyze", "PDF/화면 인식"],
  ["materials", "자료 추가"],
  ["resources", "추천 자료"],
  ["notes", "AI 필기"],
  ["concepts", "중요 개념"],
  ["flashcards", "암기카드"],
  ["variants", "기출 변형"],
  ["solve", "문제 풀이"],
  ["wrong", "오답노트"],
  ["review", "복습 일정"],
  ["alerts", "알림"]
];

const subjectUniverse = [
  "국어",
  "문학",
  "독서",
  "화법과 작문",
  "언어와 매체",
  "영어",
  "영어 독해",
  "영어 문법",
  "수학",
  "수학 I",
  "수학 II",
  "미적분",
  "확률과 통계",
  "기하",
  "과학",
  "통합과학",
  "물리학",
  "화학",
  "생명과학",
  "지구과학",
  "사회",
  "통합사회",
  "한국사",
  "세계사",
  "동아시아사",
  "경제",
  "정치와 법",
  "사회문화",
  "생활과 윤리",
  "윤리와 사상",
  "도덕",
  "역사",
  "기술가정",
  "한문",
  "컴퓨터공학",
  "프로그래밍",
  "Python",
  "Java",
  "C언어",
  "JavaScript",
  "자료구조",
  "알고리즘",
  "운영체제",
  "데이터베이스",
  "SQL",
  "소프트웨어공학",
  "컴퓨터네트워크",
  "인공지능",
  "머신러닝",
  "선형대수",
  "이산수학",
  "공업수학",
  "미적분학",
  "통계학",
  "확률론",
  "일반물리학",
  "일반화학",
  "일반생물학",
  "유기화학",
  "간호학",
  "성인간호학",
  "아동간호학",
  "임상병리학",
  "해부학",
  "생리학",
  "병리학",
  "경영학",
  "마케팅",
  "회계학",
  "재무관리",
  "경제학",
  "심리학",
  "교육학",
  "토익",
  "토플",
  "일본어",
  "중국어",
  "정보처리기사",
  "컴퓨터활용능력",
  "한국사능력검정시험",
  "전산회계"
];

function subjectSuggestions(query: string) {
  const value = query.trim().toLowerCase();
  if (!value) return [];
  const exact = subjectUniverse.filter((name) => name.toLowerCase().includes(value));
  const fuzzy = subjectUniverse.filter((name) =>
    value.split(/\s+/).some((part) => name.toLowerCase().includes(part))
  );
  return Array.from(new Set([...exact, ...fuzzy])).slice(0, 8);
}

const fallbackResources = [
  {
    title: "OpenStax 공개 교재",
    provider: "OpenStax",
    kind: "무료 공개 교재",
    level: "입문-대학",
    language: "English",
    license: "CC BY",
    note: "수학, 과학, 사회과학 계열 과목의 공개 교재를 과목별로 연결할 수 있습니다."
  },
  {
    title: "Khan Academy",
    provider: "Khan Academy",
    kind: "무료 강의/연습",
    level: "중등-대학 기초",
    language: "English/일부 한국어",
    license: "무료 학습 자료",
    note: "개념 영상과 즉시 연습 문제가 있어 중고등 과목 복습에 좋습니다."
  },
  {
    title: "공개 강의자료 검색",
    provider: "OpenCourseWare",
    kind: "공개 강의자료",
    level: "고등-대학",
    language: "한국어/English",
    license: "공개 자료 확인 필요",
    note: "대학 강의노트, 공개 슬라이드, 기출 해설을 과목별로 연결하는 영역입니다."
  }
];

function makeSubject(title: string): Subject {
  const template = subjects.find((subject) => subject.title === title || subject.concepts.includes(title));
  if (template) return { ...template, id: `${template.id}-${Date.now()}` };

  return {
    id: `custom-${Date.now()}-${title}`,
    title,
    field: "사용자 선택 과목",
    group: "맞춤",
    exam: "시험일 미설정",
    progress: 0,
    readiness: 30,
    color: "blue",
    template: `${title} 맞춤 학습: 자료 인식 -> AI 필기 -> 문제 풀이 -> 오답 복습`,
    materials: [],
    concepts: ["핵심 개념", "빈출 포인트", "헷갈리는 개념", "시험 직전 암기"],
    weak: `${title} 자료를 분석하면 취약 개념과 반복 복습 일정이 생성됩니다.`,
    question: {
      type: "객관식",
      difficulty: "보통",
      prompt: `${title} 공부를 시작할 때 가장 먼저 해야 할 일은?`,
      choices: ["시험 범위와 핵심 개념 잡기", "무작정 암기하기", "오답을 지우기", "자료 없이 문제만 풀기"],
      answer: 0,
      explanation: "시험 범위와 핵심 개념을 먼저 잡아야 AI 필기와 문제 생성이 정확해집니다.",
      concept: "학습 시작 전략"
    },
    resources: fallbackResources,
    flashcards: [
      { front: "핵심 개념", back: `${title}에서 문제로 자주 바뀌는 기본 정의와 조건` },
      { front: "빈출 포인트", back: "교재, 필기, 기출에서 반복 등장하는 부분" },
      { front: "오답 원인", back: "개념 혼동, 조건 누락, 계산 실수, 지문 오독으로 분류" }
    ],
    plan: [
      { day: "오늘", title: "자료 1개 넣기", detail: "PDF나 화면 캡처를 분석해서 첫 필기를 만듭니다." },
      { day: "D-7", title: "예상 문제", detail: "핵심 개념별 문제를 생성하고 풉니다." },
      { day: "D-1", title: "최종 점검", detail: "암기카드와 오답노트만 빠르게 확인합니다." }
    ]
  };
}

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

function Onboarding({
  selectedSubjects,
  addSubject,
  removeSubject,
  start
}: {
  selectedSubjects: Subject[];
  addSubject: (title: string) => void;
  removeSubject: (id: string) => void;
  start: () => void;
}) {
  const [query, setQuery] = useState("");
  const suggestions = subjectSuggestions(query);
  const canCreate = query.trim().length > 0 && !selectedSubjects.some((subject) => subject.title === query.trim());

  return (
    <div className="onboarding">
      <section className="onboarding-hero">
        <div>
          <span className="eyebrow">StudyPilot AI 시작</span>
          <h1>과목을 검색해서 내 공부방을 만드세요</h1>
          <p>과목을 전부 펼쳐놓지 않습니다. 중학생, 고등학생, 대학생 과목을 검색하면 AI가 맞는 학습 템플릿을 추천하고, 없는 과목도 직접 만들 수 있습니다.</p>
        </div>
        <div className="onboarding-actions">
          <div className="search-box">
            <Search size={16} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="과목 검색: 미적분, 운영체제, 간호학, 토익" />
          </div>
          <div className="ai-search-results">
            {query.trim() ? (
              <>
                {suggestions.map((name) => (
                  <button key={name} onClick={() => addSubject(name)}>
                    <Plus size={14} /> {name}
                  </button>
                ))}
                {canCreate && (
                  <button className="primary" onClick={() => addSubject(query.trim())}>
                    <Brain size={14} /> "{query.trim()}" AI 과목 생성
                  </button>
                )}
              </>
            ) : (
              <p>예: 중등 과학, 수학 II, 물리학, 데이터베이스, 성인간호학처럼 입력하세요.</p>
            )}
          </div>
          <button className="primary" disabled={selectedSubjects.length === 0} onClick={start}>
            <Sparkles size={16} /> 선택한 과목으로 시작
          </button>
        </div>
      </section>

      <section className="selected-subjects panel">
        <div className="panel-title">
          <div>
            <span className="eyebrow">내 공부방</span>
            <h2>선택한 과목 {selectedSubjects.length}개</h2>
          </div>
          <Pill tone="warn">나중에 언제든 추가/삭제 가능</Pill>
        </div>
        {selectedSubjects.length === 0 ? (
          <p>아래 과목 버튼을 눌러 공부방에 추가하세요.</p>
        ) : (
          <div className="selected-chip-list">
            {selectedSubjects.map((subject) => (
              <button key={subject.id} onClick={() => removeSubject(subject.id)}>
                {subject.title} <Trash2 size={14} />
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="subject-picker-grid">
        <article className="panel">
          <span className="eyebrow">중고등</span>
          <h3>내신, 수능, 수행평가</h3>
          <p>국어, 영어, 수학, 과학, 사회, 한국사와 선택 과목까지 검색 기반으로 추가합니다.</p>
        </article>
        <article className="panel">
          <span className="eyebrow">대학생</span>
          <h3>전공, 교양, 실습</h3>
          <p>컴공, 간호학, 경영학, 회계학, 통계학, 공학수학 등 대학 과목을 AI 템플릿으로 시작합니다.</p>
        </article>
        <article className="panel">
          <span className="eyebrow">직접 입력</span>
          <h3>없는 과목도 가능</h3>
          <p>검색 결과가 없어도 입력한 이름으로 공부방, 암기카드, 문제 풀이 흐름을 생성합니다.</p>
        </article>
      </section>
    </div>
  );
}

function Coach({ current }: { current: Subject }) {
  return (
    <aside className="panel coach">
      <span className="eyebrow">AI 코치</span>
      <h3>지금 해야 할 공부</h3>
      <p>{current.weak}</p>
      <div className="coach-actions">
        {["쉽게 설명", "3줄 요약", "문제 만들기", "암기카드", "오답 이유"].map((action) => (
          <button key={action}>{action}</button>
        ))}
      </div>
      <div className="mini-card">
        <strong>핵심 기능</strong>
        <p>PDF나 현재 화면을 인식해서 바로 필기, 중요 개념, 문제, 복습 일정으로 바꾸는 것이 StudyPilot의 중심입니다.</p>
      </div>
    </aside>
  );
}

function EmptyState({ goAnalyze }: { goAnalyze: () => void }) {
  return (
    <section className="panel empty-state">
      <span className="eyebrow">공부 시작 준비</span>
      <h2>과목을 선택했으면 이제 자료를 넣어보세요</h2>
      <p>PDF, 교재 캡처, 강의 화면, 웹페이지 내용을 인식해서 AI 필기와 문제로 바꾸는 흐름이 핵심입니다.</p>
      <button className="primary" onClick={goAnalyze}><MonitorUp size={16} />PDF/화면 인식 열기</button>
    </section>
  );
}

function Dashboard({ current, goAnalyze }: { current: Subject; goAnalyze: () => void }) {
  const loop = ["PDF/화면 인식", "AI 필기", "중요 표시", "문제 생성", "풀이", "오답 분석", "반복 복습", "점수 향상"];
  return (
    <section className="dashboard-grid">
      <article className="panel wide">
        <div className="panel-title">
          <div>
            <span className="eyebrow">Core Loop</span>
            <h2>자료를 넣으면 공부 루프가 자동으로 만들어집니다</h2>
          </div>
          <button className="primary" onClick={goAnalyze}><MonitorUp size={16} />자료 인식 시작</button>
        </div>
        <div className="learning-loop">{loop.map((step) => <span key={step}>{step}</span>)}</div>
      </article>

      <article className="panel">
        <span className="eyebrow">오늘 할 일</span>
        <h3>{current.title} 첫 공부 세션</h3>
        <ul className="task-list">
          <li><input type="checkbox" defaultChecked /> PDF 또는 화면 1개 분석</li>
          <li><input type="checkbox" /> AI 필기 검토 및 수정</li>
          <li><input type="checkbox" /> 암기카드 {current.flashcards.length}개 확인</li>
          <li><input type="checkbox" /> 예상 문제 1세트 풀기</li>
        </ul>
      </article>

      <article className="panel">
        <span className="eyebrow">시험 준비</span>
        <h3>{current.exam}</h3>
        <div className="d-day-list">
          {current.plan.map((task) => (
            <span key={task.day}>{task.day} · {task.title}</span>
          ))}
        </div>
      </article>

      <article className="panel">
        <span className="eyebrow">자동 분석 예시</span>
        <h3>AI가 자료에서 뽑는 것</h3>
        <div className="analysis-list">
          <span>★ 매우 중요: {current.concepts[0]}</span>
          <span>⚠ 헷갈림: {current.concepts[1]}</span>
          <span>예상 문제 개념: {current.question.concept}</span>
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

function Analyzer({ current }: { current: Subject }) {
  const [fileName, setFileName] = useState("");
  const [screenMode, setScreenMode] = useState(false);
  const [screenMessage, setScreenMessage] = useState("");
  const [captureImage, setCaptureImage] = useState("");
  const [analysisReady, setAnalysisReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const hasInput = fileName || screenMode;

  async function startScreenCapture() {
    try {
      if (!navigator.mediaDevices?.getDisplayMedia) {
        setScreenMessage("이 브라우저에서는 화면 인식 API를 지원하지 않습니다.");
        return;
      }
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: false });
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setScreenMode(true);
      setCaptureImage("");
      setAnalysisReady(false);
      setScreenMessage("화면 공유가 연결되었습니다. 캡처 버튼을 누르면 현재 프레임을 공부 자료로 변환합니다.");
    } catch {
      setScreenMessage("화면 공유가 취소되었습니다. 버튼을 다시 누르면 브라우저 권한 창이 열립니다.");
    }
  }

  function captureScreenFrame() {
    const video = videoRef.current;
    if (!video || video.videoWidth === 0) {
      setScreenMessage("화면 미리보기가 준비되면 다시 캡처하세요.");
      return;
    }
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    context?.drawImage(video, 0, 0, canvas.width, canvas.height);
    setCaptureImage(canvas.toDataURL("image/png"));
    setAnalysisReady(true);
    setScreenMessage("화면 캡처가 완료되었습니다. 아래에 AI 정리 결과가 생성되었습니다.");
  }

  function analyzePdfFile(file: File | undefined) {
    if (!file) return;
    setFileName(file.name);
    setAnalysisReady(true);
  }

  return (
    <section className="room-grid">
      <article className="panel wide">
        <div className="panel-title">
          <div>
            <span className="eyebrow">핵심 기능</span>
            <h2>PDF와 현재 화면을 인식해서 공부 자료로 정리</h2>
          </div>
          <Pill tone="warn">브라우저 화면 공유 권한은 사용자가 직접 허용해야 합니다</Pill>
        </div>

        <div className="analyzer-grid">
          <div className="capture-card">
            <Upload size={26} />
            <strong>PDF/이미지 업로드</strong>
            <p>교재 PDF, 강의자료, 시험지, 필기 사진을 넣으면 요약, 필기, 중요 개념, 문제를 만듭니다.</p>
            <input
              type="file"
              accept=".pdf,image/*"
              onChange={(event) => analyzePdfFile(event.target.files?.[0])}
            />
            {fileName && <span className="file-pill">선택됨: {fileName}</span>}
          </div>

          <div className="capture-card">
            <MonitorUp size={26} />
            <strong>현재 화면 인식</strong>
            <p>강의 화면, 웹페이지, PDF 뷰어, 문제 풀이 화면을 캡처해서 바로 정리하는 흐름입니다.</p>
            <button className="primary" onClick={startScreenCapture}>현재 화면 정리 시작</button>
            {screenMode && <button onClick={captureScreenFrame}>현재 프레임 캡처</button>}
            {screenMode && <span className="file-pill">화면 인식 모드 준비됨</span>}
            {screenMessage && <p className="hint-text">{screenMessage}</p>}
          </div>
        </div>

        <div className="screen-preview-grid">
          <div className="screen-preview">
            <strong>실시간 화면 미리보기</strong>
            <video ref={videoRef} muted playsInline />
          </div>
          <div className="screen-preview">
            <strong>캡처된 공부 화면</strong>
            {captureImage ? <img src={captureImage} alt="캡처된 화면" /> : <p>아직 캡처된 화면이 없습니다.</p>}
          </div>
        </div>

        <div className="analysis-output">
          <span className="eyebrow">AI 정리 결과 미리보기</span>
          {hasInput || analysisReady ? (
            <div className="analysis-columns">
              <div>
                <h3>자동 필기</h3>
                <p>{current.title} 자료에서 {current.concepts[0]}, {current.concepts[1]}가 시험에 자주 나오는 핵심으로 감지되었습니다.</p>
              </div>
              <div>
                <h3>중요 표시</h3>
                <p>★ {current.concepts[0]} / ⚠ {current.concepts[1]} / 예상 문제: {current.question.concept}</p>
              </div>
              <div>
                <h3>생성 문제</h3>
                <p>{current.question.prompt}</p>
              </div>
              <div>
                <h3>복습 예약</h3>
                <p>틀린 문제는 1일 후, 3일 후, 7일 후 다시 나오도록 배치됩니다.</p>
              </div>
              <div>
                <h3>화면/PDF 출처</h3>
                <p>{fileName ? `파일: ${fileName}` : captureImage ? "현재 화면 캡처" : "화면 인식 대기 중"}</p>
              </div>
              <div>
                <h3>다음 액션</h3>
                <p>이 결과를 AI 필기, 암기카드, 기출 변형 문제에 자동 반영하는 단계로 연결됩니다.</p>
              </div>
            </div>
          ) : (
            <p>PDF를 선택하거나 현재 화면 인식 버튼을 누르면 AI 정리 결과가 여기에 표시됩니다.</p>
          )}
        </div>
      </article>
      <Coach current={current} />
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
          <div className="upload-box"><Upload size={22} /><strong>내 파일</strong><p>PDF, 이미지, 필기자료, 시험지를 분석합니다.</p><input type="file" /></div>
          <div className="upload-box"><BookOpen size={22} /><strong>공개 교재</strong><p>공개 라이선스 자료를 과목, 난이도, 언어별로 고릅니다.</p><select><option>{current.title}</option><option>전체 과목</option></select></div>
          <div className="upload-box"><FileText size={22} /><strong>텍스트 입력</strong><textarea placeholder="개념, 문제, 강의 내용을 붙여넣으세요." /></div>
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
          <div><span className="eyebrow">추천 자료</span><h2>{current.title} 공개 교재와 학습 자료</h2></div>
          <div className="search-box"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="교재, 난이도, 언어 검색" /></div>
        </div>
        <div className="resource-grid">
          {filtered.map((resource) => (
            <article className="resource-card" key={resource.title}>
              <span>{resource.provider} · {resource.kind}</span>
              <h3>{resource.title}</h3>
              <p>{resource.note}</p>
              <div className="resource-meta"><Pill>{resource.level}</Pill><Pill>{resource.language}</Pill><Pill tone="warn">{resource.license}</Pill></div>
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
          {["시험 직전 요약형", "개념 자세히 설명형", "암기 카드형", "판서 스타일", "초보자 설명형", "상위권 정리형"].map((style, index) => (
            <button className={index === 0 ? "selected" : ""} key={style}>{style}</button>
          ))}
        </div>
        <div className="note-block" contentEditable suppressContentEditableWarning>
          <h3>{current.concepts[0]}</h3>
          <p><mark>시험에 자주 나오는 핵심은 정의, 조건, 예외 상황을 구분하는 것</mark>입니다. {current.template}</p>
          <ul><li>핵심 요약: {current.concepts.join(", ")}</li><li>암기 키워드: 정의, 조건, 비교, 예외</li><li>헷갈리는 개념: {current.weak}</li></ul>
        </div>
        <div className="button-row">{["쉽게 설명", "시험에 나오게 설명", "한 줄 요약", "예시 들어 설명"].map((label) => <button key={label}>{label}</button>)}<button className="primary">문제로 바꿔줘</button></div>
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
              <strong>{card.front}</strong><span>{openIndex === index ? card.back : "눌러서 답 보기"}</span>
            </button>
          ))}
        </div>
      </article>
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

function Variants({ current }: { current: Subject }) {
  return (
    <section className="room-grid">
      <article className="panel wide">
        <span className="eyebrow">기출 변형</span>
        <h2>정답 개념은 유지하고 표현만 바꿉니다</h2>
        <div className="rule-box">원본 정답 개념: <strong>{current.question.concept}</strong><br />문제 표현, 보기, 상황, 예시만 변경합니다.</div>
        <QuestionCard question={current.question} />
      </article>
      <Coach current={current} />
    </section>
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
      addWrongNote({ subject: current.title, concept: q.concept, mine: q.choices[selectedAnswer], answer: q.choices[q.answer], reason: "정답 개념과 보기 조건을 연결하지 못했습니다." });
    }
    setSolved(true);
  }

  return (
    <section className="room-grid">
      <article className="panel wide">
        <div className="panel-title"><div><span className="eyebrow">CBT 문제 풀이</span><h2>{current.title} 실전 세트</h2></div><Pill>{q.difficulty}</Pill></div>
        <div className="exam-toolbar"><button className="selected">시험 모드</button><button>시간 제한</button><button onClick={() => { setSelectedAnswer(null); setSolved(false); }}>다시 풀기</button><span>남은 시간 09:42</span></div>
        <div className="question-card">
          <span>{q.type} · 관련 개념 {q.concept}</span>
          <h3>{q.prompt}</h3>
          <div className="choice-list">{q.choices.map((choice, index) => <button className={selectedAnswer === index ? "picked" : ""} onClick={() => { setSelectedAnswer(index); setSolved(false); }} key={choice}><span>{index + 1}</span>{choice}</button>)}</div>
          <button className="primary" onClick={grade}>채점</button>
          {answered && <div className={`result ${correct ? "correct" : "wrong"}`}><strong>{correct ? "정답입니다." : "오답노트에 자동 저장되었습니다."}</strong><p>{q.explanation}</p></div>}
        </div>
      </article>
      <Coach current={current} />
    </section>
  );
}

function WrongNotes({ current, notes }: { current: Subject; notes: WrongNote[] }) {
  return (
    <section className="dashboard-grid">
      <article className="panel wide"><span className="eyebrow">오답노트</span><h2>AI가 약점을 문장으로 정리합니다</h2><p>{current.weak}</p></article>
      {notes.map((note, index) => <article className="wrong-card" key={`${note.subject}-${note.concept}-${index}`}><span>{note.subject} · {note.concept}</span><h3>내 답: {note.mine} / 정답: {note.answer}</h3><p>틀린 이유: {note.reason}</p><div className="button-row"><button>다시 풀기</button><button className="primary">비슷한 변형 문제 생성</button></div></article>)}
    </section>
  );
}

function Review({ current }: { current: Subject }) {
  return (
    <section className="dashboard-grid">
      <article className="panel wide"><span className="eyebrow">망각 곡선 복습</span><h2>틀린 문제는 더 자주, 맞힌 문제는 더 길게</h2><div className="timeline">{reviewSteps.map((step, index) => <div key={step}><strong>{step}</strong><span>{current.concepts[index % current.concepts.length]}</span></div>)}</div></article>
      <article className="panel"><span className="eyebrow">집중 복습</span><h3>{current.concepts[1]}</h3><p>최근 오답률이 높아 내일 알림 학습에 포함됩니다.</p></article>
    </section>
  );
}

function Alerts() {
  return (
    <section className="dashboard-grid">
      <article className="panel wide"><span className="eyebrow">알림 학습</span><h2>웹 푸시, 이메일, 추후 카카오 알림톡 확장</h2><div className="notification-list">{["오늘의 개념 3개", "OX 문제 3개", "어제 틀린 문제 복습", "시험 D-day 요약", "과목별 암기 카드", "길가면서 푸는 미니 문제"].map((item) => <label key={item}><input type="checkbox" defaultChecked /> {item}</label>)}</div></article>
    </section>
  );
}

function DownloadPage() {
  return (
    <section className="dashboard-grid">
      <article className="panel wide">
        <span className="eyebrow">설치 준비</span>
        <h2>웹앱과 PWA 설치를 지원합니다</h2>
        <div className="download-grid">
          {["웹에서 바로 시작", "Windows", "macOS", "Android", "iOS/iPadOS"].map((item, index) => (
            <button className={index === 0 ? "primary" : ""} key={item}><Download size={16} />{item}</button>
          ))}
        </div>
      </article>
    </section>
  );
}

function App() {
  const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [started, setStarted] = useState(false);
  const [wrongNotes, setWrongNotes] = useState<WrongNote[]>(initialWrongNotes);
  const current = selectedSubjects.find((item) => item.id === selectedSubjectId) ?? selectedSubjects[0];

  function addSubject(title: string) {
    if (selectedSubjects.some((subject) => subject.title === title)) return;
    const created = makeSubject(title);
    setSelectedSubjects((prev) => [...prev, created]);
    setSelectedSubjectId(created.id);
  }

  function removeSubject(id: string) {
    const next = selectedSubjects.filter((subject) => subject.id !== id);
    setSelectedSubjects(next);
    if (selectedSubjectId === id) setSelectedSubjectId(next[0]?.id ?? "");
    if (next.length === 0) setStarted(false);
  }

  const pages: Record<TabId, React.ReactNode> = current ? {
    overview: <Dashboard current={current} goAnalyze={() => setActiveTab("analyze")} />,
    analyze: <Analyzer current={current} />,
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
  } : {} as Record<TabId, React.ReactNode>;

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand"><img src="/assets/icon.svg" alt="" /><div><strong>StudyPilot AI</strong><span>PDF와 화면을 공부 자료로 바꾸는 AI 공부방</span></div></div>
        <nav><button className="ghost">게스트 체험</button><button className="kakao"><Bell size={16} />카카오 로그인</button></nav>
      </header>

      {!started ? (
        <Onboarding selectedSubjects={selectedSubjects} addSubject={addSubject} removeSubject={removeSubject} start={() => setStarted(true)} />
      ) : (
        <main>
          <aside className="sidebar">
            <div className="create-card">
              <span className="eyebrow">내 과목</span>
              <button className="primary" onClick={() => setStarted(false)}><Plus size={16} />과목 추가/삭제</button>
            </div>
            <div className="subject-list">
              {selectedSubjects.map((item) => (
                <button className={`subject-card ${item.id === selectedSubjectId ? "active" : ""}`} onClick={() => setSelectedSubjectId(item.id)} key={item.id}>
                  <div className="subject-head"><span className={`subject-dot ${item.color}`} /><span>{item.group}</span></div>
                  <strong>{item.title}</strong><small>{item.exam}</small><ProgressBar value={item.progress} />
                  <div className="subject-meta"><span>진도 {item.progress}%</span><span>준비도 {item.readiness}%</span></div>
                </button>
              ))}
            </div>
          </aside>

          <section className="content">
            {current ? (
              <>
                <div className="hero">
                  <div><span className="eyebrow">{current.field}</span><h1>{current.title}</h1><p>{current.template}</p></div>
                  <div className="hero-stats"><div><CheckCircle2 size={22} /><strong>{current.progress}%</strong><span>진도율</span></div><div><Timer size={22} /><strong>{current.readiness}%</strong><span>준비도</span></div></div>
                </div>
                <div className="study-strip">
                  <div><Sparkles size={18} /><strong>핵심 행동</strong><span>{current.plan[0].detail}</span></div>
                  <div><MonitorUp size={18} /><strong>화면 인식</strong><span>PDF/강의/웹페이지 정리</span></div>
                  <div><BookOpen size={18} /><strong>추천 자료</strong><span>{current.resources.length}개</span></div>
                </div>
                <div className="tabs">{tabs.map(([id, label]) => <button className={activeTab === id ? "active" : ""} onClick={() => setActiveTab(id)} key={id}>{label}</button>)}</div>
                {pages[activeTab]}
              </>
            ) : <EmptyState goAnalyze={() => setActiveTab("analyze")} />}
          </section>
        </main>
      )}
    </div>
  );
}

createRoot(document.getElementById("app")!).render(<App />);

if (import.meta.env.PROD && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js").catch(() => undefined);
  });
}
