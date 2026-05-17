# GS칼텍스 에디토리얼 브로슈어 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `디지털브로슈어-editorial/` 디렉토리에 Bloomberg/FT 에디토리얼 스타일의 단일 스크롤 브로슈어(index.html)를 신규 제작한다. 기존 `디지털브로슈어/` 파일은 일체 수정하지 않는다.

**Architecture:** 단일 `index.html`에 7개 섹션(Hero → Key Numbers → Heritage → Value → Energy → Social → Outro)을 순서대로 배치. `css/editorial.css`에 모든 스타일, `js/main.js`에 GSAP ScrollTrigger 및 도트 네비게이션, `js/counter.js`에 숫자 카운팅 애니메이션을 분리.

**Tech Stack:** HTML5, CSS3 Custom Properties, GSAP 3 (ScrollTrigger + ScrollToPlugin) via CDN, Google Fonts (Bodoni Moda / JetBrains Mono / Manrope)

---

## 파일 구조

```
디지털브로슈어-editorial/
  index.html            ← 7개 섹션 포함 단일 파일
  css/
    editorial.css       ← 토큰 + 전체 스타일
  js/
    main.js             ← GSAP init, 도트 네비, 스크롤 reveal
    counter.js          ← KEY NUMBERS 카운팅 애니메이션
  assets/
    images/             ← 기존 브로슈어 이미지 복사
```

---

## Task 1: 프로젝트 스캐폴드

**Files:**
- Create: `디지털브로슈어-editorial/index.html`
- Create: `디지털브로슈어-editorial/css/editorial.css`
- Create: `디지털브로슈어-editorial/js/main.js`
- Create: `디지털브로슈어-editorial/js/counter.js`
- Copy: `디지털브로슈어-editorial/assets/images/` (기존에서 복사)

- [ ] **Step 1: 디렉토리 생성 및 이미지 복사**

```bash
mkdir -p 디지털브로슈어-editorial/css 디지털브로슈어-editorial/js 디지털브로슈어-editorial/assets/images
cp -r 디지털브로슈어/assets/images/ 디지털브로슈어-editorial/assets/
```

- [ ] **Step 2: css/editorial.css — 디자인 토큰 + 기반 스타일 작성**

```css
/* ─── Design Tokens ─────────────────────────────────── */
:root {
  --paper:      #FAFAF8;
  --ink:        #0D0D0D;
  --ink-mid:    #2A2A2A;
  --petroleum:  #006B6B;
  --petroleum-dark: #005555;

  --font-serif: 'Bodoni Moda', serif;
  --font-mono:  'JetBrains Mono', monospace;
  --font-sans:  'Manrope', sans-serif;

  --ease-spring: cubic-bezier(0.16, 1, 0.3, 1);
}

/* ─── Reset ─────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: auto; /* GSAP controls scroll */ }

body {
  font-family: var(--font-sans);
  background: var(--ink);
  color: var(--paper);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

img { display: block; max-width: 100%; }
a   { color: inherit; text-decoration: none; }

/* ─── Scrollbar ──────────────────────────────────────── */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--ink); }
::-webkit-scrollbar-thumb { background: var(--petroleum); }

/* ─── Reveal animation base ─────────────────────────── */
.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.9s var(--ease-spring),
              transform 0.9s var(--ease-spring);
}
.reveal.is-visible { opacity: 1; transform: none; }

/* ─── Typography helpers ────────────────────────────── */
.label-mono {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.serif-display {
  font-family: var(--font-serif);
  font-weight: 700;
  line-height: 0.9;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

/* ─── Section base ───────────────────────────────────── */
.section { position: relative; width: 100%; }
.section-light { background: var(--paper); color: var(--ink); }
.section-dark  { background: var(--ink);   color: var(--paper); }
.section-teal  { background: var(--petroleum); color: var(--paper); }

/* ─── Chapter header layout (shared) ────────────────── */
.chapter-header {
  min-height: 60vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: end;
  padding: 120px 80px 80px;
  border-bottom: 1px solid currentColor;
  gap: 60px;
}
.chapter-header .chapter-num {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.2em;
  color: var(--petroleum);
  display: block;
  margin-bottom: 20px;
}
.chapter-header h2 {
  font-family: var(--font-serif);
  font-size: clamp(56px, 7vw, 100px);
  font-weight: 700;
  line-height: 0.9;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}
.chapter-header h2 em {
  font-style: italic;
  font-weight: 400;
}
.chapter-header .chapter-desc {
  font-family: var(--font-sans);
  font-size: clamp(14px, 1.5vw, 18px);
  line-height: 1.7;
  opacity: 0.7;
  max-width: 440px;
  align-self: end;
}

/* ─── Button ─────────────────────────────────────────── */
.btn-editorial {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 14px 24px;
  border: 1px solid currentColor;
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  cursor: pointer;
  background: transparent;
  color: inherit;
  position: relative;
  overflow: hidden;
  transition: color 0.3s;
}
.btn-editorial::before {
  content: '';
  position: absolute;
  inset: 0;
  background: currentColor;
  transform: translateX(-100%);
  transition: transform 0.4s var(--ease-spring);
  z-index: -1;
}
.btn-editorial:hover::before { transform: translateX(0); }
.section-light .btn-editorial:hover { color: var(--paper); }
.section-dark  .btn-editorial:hover,
.section-teal  .btn-editorial:hover { color: var(--ink); }

/* ─── Image editorial treatment ─────────────────────── */
.img-editorial {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(100%) contrast(1.1);
  transition: filter 0.7s ease;
}
.img-editorial:hover { filter: none; }
```

- [ ] **Step 3: js/counter.js 작성**

```js
// counter.js — 숫자 카운팅 애니메이션
// 사용법: CounterAnim.init() — GSAP ScrollTrigger 콜백 안에서 호출

const CounterAnim = (() => {
  function animateValue(el, from, to, duration) {
    const start = performance.now();
    const update = (time) => {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(from + (to - from) * eased);
      el.textContent = current.toLocaleString('ko-KR');
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = to.toLocaleString('ko-KR');
    };
    requestAnimationFrame(update);
  }

  function init() {
    document.querySelectorAll('[data-count-to]').forEach(el => {
      const target = parseFloat(el.dataset.countTo);
      const duration = parseInt(el.dataset.countDuration || '1800');
      animateValue(el, 0, target, duration);
    });
  }

  return { init, animateValue };
})();
```

- [ ] **Step 4: js/main.js 스텁 작성**

```js
// main.js — GSAP 초기화, 도트 네비, 섹션 reveal
// GSAP은 CDN으로 로드됨 (index.html에서 script 태그로 포함)

document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // TODO: 도트 네비게이션 (Task 10에서 완성)
  // TODO: GSAP 섹션 애니메이션 (Task 11에서 완성)
  // TODO: reveal 요소 IntersectionObserver (Task 11에서 완성)
});
```

- [ ] **Step 5: index.html 셸 작성 (섹션 플레이스홀더 포함)**

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GS칼텍스 — Energy Beyond Limits</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,700;1,6..96,400;1,6..96,700&family=JetBrains+Mono:wght@400;700&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/editorial.css">
</head>
<body>
  <!-- 도트 네비게이션 (Task 10) -->
  <nav id="dot-nav" aria-label="섹션 네비게이션"></nav>

  <!-- ① HERO (Task 3) -->
  <section id="hero" class="section section-dark"></section>

  <!-- ② KEY NUMBERS (Task 4) -->
  <section id="numbers" class="section section-teal"></section>

  <!-- ③ HERITAGE PLUS (Task 5) -->
  <section id="heritage" class="section"></section>

  <!-- ④ VALUE PLUS (Task 6) -->
  <section id="value" class="section section-dark"></section>

  <!-- ⑤ ENERGY PLUS (Task 7) -->
  <section id="energy" class="section section-light"></section>

  <!-- ⑥ SOCIAL PLUS (Task 8) -->
  <section id="social" class="section section-dark"></section>

  <!-- ⑦ OUTRO (Task 9) -->
  <section id="outro" class="section section-dark"></section>

  <!-- GSAP CDN -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
  <script src="js/counter.js"></script>
  <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 6: 브라우저로 확인**

```bash
open 디지털브로슈어-editorial/index.html
```

빈 검정 페이지가 열리면 성공. 콘솔 오류 없어야 함.

- [ ] **Step 7: 커밋**

```bash
git add 디지털브로슈어-editorial/
git commit -m "feat: 에디토리얼 브로슈어 프로젝트 스캐폴드 및 기반 CSS/JS"
```

---

## Task 2: HERO 섹션

**Files:**
- Modify: `디지털브로슈어-editorial/index.html` — `#hero` 내용 교체
- Modify: `디지털브로슈어-editorial/css/editorial.css` — hero 스타일 추가

- [ ] **Step 1: editorial.css에 Hero 스타일 추가**

```css
/* ─── ① HERO ─────────────────────────────────────────── */
#hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.hero-meta-bar {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 14px 80px;
  border-bottom: 1px solid rgba(255,255,255,0.15);
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.5);
}
.hero-meta-bar span:nth-child(2) { text-align: center; }
.hero-meta-bar span:nth-child(3) { text-align: right; }

.hero-body {
  flex: 1;
  display: grid;
  grid-template-columns: 8fr 4fr;
  border-bottom: 1px solid rgba(255,255,255,0.15);
}

.hero-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 80px 80px 80px 80px;
  border-right: 1px solid rgba(255,255,255,0.15);
}

.hero-eyebrow {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--petroleum);
  margin-bottom: 32px;
}

.hero-headline {
  font-family: var(--font-serif);
  font-size: clamp(72px, 9vw, 128px);
  font-weight: 700;
  line-height: 0.88;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  margin-bottom: 40px;
}
.hero-headline em {
  font-style: italic;
  font-weight: 400;
  opacity: 0.85;
}

.hero-desc {
  font-size: clamp(15px, 1.4vw, 18px);
  line-height: 1.7;
  color: rgba(255,255,255,0.65);
  max-width: 520px;
  margin-bottom: 40px;
}

.hero-image-col {
  position: relative;
  overflow: hidden;
}
.hero-image-col img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(100%) contrast(1.1) brightness(0.9);
}
.hero-image-fig {
  position: absolute;
  top: 16px;
  left: 16px;
  right: 16px;
  display: flex;
  justify-content: space-between;
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: 0.15em;
  color: rgba(255,255,255,0.4);
  z-index: 2;
  mix-blend-mode: difference;
}

.hero-ticker {
  padding: 12px 80px;
  border-top: 1px solid rgba(255,255,255,0.15);
  display: flex;
  align-items: center;
  gap: 0;
  overflow: hidden;
}
.hero-ticker-inner {
  display: flex;
  gap: 40px;
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.5);
  white-space: nowrap;
}
.hero-ticker-inner span { color: var(--petroleum); }
```

- [ ] **Step 2: index.html의 `#hero` 내용 교체**

```html
<!-- ① HERO -->
<section id="hero" class="section section-dark">
  <div class="hero-meta-bar">
    <span>Report on Integrated Energy Operations</span>
    <span>Refining — Petrochemicals — Lubricants — New Energy</span>
    <span>Published: 2025</span>
  </div>

  <div class="hero-body">
    <div class="hero-content">
      <p class="hero-eyebrow reveal">Architects of Industrial Momentum</p>
      <h1 class="hero-headline">
        <span class="reveal" style="display:block">Energy</span>
        <span class="reveal" style="display:block;transition-delay:0.1s"><em>Beyond</em></span>
        <span class="reveal" style="display:block;transition-delay:0.2s">Limits.</span>
      </h1>
      <p class="hero-desc reveal" style="transition-delay:0.3s">
        1967년 창립 이래, GS칼텍스는 대한민국 에너지 산업의 심장이었습니다.
        오늘날 우리는 정유·석유화학을 넘어 수소·EV·친환경의 미래로
        대전환을 이끌고 있습니다.
      </p>
      <a href="#heritage" class="btn-editorial reveal" style="transition-delay:0.4s">
        Chapter I 보기 <span>→</span>
      </a>
    </div>

    <div class="hero-image-col">
      <img src="assets/images/ch1-hero.jpg" alt="GS칼텍스 여수공장">
      <div class="hero-image-fig">
        <span>[FIG 1.0]</span>
        <span>YEOSU_COMPLEX</span>
      </div>
    </div>
  </div>

  <div class="hero-ticker">
    <div class="hero-ticker-inner">
      <span>STATUS: OPERATIONAL</span>
      <span aria-hidden="true">&nbsp;/&nbsp;</span>
      <span>원유 처리</span>&nbsp;800,000 BPD
      <span aria-hidden="true">&nbsp;/&nbsp;</span>
      <span>정제능력</span>&nbsp;세계 4위
      <span aria-hidden="true">&nbsp;/&nbsp;</span>
      <span>NCSI</span>&nbsp;17년 연속 1위
      <span aria-hidden="true">&nbsp;/&nbsp;</span>
      <span>주유소 네트워크</span>&nbsp;2,400+
    </div>
  </div>
</section>
```

- [ ] **Step 3: 브라우저 확인**

브라우저에서 `디지털브로슈어-editorial/index.html`을 새로고침. Hero 섹션이 전체 화면으로 표시되고, 헤드라인 텍스트가 렌더링되며, 우측 이미지 영역이 보이면 성공.

- [ ] **Step 4: 커밋**

```bash
git add 디지털브로슈어-editorial/
git commit -m "feat: Hero 섹션 구현"
```

---

## Task 3: KEY NUMBERS 섹션

**Files:**
- Modify: `디지털브로슈어-editorial/index.html` — `#numbers` 내용 교체
- Modify: `디지털브로슈어-editorial/css/editorial.css` — numbers 스타일 추가

- [ ] **Step 1: editorial.css에 Key Numbers 스타일 추가**

```css
/* ─── ② KEY NUMBERS ──────────────────────────────────── */
#numbers {
  padding: 120px 80px;
}

.numbers-label {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.6);
  margin-bottom: 80px;
  display: flex;
  align-items: center;
  gap: 20px;
}
.numbers-label::after {
  content: '';
  flex: 1;
  height: 1px;
  background: rgba(255,255,255,0.2);
}

.numbers-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  border-top: 1px solid rgba(255,255,255,0.2);
}

.number-item {
  padding: 60px 40px 60px 0;
  border-right: 1px solid rgba(255,255,255,0.2);
}
.number-item:last-child { border-right: none; }

.number-value {
  font-family: var(--font-mono);
  font-size: clamp(56px, 6vw, 88px);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.03em;
  color: #fff;
  display: flex;
  align-items: baseline;
  gap: 4px;
}
.number-unit {
  font-size: 0.35em;
  color: rgba(255,255,255,0.6);
  letter-spacing: 0.1em;
}
.number-desc {
  font-family: var(--font-sans);
  font-size: 13px;
  color: rgba(255,255,255,0.6);
  margin-top: 16px;
  line-height: 1.5;
}
.number-source {
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: 0.1em;
  color: rgba(255,255,255,0.35);
  margin-top: 8px;
}
```

- [ ] **Step 2: index.html의 `#numbers` 내용 교체**

```html
<!-- ② KEY NUMBERS -->
<section id="numbers" class="section section-teal">
  <div class="numbers-label reveal">Key Performance Indicators</div>
  <div class="numbers-grid">
    <div class="number-item reveal">
      <div class="number-value">
        <span data-count-to="800000" data-count-duration="2000">0</span>
        <span class="number-unit">BPD</span>
      </div>
      <p class="number-desc">원유 정제 처리량</p>
      <p class="number-source">배럴/일 · Yeosu Complex</p>
    </div>
    <div class="number-item reveal" style="transition-delay:0.1s">
      <div class="number-value">
        <span data-count-to="4" data-count-duration="1200">0</span>
        <span class="number-unit">위</span>
      </div>
      <p class="number-desc">단일 정유공장 세계 순위</p>
      <p class="number-source">2023년 기준</p>
    </div>
    <div class="number-item reveal" style="transition-delay:0.2s">
      <div class="number-value">
        <span data-count-to="1967" data-count-duration="2200">0</span>
      </div>
      <p class="number-desc">GS칼텍스 창립 연도</p>
      <p class="number-source">호남정유로 출발</p>
    </div>
    <div class="number-item reveal" style="transition-delay:0.3s">
      <div class="number-value">
        <span data-count-to="17" data-count-duration="1500">0</span>
        <span class="number-unit">년</span>
      </div>
      <p class="number-desc">NCSI 주유소 부문 연속 1위</p>
      <p class="number-source">국가고객만족도 · 2025년 기준</p>
    </div>
  </div>
</section>
```

- [ ] **Step 3: 브라우저 확인**

스크롤 시 teal 배경의 KEY NUMBERS 섹션이 나타나고, 숫자가 "0"으로 표시되면 성공 (카운팅은 Task 11 GSAP 연동 후 동작).

- [ ] **Step 4: 커밋**

```bash
git add 디지털브로슈어-editorial/
git commit -m "feat: Key Numbers 섹션 구현"
```

---

## Task 4: HERITAGE PLUS 섹션

**Files:**
- Modify: `디지털브로슈어-editorial/index.html` — `#heritage` 내용 교체
- Modify: `디지털브로슈어-editorial/css/editorial.css` — heritage 스타일 추가

- [ ] **Step 1: editorial.css에 Heritage 스타일 추가**

```css
/* ─── ③ HERITAGE PLUS ────────────────────────────────── */

/* 타임라인 레저 테이블 */
.timeline-section {
  background: var(--paper);
  color: var(--ink);
}

.timeline-header {
  display: grid;
  grid-template-columns: 120px 1fr 2fr;
  padding: 12px 80px;
  border-bottom: 1px solid rgba(0,0,0,0.12);
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(0,0,0,0.35);
}

.timeline-row {
  display: grid;
  grid-template-columns: 120px 1fr 2fr;
  border-bottom: 1px solid rgba(0,0,0,0.08);
  min-height: 100px;
  transition: background 0.2s;
}
.timeline-row:hover { background: rgba(0,107,107,0.04); }

.timeline-year {
  padding: 28px 20px 28px 80px;
  font-family: var(--font-mono);
  font-size: 28px;
  font-weight: 700;
  color: var(--petroleum);
  border-right: 1px solid rgba(0,0,0,0.08);
  display: flex;
  align-items: center;
}

.timeline-event {
  padding: 28px 20px;
  border-right: 1px solid rgba(0,0,0,0.08);
  display: flex;
  align-items: center;
  font-family: var(--font-serif);
  font-size: 20px;
  font-weight: 700;
}

.timeline-desc {
  padding: 28px 80px 28px 20px;
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 1.6;
  color: rgba(0,0,0,0.6);
}

/* 팩토리 인포그래픽 */
.factory-section {
  background: var(--ink);
  color: var(--paper);
  padding: 120px 80px;
}

.factory-label {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--petroleum);
  margin-bottom: 16px;
  display: block;
}

.factory-title {
  font-family: var(--font-serif);
  font-size: clamp(32px, 4vw, 56px);
  font-weight: 700;
  margin-bottom: 80px;
  opacity: 0.9;
}

.factory-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  border-top: 1px solid rgba(255,255,255,0.15);
}

.factory-stat {
  padding: 48px 32px 48px 0;
  border-right: 1px solid rgba(255,255,255,0.15);
}
.factory-stat:last-child { border-right: none; padding-right: 0; }

.factory-stat-value {
  font-family: var(--font-mono);
  font-size: clamp(40px, 5vw, 72px);
  font-weight: 700;
  line-height: 1;
  color: #fff;
}
.factory-stat-value .fs-unit {
  font-size: 0.4em;
  color: var(--petroleum);
  margin-left: 4px;
}
.factory-stat-label {
  font-size: 13px;
  color: rgba(255,255,255,0.55);
  margin-top: 12px;
  line-height: 1.5;
}
```

- [ ] **Step 2: index.html의 `#heritage` 내용 교체**

```html
<!-- ③ HERITAGE PLUS -->
<section id="heritage" class="section">

  <!-- 3a: 챕터 헤더 (dark) -->
  <div class="chapter-header section-dark reveal">
    <div>
      <span class="chapter-num">Chapter I</span>
      <h2>Heritage<br><em>Plus</em></h2>
    </div>
    <p class="chapter-desc">
      1967년 창립 이래 반세기가 넘는 시간 동안, GS칼텍스는 대한민국 에너지 역사의
      새로운 유산을 만들어왔습니다. 도전과 혁신의 궤적을 돌아봅니다.
    </p>
  </div>

  <!-- 3b: 성장 타임라인 (light) -->
  <div class="timeline-section">
    <div class="timeline-header">
      <span>연도</span>
      <span>마일스톤</span>
      <span>상세</span>
    </div>
    <!-- 각 행: .reveal + transition-delay -->
    <div class="timeline-row reveal">
      <div class="timeline-year">1967</div>
      <div class="timeline-event">GS칼텍스 창립</div>
      <div class="timeline-desc">호남정유로 출발, 대한민국 정유산업의 시작</div>
    </div>
    <div class="timeline-row reveal" style="transition-delay:0.05s">
      <div class="timeline-year">1969</div>
      <div class="timeline-event">여수공장 가동</div>
      <div class="timeline-desc">전남 여수에 국내 최초 대규모 정유설비 준공</div>
    </div>
    <div class="timeline-row reveal" style="transition-delay:0.1s">
      <div class="timeline-year">1987</div>
      <div class="timeline-event">중질유 분해시설 준공</div>
      <div class="timeline-desc">국내 최대 중질유 분해·처리 시설 가동</div>
    </div>
    <div class="timeline-row reveal" style="transition-delay:0.15s">
      <div class="timeline-year">1995</div>
      <div class="timeline-event">인천 윤활유공장 가동</div>
      <div class="timeline-desc">HCR 공법 기반 고품질 베이스오일 생산 시작</div>
    </div>
    <div class="timeline-row reveal" style="transition-delay:0.2s">
      <div class="timeline-year">2001</div>
      <div class="timeline-event">GS칼텍스로 사명 변경</div>
      <div class="timeline-desc">GS그룹 출범과 함께 새 브랜드 아이덴티티 확립</div>
    </div>
    <div class="timeline-row reveal" style="transition-delay:0.25s">
      <div class="timeline-year">2010</div>
      <div class="timeline-event">MFC 준공</div>
      <div class="timeline-desc">연간 90만 톤 에틸렌 생산 가능 혼합분해시설 완공</div>
    </div>
    <div class="timeline-row reveal" style="transition-delay:0.3s">
      <div class="timeline-year">2019</div>
      <div class="timeline-event">Deep Transformation 선언</div>
      <div class="timeline-desc">BX·DX·GX 3대 혁신 축 기반 경영 전략 발표</div>
    </div>
    <div class="timeline-row reveal" style="transition-delay:0.35s">
      <div class="timeline-year">2021</div>
      <div class="timeline-event">ISCC PLUS 인증 획득</div>
      <div class="timeline-desc">바이오 기반 원료 지속가능성 국제 인증 취득</div>
    </div>
    <div class="timeline-row reveal" style="transition-delay:0.4s">
      <div class="timeline-year">2023</div>
      <div class="timeline-event">정제능력 세계 4위</div>
      <div class="timeline-desc">단일 공장 기준 세계 4위 정제시설 지위 확인</div>
    </div>
    <div class="timeline-row reveal" style="transition-delay:0.45s">
      <div class="timeline-year">2025</div>
      <div class="timeline-event">NCSI 17년 연속 1위</div>
      <div class="timeline-desc">국가고객만족도 주유소 부문 최장 기간 1위 달성</div>
    </div>
  </div>

  <!-- 3c: 여수 팩토리 인포그래픽 (dark) -->
  <div class="factory-section">
    <span class="factory-label reveal">Yeosu Complex</span>
    <h3 class="factory-title reveal">여수공장 핵심 수치</h3>
    <div class="factory-grid">
      <div class="factory-stat reveal">
        <div class="factory-stat-value">
          <span data-count-to="800000" data-count-duration="2000">0</span>
          <span class="fs-unit">배럴/일</span>
        </div>
        <p class="factory-stat-label">원유 정제 처리량</p>
      </div>
      <div class="factory-stat reveal" style="transition-delay:0.1s">
        <div class="factory-stat-value">
          <span data-count-to="275000" data-count-duration="2000">0</span>
          <span class="fs-unit">배럴/일</span>
        </div>
        <p class="factory-stat-label">중질유 분해 처리량</p>
      </div>
      <div class="factory-stat reveal" style="transition-delay:0.2s">
        <div class="factory-stat-value">
          <span data-count-to="325" data-count-duration="1500">0</span>
          <span class="fs-unit">기</span>
        </div>
        <p class="factory-stat-label">제품 저장 탱크</p>
      </div>
      <div class="factory-stat reveal" style="transition-delay:0.3s">
        <div class="factory-stat-value">
          <span data-count-to="100000" data-count-duration="1800">0</span>
          <span class="fs-unit">kW</span>
        </div>
        <p class="factory-stat-label">자체 발전 능력</p>
      </div>
    </div>
  </div>

</section>
```

- [ ] **Step 3: 브라우저 확인**

Heritage 섹션 스크롤 시 챕터 헤더(dark) → 타임라인(light) → 팩토리(dark) 순서로 나타나면 성공.

- [ ] **Step 4: 커밋**

```bash
git add 디지털브로슈어-editorial/
git commit -m "feat: Heritage Plus 섹션 구현 (타임라인 + 팩토리 인포그래픽)"
```

---

## Task 5: VALUE PLUS 섹션

**Files:**
- Modify: `디지털브로슈어-editorial/index.html` — `#value` 내용 교체
- Modify: `디지털브로슈어-editorial/css/editorial.css` — value 스타일 추가

- [ ] **Step 1: editorial.css에 Value Plus 스타일 추가**

```css
/* ─── ④ VALUE PLUS ───────────────────────────────────── */
.value-body {
  padding: 80px 80px 120px;
}

.value-map-section {
  margin-bottom: 80px;
}

.value-map-label {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 32px;
}
.value-map-headline {
  font-family: var(--font-serif);
  font-size: clamp(36px, 5vw, 64px);
  font-weight: 700;
}
.value-map-subline {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.15em;
  color: var(--petroleum);
}

.world-map-container {
  position: relative;
  width: 100%;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.1);
  overflow: hidden;
}

.world-map-container svg {
  width: 100%;
  height: auto;
  display: block;
}

.map-city-label {
  font-family: var(--font-mono);
  font-size: 8px;
  fill: rgba(255,255,255,0.5);
  pointer-events: none;
}

/* 사업 영역 탭 */
.biz-tabs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-top: 1px solid rgba(255,255,255,0.15);
  margin-top: 80px;
}

.biz-tab {
  padding: 40px;
  border-right: 1px solid rgba(255,255,255,0.15);
  border-bottom: 1px solid rgba(255,255,255,0.15);
}
.biz-tab:last-child { border-right: none; }

.biz-tab-abbr {
  font-family: var(--font-mono);
  font-size: 32px;
  font-weight: 700;
  color: var(--petroleum);
  margin-bottom: 12px;
  display: block;
}
.biz-tab-title {
  font-family: var(--font-serif);
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 8px;
}
.biz-tab-ko {
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: 0.1em;
  color: rgba(255,255,255,0.4);
  display: block;
  margin-bottom: 16px;
}
.biz-tab-desc {
  font-size: 13px;
  line-height: 1.7;
  color: rgba(255,255,255,0.6);
  margin-bottom: 24px;
}

.biz-stat-row {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.biz-stat {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  border-top: 1px solid rgba(255,255,255,0.08);
  padding-top: 8px;
}
.biz-stat-label { font-size: 11px; color: rgba(255,255,255,0.45); }
.biz-stat-value {
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 700;
  color: #fff;
}
```

- [ ] **Step 2: index.html의 `#value` 내용 교체**

```html
<!-- ④ VALUE PLUS -->
<section id="value" class="section section-dark">
  <div class="chapter-header reveal">
    <div>
      <span class="chapter-num">Chapter II</span>
      <h2>Value<br><em>Plus</em></h2>
    </div>
    <p class="chapter-desc">
      50개국에 수출하는 글로벌 에너지 기업. 정유·석유화학·윤활유를 넘어
      새로운 가치를 창출하며 글로벌 Value No.1을 향해 나아갑니다.
    </p>
  </div>

  <div class="value-body">
    <!-- 세계 거점 맵 -->
    <div class="value-map-section reveal">
      <div class="value-map-label">
        <span class="value-map-headline">50개국 수출</span>
        <span class="value-map-subline">10개국 13개 거점</span>
      </div>
      <div class="world-map-container">
        <!-- viewBox="0 0 1000 400" — 거점 좌표는 chapter2.json 기준 -->
        <svg viewBox="0 0 1000 400" xmlns="http://www.w3.org/2000/svg">
          <!-- 간략화된 대륙 윤곽 (배경) -->
          <rect width="1000" height="400" fill="none"/>
          <!-- 아시아/유럽 축약 배경 라인 -->
          <path d="M420,80 Q480,70 540,75 Q600,70 660,85 Q720,90 780,100 Q840,95 900,110 Q920,130 880,160 Q840,180 800,200 Q760,230 720,250 Q680,270 640,260 Q600,240 560,220 Q520,200 480,190 Q440,185 420,180 Z" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
          <!-- 아프리카 -->
          <path d="M480,160 Q500,150 520,165 Q540,200 530,250 Q510,280 490,270 Q470,240 460,200 Q455,175 480,160 Z" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
          <!-- 아메리카 (간략) -->
          <path d="M100,80 Q150,70 200,90 Q220,120 210,160 Q200,200 180,220 Q160,200 150,180 Q130,150 110,120 Q90,100 100,80 Z" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
          <!-- 오세아니아 -->
          <path d="M820,240 Q860,235 880,255 Q870,280 845,285 Q820,275 820,240 Z" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>

          <!-- 거점 도시 점 (chapter2.json locations) -->
          <!-- London 500,107 -->
          <circle cx="500" cy="107" r="5" fill="#006B6B" opacity="0.9"/>
          <text x="508" y="104" class="map-city-label">London</text>
          <!-- Prague 540,111 -->
          <circle cx="540" cy="111" r="4" fill="#006B6B" opacity="0.7"/>
          <text x="548" y="108" class="map-city-label">Prague</text>
          <!-- Rome 535,133 -->
          <circle cx="535" cy="133" r="4" fill="#006B6B" opacity="0.7"/>
          <text x="543" y="130" class="map-city-label">Rome</text>
          <!-- Moscow 604,95 -->
          <circle cx="604" cy="95" r="4" fill="#006B6B" opacity="0.7"/>
          <text x="612" y="92" class="map-city-label">Moscow</text>
          <!-- Dubai 654,180 -->
          <circle cx="654" cy="180" r="5" fill="#006B6B" opacity="0.9"/>
          <text x="662" y="177" class="map-city-label">Dubai</text>
          <!-- Mumbai 702,197 -->
          <circle cx="702" cy="197" r="4" fill="#006B6B" opacity="0.7"/>
          <text x="710" y="194" class="map-city-label">Mumbai</text>
          <!-- Shanghai 838,163 -->
          <circle cx="838" cy="163" r="5" fill="#006B6B" opacity="0.9"/>
          <text x="846" y="160" class="map-city-label">Shanghai</text>
          <!-- Tokyo 888,151 -->
          <circle cx="888" cy="151" r="5" fill="#006B6B" opacity="0.9"/>
          <text x="896" y="148" class="map-city-label">Tokyo</text>
          <!-- Ho Chi Minh 796,220 -->
          <circle cx="796" cy="220" r="4" fill="#006B6B" opacity="0.7"/>
          <text x="804" y="217" class="map-city-label">Ho Chi Minh</text>
          <!-- Singapore 788,247 -->
          <circle cx="788" cy="247" r="5" fill="#006B6B" opacity="0.9"/>
          <text x="796" y="244" class="map-city-label">Singapore</text>
        </svg>
      </div>
    </div>

    <!-- 사업 영역 탭 (3개) -->
    <div class="biz-tabs">
      <div class="biz-tab reveal">
        <span class="biz-tab-abbr">P</span>
        <div class="biz-tab-title">Petroleum</div>
        <span class="biz-tab-ko">정유</span>
        <p class="biz-tab-desc">하루 80만 배럴을 정제할 수 있는 원유정제시설, 등·경유 탈황시설과 국내 최대 중질유 분해시설 등 최첨단 자동화 생산설비에서 고품질의 석유제품을 생산하고 있습니다.</p>
        <div class="biz-stat-row">
          <div class="biz-stat">
            <span class="biz-stat-label">원유 정제 처리량</span>
            <span class="biz-stat-value">800,000 bbl/day</span>
          </div>
          <div class="biz-stat">
            <span class="biz-stat-label">중질유 분해 처리량</span>
            <span class="biz-stat-value">275,000 bbl/day</span>
          </div>
        </div>
      </div>
      <div class="biz-tab reveal" style="transition-delay:0.1s">
        <span class="biz-tab-abbr">C</span>
        <div class="biz-tab-title">Petrochemicals</div>
        <span class="biz-tab-ko">석유화학</span>
        <p class="biz-tab-desc">연간 90만 톤의 고품질 에틸렌을 생산할 수 있는 MFC와 세계적 규모의 방향족 생산능력을 갖추고 있으며, 폴리에틸렌과 폴리프로필렌, 복합수지를 생산합니다.</p>
        <div class="biz-stat-row">
          <div class="biz-stat">
            <span class="biz-stat-label">방향족</span>
            <span class="biz-stat-value">2,800,000 ton/year</span>
          </div>
          <div class="biz-stat">
            <span class="biz-stat-label">올레핀</span>
            <span class="biz-stat-value">2,170,000 ton/year</span>
          </div>
        </div>
      </div>
      <div class="biz-tab reveal" style="transition-delay:0.2s">
        <span class="biz-tab-abbr">L</span>
        <div class="biz-tab-title">Lubricants</div>
        <span class="biz-tab-ko">윤활유</span>
        <p class="biz-tab-desc">최첨단 수첨분해공법(HCR)으로 고품질 베이스오일을 생산해 국내외 자동차용·산업용 윤활유 제조사에 공급하고 있으며, Kixx 브랜드로 소비자와 만납니다.</p>
        <div class="biz-stat-row">
          <div class="biz-stat">
            <span class="biz-stat-label">베이스오일</span>
            <span class="biz-stat-value">27,000 bbl/day</span>
          </div>
          <div class="biz-stat">
            <span class="biz-stat-label">윤활유</span>
            <span class="biz-stat-value">9,000 bbl/day</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 3: 브라우저 확인**

Value Plus 섹션에 세계 지도 SVG와 3개 사업 탭이 보이면 성공.

- [ ] **Step 4: 커밋**

```bash
git add 디지털브로슈어-editorial/
git commit -m "feat: Value Plus 섹션 구현 (세계 거점 맵 + 사업 영역)"
```

---

## Task 6: ENERGY PLUS 섹션

**Files:**
- Modify: `디지털브로슈어-editorial/index.html` — `#energy` 내용 교체
- Modify: `디지털브로슈어-editorial/css/editorial.css` — energy 스타일 추가

- [ ] **Step 1: editorial.css에 Energy Plus 스타일 추가**

```css
/* ─── ⑤ ENERGY PLUS ──────────────────────────────────── */
.energy-body {
  padding: 80px;
}

/* DX/BX/GX 카드 */
.transformation-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  border-top: 1px solid rgba(0,0,0,0.1);
  margin-bottom: 80px;
}

.transformation-card {
  padding: 48px 40px;
  border-right: 1px solid rgba(0,0,0,0.1);
}
.transformation-card:last-child { border-right: none; }

.tx-abbr {
  font-family: var(--font-mono);
  font-size: 36px;
  font-weight: 700;
  color: var(--petroleum);
  display: block;
  margin-bottom: 16px;
}
.tx-title {
  font-family: var(--font-serif);
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 6px;
}
.tx-ko {
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: 0.1em;
  color: rgba(0,0,0,0.4);
  display: block;
  margin-bottom: 16px;
}
.tx-desc {
  font-size: 13px;
  line-height: 1.7;
  color: rgba(0,0,0,0.6);
}

/* 그린 스탯 진행 바 */
.green-stats-section {
  border-top: 1px solid rgba(0,0,0,0.1);
  padding-top: 60px;
}

.green-stats-title {
  font-family: var(--font-serif);
  font-size: clamp(24px, 3vw, 40px);
  font-weight: 700;
  margin-bottom: 48px;
}

.green-stat-row {
  display: grid;
  grid-template-columns: 200px 1fr 120px;
  align-items: center;
  gap: 32px;
  padding: 24px 0;
  border-bottom: 1px solid rgba(0,0,0,0.08);
}

.green-stat-label {
  font-size: 14px;
  color: rgba(0,0,0,0.7);
}
.green-stat-bar-wrap {
  height: 4px;
  background: rgba(0,0,0,0.08);
  border-radius: 2px;
  overflow: hidden;
}
.green-stat-bar {
  height: 100%;
  background: var(--petroleum);
  border-radius: 2px;
  width: 0;
  transition: width 1.5s var(--ease-spring);
}
.green-stat-bar.animated { width: var(--bar-width); }
.green-stat-value {
  font-family: var(--font-mono);
  font-size: 20px;
  font-weight: 700;
  color: var(--petroleum);
  text-align: right;
}

.iscc-badge {
  display: inline-block;
  padding: 8px 16px;
  border: 1px solid var(--petroleum);
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.15em;
  color: var(--petroleum);
  margin-top: 32px;
}
```

- [ ] **Step 2: index.html의 `#energy` 내용 교체**

```html
<!-- ⑤ ENERGY PLUS -->
<section id="energy" class="section section-light">
  <div class="chapter-header reveal" style="border-color:rgba(0,0,0,0.1)">
    <div>
      <span class="chapter-num">Chapter III</span>
      <h2 style="color:var(--ink)">Energy<br><em>Plus</em></h2>
    </div>
    <p class="chapter-desc" style="color:rgba(0,0,0,0.6)">
      BX·DX·GX, 세 가지 혁신 축으로 에너지 전환을 주도합니다.
      탄소를 줄이고, 디지털을 더하고, 새로운 그린 가치를 창출합니다.
    </p>
  </div>

  <div class="energy-body">
    <!-- Deep Transformation 3축 -->
    <p class="label-mono reveal" style="color:rgba(0,0,0,0.4);margin-bottom:32px">Deep Transformation</p>
    <div class="transformation-grid">
      <div class="transformation-card reveal">
        <span class="tx-abbr">BX</span>
        <div class="tx-title">Business Transformation</div>
        <span class="tx-ko">밸류체인 패러다임의 전환</span>
        <p class="tx-desc">객관적 시각과 전문적 역량을 활용해 밸류체인 전반의 체질 개선과 수익성을 강화하며, 일하는 방식의 근본적인 변화를 통해 지속가능한 혁신을 만들어갑니다.</p>
      </div>
      <div class="transformation-card reveal" style="transition-delay:0.1s">
        <span class="tx-abbr">DX</span>
        <div class="tx-title">Digital Transformation</div>
        <span class="tx-ko">디지털 기술을 통한 경쟁력 강화</span>
        <p class="tx-desc">디지털 기술을 바탕으로 생산성과 효율성을 높여 비즈니스 역량을 강화하고, 구성원의 디지털 역량을 확보해 경쟁력을 높여갑니다.</p>
      </div>
      <div class="transformation-card reveal" style="transition-delay:0.2s">
        <span class="tx-abbr">GX</span>
        <div class="tx-title">Green Transformation</div>
        <span class="tx-ko">지속가능한 녹색성장으로의 전환</span>
        <p class="tx-desc">기존 사업 탄소감축과 함께 화이트 바이오, 수소/CCUS, 폐플라스틱 재활용(MR/CR)을 통해 저탄소 신사업을 확장합니다.</p>
      </div>
    </div>

    <!-- 그린 스탯 -->
    <div class="green-stats-section">
      <h3 class="green-stats-title reveal">탄소를 줄이고, 지속가능성을 높이다</h3>
      <div class="green-stat-row reveal">
        <span class="green-stat-label">폐기물 재활용률</span>
        <div class="green-stat-bar-wrap">
          <div class="green-stat-bar" style="--bar-width:80.1%"></div>
        </div>
        <span class="green-stat-value">80.1%</span>
      </div>
      <div class="green-stat-row reveal" style="transition-delay:0.1s">
        <span class="green-stat-label">CO₂ 배출 감축</span>
        <div class="green-stat-bar-wrap">
          <div class="green-stat-bar" style="--bar-width:19%"></div>
        </div>
        <span class="green-stat-value">19%↓</span>
      </div>
      <div class="green-stat-row reveal" style="transition-delay:0.2s">
        <span class="green-stat-label">미세먼지 감축</span>
        <div class="green-stat-bar-wrap">
          <div class="green-stat-bar" style="--bar-width:30%"></div>
        </div>
        <span class="green-stat-value">30%↓</span>
      </div>
      <div class="reveal" style="transition-delay:0.3s">
        <span class="iscc-badge">ISCC PLUS 인증 획득</span>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 3: 브라우저 확인**

Energy Plus 섹션이 라이트 배경으로 표시되고, BX/DX/GX 카드와 진행 바가 보이면 성공.

- [ ] **Step 4: 커밋**

```bash
git add 디지털브로슈어-editorial/
git commit -m "feat: Energy Plus 섹션 구현 (BX/DX/GX + 그린 스탯)"
```

---

## Task 7: SOCIAL PLUS 섹션

**Files:**
- Modify: `디지털브로슈어-editorial/index.html` — `#social` 내용 교체
- Modify: `디지털브로슈어-editorial/css/editorial.css` — social 스타일 추가

- [ ] **Step 1: editorial.css에 Social Plus 스타일 추가**

```css
/* ─── ⑥ SOCIAL PLUS ─────────────────────────────────── */
.social-body {
  padding: 80px;
}

.social-cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  border-top: 1px solid rgba(255,255,255,0.1);
}

.social-card {
  padding: 48px 40px;
  border-right: 1px solid rgba(255,255,255,0.1);
  border-bottom: 1px solid rgba(255,255,255,0.1);
}
.social-card:nth-child(3n) { border-right: none; }

.social-card-image {
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
  filter: grayscale(100%) contrast(1.05);
  margin-bottom: 24px;
  transition: filter 0.5s ease;
}
.social-card:hover .social-card-image { filter: none; }

.social-card-title {
  font-family: var(--font-serif);
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 12px;
}

.social-card-summary {
  font-size: 13px;
  line-height: 1.7;
  color: rgba(255,255,255,0.55);
  margin-bottom: 24px;
}

.social-card-stats {
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-top: 1px solid rgba(255,255,255,0.08);
  padding-top: 16px;
}

.social-card-stat {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.social-card-stat-label {
  font-size: 11px;
  color: rgba(255,255,255,0.35);
  flex: 1;
}
.social-card-stat-value {
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 700;
  color: var(--petroleum);
  margin-left: 12px;
}
```

- [ ] **Step 2: index.html의 `#social` 내용 교체**

```html
<!-- ⑥ SOCIAL PLUS -->
<section id="social" class="section section-dark">
  <div class="chapter-header reveal">
    <div>
      <span class="chapter-num">Chapter IV</span>
      <h2>Social<br><em>Plus</em></h2>
    </div>
    <p class="chapter-desc">
      지역사회와 함께 성장하며, 문화·스포츠·환경으로 더 나은 세상을 만듭니다.
      GS칼텍스의 사회공헌은 단순한 지원을 넘어 지속가능한 변화입니다.
    </p>
  </div>

  <div class="social-body">
    <p class="label-mono reveal" style="color:rgba(255,255,255,0.35);margin-bottom:40px">사회공헌활동</p>
    <div class="social-cards-grid">
      <div class="social-card reveal">
        <img src="assets/images/yewulmaru.jpg" alt="예울마루" class="social-card-image">
        <h3 class="social-card-title">GS칼텍스 예울마루</h3>
        <p class="social-card-summary">100만 명이 찾은 문화예술의 성지 '예울마루'와 예술 창작 터전이자 힐링공간 '장도'</p>
        <div class="social-card-stats">
          <div class="social-card-stat">
            <span class="social-card-stat-label">예울마루 누적 이용객 (2023)</span>
            <span class="social-card-stat-value">129만명</span>
          </div>
          <div class="social-card-stat">
            <span class="social-card-stat-label">예술의 섬 장도 방문객 (2023)</span>
            <span class="social-card-stat-value">156만명</span>
          </div>
        </div>
      </div>
      <div class="social-card reveal" style="transition-delay:0.1s">
        <img src="assets/images/maumtoktok.jpg" alt="마음톡톡" class="social-card-image">
        <h3 class="social-card-title">마음톡톡</h3>
        <p class="social-card-summary">정서적 어려움을 겪고 있는 아동·청소년을 위한 집단 예술 치유 프로그램</p>
        <div class="social-card-stats">
          <div class="social-card-stat">
            <span class="social-card-stat-label">수혜 아동 수 (2013~2023)</span>
            <span class="social-card-stat-value">28,530명</span>
          </div>
          <div class="social-card-stat">
            <span class="social-card-stat-label">2023년 수혜 아동</span>
            <span class="social-card-stat-value">2,814명</span>
          </div>
        </div>
      </div>
      <div class="social-card reveal" style="transition-delay:0.2s">
        <img src="assets/images/jigutoktok.jpg" alt="지구톡톡" class="social-card-image">
        <h3 class="social-card-title">지구톡톡</h3>
        <p class="social-card-summary">일상 속 작은 행동변화를 제안하고, 환경문제 해결을 위한 친환경 사회공헌 캠페인</p>
        <div class="social-card-stats">
          <div class="social-card-stat">
            <span class="social-card-stat-label">실리콘 빨대 SNS 참여자</span>
            <span class="social-card-stat-value">4,033명</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 3: 브라우저 확인**

Social Plus 섹션에 3개 카드가 그리드로 표시되면 성공.

- [ ] **Step 4: 커밋**

```bash
git add 디지털브로슈어-editorial/
git commit -m "feat: Social Plus 섹션 구현"
```

---

## Task 8: OUTRO 섹션

**Files:**
- Modify: `디지털브로슈어-editorial/index.html` — `#outro` 내용 교체
- Modify: `디지털브로슈어-editorial/css/editorial.css` — outro 스타일 추가

- [ ] **Step 1: editorial.css에 Outro 스타일 추가**

```css
/* ─── ⑦ OUTRO ───────────────────────────────────────── */
#outro {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #0A0A0A;
  padding: 120px 80px 60px;
}

.outro-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 1;
  justify-content: center;
  gap: 40px;
}

.outro-rule {
  width: 1px;
  height: 80px;
  background: var(--petroleum);
  margin: 0 auto;
}

.outro-eyebrow {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--petroleum);
}

.outro-headline {
  font-family: var(--font-serif);
  font-size: clamp(40px, 6vw, 80px);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.02em;
  max-width: 800px;
}
.outro-headline em {
  font-style: italic;
  font-weight: 400;
}

.outro-desc {
  font-size: clamp(14px, 1.5vw, 17px);
  line-height: 1.8;
  color: rgba(255,255,255,0.5);
  max-width: 560px;
}

.outro-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(255,255,255,0.08);
  padding-top: 32px;
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  color: rgba(255,255,255,0.25);
}
```

- [ ] **Step 2: index.html의 `#outro` 내용 교체**

```html
<!-- ⑦ OUTRO -->
<section id="outro" class="section">
  <div class="outro-body">
    <div class="outro-rule reveal"></div>
    <span class="outro-eyebrow reveal" style="transition-delay:0.1s">GS Caltex Corporation</span>
    <h2 class="outro-headline reveal" style="transition-delay:0.2s">
      에너지의 미래,<br><em>함께 만들어갑니다.</em>
    </h2>
    <p class="outro-desc reveal" style="transition-delay:0.3s">
      GS칼텍스는 대한민국의 에너지 역사와 함께해왔으며,
      앞으로도 더 깨끗하고 지속가능한 에너지의 미래를
      여러분과 함께 열어가겠습니다.
    </p>
    <a href="#hero" class="btn-editorial reveal" style="transition-delay:0.4s">
      처음으로 돌아가기 <span>↑</span>
    </a>
  </div>
  <div class="outro-footer">
    <span>GS칼텍스 주식회사</span>
    <span>서울특별시 강남구 논현로 508</span>
    <span>© 2025 GS Caltex Corporation</span>
  </div>
</section>
```

- [ ] **Step 3: 브라우저 확인**

Outro 섹션이 전체 화면으로 표시되고 클로징 메시지가 중앙 정렬되면 성공.

- [ ] **Step 4: 커밋**

```bash
git add 디지털브로슈어-editorial/
git commit -m "feat: Outro 섹션 구현"
```

---

## Task 9: 우측 도트 네비게이션

**Files:**
- Modify: `디지털브로슈어-editorial/index.html` — `#dot-nav` 내용 교체
- Modify: `디지털브로슈어-editorial/css/editorial.css` — dot nav 스타일 추가
- Modify: `디지털브로슈어-editorial/js/main.js` — 도트 활성화 로직 추가

- [ ] **Step 1: editorial.css에 도트 네비 스타일 추가**

```css
/* ─── DOT NAVIGATION ─────────────────────────────────── */
#dot-nav {
  position: fixed;
  right: 28px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: center;
}

.dot-nav-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 16px;
  height: 16px;
}

.dot-nav-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255,255,255,0.3);
  transition: width 0.3s, height 0.3s, background 0.3s;
}

.dot-nav-item.active .dot-nav-dot {
  width: 8px;
  height: 8px;
  background: #006B6B;
}

/* 라이트 섹션 위에서는 dark dot */
.dot-nav--light .dot-nav-dot {
  background: rgba(0,0,0,0.25);
}
.dot-nav--light .dot-nav-item.active .dot-nav-dot {
  background: #006B6B;
}

.dot-nav-tooltip {
  position: absolute;
  right: 20px;
  white-space: nowrap;
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  background: var(--petroleum);
  color: #fff;
  padding: 4px 8px;
  pointer-events: none;
  opacity: 0;
  transform: translateX(4px);
  transition: opacity 0.2s, transform 0.2s;
}

.dot-nav-item:hover .dot-nav-tooltip {
  opacity: 1;
  transform: translateX(0);
}
```

- [ ] **Step 2: index.html의 `#dot-nav` 내용 교체**

```html
<!-- 도트 네비게이션 -->
<nav id="dot-nav" aria-label="섹션 네비게이션">
  <div class="dot-nav-item active" data-target="hero">
    <div class="dot-nav-dot"></div>
    <span class="dot-nav-tooltip">Intro</span>
  </div>
  <div class="dot-nav-item" data-target="numbers">
    <div class="dot-nav-dot"></div>
    <span class="dot-nav-tooltip">Key Numbers</span>
  </div>
  <div class="dot-nav-item" data-target="heritage">
    <div class="dot-nav-dot"></div>
    <span class="dot-nav-tooltip">Heritage Plus</span>
  </div>
  <div class="dot-nav-item" data-target="value">
    <div class="dot-nav-dot"></div>
    <span class="dot-nav-tooltip">Value Plus</span>
  </div>
  <div class="dot-nav-item" data-target="energy">
    <div class="dot-nav-dot"></div>
    <span class="dot-nav-tooltip">Energy Plus</span>
  </div>
  <div class="dot-nav-item" data-target="social">
    <div class="dot-nav-dot"></div>
    <span class="dot-nav-tooltip">Social Plus</span>
  </div>
  <div class="dot-nav-item" data-target="outro">
    <div class="dot-nav-dot"></div>
    <span class="dot-nav-tooltip">Outro</span>
  </div>
</nav>
```

- [ ] **Step 3: js/main.js에 도트 네비 로직 작성**

```js
document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // ─── 도트 네비게이션 ────────────────────────────────
  const dotItems = document.querySelectorAll('.dot-nav-item');
  const dotNav   = document.getElementById('dot-nav');

  // 클릭 → 해당 섹션으로 smooth scroll
  dotItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetId = item.dataset.target;
      gsap.to(window, {
        scrollTo: { y: '#' + targetId, offsetY: 0 },
        duration: 1.2,
        ease: 'power3.inOut'
      });
    });
  });

  // 현재 섹션 감지 → 도트 활성화 + nav 색상 전환
  const sections = ['hero','numbers','heritage','value','energy','social','outro'];
  const lightSections = new Set(['energy']); // paper bg 섹션

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      // 도트 활성화
      dotItems.forEach(d => {
        d.classList.toggle('active', d.dataset.target === id);
      });
      // nav 배경 색 전환
      if (lightSections.has(id)) {
        dotNav.classList.add('dot-nav--light');
      } else {
        dotNav.classList.remove('dot-nav--light');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) sectionObserver.observe(el);
  });

  // ─── scroll-reveal (IntersectionObserver) ──────────
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ─── 그린 스탯 진행 바 트리거 ───────────────────────
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.green-stat-bar').forEach(bar => {
          bar.classList.add('animated');
        });
      }
    });
  }, { threshold: 0.3 });

  const energySection = document.getElementById('energy');
  if (energySection) barObserver.observe(energySection);
});
```

- [ ] **Step 4: 브라우저 확인**

우측에 7개 도트가 표시되고, 스크롤 시 현재 섹션 도트가 teal 색으로 강조되면 성공. Energy 섹션에서 도트가 dark color로 전환되면 성공.

- [ ] **Step 5: 커밋**

```bash
git add 디지털브로슈어-editorial/
git commit -m "feat: 우측 도트 네비게이션 + scroll-reveal 구현"
```

---

## Task 10: GSAP ScrollTrigger 애니메이션

**Files:**
- Modify: `디지털브로슈어-editorial/js/main.js` — GSAP 애니메이션 추가

- [ ] **Step 1: main.js의 `DOMContentLoaded` 콜백 안에 GSAP 애니메이션 추가**

기존 main.js의 `// TODO` 주석 아래에 다음을 추가한다. `DOMContentLoaded` 콜백의 closing `}` 전에 삽입.

```js
  // ─── GSAP: Hero 헤드라인 stagger ───────────────────
  gsap.fromTo('#hero .hero-headline span',
    { y: 60, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1.0,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top 80%',
        once: true
      }
    }
  );

  // ─── GSAP: Key Numbers 섹션 pin + 카운터 트리거 ────
  ScrollTrigger.create({
    trigger: '#numbers',
    start: 'top top',
    end: '+=600',
    pin: true,
    onEnter: () => CounterAnim.init(),
    once: true
  });

  // ─── GSAP: Heritage 타임라인 행 stagger ────────────
  gsap.fromTo('#heritage .timeline-row',
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.7,
      stagger: 0.08,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#heritage .timeline-section',
        start: 'top 75%',
        once: true
      }
    }
  );

  // ─── GSAP: 챕터 타이틀 슬라이드인 ─────────────────
  ['#value', '#energy', '#social'].forEach(id => {
    gsap.fromTo(`${id} .chapter-header h2`,
      { x: -40, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: `${id} .chapter-header`,
          start: 'top 75%',
          once: true
        }
      }
    );
  });

  // ─── GSAP: Factory 수치 카운터 트리거 ──────────────
  ScrollTrigger.create({
    trigger: '.factory-section',
    start: 'top 70%',
    once: true,
    onEnter: () => {
      document.querySelectorAll('.factory-section [data-count-to]').forEach(el => {
        CounterAnim.animateValue(
          el,
          0,
          parseFloat(el.dataset.countTo),
          parseInt(el.dataset.countDuration || '1800')
        );
      });
    }
  });
```

- [ ] **Step 2: counter.js의 init 메서드가 중복 실행 방지하도록 수정**

```js
// counter.js 전체 교체
const CounterAnim = (() => {
  const animated = new Set();

  function animateValue(el, from, to, duration) {
    if (animated.has(el)) return;
    animated.add(el);
    const start = performance.now();
    const update = (time) => {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(from + (to - from) * eased);
      el.textContent = current.toLocaleString('ko-KR');
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = to.toLocaleString('ko-KR');
    };
    requestAnimationFrame(update);
  }

  function init() {
    document.querySelectorAll('#numbers [data-count-to]').forEach(el => {
      animateValue(el, 0, parseFloat(el.dataset.countTo), parseInt(el.dataset.countDuration || '1800'));
    });
  }

  return { init, animateValue };
})();
```

- [ ] **Step 3: 브라우저에서 전체 흐름 확인**

1. 페이지 로드 → Hero 헤드라인 3줄이 순차 stagger 애니메이션으로 등장
2. KEY NUMBERS 섹션으로 스크롤 → 섹션 pin 후 숫자 카운팅 시작
3. Heritage 섹션으로 스크롤 → 타임라인 행들이 stagger 등장
4. Value 챕터 헤더에서 h2가 좌→우로 슬라이드인
5. 우측 도트가 현재 섹션을 항상 정확히 표시

- [ ] **Step 4: 커밋**

```bash
git add 디지털브로슈어-editorial/
git commit -m "feat: GSAP ScrollTrigger 전체 애니메이션 구현"
```

---

## Task 11: 최종 검수 및 완성

**Files:**
- Modify: `디지털브로슈어-editorial/css/editorial.css` — 필요한 미세 조정

- [ ] **Step 1: 전체 브라우저 QA 체크리스트 실행**

브라우저에서 `index.html`을 열고 아래를 순서대로 확인:

| 항목 | 확인 방법 | 기대 결과 |
|------|-----------|-----------|
| Hero 헤드라인 폰트 | 헤드라인 렌더링 확인 | Bodoni Moda serif + italic 혼합 |
| KEY NUMBERS pin | 스크롤 속도 늦춰서 확인 | 섹션이 잠시 고정 후 카운팅 |
| 타임라인 행 stagger | Heritage 섹션 진입 속도 | 행들이 위→아래 순차 등장 |
| 도트 nav 전환 | 각 섹션 스크롤 | 7개 섹션마다 올바른 도트 활성화 |
| Energy 진행 바 | Energy 섹션 진입 | 바가 왼쪽→오른쪽으로 채워짐 |
| 이미지 hover | Social 카드 이미지 hover | grayscale → 컬러 전환 |
| Outro 클릭 | "처음으로 돌아가기" 클릭 | Hero 섹션으로 smooth scroll |
| 기존 브로슈어 | `디지털브로슈어/index.html` 열기 | 기존 파일 변경 없이 정상 작동 |

- [ ] **Step 2: font-display 및 이미지 fallback 추가**

`editorial.css`에 이미지가 없을 때 빈 영역 처리:

```css
/* 이미지 fallback */
img[src=""], img:not([src]) {
  background: rgba(255,255,255,0.05);
  min-height: 200px;
}
```

- [ ] **Step 3: 최종 커밋**

```bash
git add 디지털브로슈어-editorial/
git commit -m "feat: 에디토리얼 브로슈어 완성 — 전체 7개 섹션 + GSAP + 도트 네비"
```

---

## Self-Review 결과

**Spec 커버리지 확인:**
- ✅ 7개 섹션 모두 구현 (Hero → Key Numbers → Heritage → Value → Energy → Social → Outro)
- ✅ 우측 도트 네비게이션 (Task 9)
- ✅ GSAP ScrollTrigger (Task 10)
- ✅ KEY NUMBERS 카운팅 (counter.js, Task 3)
- ✅ 헤드라인 영문 + 본문 한국어 (모든 섹션)
- ✅ 기존 `디지털브로슈어/` 파일 수정 없음

**타입/명칭 일관성:**
- `CounterAnim.init()` — counter.js와 main.js 간 일치
- `CounterAnim.animateValue(el, from, to, duration)` — 양쪽 일치
- `data-count-to` / `data-count-duration` — HTML과 JS 간 일치
- `.reveal` / `.is-visible` — CSS와 JS 간 일치
- `.green-stat-bar` / `.animated` — CSS와 JS 간 일치
