# GS칼텍스 에디토리얼 브로슈어 설계 문서

## 목표

`디지털브로슈어/`(기존 파일 유지)와 별개로, Bloomberg/FT Annual Report 스타일의 에디토리얼 매거진 느낌 신규 브로슈어를 `디지털브로슈어-editorial/` 디렉토리에 새로 제작한다.

---

## 아키텍처

- **단일 파일**: `디지털브로슈어-editorial/index.html` 하나에 모든 섹션 포함
- **의존성**: GSAP CDN, Google Fonts CDN (외부 라이브러리는 CDN만 사용)
- **빌드 도구 없음**: 순수 HTML/CSS/JS

```
디지털브로슈어-editorial/
  index.html          ← 전체 섹션 포함 단일 파일
  css/
    editorial.css     ← 디자인 토큰 + 전체 스타일
  js/
    main.js           ← GSAP 초기화, 도트 네비, scroll-reveal
    counter.js        ← KEY NUMBERS 카운터 애니메이션
  assets/
    images/           ← 기존 디지털브로슈어/assets/images/ 복사
```

---

## 디자인 토큰

```css
--color-paper:     #FAFAF8;   /* 따뜻한 흰색 — 라이트 섹션 배경 */
--color-ink:       #0D0D0D;   /* 거의 검정 — 다크 섹션 배경 */
--color-petroleum: #006B6B;   /* 틸 액센트 — 레이블·강조 */

--font-serif: 'Bodoni Moda', serif;         /* 대형 헤드라인 */
--font-mono:  'JetBrains Mono', monospace; /* 수치·메타·레이블 */
--font-sans:  'Manrope', sans-serif;       /* 본문 */
```

### 타이포그래피 스케일

| 역할 | 폰트 | 크기 | 비고 |
|------|------|------|------|
| Hero 헤드라인 | Bodoni Moda | clamp(64px, 10vw, 120px) | 업라이트+이탤릭 혼합 |
| 챕터 타이틀 | Bodoni Moda | clamp(48px, 7vw, 100px) | uppercase |
| 수치(KEY NUMBERS) | JetBrains Mono | clamp(56px, 8vw, 96px) | tabular-nums |
| 섹션 레이블 | JetBrains Mono | 10–11px | uppercase, tracking 0.2em |
| 본문 | Manrope | 16–18px | line-height 1.6 |
| 캡션 | Manrope | 13px | color: --color-ink/60 |

### 색상 사용 규칙

- `--color-petroleum`: 레이블·메타·수치 단위·강조에만 사용. 배경으로 KEY NUMBERS 섹션 한 곳에만.
- 버튼: 테두리형(`border: 1px solid currentColor`), fill 없음. hover 시 배경색과 텍스트 반전.
- 이미지: `filter: grayscale(100%) contrast(110%)` 기본, hover 시 컬러 복원.

### Elevation / 구분

- 섹션 간 구분: 배경색 교차(light ↔ dark)만 사용. 그림자·구분선 없음.
- 내부 구분: `1px solid currentColor` 수평선(horizontal rule) 또는 컬럼 구분선.

---

## 섹션 구성 (스크롤 순서)

### ① HERO (100vh, ink 배경)

- Bodoni Moda 대형 헤드라인: `ENERGY / `*`Beyond`*` / LIMITS.` (업라이트+이탤릭 혼합)
- 좌8 : 우4 컬럼 그리드
  - 좌: 헤드라인 + 서브카피(한국어) + 테두리 CTA 버튼 "지금 살펴보기 →"
  - 우: 정유시설 흑백 사진 (border-left 구분선)
- 상단 메타 바: `[섹션명] / [업무 영역 나열] / [발행 연도]` — JetBrains Mono 10px
- 하단 데이터 티커: `STATUS: OPTIMAL / 원유 처리 800,000 BPD / 정제능력 세계 4위 / ...`
- GSAP: 헤드라인 줄별 stagger(y: 60 → 0, opacity 0 → 1, 0.9s each)

### ② KEY NUMBERS (auto, petroleum 배경)

- JetBrains Mono 대형 수치 4개 2×2 그리드
  - `800k` BPD — 원유 정제 처리량
  - `4위` — 정제능력 세계 순위
  - `1967` — 창립 연도
  - `17년` — NCSI 연속 1위
- 각 수치 아래 JetBrains Mono 10px 레이블(한국어)
- GSAP ScrollTrigger: 섹션 진입 시 숫자 카운팅 애니메이션 + pin(0.5s 고정)

### ③ HERITAGE PLUS (auto, paper/ink 교차)

**서브섹션 3개:**

1. **챕터 헤더** (ink 배경, 60vh)
   - `Chapter I` 레이블 + `HERITAGE / `*`Plus`*` 대형 타이틀
   - 우측: 챕터 소개 텍스트(한국어, 3–4줄)

2. **성장 타임라인** (paper 배경)
   - 레저(ledger) 테이블 구조: `연도 | 이미지 | 사건명 + 설명` 3컬럼
   - 마일스톤 8–10개 (1969, 1987, 1995, 1999, 2007, 2010, 2015, 2021, 2023, 2025)
   - GSAP: 각 행 stagger(0.15s 간격) fade-in-up

3. **여수 팩토리 인포그래픽** (ink 배경)
   - 4개 대형 수치: `80만 배럴/일`, `27.5만 배럴/일`, `325기`, `100,000kW`
   - counter.js 애니메이션 적용

### ④ VALUE PLUS (auto, ink 배경)

**서브섹션 2개:**

1. **챕터 헤더** (ink, 60vh) — 동일 패턴
2. **글로벌 거점 맵 + 사업 포트폴리오**
   - 간략 SVG 도트 맵: 거점 도시를 원(circle)으로 표시하는 단순화된 세계 지도 (실제 지리 SVG 라이브러리 미사용)
   - 사업 영역 카드 3–4개 (정제·석유화학·윤활유·신에너지)
   - 주요 수출 수치 — 기존 `data/chapter2.json` 값을 참조하여 HTML에 하드코딩

### ⑤ ENERGY PLUS (auto, paper 배경)

**서브섹션 2개:**

1. **챕터 헤더** (paper, 60vh)
2. **지속가능성 지표**
   - 탄소 저감 목표 · 신에너지 투자액 · 수소·EV 인프라 수치
   - 가로 진행 바(progress bar) 형태 시각화
   - 기존 `data/chapter3.json` 값을 참조하여 HTML에 하드코딩

### ⑥ SOCIAL PLUS (auto, ink 배경)

**서브섹션 2개:**

1. **챕터 헤더** (ink, 60vh)
2. **사회공헌 성과**
   - 안전·환경 지표, 임직원 현황, 지역사회 프로그램
   - 카드 그리드 (3열) — 기존 `data/chapter4.json` 값을 참조하여 HTML에 하드코딩

### ⑦ OUTRO (100vh, deep ink #0A0A0A)

- 중앙 정렬 클로징 메시지 (한국어)
- GS칼텍스 로고 또는 워드마크
- 하단 크레딧 (연도, 주소 등) — JetBrains Mono 10px

---

## 네비게이션

### 우측 도트 네비게이션

```
위치: position: fixed; right: 24px; top: 50%; transform: translateY(-50%)
```

- 도트 7개 세로 배열, 간격 12px
- **활성 섹션**: `width: 8px; height: 8px; background: #006B6B`
- **비활성 섹션**: `width: 6px; height: 6px; background: currentColor; opacity: 0.3`
- 활성 도트 우측에 레이블 툴팁 (hover 시 표시): `HERITAGE PLUS` 등 JetBrains Mono 10px
- 라이트 섹션에서는 ink 색, 다크 섹션에서는 paper 색으로 자동 전환 (IntersectionObserver)
- 클릭 시 `gsap.to(window, { scrollTo: '#section-id', duration: 1.2, ease: 'power3.inOut' })`

---

## 애니메이션

### GSAP 사용 범위

| 섹션 | 효과 | 방식 |
|------|------|------|
| HERO 헤드라인 | 줄별 stagger (y: 60→0, opacity: 0→1) | ScrollTrigger once |
| KEY NUMBERS | 숫자 카운팅 + 섹션 pin | ScrollTrigger scrub |
| HERITAGE 타임라인 | 행별 stagger (y: 40→0) | ScrollTrigger once |
| 챕터 타이틀 | 좌→우 슬라이드인 | ScrollTrigger once |

### CSS Transition 사용 범위

- `.reveal` 클래스: `opacity 0→1, transform translateY(40px)→0`, 0.8s ease
- 이미지 hover: `filter grayscale→color` 0.6s
- 버튼 hover: `background-color` 0.3s (fill 반전)
- 도트 상태 전환: `width, height, background` 0.3s

---

## 데이터 전략

- 기존 `디지털브로슈어/data/*.json` 파일의 수치 데이터를 `index.html`에 직접 하드코딩
- JSON fetch 불필요 (단일 파일 전략)
- 콘텐츠가 업데이트될 경우 HTML 직접 수정

---

## 범위 외 (명시적 제외)

- 모바일 반응형: 데스크톱 우선, 모바일 최적화는 이후 Phase에서
- 다크모드 토글: 섹션별 고정 배경색 사용
- 인터랙티브 차트 (Chart.js): 정적 수치로 대체
- 기존 `디지털브로슈어/` 파일 수정 없음

---

## 성공 기준

1. `디지털브로슈어-editorial/index.html`을 브라우저에서 열면 7개 섹션이 순서대로 스크롤됨
2. 우측 도트 네비게이션이 현재 섹션을 정확히 표시하고 클릭으로 이동 가능
3. KEY NUMBERS 섹션에서 숫자 카운팅 애니메이션 작동
4. 헤드라인 영문 + 본문 한국어 일관성 유지
5. 기존 `디지털브로슈어/` 디렉토리 변경 없음
