# GS칼텍스 디지털 브로슈어 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** PDF 기반 GS칼텍스 인터랙티브 웹 브로슈어를 콘텐츠-레이아웃 분리 구조로 구현한다.

**Architecture:** `data/*.json`에 모든 콘텐츠를 보관하고, `loader.js`가 JSON + 섹션 HTML을 fetch해 DOM에 주입한다. 컴포넌트(탭, 카드, 카운터, 차트)는 독립 JS 모듈로 `initAll()`로 일괄 초기화한다.

**Tech Stack:** Vanilla JS (ES6+), Chart.js (CDN), CSS Custom Properties, IntersectionObserver API, Fetch API

> **로컬 실행 주의:** `fetch()`는 `file://` 프로토콜에서 동작하지 않으므로 반드시 로컬 HTTP 서버로 실행해야 한다.  
> 실행 명령: `cd 디지털브로슈어 && python3 -m http.server 8080` 후 `http://localhost:8080` 접속

---

## 파일 구조

```
디지털브로슈어/
├── index.html                      # 네비게이션 쉘 + 섹션 컨테이너
├── data/
│   ├── intro.json                  # Intro 섹션 데이터
│   ├── chapter1.json               # Heritage Plus 데이터
│   ├── chapter2.json               # Value Plus 데이터
│   ├── chapter3.json               # Energy Plus 데이터
│   └── chapter4.json               # Social Plus 데이터
├── sections/
│   ├── intro.html                  # Intro HTML 템플릿
│   ├── chapter1.html               # Heritage Plus 템플릿
│   ├── chapter2.html               # Value Plus 템플릿
│   ├── chapter3.html               # Energy Plus 템플릿
│   ├── chapter4.html               # Social Plus 템플릿
│   └── outro.html                  # Outro 템플릿
├── components/
│   ├── loader.js                   # JSON + HTML fetch, data-bind 처리
│   ├── nav.js                      # 챕터 네비게이션
│   ├── tab-section.js              # P/C/L, B/D/G 탭 전환
│   ├── expand-card.js              # + 버튼 확장 카드
│   ├── stat-counter.js             # 숫자 카운터 애니메이션
│   └── chart-section.js            # Chart.js 래퍼
├── css/
│   ├── base.css                    # 디자인 토큰, 리셋, 타이포그래피
│   ├── nav.css                     # 네비게이션 스타일
│   ├── components.css              # 공용 컴포넌트 스타일
│   └── sections/
│       ├── intro.css
│       ├── chapter1.css
│       ├── chapter2.css
│       ├── chapter3.css
│       └── chapter4.css
└── assets/
    └── images/                     # 이미지 에셋 (별도 준비)
```

---

## Task 1: 디렉토리 스캐폴드 + index.html 쉘

**Files:**
- Create: `디지털브로슈어/index.html`
- Create: `디지털브로슈어/assets/images/.gitkeep`

- [ ] **Step 1: 디렉토리 생성**

```bash
cd /Users/jeong-won-yeob/code/디지털브로슈어
mkdir -p data sections components css/sections assets/images
touch assets/images/.gitkeep
```

- [ ] **Step 2: index.html 작성**

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GS칼텍스 디지털 브로슈어</title>
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/nav.css">
  <link rel="stylesheet" href="css/components.css">
</head>
<body>
  <nav id="main-nav">
    <div class="nav-logo">GS칼텍스</div>
    <ul class="nav-chapters">
      <li data-chapter="intro" class="active">Intro</li>
      <li data-chapter="chapter1">Heritage Plus</li>
      <li data-chapter="chapter2">Value Plus</li>
      <li data-chapter="chapter3">Energy Plus</li>
      <li data-chapter="chapter4">Social Plus</li>
    </ul>
    <div class="nav-controls">
      <button id="prev-btn" aria-label="이전">&#8592;</button>
      <button id="next-btn" aria-label="다음">&#8594;</button>
    </div>
  </nav>

  <main id="brochure"></main>

  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script src="components/loader.js"></script>
  <script src="components/nav.js"></script>
  <script src="components/tab-section.js"></script>
  <script src="components/expand-card.js"></script>
  <script src="components/stat-counter.js"></script>
  <script src="components/chart-section.js"></script>
  <script>
    const CHAPTERS = [
      { id: 'intro',    html: 'sections/intro.html',    data: 'data/intro.json' },
      { id: 'chapter1', html: 'sections/chapter1.html', data: 'data/chapter1.json' },
      { id: 'chapter2', html: 'sections/chapter2.html', data: 'data/chapter2.json' },
      { id: 'chapter3', html: 'sections/chapter3.html', data: 'data/chapter3.json' },
      { id: 'chapter4', html: 'sections/chapter4.html', data: 'data/chapter4.json' },
    ];
    Loader.init(CHAPTERS).then(() => {
      Nav.init(CHAPTERS.map(c => c.id));
    });
  </script>
</body>
</html>
```

- [ ] **Step 3: 브라우저에서 빈 페이지 확인**

```bash
python3 -m http.server 8080
# http://localhost:8080 접속 → 빈 화면(에러 없음) 확인
```

- [ ] **Step 4: 커밋**

```bash
git add 디지털브로슈어/
git commit -m "feat: scaffold brochure directory and index.html shell"
```

---

## Task 2: CSS 디자인 토큰 + 기본 스타일

**Files:**
- Create: `디지털브로슈어/css/base.css`
- Create: `디지털브로슈어/css/nav.css`
- Create: `디지털브로슈어/css/components.css`

- [ ] **Step 1: base.css 작성**

```css
/* css/base.css */
:root {
  --color-green:      #00C853;
  --color-green-dark: #00962D;
  --color-navy:       #0D1B2A;
  --color-teal:       #00897B;
  --color-purple:     #1A237E;
  --color-light-bg:   #F5F5F5;
  --color-white:      #FFFFFF;
  --color-text:       #1A1A1A;
  --color-text-muted: #666666;

  --font-ko: 'Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
  --font-en: 'Bebas Neue', 'Impact', sans-serif;

  --nav-height: 64px;
  --transition: 0.3s ease;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; font-size: 16px; }

body {
  font-family: var(--font-ko);
  color: var(--color-text);
  background: var(--color-white);
  overflow-x: hidden;
}

.chapter {
  display: none;
  min-height: calc(100vh - var(--nav-height));
}

.chapter.active { display: block; }

.hero {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: var(--color-navy);
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
  font-family: var(--font-en);
  font-size: 1rem;
  letter-spacing: 0.2em;
  color: var(--color-green);
  margin-bottom: 1rem;
}

.hero__title {
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 700;
  line-height: 1.2;
}

.section-block {
  padding: 80px 5%;
  max-width: 1400px;
  margin: 0 auto;
}

.section-block__header {
  margin-bottom: 48px;
}

.section-block__tag {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  margin-bottom: 0.5rem;
}

.section-block__title {
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  font-weight: 700;
  color: var(--color-navy);
}

.section-block__desc {
  margin-top: 1rem;
  font-size: 1rem;
  line-height: 1.8;
  color: var(--color-text-muted);
  max-width: 700px;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

- [ ] **Step 2: nav.css 작성**

```css
/* css/nav.css */
#main-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--nav-height);
  background: rgba(13, 27, 42, 0.95);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  padding: 0 5%;
  z-index: 100;
  gap: 2rem;
}

.nav-logo {
  color: var(--color-white);
  font-weight: 700;
  font-size: 1.1rem;
  white-space: nowrap;
}

.nav-chapters {
  display: flex;
  list-style: none;
  gap: 0.25rem;
  flex: 1;
}

.nav-chapters li {
  padding: 0.4rem 0.875rem;
  color: rgba(255,255,255,0.6);
  font-size: 0.875rem;
  cursor: pointer;
  border-radius: 4px;
  transition: var(--transition);
}

.nav-chapters li:hover { color: var(--color-white); }

.nav-chapters li.active {
  color: var(--color-white);
  background: rgba(0, 200, 83, 0.2);
  color: var(--color-green);
}

.nav-controls {
  display: flex;
  gap: 0.5rem;
}

.nav-controls button {
  width: 36px;
  height: 36px;
  border: 1px solid rgba(255,255,255,0.3);
  background: transparent;
  color: var(--color-white);
  border-radius: 50%;
  cursor: pointer;
  font-size: 1rem;
  transition: var(--transition);
}

.nav-controls button:hover {
  background: var(--color-green);
  border-color: var(--color-green);
}

main#brochure {
  padding-top: var(--nav-height);
}
```

- [ ] **Step 3: components.css 작성 (빈 파일로 시작 — 컴포넌트 태스크에서 채움)**

```css
/* css/components.css */
/* Populated by Task 4, 5, 6 */
```

- [ ] **Step 4: 브라우저에서 네비게이션 스타일 확인**

```bash
# http://localhost:8080 새로고침 → 상단 다크 네비게이션 바 확인
```

- [ ] **Step 5: 커밋**

```bash
git add 디지털브로슈어/css/
git commit -m "feat: add CSS design tokens, base layout, and nav styles"
```

---

## Task 3: loader.js — JSON + HTML 로드 & data-bind

**Files:**
- Create: `디지털브로슈어/components/loader.js`

- [ ] **Step 1: loader.js 작성**

```javascript
// components/loader.js
const Loader = {
  async init(chapters) {
    const main = document.getElementById('brochure');

    for (const chapter of chapters) {
      try {
        const [html, data] = await Promise.all([
          fetch(chapter.html).then(r => r.text()),
          fetch(chapter.data).then(r => r.json()),
        ]);
        const section = document.createElement('section');
        section.id = chapter.id;
        section.className = 'chapter';
        section.innerHTML = html;
        Loader._bind(section, data);
        section.dataset.config = JSON.stringify(data);
        main.appendChild(section);
      } catch (e) {
        console.warn(`[Loader] ${chapter.id} 로드 실패:`, e.message);
      }
    }

    // 첫 챕터 활성화
    const first = main.querySelector('.chapter');
    if (first) first.classList.add('active');
  },

  // data-bind="key.nested" → data 객체에서 값을 찾아 textContent 설정
  _bind(el, data) {
    el.querySelectorAll('[data-bind]').forEach(node => {
      const value = Loader._get(data, node.dataset.bind);
      if (value !== undefined) node.textContent = value;
    });
    // data-bg="key" → background-image 설정
    el.querySelectorAll('[data-bg]').forEach(node => {
      const value = Loader._get(data, node.dataset.bg);
      if (value) node.style.backgroundImage = `url('${value}')`;
    });
  },

  _get(obj, path) {
    return path.split('.').reduce((o, k) => o?.[k], obj);
  },
};
```

- [ ] **Step 2: sections/intro.html + data/intro.json 최소 버전으로 동작 확인**

`sections/intro.html`:
```html
<div class="hero">
  <div class="hero__bg" data-bg="heroImage"></div>
  <div class="hero__content">
    <p class="hero__tag" data-bind="tag">Intro</p>
    <h1 class="hero__title" data-bind="title">GS칼텍스의 생활 속 제품들</h1>
  </div>
</div>
```

`data/intro.json`:
```json
{
  "id": "intro",
  "tag": "Intro",
  "title": "GS칼텍스의 생활 속 제품들",
  "heroImage": "assets/images/intro-hero.jpg",
  "sections": []
}
```

- [ ] **Step 3: 브라우저에서 Intro 섹션 텍스트 렌더링 확인**

```bash
# http://localhost:8080 → "GS칼텍스의 생활 속 제품들" 텍스트 표시 확인
```

- [ ] **Step 4: 커밋**

```bash
git add 디지털브로슈어/components/loader.js 디지털브로슈어/sections/intro.html 디지털브로슈어/data/intro.json
git commit -m "feat: add loader with data-bind, intro section skeleton"
```

---

## Task 4: nav.js — 챕터 전환

**Files:**
- Create: `디지털브로슈어/components/nav.js`

- [ ] **Step 1: nav.js 작성**

```javascript
// components/nav.js
const Nav = {
  _chapters: [],
  _current: 0,

  init(chapterIds) {
    Nav._chapters = chapterIds;
    Nav._current = 0;

    // 네비게이션 탭 클릭
    document.querySelectorAll('.nav-chapters li').forEach((li, i) => {
      li.addEventListener('click', () => Nav.goTo(i));
    });

    // 이전/다음 버튼
    document.getElementById('prev-btn').addEventListener('click', () => Nav.goTo(Nav._current - 1));
    document.getElementById('next-btn').addEventListener('click', () => Nav.goTo(Nav._current + 1));

    // 키보드 좌/우 화살표
    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') Nav.goTo(Nav._current + 1);
      if (e.key === 'ArrowLeft')  Nav.goTo(Nav._current - 1);
    });

    Nav._updateUI();
  },

  goTo(index) {
    if (index < 0 || index >= Nav._chapters.length) return;

    // 이전 챕터 비활성화
    const prev = document.getElementById(Nav._chapters[Nav._current]);
    if (prev) prev.classList.remove('active');

    Nav._current = index;

    // 새 챕터 활성화
    const next = document.getElementById(Nav._chapters[Nav._current]);
    if (next) {
      next.classList.add('active');
      next.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    Nav._updateUI();
  },

  _updateUI() {
    // 네비 탭 active 표시
    document.querySelectorAll('.nav-chapters li').forEach((li, i) => {
      li.classList.toggle('active', i === Nav._current);
    });
    // 버튼 비활성화
    document.getElementById('prev-btn').disabled = Nav._current === 0;
    document.getElementById('next-btn').disabled = Nav._current === Nav._chapters.length - 1;
  },
};
```

- [ ] **Step 2: 나머지 섹션 최소 HTML + JSON 스켈레톤 생성**

`sections/chapter1.html`:
```html
<div class="hero">
  <div class="hero__bg" data-bg="heroImage"></div>
  <div class="hero__content">
    <p class="hero__tag" data-bind="tag"></p>
    <h1 class="hero__title" data-bind="title"></h1>
  </div>
</div>
<div id="chapter1-sections"></div>
```

동일한 패턴으로 `sections/chapter2.html`, `sections/chapter3.html`, `sections/chapter4.html`, `sections/outro.html` 생성 (id만 변경).

`data/chapter1.json`:
```json
{
  "id": "chapter1",
  "tag": "Heritage Plus",
  "title": "대한민국의 에너지 유산이 되다",
  "heroImage": "assets/images/ch1-hero.jpg",
  "sections": []
}
```

동일 패턴으로 `data/chapter2.json` ~ `data/chapter4.json` 생성:
- chapter2: `"tag": "Value Plus"`, `"title": "글로벌 Value No.1으로 나아가다"`
- chapter3: `"tag": "Energy Plus"`, `"title": "에너지, 그 가능성을 넓히다"`
- chapter4: `"tag": "Social Plus"`, `"title": "더불어 성장하다"`

- [ ] **Step 3: 브라우저에서 네비게이션 전환 확인**

```bash
# http://localhost:8080
# "Heritage Plus" 탭 클릭 → 챕터 전환 확인
# → / ← 키보드 입력 → 챕터 전환 확인
```

- [ ] **Step 4: 커밋**

```bash
git add 디지털브로슈어/components/nav.js 디지털브로슈어/sections/ 디지털브로슈어/data/
git commit -m "feat: add nav with chapter switching, all section skeletons"
```

---

## Task 5: tab-section.js — P/C/L, B/D/G 탭

**Files:**
- Create: `디지털브로슈어/components/tab-section.js`
- Modify: `디지털브로슈어/css/components.css`

- [ ] **Step 1: tab-section 컴포넌트 스타일 추가 (components.css에 append)**

```css
/* === Tab Section === */
.tab-section {
  display: grid;
  grid-template-columns: 300px 1fr;
  min-height: 500px;
  gap: 0;
}

.tab-section__sidebar {
  background: var(--color-navy);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.tab-section__tab {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: var(--transition);
  color: rgba(255,255,255,0.5);
  border: 2px solid transparent;
}

.tab-section__tab.active {
  color: var(--color-white);
  border-color: var(--color-green);
  background: rgba(0, 200, 83, 0.1);
}

.tab-section__tab-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--color-green);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-en);
  font-size: 0.875rem;
  color: var(--color-navy);
  font-weight: 700;
  flex-shrink: 0;
}

.tab-section__tab-info h3 {
  font-size: 1rem;
  font-weight: 700;
}

.tab-section__tab-info p {
  font-size: 0.75rem;
  margin-top: 0.25rem;
  line-height: 1.4;
}

.tab-section__content {
  background: var(--color-light-bg);
  padding: 3rem;
}

.tab-section__panel { display: none; }
.tab-section__panel.active { display: block; animation: fadeInUp 0.3s ease; }

.tab-section__desc {
  font-size: 0.9375rem;
  line-height: 1.8;
  color: var(--color-text-muted);
  margin-bottom: 2rem;
}

.tab-section__stats {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.tab-section__stat-item {
  background: var(--color-white);
  padding: 1.5rem 2rem;
  border-radius: 8px;
  min-width: 200px;
}

.tab-section__stat-label {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  margin-bottom: 0.5rem;
}

.tab-section__stat-value {
  font-family: var(--font-en);
  font-size: 2.5rem;
  color: var(--color-navy);
  line-height: 1;
}

.tab-section__stat-unit {
  font-size: 1rem;
  color: var(--color-text-muted);
  margin-top: 0.25rem;
}
```

- [ ] **Step 2: tab-section.js 작성**

```javascript
// components/tab-section.js
const TabSection = {
  initAll() {
    document.querySelectorAll('[data-component="tab-section"]').forEach(el => {
      TabSection._init(el);
    });
  },

  _init(container) {
    const tabs = container.querySelectorAll('.tab-section__tab');
    const panels = container.querySelectorAll('.tab-section__panel');

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        panels[i]?.classList.add('active');
      });
    });

    // 첫 탭 활성화
    tabs[0]?.classList.add('active');
    panels[0]?.classList.add('active');
  },

  // JSON data로 탭 섹션 HTML 동적 생성
  render(container, section) {
    container.setAttribute('data-component', 'tab-section');
    container.className = 'tab-section';
    container.innerHTML = `
      <div class="tab-section__sidebar">
        ${section.tabs.map((tab, i) => `
          <div class="tab-section__tab" data-tab="${i}">
            <div class="tab-section__tab-icon">${tab.abbr || tab.id.slice(0,1).toUpperCase()}</div>
            <div class="tab-section__tab-info">
              <h3>${tab.label}</h3>
              <p>${tab.labelKo || ''}</p>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="tab-section__content">
        ${section.tabs.map(tab => `
          <div class="tab-section__panel">
            <p class="tab-section__desc">${tab.description || ''}</p>
            <div class="tab-section__stats">
              ${(tab.stats || []).map(s => `
                <div class="tab-section__stat-item">
                  <div class="tab-section__stat-label">${s.label}</div>
                  <div class="tab-section__stat-value" data-count="${s.value}">${s.value}</div>
                  <div class="tab-section__stat-unit">${s.unit || ''}</div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
    TabSection._init(container);
  },
};
```

- [ ] **Step 3: chapter2.html에 탭 섹션 테스트 추가**

`sections/chapter2.html`에 아래 추가 (hero div 아래):
```html
<div class="section-block">
  <div class="section-block__header">
    <p class="section-block__tag">2 — [Value Plus]</p>
    <h2 class="section-block__title">1. 사업영역 소개</h2>
  </div>
  <div id="ch2-business-tabs"></div>
</div>
```

`data/chapter2.json`에 탭 데이터 추가:
```json
{
  "id": "chapter2",
  "tag": "Value Plus",
  "title": "글로벌 Value No.1으로 나아가다",
  "heroImage": "assets/images/ch2-hero.jpg",
  "sections": [
    {
      "id": "2-1",
      "title": "사업영역 소개",
      "type": "tab-section",
      "tabs": [
        {
          "id": "petroleum",
          "abbr": "P",
          "label": "Petroleum",
          "labelKo": "정유",
          "description": "하루 80만 배럴을 정제할 수 있는 원유정제시설, 등·경유 탈황시설과 국내 최대 중질유 분해시설 등 최첨단 자동화 생산설비에서 고품질의 석유제품을 생산하고 있습니다.",
          "stats": [
            { "label": "원유 정제 처리량", "value": "800,000", "unit": "bbl/day" },
            { "label": "중질유 분해 처리량", "value": "275,000", "unit": "bbl/day" }
          ]
        },
        {
          "id": "petrochemicals",
          "abbr": "C",
          "label": "Petrochemicals",
          "labelKo": "석유화학",
          "description": "연간 90만 톤의 고품질 에틸렌을 생산할 수 있는 MFC와 세계적 규모의 방향족 생산능력을 갖추고 있으며, 독보적 기술력을 인정받은 우수한 품질의 폴리에틸렌과 폴리프로필렌, 복합수지를 생산하고 있습니다.",
          "stats": [
            { "label": "방향족", "value": "2,800,000", "unit": "ton/year" },
            { "label": "올레핀", "value": "2,170,000", "unit": "ton/year" },
            { "label": "폴리머", "value": "980,000", "unit": "ton/year" }
          ]
        },
        {
          "id": "lubricants",
          "abbr": "L",
          "label": "Lubricants",
          "labelKo": "윤활유",
          "description": "최첨단 수첨분해공법(HCR)으로 고품질 베이스오일을 생산해 국내외 자동차용·산업용 윤활유 제조사에 공급하고 있으며, 1969년부터 윤활유를 생산해 온 인천 윤활유 공장에서는 Kixx 제품을 생산하고 있습니다.",
          "stats": [
            { "label": "베이스오일", "value": "27,000", "unit": "bbl/day" },
            { "label": "윤활유", "value": "9,000", "unit": "bbl/day" }
          ]
        }
      ]
    }
  ]
}
```

`loader.js`의 `init()` 마지막에 탭 렌더링 로직 추가:
```javascript
// Loader.init() 내 for 루프 종료 후, 컴포넌트 init 전에 추가
const ch2 = document.getElementById('chapter2');
if (ch2) {
  const data = JSON.parse(ch2.dataset.config);
  const tabSection = data.sections.find(s => s.type === 'tab-section');
  const tabContainer = ch2.querySelector('#ch2-business-tabs');
  if (tabSection && tabContainer) TabSection.render(tabContainer, tabSection);
}
```

- [ ] **Step 4: 브라우저에서 탭 전환 동작 확인**

```bash
# http://localhost:8080
# "Value Plus" 탭 클릭 → P/C/L 탭 표시 확인
# P → C → L 클릭 시 콘텐츠 전환 확인
```

- [ ] **Step 5: 커밋**

```bash
git add 디지털브로슈어/components/tab-section.js 디지털브로슈어/css/components.css 디지털브로슈어/sections/chapter2.html 디지털브로슈어/data/chapter2.json
git commit -m "feat: add tab-section component with P/C/L business area tabs"
```

---

## Task 6: expand-card.js — + 버튼 확장 카드

**Files:**
- Create: `디지털브로슈어/components/expand-card.js`
- Modify: `디지털브로슈어/css/components.css`

- [ ] **Step 1: expand-card 스타일 추가 (components.css에 append)**

```css
/* === Expand Card === */
.expand-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  min-height: 500px;
}

.expand-card {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: flex 0.5s ease;
  min-height: 400px;
}

.expand-card__bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transition: transform 0.5s ease;
}

.expand-card:hover .expand-card__bg { transform: scale(1.05); }

.expand-card__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%);
}

.expand-card__content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  color: var(--color-white);
}

.expand-card__title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-green);
  margin-bottom: 0.5rem;
}

.expand-card__summary {
  font-size: 0.875rem;
  line-height: 1.6;
  opacity: 0.8;
}

.expand-card__detail {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s ease, opacity 0.3s ease;
  opacity: 0;
  margin-top: 1rem;
}

.expand-card.expanded .expand-card__detail {
  max-height: 300px;
  opacity: 1;
}

.expand-card__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid var(--color-green);
  color: var(--color-green);
  font-size: 1.25rem;
  margin-top: 1rem;
  transition: var(--transition);
  background: transparent;
  cursor: pointer;
}

.expand-card.expanded .expand-card__btn {
  background: var(--color-green);
  color: var(--color-navy);
  transform: rotate(45deg);
}

.expand-card__stat {
  font-size: 0.8125rem;
  margin-top: 0.75rem;
  opacity: 0.9;
}

.expand-card__stat-value {
  font-family: var(--font-en);
  font-size: 2rem;
  color: var(--color-green);
}
```

- [ ] **Step 2: expand-card.js 작성**

```javascript
// components/expand-card.js
const ExpandCard = {
  initAll() {
    document.querySelectorAll('[data-component="expand-cards"]').forEach(el => {
      ExpandCard._init(el);
    });
  },

  _init(container) {
    container.querySelectorAll('.expand-card').forEach(card => {
      const btn = card.querySelector('.expand-card__btn');
      btn?.addEventListener('click', e => {
        e.stopPropagation();
        const isExpanded = card.classList.contains('expanded');
        // 다른 카드 닫기
        container.querySelectorAll('.expand-card').forEach(c => c.classList.remove('expanded'));
        if (!isExpanded) card.classList.add('expanded');
      });
    });
  },

  render(container, section) {
    container.setAttribute('data-component', 'expand-cards');
    container.className = 'expand-cards';
    container.innerHTML = section.cards.map(card => `
      <div class="expand-card">
        <div class="expand-card__bg" style="background-image: url('${card.image || ''}')"></div>
        <div class="expand-card__overlay"></div>
        <div class="expand-card__content">
          <h3 class="expand-card__title">${card.title}</h3>
          <p class="expand-card__summary">${card.summary}</p>
          <div class="expand-card__detail">
            <p>${card.detail || ''}</p>
            ${(card.stats || []).map(s => `
              <div class="expand-card__stat">
                <div class="expand-card__stat-value">${s.value}</div>
                <div>${s.label}</div>
              </div>
            `).join('')}
          </div>
          <button class="expand-card__btn" aria-label="상세보기">+</button>
        </div>
      </div>
    `).join('');
    ExpandCard._init(container);
  },
};
```

- [ ] **Step 3: chapter4.html + chapter4.json에 사회공헌 카드 추가**

`sections/chapter4.html`:
```html
<div class="hero">
  <div class="hero__bg" data-bg="heroImage"></div>
  <div class="hero__content">
    <p class="hero__tag" data-bind="tag"></p>
    <h1 class="hero__title" data-bind="title"></h1>
  </div>
</div>
<div class="section-block">
  <div class="section-block__header">
    <p class="section-block__tag">4 — [Social Plus]</p>
    <h2 class="section-block__title">1. 사회공헌활동</h2>
  </div>
  <div id="ch4-social-cards"></div>
</div>
```

`data/chapter4.json`:
```json
{
  "id": "chapter4",
  "tag": "Social Plus",
  "title": "더불어 성장하다",
  "heroImage": "assets/images/ch4-hero.jpg",
  "sections": [
    {
      "id": "4-1",
      "title": "사회공헌활동",
      "type": "expand-card",
      "cards": [
        {
          "id": "yewulmaru",
          "title": "GS칼텍스 예울마루",
          "summary": "100만 명이 찾은 문화예술의 성지 '예울마루'와 예술 창작 터전이자 힐링공간 '장도'",
          "detail": "클래식, 오페라, 뮤지컬, 콘서트 등 최첨단 음향과 무대시설을 갖추고 수준 높은 콘텐츠를 선보이며 전남 최고의 문화예술 랜드마크로 자리잡고 있습니다.",
          "image": "assets/images/yewulmaru.jpg",
          "stats": [
            { "label": "'예울마루' 누적 이용객 수 (2023년 기준)", "value": "129만명" },
            { "label": "'예술의 섬 장도' 누적 방문객 수 (2023년 기준)", "value": "156만명" }
          ]
        },
        {
          "id": "maumtoktok",
          "title": "마음톡톡",
          "summary": "정서적 어려움을 겪고 있는 아동·청소년을 위한 집단 예술 치유 프로그램",
          "detail": "교사를 위한 마음톡톡 매뉴얼 교육 지원, 직접 찾아가는 교실힐링, 저소득가정 아동 치유, 전남동부지역 위기청소년 치유, 여수 다문화가정 아동 치유 등 5개 프로그램을 운영합니다.",
          "image": "assets/images/maumtoktok.jpg",
          "stats": [
            { "label": "'마음톡톡' 프로그램 수혜 아동 수 (2013~2023년)", "value": "28,530명" },
            { "label": "2023년 수혜 아동 수", "value": "2,814명" }
          ]
        },
        {
          "id": "jiguToktok",
          "title": "지구톡톡",
          "summary": "일상 속 작은 행동변화를 제안하고, 환경문제 해결을 위한 친환경 사회공헌 캠페인",
          "detail": "개방형 실리콘 빨대를 제작해 시민들에게 배포하며 '지구를 살리는 쉽고 즐거운 일상 속 습관'을 실천했습니다. '지구톡톡'은 다양한 친환경 활동 도구들이 캠페인 시즌제로 지속 확대될 예정입니다.",
          "image": "assets/images/jigutoktok.jpg",
          "stats": [
            { "label": "'실리콘 빨대' SNS 참여자 수", "value": "4,033명" }
          ]
        }
      ]
    }
  ]
}
```

`loader.js` init() 에 ch4 렌더링 추가:
```javascript
const ch4 = document.getElementById('chapter4');
if (ch4) {
  const data = JSON.parse(ch4.dataset.config);
  const cardSection = data.sections.find(s => s.type === 'expand-card');
  const cardContainer = ch4.querySelector('#ch4-social-cards');
  if (cardSection && cardContainer) ExpandCard.render(cardContainer, cardSection);
}
```

- [ ] **Step 4: 브라우저에서 확장 카드 동작 확인**

```bash
# "Social Plus" 탭 → 사회공헌 섹션 확인
# 각 카드 + 버튼 클릭 → 상세 내용 펼쳐짐 확인
```

- [ ] **Step 5: 커밋**

```bash
git add 디지털브로슈어/components/expand-card.js 디지털브로슈어/css/components.css 디지털브로슈어/sections/chapter4.html 디지털브로슈어/data/chapter4.json
git commit -m "feat: add expand-card component with social contribution section"
```

---

## Task 7: stat-counter.js — 숫자 카운터 애니메이션

**Files:**
- Create: `디지털브로슈어/components/stat-counter.js`

- [ ] **Step 1: stat-counter.js 작성**

```javascript
// components/stat-counter.js
const StatCounter = {
  initAll() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            StatCounter._animate(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('[data-count]').forEach(el => observer.observe(el));
  },

  _animate(el) {
    const raw = el.dataset.count.replace(/[^0-9.]/g, '');
    const target = parseFloat(raw);
    if (isNaN(target)) return;

    const suffix = el.dataset.count.replace(/[0-9.,]/g, '').trim();
    const duration = 1500;
    const start = performance.now();

    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      el.textContent = current.toLocaleString() + (suffix ? ' ' + suffix : '');
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = el.dataset.count;
    };

    requestAnimationFrame(step);
  },
};
```

- [ ] **Step 2: bubble-stat 스타일 components.css에 추가**

```css
/* === Bubble Stat === */
.bubble-stat {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4rem;
  padding: 4rem 2rem;
  background: var(--color-teal);
  position: relative;
  overflow: hidden;
  min-height: 400px;
}

.bubble-stat__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 280px;
  height: 280px;
  border-radius: 50%;
  background: rgba(255,255,255,0.15);
  color: var(--color-white);
  text-align: center;
  padding: 2rem;
}

.bubble-stat__value {
  font-family: var(--font-en);
  font-size: 3.5rem;
  line-height: 1;
  color: var(--color-white);
}

.bubble-stat__label {
  font-size: 0.875rem;
  margin-top: 0.75rem;
  opacity: 0.85;
  line-height: 1.4;
}

.bubble-stat__note {
  font-size: 0.75rem;
  opacity: 0.6;
  margin-top: 0.25rem;
}
```

- [ ] **Step 3: chapter2.json에 주유소 섹션 추가 후 카운터 동작 확인**

`data/chapter2.json`의 `sections` 배열에 추가:
```json
{
  "id": "2-5",
  "title": "전국 주유소와 충전소",
  "type": "bubble-stat",
  "stats": [
    { "label": "전국 주유소 개수", "value": "2,068", "note": "2024년 2월 기준" },
    { "label": "전국 충전소 개수", "value": "343", "note": "2024년 2월 기준" }
  ]
}
```

`sections/chapter2.html`에 추가:
```html
<div id="ch2-station-stats" class="bubble-stat">
  <div class="bubble-stat__item">
    <div class="bubble-stat__value" data-count="2068">2,068</div>
    <div class="bubble-stat__label">전국 주유소 개수</div>
    <div class="bubble-stat__note">2024년 2월 기준</div>
  </div>
  <div class="bubble-stat__item">
    <div class="bubble-stat__value" data-count="343">343</div>
    <div class="bubble-stat__label">전국 충전소 개수</div>
    <div class="bubble-stat__note">2024년 2월 기준</div>
  </div>
</div>
```

- [ ] **Step 4: 브라우저에서 카운터 동작 확인**

```bash
# Value Plus → 하단 스크롤 → 숫자가 0에서 카운트업 확인
```

- [ ] **Step 5: 커밋**

```bash
git add 디지털브로슈어/components/stat-counter.js 디지털브로슈어/css/components.css
git commit -m "feat: add stat-counter with IntersectionObserver and bubble-stat layout"
```

---

## Task 8: chart-section.js — Chart.js 래퍼

**Files:**
- Create: `디지털브로슈어/components/chart-section.js`
- Modify: `디지털브로슈어/css/components.css`

- [ ] **Step 1: chart-section 스타일 추가**

```css
/* === Chart Section === */
.chart-section {
  padding: 3rem;
  background: var(--color-white);
}

.chart-section__canvas-wrap {
  position: relative;
  height: 400px;
}

.chart-section__legend {
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;
  flex-wrap: wrap;
}

.chart-section__legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.chart-section__legend-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
```

- [ ] **Step 2: chart-section.js 작성**

```javascript
// components/chart-section.js
const ChartSection = {
  _defaults: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(13,27,42,0.9)',
        titleColor: '#00C853',
        bodyColor: '#fff',
        padding: 12,
        cornerRadius: 6,
      },
    },
  },

  initAll() {
    document.querySelectorAll('[data-component="chart"]').forEach(el => {
      const config = JSON.parse(el.dataset.chartConfig || '{}');
      ChartSection._create(el, config);
    });
  },

  render(container, chartConfig) {
    const wrap = document.createElement('div');
    wrap.className = 'chart-section__canvas-wrap';
    const canvas = document.createElement('canvas');
    wrap.appendChild(canvas);
    container.appendChild(wrap);
    ChartSection._create(canvas, chartConfig);
  },

  _create(canvas, config) {
    if (!window.Chart) { console.warn('[ChartSection] Chart.js not loaded'); return; }
    new Chart(canvas, {
      type: config.type || 'bar',
      data: config.data,
      options: { ...ChartSection._defaults, ...(config.options || {}) },
    });
  },

  // 막대차트 데이터 헬퍼
  barData(labels, datasets) {
    return {
      type: 'bar',
      data: {
        labels,
        datasets: datasets.map((d, i) => ({
          label: d.label,
          data: d.values,
          backgroundColor: ['#00C853', '#00897B', '#1A237E', '#37474F'][i % 4],
          borderRadius: 4,
        })),
      },
    };
  },
};
```

- [ ] **Step 3: chapter1.json에 석유산업 차트 데이터 추가 후 확인**

`data/chapter1.json`:
```json
{
  "id": "chapter1",
  "tag": "Heritage Plus",
  "title": "대한민국의 에너지 유산이 되다",
  "heroImage": "assets/images/ch1-hero.jpg",
  "sections": [
    {
      "id": "1-1",
      "title": "대한민국의 석유산업",
      "type": "chart-section",
      "description": "단일 정유공장 기준 세계 4위의 원유 정제시설과 국내 최대의 정유 고도화 시설을 갖춘 GS칼텍스는, 대한민국을 원유 수입국에서 정제능력 세계 5위(2023년 기준)의 국가로 끌어올리며 에너지 역사의 새로운 유산을 만들어가고 있습니다.",
      "chart": {
        "type": "bar",
        "data": {
          "labels": ["Paraguana\n(팔콘, 베네수엘라)", "SK에너지\n(울산)", "Abu Dhabi\n(루와이스)", "GS칼텍스\n(여수)", "S-OIL\n(울산)", "Reliance\n(잠나가르)"],
          "datasets": [{
            "label": "정제능력 (천 배럴/일)",
            "data": [955, 840, 817, 800, 669, 663],
            "backgroundColor": ["#37474F","#37474F","#37474F","#00C853","#37474F","#37474F"]
          }]
        }
      }
    }
  ]
}
```

`sections/chapter1.html`:
```html
<div class="hero">
  <div class="hero__bg" data-bg="heroImage"></div>
  <div class="hero__content">
    <p class="hero__tag" data-bind="tag"></p>
    <h1 class="hero__title" data-bind="title"></h1>
  </div>
</div>
<div class="section-block">
  <div class="section-block__header">
    <p class="section-block__tag">1 — [Heritage Plus]</p>
    <h2 class="section-block__title">1. 대한민국의 석유산업</h2>
    <p class="section-block__desc" data-bind="sections.0.description"></p>
  </div>
  <div class="chart-section">
    <div class="chart-section__canvas-wrap">
      <canvas id="ch1-bar-chart"></canvas>
    </div>
  </div>
</div>
```

`loader.js` init() 에 차트 렌더링 추가:
```javascript
const ch1 = document.getElementById('chapter1');
if (ch1) {
  const data = JSON.parse(ch1.dataset.config);
  const chartSection = data.sections.find(s => s.type === 'chart-section');
  const canvas = ch1.querySelector('#ch1-bar-chart');
  if (chartSection && canvas) ChartSection._create(canvas, chartSection.chart);
}
```

- [ ] **Step 4: 브라우저에서 막대차트 확인**

```bash
# Heritage Plus 탭 → 막대차트 렌더링 확인
# GS칼텍스 막대가 녹색(#00C853)으로 강조됨 확인
```

- [ ] **Step 5: 커밋**

```bash
git add 디지털브로슈어/components/chart-section.js 디지털브로슈어/css/components.css 디지털브로슈어/sections/chapter1.html 디지털브로슈어/data/chapter1.json
git commit -m "feat: add Chart.js wrapper and Heritage Plus bar chart"
```

---

## Task 9: 나머지 섹션 콘텐츠 완성

**Files:**
- Modify: `디지털브로슈어/sections/chapter2.html`, `chapter3.html`, `chapter4.html`
- Modify: `디지털브로슈어/data/chapter2.json`, `chapter3.json`, `chapter4.json`
- Create: `디지털브로슈어/sections/outro.html`

- [ ] **Step 1: chapter3.html + chapter3.json — Deep Transformation 탭 추가**

`sections/chapter3.html`:
```html
<div class="hero">
  <div class="hero__bg" data-bg="heroImage"></div>
  <div class="hero__content">
    <p class="hero__tag" data-bind="tag"></p>
    <h1 class="hero__title" data-bind="title"></h1>
  </div>
</div>
<div class="section-block">
  <div class="section-block__header">
    <p class="section-block__tag">3 — [Energy Plus]</p>
    <h2 class="section-block__title">1. Deep Transformation</h2>
  </div>
  <div id="ch3-dx-tabs"></div>
</div>
```

`data/chapter3.json`:
```json
{
  "id": "chapter3",
  "tag": "Energy Plus",
  "title": "에너지, 그 가능성을 넓히다",
  "heroImage": "assets/images/ch3-hero.jpg",
  "sections": [
    {
      "id": "3-1",
      "title": "Deep Transformation",
      "type": "tab-section",
      "tabs": [
        {
          "id": "bx",
          "abbr": "BX",
          "label": "Business Transformation",
          "labelKo": "밸류체인 패러다임의 전환",
          "description": "객관적 시각과 전문적 역량을 활용해 밸류체인 전반의 체질 개선과 수익성을 강화하며, 동시에 일하는 방식의 근본적인 변화를 통해 GS칼텍스만의 지속가능한 혁신을 만들어갑니다.",
          "stats": []
        },
        {
          "id": "dx",
          "abbr": "DX",
          "label": "Digital Transformation",
          "labelKo": "디지털 기술을 통한 경쟁력 강화",
          "description": "변화하는 미래 환경에 대처하기 위해 디지털 기술을 바탕으로 생산성과 효율성을 높여 비즈니스 역량을 강화하고, 구성원의 디지털 역량을 확보해 경쟁력을 높여갑니다.",
          "stats": []
        },
        {
          "id": "gx",
          "abbr": "GX",
          "label": "Green Transformation",
          "labelKo": "지속가능한 녹색성장으로의 전환",
          "description": "기존 사업 탄소감축과 함께 화이트 바이오 사업 본격화와 수소/CCUS 사업, 폐플라스틱의 물리적 재활용(MR), 화학적 재활용(CR)을 통해 저탄소 신사업을 확장합니다.",
          "stats": []
        }
      ]
    }
  ]
}
```

`loader.js` init()에 추가:
```javascript
const ch3 = document.getElementById('chapter3');
if (ch3) {
  const data = JSON.parse(ch3.dataset.config);
  const tabSection = data.sections.find(s => s.type === 'tab-section');
  const tabContainer = ch3.querySelector('#ch3-dx-tabs');
  if (tabSection && tabContainer) TabSection.render(tabContainer, tabSection);
}
```

- [ ] **Step 2: chapter4.html — 스포츠 후원 카드 추가**

`sections/chapter4.html`에 추가 (사회공헌 섹션 아래):
```html
<div class="section-block" style="background: var(--color-navy);">
  <div class="section-block__header">
    <p class="section-block__tag" style="color: var(--color-green);">4 — [Social Plus]</p>
    <h2 class="section-block__title" style="color: var(--color-white);">2. 스포츠 후원 활동</h2>
  </div>
  <div id="ch4-sports-cards"></div>
</div>
```

`data/chapter4.json`의 sections에 추가:
```json
{
  "id": "4-2",
  "title": "스포츠 후원 활동",
  "type": "expand-card",
  "cards": [
    {
      "id": "volleyball",
      "title": "GS칼텍스 서울Kixx 배구단",
      "summary": "1970년 창단 이래 슈퍼리그에서 9년 연속 우승한 대한민국 여자배구 역사의 최고 명문구단",
      "detail": "대통령배 슈퍼리그 9회 연속 우승, V-리그 통산 3회 우승, 여자프로배구 최초 트레블 우승을 달성한 최고의 명문구단입니다.",
      "image": "assets/images/volleyball.jpg",
      "stats": []
    },
    {
      "id": "golf",
      "title": "GS칼텍스 매경오픈 골프대회",
      "summary": "대한민국 골프문화 발전에 기여하기 위해 2006년부터 후원하고 있는 최고 권위의 국제 골프대회",
      "detail": "매경오픈은 한국 남자 골프 투어의 대표적인 대회로, GS칼텍스가 2006년부터 타이틀 스폰서로 후원하고 있습니다.",
      "image": "assets/images/golf.jpg",
      "stats": []
    },
    {
      "id": "baduk",
      "title": "GS칼텍스배 프로기전과 프로바둑 Kixx팀",
      "summary": "대한민국 바둑 발전에 기여하고 있는 'GS칼텍스배 프로기전'과 2023년 우승한 프로바둑 'Kixx팀'",
      "detail": "2022-2023 KB국민은행 바둑리그에서 Kixx팀이 우승하며 16년 만에 정상을 탈환했습니다.",
      "image": "assets/images/baduk.jpg",
      "stats": []
    }
  ]
}
```

`loader.js` init()의 ch4 렌더링 블록을 업데이트:
```javascript
const ch4 = document.getElementById('chapter4');
if (ch4) {
  const data = JSON.parse(ch4.dataset.config);
  data.sections.forEach(section => {
    if (section.type === 'expand-card') {
      const id = section.id === '4-1' ? '#ch4-social-cards' : '#ch4-sports-cards';
      const container = ch4.querySelector(id);
      if (container) ExpandCard.render(container, section);
    }
  });
}
```

- [ ] **Step 3: outro.html 작성**

`sections/outro.html`:
```html
<div class="hero" style="background: var(--color-green);">
  <div class="hero__content">
    <p class="hero__tag" style="color: var(--color-navy);">Outro</p>
    <h1 class="hero__title" style="color: var(--color-navy); font-size: clamp(1.5rem, 4vw, 3rem);">
      지속가능한 미래를 위해<br>새롭게 도전합니다
    </h1>
    <div style="margin-top: 2rem;">
      <a href="#" style="display:inline-block; padding: 0.875rem 2rem; background: var(--color-navy); color: #fff; border-radius: 999px; text-decoration: none; font-weight: 700;">
        미디어허브 바로가기
      </a>
    </div>
  </div>
</div>
```

`CHAPTERS` 배열에 outro 추가 (index.html):
```javascript
{ id: 'outro', html: 'sections/outro.html', data: 'data/intro.json' },
// outro는 별도 데이터 없으므로 intro.json 재사용
```

Nav의 `CHAPTERS` 배열과 nav-chapters ul에도 outro 항목 추가:
```html
<li data-chapter="outro">Outro</li>
```

- [ ] **Step 4: 전체 플로우 브라우저 검증**

```bash
# http://localhost:8080
# Intro → Heritage Plus → Value Plus → Energy Plus → Social Plus → Outro
# 각 챕터에서: 히어로 텍스트 확인, 탭/카드/차트 동작 확인
# 키보드 → / ← 전환 확인
```

- [ ] **Step 5: 커밋**

```bash
git add 디지털브로슈어/sections/ 디지털브로슈어/data/ 디지털브로슈어/index.html
git commit -m "feat: complete all chapter sections and outro"
```

---

## Task 10: 섹션별 CSS 스타일링

**Files:**
- Create: `디지털브로슈어/css/sections/intro.css` ~ `chapter4.css`

- [ ] **Step 1: sections CSS 파일 생성 및 index.html에 link 추가**

```bash
touch 디지털브로슈어/css/sections/intro.css
touch 디지털브로슈어/css/sections/chapter1.css
touch 디지털브로슈어/css/sections/chapter2.css
touch 디지털브로슈어/css/sections/chapter3.css
touch 디지털브로슈어/css/sections/chapter4.css
```

`index.html` `<head>`에 추가:
```html
<link rel="stylesheet" href="css/sections/intro.css">
<link rel="stylesheet" href="css/sections/chapter1.css">
<link rel="stylesheet" href="css/sections/chapter2.css">
<link rel="stylesheet" href="css/sections/chapter3.css">
<link rel="stylesheet" href="css/sections/chapter4.css">
```

- [ ] **Step 2: 각 섹션 CSS에 챕터별 색상 테마 적용**

`css/sections/chapter1.css`:
```css
#chapter1 .hero { background: var(--color-navy); }
#chapter1 .section-block { background: #F8F9FA; }
#chapter1 .tab-section__sidebar { background: #1C2B3A; }
```

`css/sections/chapter2.css`:
```css
#chapter2 .hero { background: #0A2540; }
#chapter2 .tab-section__tab.active { border-color: var(--color-teal); }
#chapter2 .tab-section__tab-icon { background: var(--color-teal); }
```

`css/sections/chapter3.css`:
```css
#chapter3 .hero { background: #0D1B2A; }
#chapter3 .tab-section__sidebar { background: #101828; }
#chapter3 .tab-section__tab-icon { background: var(--color-green); }
```

`css/sections/chapter4.css`:
```css
#chapter4 .hero { background: linear-gradient(135deg, #0D1B2A 0%, #1A237E 100%); }
#chapter4 .expand-cards { min-height: 550px; }
```

- [ ] **Step 3: 반응형 미디어쿼리 base.css에 추가**

```css
/* base.css 하단에 추가 */
@media (max-width: 768px) {
  .tab-section {
    grid-template-columns: 1fr;
  }
  .tab-section__sidebar {
    flex-direction: row;
    overflow-x: auto;
    padding: 1rem;
  }
  .tab-section__tab-info { display: none; }
  .expand-cards { grid-template-columns: 1fr; }
  .bubble-stat { flex-direction: column; gap: 2rem; }
  .nav-chapters li { font-size: 0.75rem; padding: 0.3rem 0.5rem; }
}
```

- [ ] **Step 4: 최종 브라우저 검증 (데스크톱 + 모바일 뷰)**

```bash
# http://localhost:8080
# 브라우저 개발자 도구 → 모바일 뷰 전환 → 레이아웃 확인
# 모든 컴포넌트 정상 동작 최종 확인
```

- [ ] **Step 5: 최종 커밋**

```bash
git add 디지털브로슈어/css/
git commit -m "feat: add per-chapter CSS themes and responsive breakpoints"
```

---

## 데이터 업데이트 가이드

콘텐츠 수정 시:

```
수정 대상                   → 편집 파일
────────────────────────────────────────
텍스트·설명문              → data/chapterN.json (해당 섹션의 description)
숫자·통계                  → data/chapterN.json (stats[].value)
차트 데이터                → data/chapter1.json (sections[].chart.data)
히어로 이미지              → data/chapterN.json (heroImage 경로)
카드 이미지                → data/chapterN.json (cards[].image 경로)
새 탭 항목 추가            → tabs[] 배열에 객체 추가
새 카드 항목 추가          → cards[] 배열에 객체 추가
```

수정 후 `http://localhost:8080` 새로고침으로 즉시 반영 확인.
