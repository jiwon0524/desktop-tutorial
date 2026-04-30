import type { Resource, Subject, TabId, WrongNote } from "./types";

const openResources: Record<string, Resource[]> = {
  cs: [
    {
      title: "Operating Systems: Three Easy Pieces",
      provider: "OSTEP",
      kind: "무료 공개 교재",
      level: "대학 전공",
      language: "English",
      license: "공개 웹 교재",
      note: "운영체제 개념을 예제 중심으로 공부하기 좋습니다."
    },
    {
      title: "Database Design",
      provider: "Open Textbook Library",
      kind: "오픈 텍스트북",
      level: "입문-중급",
      language: "English",
      license: "공개 라이선스",
      note: "ERD, 정규화, SQL 기초를 함께 복습하기 좋습니다."
    },
    {
      title: "CS50x Lecture Notes",
      provider: "Harvard OpenCourseWare",
      kind: "공개 강의자료",
      level: "입문",
      language: "English",
      license: "공개 강의자료",
      note: "컴퓨터공학 입문 개념과 코딩 사고를 연결합니다."
    }
  ],
  math: [
    {
      title: "OpenStax Calculus Volume 1",
      provider: "OpenStax",
      kind: "무료 공개 교재",
      level: "고등-대학",
      language: "English",
      license: "CC BY",
      note: "극한, 미분, 적분 개념 학습에 적합합니다."
    },
    {
      title: "Khan Academy Math",
      provider: "Khan Academy",
      kind: "무료 강의",
      level: "기초-심화",
      language: "English/한국어 일부",
      license: "무료 학습 자료",
      note: "단원별 연습과 즉시 피드백이 강점입니다."
    }
  ],
  english: [
    {
      title: "British Council LearnEnglish",
      provider: "British Council",
      kind: "무료 학습자료",
      level: "초급-고급",
      language: "English",
      license: "무료 공개 자료",
      note: "문법, 어휘, 독해를 균형 있게 훈련할 수 있습니다."
    },
    {
      title: "Project Gutenberg Short Readings",
      provider: "Project Gutenberg",
      kind: "공개 원문",
      level: "중급-고급",
      language: "English",
      license: "Public domain",
      note: "독해 지문과 어휘 카드 생성용 자료로 좋습니다."
    }
  ],
  science: [
    {
      title: "OpenStax Biology 2e",
      provider: "OpenStax",
      kind: "무료 공개 교재",
      level: "고등-대학",
      language: "English",
      license: "CC BY",
      note: "생명과학 개념, 실험, 그래프 해석에 적합합니다."
    },
    {
      title: "OpenStax Chemistry 2e",
      provider: "OpenStax",
      kind: "무료 공개 교재",
      level: "고등-대학",
      language: "English",
      license: "CC BY",
      note: "화학 공식, 반응식, 계산 문제 연습에 좋습니다."
    }
  ],
  certification: [
    {
      title: "정보처리기사 공개 출제기준",
      provider: "한국산업인력공단",
      kind: "공개 시험 기준",
      level: "자격증",
      language: "한국어",
      license: "공개 시험 정보",
      note: "CBT 모드와 빈출 개념 정리에 연결하기 좋습니다."
    },
    {
      title: "한국사능력검정시험 공개 자료",
      provider: "국사편찬위원회",
      kind: "공개 시험 자료",
      level: "자격증",
      language: "한국어",
      license: "공개 시험 정보",
      note: "연표, 사건 원인/결과, OX 문제 생성에 적합합니다."
    }
  ]
};

export const subjectCatalog = [
  "국어",
  "영어",
  "수학",
  "과학",
  "사회",
  "한국사",
  "컴퓨터공학",
  "소프트웨어공학",
  "운영체제",
  "데이터베이스",
  "자료구조",
  "알고리즘",
  "Java",
  "Python",
  "SQL",
  "C언어",
  "정보처리기사",
  "컴활",
  "토익",
  "한국사능력검정시험",
  "전산회계",
  "간호학",
  "임상병리학",
  "경영학",
  "회계학",
  "일본어",
  "중국어"
];

export const subjects: Subject[] = [
  {
    id: "os",
    title: "운영체제",
    field: "컴퓨터공학",
    group: "대학생",
    exam: "중간고사 D-12",
    progress: 68,
    readiness: 72,
    color: "blue",
    template: "개념 구조도 + 시스템 예시 + CBT 문제",
    materials: ["프로세스와 스레드 강의자료.pdf", "교착상태 기출 20문항"],
    concepts: ["프로세스 상태 전이", "교착상태 4조건", "CPU 스케줄링", "가상 메모리"],
    weak: "교착상태 조건 문제에서 비선점과 환형 대기를 자주 헷갈립니다.",
    question: {
      type: "객관식",
      difficulty: "보통",
      prompt: "교착상태가 발생하기 위한 필요 조건이 아닌 것은?",
      choices: ["상호 배제", "점유와 대기", "선점 가능", "환형 대기"],
      answer: 2,
      explanation: "교착상태의 필요 조건은 상호 배제, 점유와 대기, 비선점, 환형 대기입니다.",
      concept: "교착상태 4조건"
    },
    resources: openResources.cs,
    flashcards: [
      { front: "교착상태 4조건", back: "상호 배제, 점유와 대기, 비선점, 환형 대기" },
      { front: "비선점", back: "자원을 강제로 빼앗을 수 없는 상태" },
      { front: "SJF", back: "실행 시간이 짧은 프로세스를 먼저 선택하는 스케줄링" }
    ],
    plan: [
      { day: "오늘", title: "교착상태 조건 정리", detail: "4조건을 암기카드로 외우고 OX 5문제를 풉니다." },
      { day: "D-7", title: "스케줄링 비교", detail: "FCFS, SJF, RR의 장단점 표를 완성합니다." },
      { day: "D-3", title: "오답 집중", detail: "교착상태와 가상 메모리 오답만 다시 풉니다." }
    ]
  },
  {
    id: "se",
    title: "소프트웨어공학",
    field: "컴퓨터공학",
    group: "대학생",
    exam: "기말 프로젝트 D-21",
    progress: 54,
    readiness: 61,
    color: "green",
    template: "프로세스 비교표 + 사례형 문제 + 서술형 대비",
    materials: ["요구사항 분석 노트", "UML 정리"],
    concepts: ["요구사항 명세", "애자일", "테스트 케이스", "검증과 확인"],
    weak: "검증과 확인의 차이를 헷갈립니다.",
    question: {
      type: "OX",
      difficulty: "쉬움",
      prompt: "확인(validation)은 제품이 명세대로 만들어졌는지 검사하는 활동이다.",
      choices: ["O", "X"],
      answer: 1,
      explanation: "명세대로 만들었는지는 검증, 사용자가 원하는 제품인지는 확인입니다.",
      concept: "Verification vs Validation"
    },
    resources: openResources.cs,
    flashcards: [
      { front: "Verification", back: "명세대로 만들었는가?" },
      { front: "Validation", back: "사용자가 원하는 제품인가?" },
      { front: "애자일", back: "짧은 반복과 피드백으로 제품을 개선하는 개발 방식" }
    ],
    plan: [
      { day: "오늘", title: "검증/확인 비교", detail: "정의와 예시를 각각 2개씩 적습니다." },
      { day: "D-5", title: "UML 복습", detail: "유스케이스와 클래스 다이어그램 차이를 정리합니다." },
      { day: "D-1", title: "서술형 대비", detail: "프로세스 모델 비교 문제를 3개 풉니다." }
    ]
  },
  {
    id: "db",
    title: "데이터베이스",
    field: "컴퓨터공학",
    group: "대학생",
    exam: "SQL 시험 D-9",
    progress: 73,
    readiness: 66,
    color: "purple",
    template: "관계대수 + SQL 빈칸 + 조인 비교 훈련",
    materials: ["정규화 요약", "SQL JOIN 문제집"],
    concepts: ["정규화", "자연조인", "트랜잭션 격리성", "인덱스"],
    weak: "자연조인과 세타조인을 헷갈립니다.",
    question: {
      type: "SQL",
      difficulty: "어려움",
      prompt: "학생 테이블과 수강 테이블에서 같은 학번을 기준으로 학생 이름과 과목명을 조회하는 JOIN 조건은?",
      choices: ["ON 학생.학번 = 수강.학번", "ON 학생.이름 = 수강.과목명", "WHERE 학번 IS NULL", "GROUP BY 과목명"],
      answer: 0,
      explanation: "두 테이블의 공통 키인 학번을 기준으로 조인해야 합니다.",
      concept: "JOIN 조건"
    },
    resources: openResources.cs,
    flashcards: [
      { front: "자연조인", back: "공통 속성을 자동으로 기준 삼아 조인" },
      { front: "세타조인", back: "비교 연산 조건을 사용한 조인" },
      { front: "제3정규형", back: "이행적 함수 종속을 제거한 상태" }
    ],
    plan: [
      { day: "오늘", title: "JOIN 조건 10문제", detail: "자연조인/세타조인/외부조인을 구분합니다." },
      { day: "D-4", title: "정규화 집중", detail: "1NF부터 BCNF까지 예시로 정리합니다." },
      { day: "D-1", title: "SQL 빈칸", detail: "SELECT, JOIN, GROUP BY 빈칸 문제만 풉니다." }
    ]
  },
  {
    id: "math",
    title: "수학",
    field: "수학",
    group: "고등학생/대학생",
    exam: "모의고사 D-15",
    progress: 47,
    readiness: 58,
    color: "orange",
    template: "공식 정리 + 단계별 풀이 + 유사 문제",
    materials: ["미분 공식 노트", "수열 기출"],
    concepts: ["극한", "미분계수", "등비수열", "정적분"],
    weak: "풀이 중 부호 실수가 반복됩니다.",
    question: {
      type: "수학 풀이",
      difficulty: "보통",
      prompt: "f(x)=x^2+3x일 때 f'(2)의 값은?",
      choices: ["5", "6", "7", "8"],
      answer: 2,
      explanation: "f'(x)=2x+3이므로 f'(2)=7입니다.",
      concept: "도함수"
    },
    resources: openResources.math,
    flashcards: [
      { front: "미분계수", back: "평균변화율의 극한" },
      { front: "등비수열 합", back: "a(r^n-1)/(r-1), r이 1이 아닐 때" },
      { front: "정적분", back: "함수 그래프 아래 넓이와 누적 변화량" }
    ],
    plan: [
      { day: "오늘", title: "미분 공식 암기", detail: "기본 미분 공식 8개를 카드로 확인합니다." },
      { day: "D-7", title: "유사 문제", detail: "도함수 계산 문제 15개를 풉니다." },
      { day: "D-2", title: "실수 줄이기", detail: "부호 실수 오답만 모아 다시 풉니다." }
    ]
  },
  {
    id: "english",
    title: "영어",
    field: "어학",
    group: "수능/토익",
    exam: "단어 시험 D-5",
    progress: 81,
    readiness: 75,
    color: "teal",
    template: "단어장 + 문법 포인트 + 독해 선지 분석",
    materials: ["토익 Part 5 오답", "수능 독해 지문"],
    concepts: ["관계대명사", "분사구문", "문장 삽입", "양보 접속사"],
    weak: "문장 삽입 문제에서 연결사를 놓칩니다.",
    question: {
      type: "객관식",
      difficulty: "보통",
      prompt: "빈칸에 가장 알맞은 접속사는? The data was limited, ___ the conclusion was reliable.",
      choices: ["because", "although", "therefore", "unless"],
      answer: 1,
      explanation: "제한된 데이터와 신뢰 가능한 결론은 양보 관계이므로 although가 자연스럽습니다.",
      concept: "양보 접속사"
    },
    resources: openResources.english,
    flashcards: [
      { front: "although", back: "비록 ~이지만" },
      { front: "therefore", back: "그러므로, 결과 연결" },
      { front: "분사구문", back: "접속사와 주어를 줄여 부사처럼 쓰는 구조" }
    ],
    plan: [
      { day: "오늘", title: "연결사 20개", detail: "양보/원인/결과 연결사를 구분합니다." },
      { day: "D-3", title: "문장 삽입", detail: "지시어와 연결사를 표시하며 5지문을 풉니다." },
      { day: "D-1", title: "오답 선지 분석", detail: "틀린 선지가 왜 틀렸는지 한 줄로 씁니다." }
    ]
  },
  {
    id: "korean-history",
    title: "한국사",
    field: "사회/역사",
    group: "고등학생/자격증",
    exam: "능력검정 D-18",
    progress: 36,
    readiness: 45,
    color: "green",
    template: "연표 + 사건 원인/결과 + OX 암기",
    materials: ["근현대사 연표", "문화사 오답"],
    concepts: ["흥선대원군 정책", "갑오개혁", "3.1 운동", "광복 이후 정부 수립"],
    weak: "근현대 사건의 순서를 자주 바꿔 기억합니다.",
    question: {
      type: "OX",
      difficulty: "보통",
      prompt: "갑오개혁에는 신분제 폐지가 포함되었다.",
      choices: ["O", "X"],
      answer: 0,
      explanation: "갑오개혁의 주요 내용에는 신분제 폐지, 과거제 폐지 등이 포함됩니다.",
      concept: "갑오개혁"
    },
    resources: openResources.certification,
    flashcards: [
      { front: "갑오개혁", back: "신분제 폐지, 과거제 폐지, 근대 제도 개혁" },
      { front: "3.1 운동", back: "1919년 민족 대표 33인과 전국적 만세 운동" },
      { front: "흥선대원군", back: "통상 수교 거부, 서원 정리, 경복궁 중건" }
    ],
    plan: [
      { day: "오늘", title: "근현대 연표", detail: "사건 12개를 순서대로 배열합니다." },
      { day: "D-7", title: "문화사 카드", detail: "불교/유교/근대 문화 카드를 암기합니다." },
      { day: "D-2", title: "OX 30문제", detail: "시대별 OX 문제로 빠르게 점검합니다." }
    ]
  },
  {
    id: "nursing",
    title: "간호학",
    field: "보건/의학",
    group: "대학생/국가고시",
    exam: "실습 시험 D-20",
    progress: 42,
    readiness: 52,
    color: "purple",
    template: "용어 + 정상/비정상 수치 + 사례형 문제",
    materials: ["활력징후 정리", "성인간호 오답"],
    concepts: ["활력징후", "감염관리", "간호과정", "투약 원칙"],
    weak: "정상 수치와 예외 상황을 함께 외우는 데 약합니다.",
    question: {
      type: "객관식",
      difficulty: "보통",
      prompt: "투약 5 rights에 포함되지 않는 것은?",
      choices: ["정확한 대상자", "정확한 약물", "정확한 날씨", "정확한 용량"],
      answer: 2,
      explanation: "투약 5 rights는 대상자, 약물, 용량, 경로, 시간 확인입니다.",
      concept: "투약 원칙"
    },
    resources: openResources.science,
    flashcards: [
      { front: "투약 5 rights", back: "대상자, 약물, 용량, 경로, 시간" },
      { front: "감염관리 기본", back: "손 위생, 보호구, 격리 지침" },
      { front: "간호과정", back: "사정, 진단, 계획, 수행, 평가" }
    ],
    plan: [
      { day: "오늘", title: "투약 원칙 암기", detail: "5 rights와 사례형 문제 5개를 풉니다." },
      { day: "D-5", title: "정상 수치", detail: "활력징후 정상 범위를 카드로 확인합니다." },
      { day: "D-1", title: "실습 체크", detail: "감염관리와 안전 수칙만 빠르게 복습합니다." }
    ]
  },
  {
    id: "certificate",
    title: "정보처리기사",
    field: "자격증",
    group: "직장인/취준생",
    exam: "필기 D-30",
    progress: 29,
    readiness: 39,
    color: "blue",
    template: "CBT + 빈출 개념 + 합격 점수 관리",
    materials: ["소프트웨어 설계 기출", "데이터베이스 구축 요약"],
    concepts: ["요구사항 확인", "SQL", "운영체제", "네트워크"],
    weak: "암기형 용어와 계산형 문제가 섞이면 속도가 떨어집니다.",
    question: {
      type: "객관식",
      difficulty: "보통",
      prompt: "데이터베이스의 트랜잭션 특성 ACID에 포함되지 않는 것은?",
      choices: ["Atomicity", "Consistency", "Isolation", "Designability"],
      answer: 3,
      explanation: "ACID는 원자성, 일관성, 격리성, 지속성입니다.",
      concept: "ACID"
    },
    resources: openResources.certification,
    flashcards: [
      { front: "ACID", back: "원자성, 일관성, 격리성, 지속성" },
      { front: "응집도", back: "모듈 내부 요소들이 관련된 정도" },
      { front: "결합도", back: "모듈 간 의존 정도" }
    ],
    plan: [
      { day: "오늘", title: "CBT 20문제", detail: "틀린 문제는 자동 오답노트로 보냅니다." },
      { day: "D-14", title: "빈출 개념", detail: "ACID, 정규화, 결합도/응집도를 정리합니다." },
      { day: "D-3", title: "합격 점수 점검", detail: "과목별 40점 미만 위험 과목을 확인합니다." }
    ]
  }
];

export const tabs: Array<[TabId, string]> = [
  ["overview", "개요"],
  ["materials", "자료 추가"],
  ["resources", "추천 자료"],
  ["notes", "AI 필기"],
  ["concepts", "중요 개념"],
  ["flashcards", "암기카드"],
  ["variants", "기출 변형"],
  ["solve", "문제 풀이"],
  ["wrong", "오답노트"],
  ["review", "복습 일정"],
  ["alerts", "알림 학습"],
  ["download", "설치"]
];

export const initialWrongNotes: WrongNote[] = [
  {
    subject: "데이터베이스",
    concept: "자연조인",
    mine: "세타조인",
    answer: "자연조인",
    reason: "공통 속성 자동 매칭 조건을 놓쳤습니다."
  },
  {
    subject: "운영체제",
    concept: "교착상태",
    mine: "선점 가능",
    answer: "비선점",
    reason: "교착상태 조건은 자원을 강제로 빼앗지 못하는 상황을 전제로 합니다."
  }
];
