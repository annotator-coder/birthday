# Apple HIG Chapter1 파일럿 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** GS칼텍스 디지털 브로슈어에 Apple HIG 레이아웃 시스템을 Chapter1 파일럿으로 적용한다 — 브랜드 색상(네이비·그린)은 유지하고, CSS 변수 체계·타이포그래피·네비게이션·탭·팩토리 섹션을 HIG 패턴으로 교체한다.

**Architecture:** `css/base.css`의 CSS 변수를 HIG 토큰으로 재정의하면 하위 파일들이 자동으로 반영된다. 변수 별칭(`--font-en`, `--color-light-bg`)으로 chapter2–4 CSS를 건드리지 않고 Pretendard·HIG 배경색으로 전환한다. HTML과 JS는 일절 수정하지 않는다.

**Tech Stack:** 바닐라 CSS (변수 기반), 정적 HTML, Python http.server (브라우저 검증용)

---

## 파일 변경 맵

| 파일 | 유형 | 변경 내용 |
|------|------|-----------|
| `css/base.css` | 전면 개정 | CSS 변수 재정의, 공통 타이포그래피, 섹션 배경 |
| `css/nav.css` | 전면 재작성 | 라이트 반투명 배경, Segmented Control |
| `css/components.css` | 탭 섹션만 수정 | Segmented Control 패턴, 카드 스타일 |
| `css/sections/chapter1.css` | 부분 수정 | 타임라인 폰트·배경, 팩토리 Grouped List |

**수정하지 않는 파일:** `index.html`, `sections/*.html`, `data/*.json`, `components/*.js`, `css/sections/chapter2–4.css`, `css/sections/intro.css`

---

## Task 1: CSS 변수 시스템 + 공통 타이포그래피 (`css/base.css`)

**Files:**
- Modify: `css/base.css`

- [ ] **Step 1: 브라우저 검증용 로컬 서버 실행**

```bash
cd /Users/jeong-won-yeob/code/디지털브로슈어
python3 -m http.server 5500
```

브라우저에서 `http://localhost:5500` 열기 — 현재 상태 기준점 확인.

- [ ] **Step 2: `css/base.css` 전체를 다음으로 교체**

```css
/* css/base.css */
:root {
  /* === GS 브랜드 색상 (유지) === */
  --color-green:      #00C853;
  --color-green-dark: #00962D;
  --color-navy:       #0D1B2A;
  --color-teal:       #00897B;
  --color-purple:     #1A237E;
  --color-white:      #FFFFFF;

  /* RGB 호환 변수 (nav.css·components.css에서 rgba()로 사용 중) */
  --color-navy-rgb:  13, 27, 42;
  --color-white-rgb: 255, 255, 255;
  --color-green-rgb: 0, 200, 83;

  /* === HIG 의미론적 색상 === */
  --color-bg:             #FFFFFF;
  --color-bg-secondary:   #F2F2F7;
  --color-bg-card:        #FFFFFF;
  --color-text:           #1C1C1E;
  --color-text-secondary: #3C3C43;
  --color-text-muted:     #8E8E93;
  --color-separator:      #E5E5EA;

  /* 하위 호환 별칭 — chapter2–4 CSS 변경 없이 HIG 색상 적용 */
  --color-light-bg:  var(--color-bg-secondary);   /* 기존 #F5F5F5 → #F2F2F7 */

  /* === 폰트 === */
  --font-ko: 'Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
  /* 하위 호환 별칭 — chapter2–4의 var(--font-en) 참조가 Pretendard로 전환됨 */
  --font-en: var(--font-ko);

  /* === HIG 타이포그래피 스케일 === */
  --text-large-title: 2.125rem;  /* 34pt */
  --text-title1:      1.75rem;   /* 28pt */
  --text-title2:      1.375rem;  /* 22pt */
  --text-title3:      1.25rem;   /* 20pt */
  --text-headline:    1.0625rem; /* 17pt */
  --text-body:        1.0625rem; /* 17pt */
  --text-callout:     1rem;      /* 16pt */
  --text-subheadline: 0.9375rem; /* 15pt */
  --text-footnote:    0.8125rem; /* 13pt */
  --text-caption1:    0.75rem;   /* 12pt */

  /* === HIG 모서리 반경 === */
  --rounded-sm:   6px;
  --rounded-md:   10px;
  --rounded-lg:   13px;
  --rounded-xl:   16px;
  --rounded-full: 9999px;

  /* === HIG 간격 (4pt 그리드) === */
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-8:  32px;
  --space-10: 40px;
  --space-12: 48px;

  /* === 기타 === */
  --nav-height: 52px;
  --transition: 0.25s ease;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; font-size: 16px; }

body {
  font-family: var(--font-ko);
  color: var(--color-text);
  background: var(--color-bg);
  overflow-x: hidden;
}

.chapter {
  display: none;
  min-height: calc(100vh - var(--nav-height));
}

.chapter.active { display: block; }

/* === Hero === */
.hero {
  position: relative;
  width: 100%;
  height: 60vh;
  min-height: 360px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: var(--color-navy);
}

#intro .hero,
#outro .hero {
  height: 100vh;
  min-height: unset;
}

.hero__bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0.6;
}

.hero__content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: var(--color-white);
  animation: fadeInUp 0.8s ease both;
}

.hero__tag {
  font-size: var(--text-caption1);
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-green);
  margin-bottom: var(--space-3);
}

.hero__title {
  font-size: var(--text-large-title); /* HIG Large Title: 34pt */
  font-weight: 700;
  line-height: 1.18;
  letter-spacing: -0.022em;
}

/* === Section Block === */
.section-block {
  padding: var(--space-10) 5%; /* 40px 5% */
  max-width: 1400px;
  margin: 0 auto;
}

.section-block__header {
  margin-bottom: var(--space-12); /* 48px */
}

.section-block__tag {
  font-size: var(--text-caption1); /* 12pt */
  font-weight: 600;
  color: var(--color-text-muted);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: var(--space-2);
}

.section-block__title {
  font-size: var(--text-title2); /* HIG Title 2: 22pt */
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.27;
  color: var(--color-navy);
}

.section-block__desc {
  margin-top: var(--space-2);
  font-size: var(--text-subheadline); /* HIG Subheadline: 15pt */
  line-height: 1.6;
  color: var(--color-text-muted);
  max-width: 700px;
}

/* === 애니메이션 === */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}

.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.reveal.is-visible {
  opacity: 1;
  transform: none;
}

/* === 반응형 === */
@media (max-width: 768px) {
  .tab-section { grid-template-columns: 1fr; }
  .tab-section__sidebar {
    flex-direction: row;
    overflow-x: auto;
    padding: var(--space-2);
  }
  .tab-section__tab-info { display: none; }
  .expand-cards { grid-template-columns: 1fr; }
  .bubble-stat { flex-direction: column; gap: 2rem; }
  .nav-chapters { overflow-x: auto; }
  .nav-chapters li { font-size: var(--text-caption1); padding: var(--space-1) var(--space-2); }
}
```

- [ ] **Step 3: 브라우저에서 시각 확인**

`http://localhost:5500` 새로고침 후 확인:
- Intro 화면의 `hero__title` 폰트가 더 작아지지 않고 34pt 수준 유지
- 배경이 기존처럼 화이트/네이비 유지
- 콘솔 오류 없음

- [ ] **Step 4: 커밋**

```bash
git add css/base.css
git commit -m "style: CSS 변수 HIG 토큰 체계로 재정의, 공통 타이포그래피 스케일 적용"
```

---

## Task 2: 네비게이션 재작성 (`css/nav.css`)

**Files:**
- Modify: `css/nav.css`

- [ ] **Step 1: `css/nav.css` 전체를 다음으로 교체**

```css
/* css/nav.css */
#main-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--nav-height); /* 52px */
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  padding: 0 5%;
  z-index: 100;
  gap: var(--space-4);
}

.nav-logo {
  color: var(--color-navy);
  font-weight: 700;
  font-size: var(--text-headline);
  letter-spacing: -0.02em;
  white-space: nowrap;
}

/* HIG Segmented Control */
.nav-chapters {
  display: flex;
  list-style: none;
  background: var(--color-separator); /* #E5E5EA */
  border-radius: 9px;
  padding: 2px;
  gap: 0;
  flex: 1;
  overflow-x: auto;
}

.nav-chapters li {
  flex: 1;
  padding: 5px 14px;
  border-radius: 7px;
  font-size: var(--text-caption1); /* 12pt */
  font-weight: 500;
  color: var(--color-text-muted);
  cursor: pointer;
  transition: var(--transition);
  text-align: center;
  white-space: nowrap;
}

.nav-chapters li:hover {
  color: var(--color-text);
}

.nav-chapters li.active {
  background: var(--color-navy);
  color: var(--color-white);
  font-weight: 600;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
}

/* 이전/다음 버튼 */
.nav-controls {
  display: flex;
  gap: var(--space-2);
}

.nav-controls button {
  width: 30px;
  height: 30px;
  border: none;
  border-radius: var(--rounded-full);
  cursor: pointer;
  font-size: 0.875rem;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
}

#prev-btn {
  background: var(--color-separator);
  color: var(--color-text-muted);
}

#next-btn {
  background: var(--color-navy);
  color: var(--color-white);
}

#prev-btn:hover { background: #D1D1D6; }
#next-btn:hover { background: #1A3A5C; }

.nav-controls button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

main#brochure {
  padding-top: var(--nav-height); /* 52px */
}
```

- [ ] **Step 2: 브라우저에서 시각 확인**

`http://localhost:5500` 새로고침 후 확인:
- 네비게이션 바가 흰 반투명 배경 (콘텐츠 위에서 살짝 비침)
- 챕터 목록이 세그먼트 컨트롤 모양 (회색 pill 컨테이너 안에 네이비 활성 아이템)
- 이전 버튼 회색, 다음 버튼 네이비
- 챕터 클릭 시 정상 전환되는지 확인

- [ ] **Step 3: 커밋**

```bash
git add css/nav.css
git commit -m "style: 네비게이션 HIG 반투명 라이트 배경 + Segmented Control 적용"
```

---

## Task 3: 탭 컴포넌트 Segmented Control 변환 (`css/components.css`)

**Files:**
- Modify: `css/components.css` (Tab Section 블록만, 나머지 유지)

- [ ] **Step 1: `css/components.css`의 `=== Tab Section ===` 블록(1–109행)을 다음으로 교체**

기존 `/* === Tab Section ===*/` 주석부터 `/* === Expand Card ===*/` 주석 바로 위까지를 아래로 교체한다.

```css
/* === Tab Section === */
.tab-section {
  display: block; /* 기존 grid 해제 */
  padding: var(--space-8) var(--space-6);
  background: var(--color-bg-secondary);
}

/* Segmented Control 컨테이너 */
.tab-section__sidebar {
  display: flex;
  background: var(--color-separator); /* #E5E5EA */
  border-radius: 9px;
  padding: 2px;
  gap: 0;
  margin-bottom: var(--space-4);
  overflow-x: auto;
}

/* 개별 세그먼트 아이템 */
.tab-section__tab {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7px var(--space-3);
  border-radius: 7px;
  font-size: var(--text-footnote); /* 13pt */
  font-weight: 500;
  color: var(--color-text-muted);
  cursor: pointer;
  transition: var(--transition);
  text-align: center;
  border: none;
  background: transparent;
  white-space: nowrap;
}

.tab-section__tab:hover {
  color: var(--color-text);
}

.tab-section__tab.active {
  background: var(--color-bg-card); /* #fff */
  color: var(--color-text);
  font-weight: 600;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
}

/* 기존 아이콘·설명 텍스트 — HTML 변경 없이 CSS로 숨김 */
.tab-section__tab-icon { display: none; }
.tab-section__tab-info { display: none; }

/* 탭 콘텐츠 영역 */
.tab-section__content {
  background: var(--color-bg-card); /* #fff */
  border-radius: var(--rounded-lg); /* 13px */
  padding: var(--space-5);
}

.tab-section__panel { display: none; }
.tab-section__panel.active {
  display: block;
  animation: fadeInUp 0.3s ease;
}

.tab-section__desc {
  font-size: var(--text-subheadline); /* 15pt */
  line-height: 1.7;
  color: var(--color-text-muted);
  margin-bottom: var(--space-4);
}

.tab-section__stats {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

/* 통계 칩 */
.tab-section__stat-item {
  background: var(--color-bg-secondary); /* #F2F2F7 */
  border-radius: var(--rounded-md);       /* 10px */
  padding: var(--space-3) var(--space-4);
  min-width: 160px;
}

.tab-section__stat-label {
  font-size: var(--text-caption1); /* 12pt */
  color: var(--color-text-muted);
  margin-bottom: var(--space-1);
}

.tab-section__stat-value {
  font-family: var(--font-ko);
  font-size: var(--text-title2); /* 22pt */
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-navy);
  line-height: 1;
}

.tab-section__stat-unit {
  font-size: var(--text-caption1);
  color: var(--color-text-muted);
  margin-top: var(--space-1);
}
```

- [ ] **Step 2: Chapter1로 이동해 탭 섹션 동작 확인**

`http://localhost:5500` → Heritage Plus 탭 클릭 후 확인:
- 탭 사이드바가 세그먼트 컨트롤 모양으로 변경됨 (가로로 나란히)
- 탭 클릭 시 패널 전환 정상 동작 (JS 로직은 유지됨)
- 통계 값이 흰 카드 안에 노출됨
- 숫자가 Bebas Neue 대신 Pretendard로 표시됨

- [ ] **Step 3: 커밋**

```bash
git add css/components.css
git commit -m "style: 탭 컴포넌트 HIG Segmented Control 패턴으로 교체"
```

---

## Task 4: Chapter1 타임라인 폰트·배경 업데이트 (`css/sections/chapter1.css`)

**Files:**
- Modify: `css/sections/chapter1.css` (타임라인 블록만)

- [ ] **Step 1: `css/sections/chapter1.css` 타임라인 부분 수정**

아래 세 선택자를 찾아 교체한다:

**`.ch1-timeline` 배경 (4행):**
```css
/* 변경 전 */
.ch1-timeline { background: #F8F9FA; }

/* 변경 후 */
.ch1-timeline { background: var(--color-bg-secondary); }
```

**`.ch1-timeline__year` 폰트 (53–60행):**
```css
/* 변경 전 */
.ch1-timeline__year {
  font-family: var(--font-en);
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-green);
  line-height: 1;
}

/* 변경 후 */
.ch1-timeline__year {
  font-family: var(--font-ko);
  font-size: var(--text-title3); /* 20pt */
  font-weight: 700;
  color: var(--color-green);
  letter-spacing: -0.02em;
  line-height: 1;
}
```

**`.ch1-timeline__dot` 크기 (62–69행):**
```css
/* 변경 전 */
.ch1-timeline__dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--color-white);
  border: 3px solid var(--color-green);
  justify-self: center;
  z-index: 1;
}

/* 변경 후 */
.ch1-timeline__dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--color-white);
  border: 2.5px solid var(--color-green);
  justify-self: center;
  z-index: 1;
}
```

**`#chapter1 .section-block` 배경 (153행):**
```css
/* 변경 전 */
#chapter1 .section-block { background: #F8F9FA; }

/* 변경 후 */
#chapter1 .section-block { background: var(--color-bg-secondary); }
```

- [ ] **Step 2: 브라우저에서 타임라인 확인**

`http://localhost:5500` → Heritage Plus 탭:
- 타임라인 연도(1967, 1969…)가 Pretendard 폰트로 굵게 표시
- 타임라인 배경이 `#F2F2F7`(미묘하게 따뜻한 회색)으로 변경
- 닷이 살짝 작아진 것 확인

- [ ] **Step 3: 커밋**

```bash
git add css/sections/chapter1.css
git commit -m "style: Chapter1 타임라인 HIG 타이포그래피·배경 적용"
```

---

## Task 5: Chapter1 팩토리 → HIG Grouped List (`css/sections/chapter1.css`)

**Files:**
- Modify: `css/sections/chapter1.css` (팩토리 블록)

- [ ] **Step 1: 팩토리 관련 선택자 교체**

**`.ch1-factory__tag` 폰트 (102행):**
```css
/* 변경 전 */
.ch1-factory__tag {
  font-family: var(--font-en);
  font-size: 0.875rem;
  letter-spacing: 0.3em;
  color: var(--color-green);
  margin-bottom: 1rem;
}

/* 변경 후 */
.ch1-factory__tag {
  font-family: var(--font-ko);
  font-size: var(--text-caption1); /* 12pt */
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-green);
  margin-bottom: var(--space-2);
}
```

**`.ch1-factory__title` (109–114행):**
```css
/* 변경 전 */
.ch1-factory__title {
  font-size: clamp(1.75rem, 3.5vw, 3rem);
  font-weight: 700;
  color: var(--color-white);
  line-height: 1.3;
  margin-bottom: 4rem;
}

/* 변경 후 */
.ch1-factory__title {
  font-size: var(--text-title1); /* 28pt */
  font-weight: 700;
  color: var(--color-white);
  letter-spacing: -0.022em;
  line-height: 1.25;
  margin-bottom: var(--space-6);
}
```

**`.ch1-factory__grid` — 4열 그리드 → Grouped List (117–121행):**
```css
/* 변경 전 */
.ch1-factory__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

/* 변경 후 */
.ch1-factory__grid {
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.07);
  border-radius: var(--rounded-lg); /* 13px */
  overflow: hidden;
}
```

**`.ch1-factory__stat` — 카드에서 리스트 행으로 (123–126행):**

HTML 구조: `stat > [num] [unit] [label]` (3개 자식). HIG 패턴(라벨 왼쪽·수치 오른쪽)을 만들려면 label에 `order: -1`을 주고 `flex: 1`로 밀어낸다.

```css
/* 변경 전 */
.ch1-factory__stat {
  border-left: 2px solid rgba(255,255,255,0.1);
  padding-left: 2rem;
}

/* 변경 후 */
.ch1-factory__stat {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4); /* 12px 16px */
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}
.ch1-factory__stat:last-child { border-bottom: none; }

/* label을 flex 왼쪽으로 이동, 나머지 공간 차지 */
.ch1-factory__label {
  order: -1;
  flex: 1;
}
```

**`.ch1-factory__num` 폰트 (129–133행):**
```css
/* 변경 전 */
.ch1-factory__num {
  font-family: var(--font-en);
  font-size: clamp(2.5rem, 4vw, 3.5rem);
  color: var(--color-green);
  line-height: 1;
  margin-bottom: 0.25rem;
}

/* 변경 후 */
.ch1-factory__num {
  font-family: var(--font-ko);
  font-size: var(--text-title3); /* 20pt */
  font-weight: 700;
  color: var(--color-green);
  letter-spacing: -0.02em;
  line-height: 1;
}
```

**`.ch1-factory__unit` (136–140행):**
```css
/* 변경 전 */
.ch1-factory__unit {
  font-size: 0.875rem;
  color: rgba(255,255,255,0.4);
  margin-bottom: 0.75rem;
  min-height: 1.4em;
}

/* 변경 후 */
.ch1-factory__unit {
  font-size: var(--text-caption1); /* 12pt */
  color: rgba(255, 255, 255, 0.4);
  margin-left: var(--space-1);
}
```

**`.ch1-factory__label` (143–145행):**
```css
/* 변경 전 */
.ch1-factory__label {
  font-size: 0.9375rem;
  color: rgba(255,255,255,0.75);
}

/* 변경 후 */
.ch1-factory__label {
  font-size: var(--text-subheadline); /* 15pt */
  color: rgba(255, 255, 255, 0.75);
}
```

**반응형 미디어 쿼리 내 `ch1-factory__grid` 수정 (167행):**
```css
/* 변경 전 */
.ch1-factory__grid { grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }

/* 변경 후 — Grouped List는 이미 column이므로 반응형 별도 처리 불필요 */
/* 해당 줄 삭제 */
```

- [ ] **Step 2: 브라우저에서 팩토리 섹션 확인**

`http://localhost:5500` → Heritage Plus 탭 스크롤 다운:
- 여수 에너지 복합단지 섹션이 4열 그리드 대신 세로 리스트로 표시
- 각 행: 왼쪽에 라벨, 오른쪽에 녹색 수치
- 수치 폰트가 Pretendard (기존 Bebas Neue 대비 더 정돈된 느낌)
- 리스트 컨테이너 모서리가 둥글게 처리됨

- [ ] **Step 3: 커밋**

```bash
git add css/sections/chapter1.css
git commit -m "style: Chapter1 팩토리 HIG Grouped List 패턴 적용"
```

---

## Task 6: 최종 검증

**Files:** 없음 (검증만)

- [ ] **Step 1: 전체 챕터 순환 확인**

`http://localhost:5500`에서 아래를 순서대로 확인:

| 확인 항목 | 기대 결과 |
|-----------|-----------|
| 네비게이션 반투명 배경 | 콘텐츠 위 흰 박무 효과 |
| Intro 타이틀 폰트 | Pretendard, 대형 (34pt 수준) |
| Chapter1 타임라인 연도 | Pretendard 굵은 글씨, 녹색 |
| 팩토리 통계 | 세로 리스트 (라벨 왼쪽, 수치 오른쪽) |
| 탭 컴포넌트 | 세그먼트 컨트롤, 클릭 시 패널 전환 |
| Chapter2–4 | 레이아웃 깨짐 없음 (Pretendard 자동 적용) |

- [ ] **Step 2: 모바일 반응형 확인**

브라우저 개발자 도구 → 768px 이하 뷰포트:
- 네비게이션 세그먼트가 가로 스크롤로 처리됨 (overflow-x: auto)
- 탭 세그먼트가 가로 스크롤로 처리됨
- 팩토리 리스트가 단열로 정상 표시

- [ ] **Step 3: JS 컴포넌트 동작 확인**

- 탭 클릭 시 패널 전환 (`tab-section.js`)
- 숫자 카운트 애니메이션 (`stat-counter.js`)
- 스크롤 reveal 애니메이션 (`scroll-reveal.js`)
- expand-card 클릭 확장/축소 (`expand-card.js`)

- [ ] **Step 4: DESIGN.md lint 확인**

```bash
cd /Users/jeong-won-yeob/code
npx @google/design.md lint DESIGN.md
```

기대 결과: `"errors": 0`

- [ ] **Step 5: 최종 커밋**

```bash
git add -A
git commit -m "style: Apple HIG Chapter1 파일럿 적용 완료 — 변수·Nav·탭·타임라인·팩토리"
```
