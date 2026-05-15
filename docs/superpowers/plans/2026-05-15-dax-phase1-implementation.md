# PR2팀 DAX Phase 1 구현 계획 — 전 도메인 AI 도입

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** PR2팀 7명 전원이 10개 업무 도메인에서 AI 도구를 실제로 사용하게 되는 기반 세트(프롬프트 라이브러리 + 브랜드 보이스 가이드 + 도메인별 SOP)를 1개월 내 완성한다.

**Architecture:** 각 도메인별로 (1) 표준 프롬프트 파일 작성 → (2) 실제 콘텐츠로 검증 → (3) SOP 문서화 → (4) 팀 공유의 사이클을 반복한다. 모든 산출물은 `Process_map/` 디렉토리에 저장되고 Notion에 미러링한다.

**Tech Stack:** Claude (Anthropic), Claude Projects (RAG), Canva AI, Perplexity, Google Sheets + Apps Script, Notion, ElevenLabs (옵션)

---

## 산출물 파일 구조

```
Process_map/
├── prompts/
│   ├── brand-voice/
│   │   ├── gscaltex-brand-voice.md        # 마스터 브랜드 보이스 가이드
│   │   ├── sns-caption-prompts.md         # SNS 캡션·카드뉴스 프롬프트
│   │   └── ceo-voice-profile.md           # CEO 보이스 프로파일
│   ├── pr/
│   │   ├── press-release-templates.md     # 보도자료 유형별 템플릿
│   │   └── crisis-response-playbook.md    # 위기등급별 대응 프롬프트
│   ├── internal-comm/
│   │   ├── g-note-script-prompt.md        # G식노트 스크립트 생성 프롬프트
│   │   ├── unboxing-script-prompt.md      # 언박싱 스크립트 생성 프롬프트
│   │   └── facetime-script-prompt.md      # Face+Time 스크립트 생성 프롬프트
│   ├── pi/
│   │   └── speech-prompt-templates.md    # 연설문·메시지 유형별 프롬프트
│   └── shared/
│       ├── stakeholder-report-prompt.md   # 경영진 보고서 초안 프롬프트
│       ├── csr-comms-prompt.md            # CSR 보도자료·성과보고 프롬프트
│       ├── campaign-brief-prompt.md       # 캠페인 기획안 초안 프롬프트
│       └── sports-content-prompt.md       # 스포츠 콘텐츠 초안 프롬프트
├── sop/
│   ├── master-sop.md                      # AI 활용 마스터 SOP (팀 공용)
│   ├── review-checklist.md                # 콘텐츠 검토 체크리스트
│   └── quick-start-guide.md              # 팀원용 AI 시작 가이드 (1장)
└── knowledge-base/
    └── README.md                          # 지식베이스 구조 안내
```

---

## Task 1: 마스터 브랜드 보이스 가이드 작성

**Files:**
- Create: `Process_map/prompts/brand-voice/gscaltex-brand-voice.md`

이 가이드는 모든 AI 프롬프트의 기반이 된다. 여기서 정의한 톤·어조·금지어가 이후 모든 프롬프트에 주입된다.

- [ ] **Step 1: 기존 콘텐츠에서 브랜드 보이스 추출**

  미디어허브(gscaltexmediahub.com)의 최근 기사 5건과 LinkedIn 포스팅 3건을 수집한다. 각 콘텐츠에서 다음을 분석한다:
  - 자주 쓰는 단어·표현
  - 문장 길이 경향 (짧고 단호 vs 서술형)
  - 피하는 표현 (과장, 자화자찬 등)
  - 전문용어 사용 수준

- [ ] **Step 2: 브랜드 보이스 문서 작성**

  `Process_map/prompts/brand-voice/gscaltex-brand-voice.md` 를 아래 구조로 작성한다:

  ```markdown
  # GS칼텍스 브랜드 보이스 가이드

  ## 핵심 톤 3가지
  - **전문적이되 친근하게:** 에너지 전문 기업이지만 일반 독자도 이해할 수 있게
  - **사실 중심·과장 없이:** 수치와 사실로 말하고, 과도한 미사여구 피함
  - **미래 지향적·행동하는:** 전환(Transformation) 기업으로서 능동적 어조

  ## 문체 규칙
  - 문장: 2~3줄 이내. 핵심 먼저, 근거 나중
  - 호칭: 독자를 직접 지칭할 때 "여러분" 사용 (고객님 X)
  - 수치: 가능하면 구체적 수치 제시 (예: "크게 성장" → "YoY 23% 성장")
  - 영어: 전문 용어는 영어 사용 가능, 단 괄호 안에 한국어 병기

  ## 절대 쓰지 않는 표현
  - "업계 최고", "독보적", "압도적" (근거 없는 최상급)
  - "~할 것입니다" 남발 (불확실성 과다 노출)
  - "노력하겠습니다" (행동으로 보여줄 것)

  ## 채널별 변형
  | 채널 | 어조 | 길이 | 이모지 |
  |------|------|------|--------|
  | LinkedIn | 격식체, 인사이트 강조 | 150~300자 | 최소화 |
  | Instagram | 구어체, 감성적 | 50~100자 | 1~3개 허용 |
  | 보도자료 | 3인칭, 팩트 중심 | 제한 없음 | 없음 |
  | 사내 콘텐츠 | 친근한 경어체 | 자유 | 상황에 따라 |

  ## AI 프롬프트 삽입용 요약 블록
  > GS칼텍스는 국내 대표 에너지 기업으로, 톤은 전문적이면서 친근하다.
  > 과장 없이 사실과 수치로 이야기하고, 에너지 전환 시대를 선도하는
  > 능동적 어조를 유지한다. 문장은 짧고 명확하게.
  ```

- [ ] **Step 3: 실제 콘텐츠로 검증**

  기존 LinkedIn 포스팅 1건을 이 가이드 기준으로 평가한다. Claude에 다음 프롬프트를 입력:

  ```
  아래 콘텐츠를 GS칼텍스 브랜드 보이스 가이드에 맞게 평가해줘.
  잘 지켜진 부분과 위반된 부분을 각각 지적하고, 수정 버전을 제안해줘.

  [브랜드 보이스 가이드: 위에서 작성한 요약 블록 붙여넣기]

  [평가할 콘텐츠: 기존 LinkedIn 포스팅 붙여넣기]
  ```

  결과가 실제 브랜드 감각과 일치하는지 팀장이 확인한다. 일치하지 않으면 가이드를 수정한다.

- [ ] **Step 4: 커밋**

  ```bash
  git add Process_map/prompts/brand-voice/gscaltex-brand-voice.md
  git commit -m "feat: GS칼텍스 마스터 브랜드 보이스 가이드 초안"
  ```

---

## Task 2: SNS 프롬프트 라이브러리 구축

**Files:**
- Create: `Process_map/prompts/brand-voice/sns-caption-prompts.md`
- Requires: Task 1 완료 (브랜드 보이스 가이드)

- [ ] **Step 1: LinkedIn 포스팅 프롬프트 작성**

  `Process_map/prompts/brand-voice/sns-caption-prompts.md` 에 아래 내용을 작성한다:

  ```markdown
  # SNS 프롬프트 라이브러리

  ## LinkedIn 포스팅 생성 프롬프트

  ### 사용법
  [TOPIC], [KEY_FACT], [SOURCE] 부분을 실제 내용으로 교체 후 Claude에 입력.

  ### 프롬프트
  \```
  당신은 GS칼텍스 홍보팀 SNS 담당자입니다.
  아래 브랜드 보이스 가이드를 엄격히 준수하세요.

  [브랜드 보이스]
  GS칼텍스는 국내 대표 에너지 기업으로, 톤은 전문적이면서 친근하다.
  과장 없이 사실과 수치로 이야기하고, 에너지 전환 시대를 선도하는
  능동적 어조를 유지한다. 문장은 짧고 명확하게.

  [작성 조건]
  - 주제: [TOPIC]
  - 핵심 사실/수치: [KEY_FACT]
  - 출처: [SOURCE]
  - 길이: 150~250자
  - 이모지: 최대 1개
  - 형식: 첫 줄 훅 → 본문 2~3줄 → CTA 또는 질문으로 마무리

  LinkedIn 포스팅 3가지 버전을 작성해줘. 각 버전의 차별점도 한 줄로 설명해줘.
  \```

  ## Instagram 캡션 생성 프롬프트

  ### 프롬프트
  \```
  당신은 GS칼텍스 Instagram 콘텐츠 담당자입니다.

  [브랜드 보이스]
  친근하고 감성적이지만 신뢰감 있는 에너지 기업 톤.
  MZ세대도 공감할 수 있는 언어로, 과장 없이.

  [작성 조건]
  - 콘텐츠 주제: [TOPIC]
  - 이미지/영상 설명: [VISUAL_DESCRIPTION]
  - 길이: 50~80자 본문 + 해시태그 5~7개
  - 이모지: 1~2개

  캡션 2가지 버전을 작성해줘. 해시태그는 #GS칼텍스 포함 필수.
  \```

  ## 카드뉴스 카피 생성 프롬프트

  ### 프롬프트
  \```
  당신은 GS칼텍스 카드뉴스 카피라이터입니다.

  [작성 조건]
  - 주제: [TOPIC]
  - 핵심 메시지: [KEY_MESSAGE]
  - 카드 수: 5장
  - 각 카드 텍스트: 15~25자

  카드 구성: 1장(훅/제목) + 2~4장(본문 핵심 3가지) + 5장(CTA)
  형식으로 각 카드의 메인 카피와 서브 카피(선택)를 작성해줘.
  \```
  ```

- [ ] **Step 2: 실제 콘텐츠로 검증**

  최근 LinkedIn 포스팅 소재 1건을 골라 위 프롬프트로 초안을 생성한다.
  - Claude에 LinkedIn 프롬프트 입력 (TOPIC, KEY_FACT 채워서)
  - 생성된 3가지 버전 중 가장 좋은 것 선택
  - 기존 담당자가 직접 쓴 포스팅과 품질 비교
  - 개선이 필요하면 프롬프트 수정

  **성공 기준:** 생성된 초안이 "50% 이상 그대로 쓸 수 있다" 수준이어야 함.

- [ ] **Step 3: 커밋**

  ```bash
  git add Process_map/prompts/brand-voice/sns-caption-prompts.md
  git commit -m "feat: SNS 캡션·카드뉴스 프롬프트 라이브러리"
  ```

---

## Task 3: 대외홍보/PR 프롬프트 — 보도자료 + 위기대응

**Files:**
- Create: `Process_map/prompts/pr/press-release-templates.md`
- Create: `Process_map/prompts/pr/crisis-response-playbook.md`

- [ ] **Step 1: 보도자료 유형별 템플릿 작성**

  `Process_map/prompts/pr/press-release-templates.md` 를 아래 내용으로 작성한다:

  ```markdown
  # 보도자료 프롬프트 템플릿

  ## 유형 A — 사업 발표형 (MOU, 계약, 신사업)

  \```
  당신은 GS칼텍스 홍보팀 PR 담당자입니다. 아래 조건으로 보도자료를 작성해주세요.

  [브랜드 보이스]
  3인칭, 팩트 중심. 과장 없이 사실과 수치로. 문장 간결.

  [사실 정보]
  - 발표 내용: [ANNOUNCEMENT]
  - 주요 수치/성과: [KEY_DATA]
  - 기대 효과: [EXPECTED_IMPACT]
  - 인용구 대상자: [SPOKESPERSON] (직책 포함)
  - 배경 설명: [BACKGROUND]

  [형식]
  제목(30자 이내) → 리드(2문장, 핵심 전달) → 본문(3~4단락) →
  인용구(대상자 발언 1~2문장) → 회사 소개(boilerplate, 3줄) → 문의처

  보도자료 1개와, 기자 참고용 핵심 팩트시트(bullet 5개)도 함께 작성해줘.
  \```

  ## 유형 B — 이슈 대응형 (부정 기사, 오해 해명)

  \```
  당신은 GS칼텍스 홍보팀 PR 담당자입니다.
  아래 이슈에 대한 공식 입장 보도자료를 작성해주세요.

  [이슈 내용]
  - 제기된 이슈/의혹: [ISSUE]
  - 실제 사실: [FACTS]
  - 회사 입장: [COMPANY_POSITION]
  - 향후 계획/조치: [ACTION_PLAN]

  [형식]
  - 방어적이지 않고 사실 중심으로 작성
  - 인정할 부분은 인정하되 맥락 제공
  - 향후 행동으로 마무리 (약속이 아닌 구체적 계획)
  - 길이: A4 1장 이내

  보도자료 + 예상 기자 질문 5개와 답변 초안도 함께 작성해줘.
  \```

  ## 유형 C — ESG/사회공헌 발표형

  \```
  당신은 GS칼텍스 홍보팀 CSR 담당자입니다.

  [사실 정보]
  - 프로그램/활동명: [PROGRAM_NAME]
  - 수혜자/규모: [BENEFICIARY_SCALE]
  - 투자 금액 또는 참여 인원: [INVESTMENT]
  - 사회적 의미/임팩트: [SOCIAL_IMPACT]
  - 담당 임원 인용구: [EXECUTIVE_QUOTE]

  따뜻하면서도 구체적인 수치로 신뢰감을 주는 ESG 보도자료를 작성해줘.
  MZ세대 기자도 관심 가질 수 있는 앵글을 제안하고, 그 앵글로 재작성한 버전도 추가해줘.
  \```
  ```

- [ ] **Step 2: 위기대응 플레이북 작성**

  `Process_map/prompts/pr/crisis-response-playbook.md` 를 아래 내용으로 작성한다:

  ```markdown
  # 위기대응 프롬프트 플레이북

  ## 위기 등급 분류

  | 등급 | 기준 | 대응 시간 | 승인자 |
  |------|------|----------|--------|
  | 1등급 (긴급) | 주요 일간지 1면, 방송 보도 가능성 | 2시간 내 | 실장 |
  | 2등급 (중요) | 전문지·온라인 매체 복수 보도 | 당일 내 | 팀장 |
  | 3등급 (모니터링) | 개별 기사, SNS 확산 초기 | 24시간 내 | 담당자 |

  ## 1등급 긴급 대응 프롬프트

  \```
  지금 [ISSUE] 관련 긴급 언론 대응이 필요합니다.

  [상황 정보]
  - 이슈 내용: [ISSUE_DESCRIPTION]
  - 확인된 사실: [CONFIRMED_FACTS]
  - 확인 안 된 부분: [UNCONFIRMED]
  - 회사 입장: [INITIAL_POSITION]

  다음 3가지를 지금 즉시 작성해주세요:
  1. 기자 문의 시 즉각 응대할 구두 코멘트 (2~3문장, 사실만)
  2. 내부 보고용 이슈 현황 요약 (bullet 5개, 30초 내 읽을 분량)
  3. 추가 확인이 필요한 사항 체크리스트

  확인되지 않은 사실은 절대 포함하지 말 것.
  \```

  ## 2등급 대응 프롬프트

  \```
  [ISSUE] 관련 언론 대응 자료를 작성해주세요.

  [상황 정보]
  - 이슈: [ISSUE_DESCRIPTION]
  - 사실관계: [FACTS]
  - 우리 입장: [POSITION]

  작성 요청:
  1. 공식 입장문 (200자 이내)
  2. 보도자료 (유형 B 템플릿 기준)
  3. 예상 후속 질문 3개 + 답변

  톤: 방어적이지 않게. 사실로 이야기하되 맥락 충분히 제공.
  \```

  ## SNS 확산 모니터링 → 대응 결정 프롬프트

  \```
  아래 SNS/온라인 반응을 분석하고 대응 필요 여부를 판단해주세요.

  [모니터링 내용]
  [MONITORING_DATA - 스크린샷 또는 텍스트 붙여넣기]

  분석 요청:
  1. 핵심 불만/의혹 요약 (bullet 3개 이내)
  2. 확산 속도 및 영향력 평가 (낮음/중간/높음)
  3. 대응 필요 여부 판단 (이유 포함)
  4. 대응 시 권장 메시지 초안

  판단 기준: 사실 오류 > 브랜드 훼손 > 단순 불만 순으로 대응 우선순위.
  \```
  ```

- [ ] **Step 3: 보도자료 유형 A로 실제 검증**

  최근 발표했거나 준비 중인 보도자료 소재 1건을 유형 A 프롬프트로 생성한다.
  - 기존 작성본이 있다면 AI 버전과 나란히 비교
  - 팩트 정확도, 길이, 톤 체크
  - 수정이 필요한 프롬프트 변수 조정

  **성공 기준:** AI 생성 초안을 60% 이상 그대로 활용 가능한 수준.

- [ ] **Step 4: 커밋**

  ```bash
  git add Process_map/prompts/pr/
  git commit -m "feat: 대외홍보 보도자료 템플릿 + 위기대응 플레이북"
  ```

---

## Task 4: Internal Comm 영상 시리즈 스크립트 프롬프트

**Files:**
- Create: `Process_map/prompts/internal-comm/g-note-script-prompt.md`
- Create: `Process_map/prompts/internal-comm/unboxing-script-prompt.md`
- Create: `Process_map/prompts/internal-comm/facetime-script-prompt.md`

- [ ] **Step 1: G식노트 스크립트 프롬프트 작성**

  G식노트의 기존 에피소드 1~2개를 먼저 분석하여 포맷을 파악한다 (길이, 구성, 어조). 그 다음 아래 내용으로 작성:

  ```markdown
  # G식노트 스크립트 생성 프롬프트

  ## 시리즈 개요
  - 형식: 사내 지식·인사이트 공유 영상 시리즈
  - 길이: [분석한 평균 길이 기재]
  - 어조: [분석한 어조 기재 - 예: 친근한 강의체]
  - 구성: [분석한 구성 패턴 기재]

  ## 스크립트 생성 프롬프트

  \```
  당신은 GS칼텍스 G식노트 시리즈 스크립트 작가입니다.
  이 시리즈는 임직원이 알아야 할 지식·인사이트를 [어조]로 전달합니다.

  [에피소드 정보]
  - 주제: [TOPIC]
  - 핵심 메시지 3가지: [KEY_MESSAGE_1], [KEY_MESSAGE_2], [KEY_MESSAGE_3]
  - 대상 시청자: GS칼텍스 임직원 전체
  - 목표 길이: [분 단위]
  - 참고 자료: [REFERENCE_MATERIAL]

  [시리즈 구성 패턴]
  [분석한 패턴 기재]

  위 패턴을 따라 스크립트를 작성해주세요.
  - 나레이터 대사와 화면 설명(B-roll 지시)을 구분해서 작성
  - 각 섹션의 예상 소요 시간도 표기
  - 시청자 참여를 유도하는 질문이나 인터랙션 포인트 1~2개 포함
  \```
  ```

- [ ] **Step 2: 언박싱 스크립트 프롬프트 작성**

  `Process_map/prompts/internal-comm/unboxing-script-prompt.md` 작성:

  ```markdown
  # 언박싱 스크립트 생성 프롬프트

  ## 시리즈 개요
  - 형식: GS칼텍스의 새로운 프로젝트·제품·공간 등을 처음 공개하는 영상
  - 어조: 설레임과 발견의 감성, 임직원의 자긍심 고취

  ## 스크립트 생성 프롬프트

  \```
  당신은 GS칼텍스 언박싱 시리즈 스크립트 작가입니다.
  이 시리즈는 임직원에게 회사의 새로운 면을 발견하는 설레임을 전달합니다.

  [에피소드 정보]
  - 언박싱 대상: [SUBJECT] (프로젝트/장소/제품/사람)
  - 핵심 하이라이트: [KEY_HIGHLIGHTS]
  - 인터뷰 대상자: [INTERVIEWEE] (있는 경우)
  - 목표 길이: [분 단위]

  [구성]
  오프닝(기대감 조성, 20%) → 메인 언박싱(핵심 공개, 60%) → 클로징(의미 부여, 20%)

  스크립트를 작성해주세요.
  - 오프닝은 "지금부터 공개합니다" 형식의 훅으로 시작
  - 인터뷰가 있는 경우 질문 리스트도 함께 작성
  - 화면 전환 지시(CUT TO, ZOOM IN 등)도 포함
  \```
  ```

- [ ] **Step 3: Face+Time 스크립트 프롬프트 작성**

  `Process_map/prompts/internal-comm/facetime-script-prompt.md` 작성:

  ```markdown
  # Face+Time 스크립트 생성 프롬프트

  ## 시리즈 개요
  - 형식: 임직원 인터뷰 시리즈, 사람의 이야기에 집중
  - 어조: 진솔하고 따뜻한, 조직 공감대 형성

  ## 인터뷰 질문지 생성 프롬프트

  \```
  당신은 GS칼텍스 Face+Time 시리즈 인터뷰어입니다.
  이 시리즈는 임직원의 진솔한 이야기를 통해 조직 공감대를 만듭니다.

  [인터뷰 대상자 정보]
  - 이름/직급: [NAME_TITLE]
  - 담당 업무: [ROLE]
  - 이번 에피소드 주제/앵글: [EPISODE_ANGLE]
  - 최근 주요 경험/성과: [RECENT_EXPERIENCE]

  인터뷰 질문 10개를 작성해주세요.
  - 워밍업 질문 2개 (가벼운 이야기로 시작)
  - 핵심 질문 6개 (에피소드 앵글 중심)
  - 마무리 질문 2개 (메시지, 동료에게 한마디)
  각 질문의 의도와 예상 답변 방향도 한 줄씩 설명해주세요.
  \```

  ## 인터뷰 → 영상 스크립트 변환 프롬프트

  \```
  아래 인터뷰 녹취록을 Face+Time 시리즈 편집 스크립트로 변환해주세요.

  [녹취록]
  [TRANSCRIPT 붙여넣기]

  [편집 방향]
  - 총 길이: [목표 분 단위]
  - 핵심 메시지: [KEY_MESSAGE]

  편집 스크립트를 작성해주세요:
  - 사용할 인터뷰 발언 선별 (타임코드 또는 텍스트 인용)
  - 나레이션/자막이 필요한 부분 표시
  - B-roll 제안 (어떤 장면을 삽입하면 좋을지)
  - 시작과 끝의 훅/클로징 문구
  \```
  ```

- [ ] **Step 4: G식노트 프롬프트 실제 검증**

  다음 G식노트 에피소드 소재를 골라 스크립트 초안을 생성한다.
  - 프롬프트에 실제 주제와 핵심 메시지 입력
  - 생성된 스크립트의 톤·구성·길이가 기존 에피소드와 유사한지 확인
  - 담당자(이현상 책임)와 함께 검토

  **성공 기준:** 생성된 초안을 기반으로 실제 촬영 준비에 착수할 수 있는 수준.

- [ ] **Step 5: 커밋**

  ```bash
  git add Process_map/prompts/internal-comm/
  git commit -m "feat: Internal Comm 영상 시리즈 3종 스크립트 프롬프트"
  ```

---

## Task 5: CEO 보이스 RAG 구축 (PI 업무)

**Files:**
- Create: `Process_map/prompts/pi/speech-prompt-templates.md`
- Action: Claude Projects 설정 (로컬 파일 아님, 별도 지침 포함)

- [ ] **Step 1: 기존 CEO 연설문 아카이브 수집**

  다음 문서를 수집한다 (최소 10건):
  - 신년사 (최근 3년)
  - 창립기념사
  - 배구단 우승 CEO 메시지
  - EDP 메시지
  - 기타 공식 발언문·인터뷰 텍스트

  수집한 문서를 `Process_map/knowledge-base/ceo-speeches/` 폴더에 저장 (비공개 처리 주의).

- [ ] **Step 2: Claude Projects CEO 보이스 프로젝트 생성**

  1. Claude.ai → Projects → "GS칼텍스 CEO 보이스" 프로젝트 생성
  2. 수집한 연설문 파일을 프로젝트에 업로드
  3. 프로젝트 지시사항(System Prompt)에 아래 내용 입력:

  ```
  당신은 GS칼텍스 CEO의 연설문과 공식 메시지를 작성하는 전문 작가입니다.
  업로드된 과거 연설문을 완전히 학습하여 CEO의 고유한 어법·가치관·
  표현 방식을 완벽하게 재현해야 합니다.

  CEO 보이스 특징 (업로드 문서에서 추출):
  - [문서 분석 후 작성: 자주 쓰는 표현 5개]
  - [문서 분석 후 작성: 핵심 가치 키워드 5개]
  - [문서 분석 후 작성: 피하는 표현]
  - 문장 길이: [분석 결과]
  - 특징적 구성 패턴: [분석 결과]
  ```

- [ ] **Step 3: CEO 보이스 프로파일 문서화**

  `Process_map/prompts/pi/speech-prompt-templates.md` 작성:

  ```markdown
  # PI 업무 — CEO 연설문·메시지 프롬프트

  ## CEO 보이스 프로파일 요약
  (Claude Projects 분석 결과 기재)
  - 자주 쓰는 표현: [분석 결과]
  - 핵심 가치 키워드: [분석 결과]
  - 문장 스타일: [분석 결과]

  ## 연설문 생성 프롬프트 (Claude Projects 사용)

  ### 행사 연설문
  \```
  아래 조건으로 연설문을 작성해주세요.

  [행사 정보]
  - 행사명: [EVENT_NAME]
  - 날짜/장소: [DATE_VENUE]
  - 청중: [AUDIENCE]
  - 예상 발표 시간: [DURATION]분
  - 핵심 메시지: [KEY_MESSAGE]
  - 포함할 사실/수치: [FACTS_DATA]
  - 특별히 언급할 인물/사건: [SPECIAL_MENTION]

  분량은 [DURATION]분 발표 기준으로 작성하고,
  청중에게 전달할 핵심 한 문장(headline sentence)도 별도로 제안해주세요.
  \```

  ### 짧은 CEO 메시지 (뉴스레터·공지용)
  \```
  아래 상황에 맞는 CEO 메시지를 작성해주세요.

  [상황]
  - 목적: [PURPOSE] (격려/발표/감사/위기 등)
  - 대상: [AUDIENCE]
  - 핵심 전달 사항: [CORE_MESSAGE]
  - 길이: [SHORT/MEDIUM/LONG] (100자/300자/500자)

  메시지 2가지 버전을 작성해주세요: 공식 버전과 좀 더 따뜻한 버전.
  \```
  ```

- [ ] **Step 4: 연설문 생성 검증**

  다음 번 예정된 행사(또는 가상 시나리오)로 연설문 초안을 생성한다.
  - Claude Projects에서 연설문 프롬프트 입력
  - 생성된 초안을 팀장이 실제 CEO 어투와 비교 평가
  - 프로젝트 지시사항 또는 프롬프트 조정

  **성공 기준:** "이 정도면 CEO에게 초안으로 보여줄 수 있다" 수준.

- [ ] **Step 5: 커밋**

  ```bash
  git add Process_map/prompts/pi/
  git commit -m "feat: PI 업무 CEO 보이스 프로파일 + 연설문 프롬프트"
  ```

---

## Task 6: 공유 도메인 프롬프트 (Stakeholder·CSR·캠페인·스포츠)

**Files:**
- Create: `Process_map/prompts/shared/stakeholder-report-prompt.md`
- Create: `Process_map/prompts/shared/csr-comms-prompt.md`
- Create: `Process_map/prompts/shared/campaign-brief-prompt.md`
- Create: `Process_map/prompts/shared/sports-content-prompt.md`

- [ ] **Step 1: Stakeholder 보고서 프롬프트 작성**

  ```markdown
  # Stakeholder 보고서 초안 프롬프트

  ## 경영진 보고서 초안 프롬프트
  \```
  당신은 GS칼텍스 홍보부문 팀장의 보고서 작성을 돕는 어시스턴트입니다.

  [보고 정보]
  - 보고 대상: [AUDIENCE] (예: 홍보실장, CMO)
  - 보고 목적: [PURPOSE]
  - 핵심 성과/현황: [KEY_RESULTS]
  - 이슈/리스크: [ISSUES]
  - 요청 사항/의사결정 필요 항목: [DECISION_NEEDED]
  - 첨부할 데이터: [DATA]

  [형식 조건]
  - 결론 먼저, 근거 나중 (Pyramid Structure)
  - 총 A4 1~2장
  - 각 섹션: 요약 bullet → 상세 설명 구조

  보고서 초안을 작성해주세요. 보고 대상이 30초 내에 핵심을 파악할 수 있어야 합니다.
  \```

  ## VM 성과 취합 자동화 프롬프트
  \```
  아래 팀원별 성과 데이터를 취합하여 분기 성과 보고서 형식으로 정리해주세요.

  [팀원별 성과 데이터]
  [MEMBER_DATA 붙여넣기 - 각 팀원의 업무 항목과 성과]

  [출력 형식]
  1. 전체 요약 (3줄)
  2. VM 전략과업 진행 현황 (과업별 상태)
  3. 카테고리별 성과 집계
  4. 주요 성과 하이라이트 5개
  5. 다음 분기 예정 사항
  \```
  ```

- [ ] **Step 2: CSR·캠페인·스포츠 프롬프트 작성**

  `csr-comms-prompt.md`:
  ```markdown
  # CSR 커뮤니케이션 프롬프트

  ## CSR 보도자료 프롬프트
  \```
  대외홍보 유형 C 템플릿(ESG/사회공헌 발표형)을 사용하되,
  아래 CSR 특화 조건을 추가합니다.

  [CSR 특화 조건]
  - 프로그램명: [PROGRAM]
  - 수혜 대상 및 규모: [BENEFICIARY]
  - 투자 규모: [INVESTMENT]
  - 사회적 임팩트 (정량): [QUANTIFIED_IMPACT]
  - 지속성/장기 계획: [SUSTAINABILITY]
  - SDG 연계 (해당 시): [SDG_LINK]

  보도자료 + SNS 카드뉴스 카피 3장 분량도 함께 작성해주세요.
  \```
  ```

  `campaign-brief-prompt.md`:
  ```markdown
  # 캠페인 기획안 초안 프롬프트

  \```
  당신은 GS칼텍스 홍보팀 캠페인 기획자입니다.

  [캠페인 기본 정보]
  - 캠페인 목적: [OBJECTIVE]
  - 타겟 오디언스: [TARGET]
  - 핵심 메시지: [KEY_MESSAGE]
  - 예산 수준: [BUDGET_RANGE]
  - 기간: [DURATION]
  - 활용 채널: [CHANNELS]
  - 참고 레퍼런스 또는 금지 방향: [REFERENCE_AVOID]

  캠페인 기획안 초안을 작성해주세요:
  1. 캠페인 콘셉트 3가지 옵션 (각 한 줄 + 장단점)
  2. 추천 옵션 상세 기획 (실행 단계·채널별 콘텐츠 계획)
  3. 예상 KPI
  4. 리스크 및 유의사항
  \```
  ```

  `sports-content-prompt.md`:
  ```markdown
  # 스포츠 마케팅 콘텐츠 프롬프트

  ## 경기 결과 SNS 콘텐츠 프롬프트
  \```
  GS칼텍스 스포츠팀 경기 결과를 SNS 콘텐츠로 만들어주세요.

  [경기 정보]
  - 종목/팀: [SPORT_TEAM] (예: GS칼텍스 배구단, GS칼텍스 바둑팀)
  - 경기 결과: [RESULT] (승/패, 스코어)
  - 주요 선수 활약: [PLAYER_HIGHLIGHTS]
  - 다음 일정: [NEXT_SCHEDULE]

  LinkedIn용 포스팅 1개 + Instagram 캡션 1개를 작성해주세요.
  승리 시 자긍심 고취, 패배 시 응원·격려 톤으로 작성.
  \```
  ```

- [ ] **Step 3: Stakeholder 보고서 프롬프트 검증**

  최근 경영진 보고 소재(또는 VM 성과 취합 데이터)로 초안을 생성한다.
  - 생성된 보고서 초안의 구조와 가독성 평가
  - "30초 내 핵심 파악 가능" 기준 충족 여부 확인

- [ ] **Step 4: 커밋**

  ```bash
  git add Process_map/prompts/shared/
  git commit -m "feat: Stakeholder·CSR·캠페인·스포츠 공유 프롬프트 라이브러리"
  ```

---

## Task 7: 마스터 SOP + 팀원 Quick Start Guide 작성

**Files:**
- Create: `Process_map/sop/master-sop.md`
- Create: `Process_map/sop/review-checklist.md`
- Create: `Process_map/sop/quick-start-guide.md`

- [ ] **Step 1: 마스터 SOP 작성**

  `Process_map/sop/master-sop.md`:

  ```markdown
  # PR2팀 AI 활용 마스터 SOP

  **버전:** 1.0 | **최종 업데이트:** 2026-05-15

  ## AI 활용 기본 원칙 (5가지)
  1. **사람이 최종 결정한다:** AI 초안은 시작점. 발행 전 담당자 편집 + 팀장 승인 필수
  2. **팩트는 반드시 확인한다:** AI가 생성한 수치·사실은 원본 소스로 대조 확인 후 사용
  3. **브랜드 보이스를 지킨다:** 모든 외부 발행 콘텐츠는 브랜드 보이스 가이드 준수
  4. **프롬프트 라이브러리를 쓴다:** 처음부터 새로 쓰지 말고 `/prompts` 폴더 먼저 확인
  5. **배운 것은 기록한다:** 잘 된 프롬프트, 실패한 사례 모두 Notion 지식베이스에 공유

  ## 업무별 AI 활용 흐름

  ### 모든 업무 공통 흐름
  1. 브리프 작성 (목적·타겟·핵심 메시지·기한 명시)
  2. 해당 도메인 프롬프트 라이브러리에서 적합한 프롬프트 선택
  3. 브리프 내용을 프롬프트 변수에 입력
  4. AI 초안 생성 (Claude 권장)
  5. 팩트 확인 → 브랜드 보이스 체크 → 담당자 편집
  6. 검토 체크리스트 확인
  7. 팀장 최종 승인 (외부 발행 시)
  8. 발행 후 Notion 지식베이스에 최종본 + 사용 프롬프트 기록

  ### 도메인별 권장 도구
  | 도메인 | 1차 도구 | 보조 도구 |
  |--------|---------|---------|
  | SNS/디지털 | Claude | Canva AI, Perplexity |
  | 대외홍보/PR | Claude | Perplexity |
  | Internal Comm | Claude | ElevenLabs (선택) |
  | PI 업무 | Claude Projects (CEO 보이스) | - |
  | Stakeholder | Claude | Google Sheets |
  | CSR | Claude | - |
  | 캠페인 | Claude | Gamma |
  | 스포츠 | Claude | - |

  ## 승인 게이트
  | 콘텐츠 유형 | 승인자 | 검토 시간 목표 |
  |------------|--------|-------------|
  | 외부 보도자료·공식 입장 | 팀장 | 당일 |
  | SNS 포스팅 | 담당자 자체 검토 | - |
  | CEO 연설문·메시지 | 팀장 → 실장 | 2~3일 전 |
  | 경영진 보고서 | 팀장 | 전날 |
  | Internal Comm 콘텐츠 | 담당자 → 팀장 | 발행 1일 전 |
  ```

- [ ] **Step 2: 검토 체크리스트 작성**

  `Process_map/sop/review-checklist.md`:

  ```markdown
  # 콘텐츠 검토 체크리스트

  ## 모든 AI 생성 콘텐츠 공통

  - [ ] 수치·통계·날짜가 원본 소스와 일치하는가?
  - [ ] 회사명·인명·직책이 정확한가?
  - [ ] 브랜드 보이스 가이드의 금지 표현이 없는가?
  - [ ] 확인되지 않은 사실이 단정적으로 서술되지 않았는가?
  - [ ] 법적 리스크 표현(확약·보증·오해 소지)이 없는가?

  ## 외부 발행 콘텐츠 추가 체크

  - [ ] 타 기업·인물에 대한 부적절한 비교·언급이 없는가?
  - [ ] 경쟁사 정보가 포함되어 있지 않은가?
  - [ ] 아직 공개되지 않은 내부 정보가 없는가?
  - [ ] 담당자 편집 완료 (AI 초안 그대로 아님)
  - [ ] 팀장 최종 승인 완료

  ## SNS 특화 체크

  - [ ] 해시태그 적절성 (트렌드·브랜드 균형)
  - [ ] 이모지 사용이 브랜드 보이스 가이드 기준 이내
  - [ ] 링크가 있는 경우 정상 작동 확인
  - [ ] 이미지/영상 저작권 확인
  ```

- [ ] **Step 3: 팀원 Quick Start Guide 작성**

  `Process_map/sop/quick-start-guide.md` — A4 1장 분량으로:

  ```markdown
  # AI 시작 가이드 — PR2팀 (1분 버전)

  ## 1. 지금 당장 쓸 수 있는 도구

  | 상황 | 이렇게 하세요 |
  |------|------------|
  | 보도자료 써야 할 때 | `prompts/pr/press-release-templates.md` 열고 유형 선택 → Claude에 복붙 |
  | SNS 포스팅 써야 할 때 | `prompts/brand-voice/sns-caption-prompts.md` → LinkedIn/Instagram 프롬프트 선택 |
  | 영상 스크립트 써야 할 때 | `prompts/internal-comm/` 폴더에서 시리즈별 프롬프트 선택 |
  | 보고서 써야 할 때 | `prompts/shared/stakeholder-report-prompt.md` |
  | CEO 메시지 써야 할 때 | Claude Projects "GS칼텍스 CEO 보이스" 프로젝트 접속 |

  ## 2. 황금 규칙 3가지

  1. AI 초안은 **시작점**, 그대로 쓰지 말것
  2. **수치·팩트**는 반드시 원본 확인
  3. 외부 발행 전 **팀장 승인** 필수

  ## 3. 잘 됐던 프롬프트는 여기에 공유

  Notion → PR2팀 DAX → 프롬프트 뱅크
  ```

- [ ] **Step 4: 커밋**

  ```bash
  git add Process_map/sop/
  git commit -m "feat: AI 활용 마스터 SOP + 검토 체크리스트 + Quick Start Guide"
  ```

---

## Task 8: 지식베이스 구조 + 팀 공유 세션 준비

**Files:**
- Create: `Process_map/knowledge-base/README.md`
- Create: `Process_map/knowledge-base/prompt-bank.md`

- [ ] **Step 1: 지식베이스 README 작성**

  ```markdown
  # PR2팀 AI 지식베이스

  ## 폴더 구조
  - `prompts/` — 도메인별 프롬프트 라이브러리 (항상 여기서 시작)
  - `sop/` — 업무 표준 절차서
  - `knowledge-base/` — 실전 사례·학습 기록
    - `prompt-bank.md` — 잘 된 프롬프트 모음
    - `case-studies/` — 실제 적용 사례 (Before/After)
    - `ceo-speeches/` — CEO 연설문 아카이브 (비공개)

  ## 기록하는 방법
  새로운 좋은 프롬프트를 발견했을 때:
  1. `prompt-bank.md` 에 추가
  2. 사용한 도메인·상황·성과 간략히 기술
  3. 팀 Slack/Teams 채널에 공유

  ## 월 1회 회고
  매월 마지막 주: 잘 된 프롬프트 공유 + 개선된 버전 업데이트
  ```

- [ ] **Step 2: 프롬프트 뱅크 초안 작성**

  ```markdown
  # 프롬프트 뱅크 — 실전 검증된 프롬프트 모음

  ## 사용 방법
  각 항목에는 프롬프트 원문, 사용 상황, 결과 평점(★1~5), 개선 팁이 포함됩니다.

  ---

  ## SNS/디지털

  ### [예시 항목 형식]
  **상황:** LinkedIn 에너지 전환 관련 포스팅
  **평점:** ★★★★☆
  **프롬프트:**
  \```
  [실제 사용한 프롬프트]
  \```
  **결과 메모:** 생성된 3개 버전 중 2번 버전이 팀장 승인. 수치 강조 표현 추가하니 좋아짐.

  ---
  *[팀원들이 실제 사용하면서 채워나가는 섹션]*
  ```

- [ ] **Step 3: 팀 공유 세션 준비 (30분 킥오프)**

  아래 내용으로 팀 공유 세션 자료를 Claude로 생성한다:

  ```
  PR2팀 AI 도구 도입 킥오프 세션 (30분) 자료를 만들어줘.

  [세션 목적]
  팀원 7명 모두가 오늘부터 AI 도구를 자신의 업무에 바로 쓸 수 있게 한다.

  [구성]
  1. 왜 지금 AI인가 (5분) - 팀장 발표
  2. 우리 팀에서 AI가 가장 빛나는 3가지 순간 (10분) - 라이브 데모
  3. 각자 첫 번째 AI 과제 설정 (10분) - 팀원별 1개 과제 선택
  4. Q&A + 규칙 공유 (5분)

  각 섹션의 스크립트와 라이브 데모 시나리오를 작성해줘.
  데모는 실제 업무 상황을 15초 내에 보여줄 수 있는 것으로.
  ```

- [ ] **Step 4: 팀 공유 세션 진행**

  생성된 자료로 팀 킥오프 세션을 진행한다.
  - 각 팀원이 "내가 이번 달 AI를 쓸 업무 1개"를 지정
  - Phase 1 성공 기준 공유: "주 3회 이상 사용, 사례 1건 수집"
  - 공유 채널(Notion 또는 Teams) 설정

- [ ] **Step 5: 최종 커밋**

  ```bash
  git add Process_map/
  git commit -m "feat: Phase 1 완료 — 전 도메인 AI 도입 기반 세트 (프롬프트 라이브러리 + SOP)"
  ```

---

## Phase 2–4 예고 (별도 플랜으로 관리)

Phase 1 완료 후 팀 회고를 거쳐 Phase 2 플랜을 작성한다.

| Phase | 플랜 파일명 | 주요 내용 |
|-------|-----------|---------|
| Phase 2 | `2026-06-15-dax-phase2-sop.md` | 프롬프트 라이브러리 고도화, Notion 지식베이스 완성, 리뷰 프로세스 정착 |
| Phase 3 | `2026-08-15-dax-phase3-core-derivative.md` | Core-Derivative 파이프라인, 6채널 Derivative 자동화, 신규 콘텐츠 6종 |
| Phase 4 | `2026-12-01-dax-phase4-ecosystem.md` | 新홈페이지 Hub 연동, 전 도메인 에이전트 통합 |

---

## Self-Review 메모

- **스펙 커버리지:** 10개 도메인 모두 Task에 포함됨. DAX/AI 역량 도메인은 이 플랜 자체가 해당 과업.
- **플레이스홀더:** `[분석한 어조 기재]` 등 G식노트 분석 전 채워야 할 항목 존재 — 의도적. 실제 에피소드 분석 후 작성 필요.
- **타입 일관성:** 모든 프롬프트의 변수 표기를 `[VARIABLE_NAME]` 형식으로 통일.
- **누락 검토:** CEO 연설문 아카이브가 보안 민감 자료이므로 `knowledge-base/ceo-speeches/` 폴더를 `.gitignore`에 추가해야 함.

```bash
# .gitignore에 추가
echo "Process_map/knowledge-base/ceo-speeches/" >> /Users/jeong-won-yeob/code/.gitignore
```
