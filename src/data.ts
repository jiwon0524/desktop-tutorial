import type { Subject, TabId, WrongNote } from "./types";

export const subjects: Subject[] = [
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
      explanation: "교착상태의 필요 조건은 상호 배제, 점유와 대기, 비선점, 환형 대기입니다.",
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
      explanation: "명세대로 만들었는지는 검증, 사용자가 원하는 제품인지는 확인입니다.",
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
      prompt: "학생 테이블과 수강 테이블에서 같은 학번을 기준으로 학생 이름과 과목명을 조회하는 JOIN 조건은?",
      choices: ["ON 학생.학번 = 수강.학번", "ON 학생.이름 = 수강.과목명", "WHERE 학번 IS NULL", "GROUP BY 과목명"],
      answer: 0,
      explanation: "두 테이블의 공통 키인 학번을 기준으로 조인해야 합니다.",
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

export const tabs: Array<[TabId, string]> = [
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

export const initialWrongNotes: WrongNote[] = [
  {
    subject: "데이터베이스",
    concept: "자연조인",
    mine: "세타조인",
    answer: "자연조인",
    reason: "공통 속성 자동 매칭 조건을 놓침"
  }
];
