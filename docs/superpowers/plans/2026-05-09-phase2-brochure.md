# GS칼텍스 디지털 브로슈어 Phase 2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 챕터별 전면 재설계(Approach B)로 타임라인·팩토리 인포그래픽·세계 수출 맵·DAX 카드·Green 수치·YouTube 임베드를 추가하고, 스크롤 리빌 애니메이션을 전 챕터에 적용한다.

**Architecture:** 기존 Loader/Nav/컴포넌트 시스템 유지. 새 공통 유틸 `scroll-reveal.js`를 추가하고, 각 챕터 HTML/CSS/JSON을 독립적으로 재작성한다. 새 섹션 타입(타임라인, 팩토리, 세계 맵, DAX 카드 등)은 정적 HTML로 직접 마크업한다.

**Tech Stack:** Vanilla JS (ES6), CSS Custom Properties, IntersectionObserver API, Chart.js CDN, YouTube iframe API

---

## 파일 구조

```
추가:
  components/scroll-reveal.js

수정:
  css/base.css                   (.reveal / .is-visible 추가)
  index.html                     (scroll-reveal.js 스크립트 태그 추가)
  components/loader.js           (RevealObserver.init() 호출 추가)

  data/chapter1.json             (타임라인 milestones 데이터 추가)
  sections/chapter1.html         (타임라인 + 팩토리 인포그래픽 섹션 추가)
  css/sections/chapter1.css      (타임라인·팩토리 스타일)

  data/chapter2.json             (세계 거점 globals 데이터 추가)
  sections/chapter2.html         (세계 수출 맵 + 핀드 스탯 섹션 추가)
  css/sections/chapter2.css      (맵·스탯 스타일)

  data/chapter3.json             (DAX 카드·Green 수치 데이터 추가)
  sections/chapter3.html         (DAX 카드 + Green 수치 + YouTube 섹션 추가)
  css/sections/chapter3.css      (DAX·Green·YouTube 스타일)

  sections/chapter4.html         (.reveal 클래스 추가)
```

---

## Task 1: scroll-reveal.js + CSS 기반 + 통합

**Files:**
- Create: `components/scroll-reveal.js`
- Modify: `css/base.css`
- Modify: `index.html`
- Modify: `components/loader.js`

- [ ] **Step 1: scroll-reveal.js 작성**

```javascript
// components/scroll-reveal.js
const RevealObserver = {
  init() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.revealDelay || 0;
            setTimeout(() => {
              entry.target.classList.add('is-visible');
            }, Number(delay));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  },
};
```

- [ ] **Step 2: base.css에 .reveal 스타일 추가**

`css/base.css` 파일 끝(기존 `@media` 블록 바로 위)에 추가:

```css
.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.reveal.is-visible {
  opacity: 1;
  transform: none;
}
```

- [ ] **Step 3: index.html에 스크립트 태그 추가**

`index.html`의 `<script src="components/stat-counter.js"></script>` 바로 다음 줄에 추가:

```html
<script src="components/scroll-reveal.js"></script>
```

- [ ] **Step 4: loader.js에 RevealObserver.init() 호출 추가**

`components/loader.js`에서 `StatCounter.initAll();` 바로 다음 줄에 추가:

```javascript
RevealObserver.init();
```

- [ ] **Step 5: 브라우저 확인**

`python3 -m http.server 8080`으로 서버 실행 후 `http://localhost:8080` 접속.
현재 콘텐츠가 스크롤 시 페이드인되는지 확인 (아직 `.reveal` 클래스가 없으므로 기존 동작 유지 — 오류 없음을 확인).

- [ ] **Step 6: 커밋**

```bash
git add components/scroll-reveal.js css/base.css index.html components/loader.js
git commit -m "feat: add scroll-reveal animation system"
```

---

## Task 2: Chapter 1 — 타임라인 + 팩토리 인포그래픽

**Files:**
- Modify: `data/chapter1.json`
- Modify: `sections/chapter1.html`
- Modify: `css/sections/chapter1.css`

### Step 1: chapter1.json에 타임라인 데이터 추가

- [ ] `data/chapter1.json`의 `"sections"` 배열 맨 앞에 타임라인 섹션을 추가한다. 기존 chart-section 항목은 그대로 유지한다.

```json
{
  "id": "chapter1",
  "tag": "Heritage Plus",
  "title": "대한민국의 에너지 유산이 되다",
  "heroImage": "assets/images/ch1-hero.jpg",
  "sections": [
    {
      "id": "1-0",
      "type": "timeline",
      "milestones": [
        { "year": "1967", "event": "GS칼텍스 창립", "desc": "호남정유로 출발, 대한민국 정유산업의 시작" },
        { "year": "1969", "event": "여수공장 가동", "desc": "전남 여수에 국내 최초 대규모 정유설비 준공" },
        { "year": "1971", "event": "내수 첫 공급", "desc": "국산 석유제품 전국 공급망 구축" },
        { "year": "1987", "event": "중질유 분해시설 준공", "desc": "국내 최대 중질유 분해·처리 시설 가동" },
        { "year": "1995", "event": "인천 윤활유공장 가동", "desc": "HCR 공법 기반 고품질 베이스오일 생산 시작" },
        { "year": "1999", "event": "IMF 위기 극복", "desc": "구조조정과 혁신으로 재도약의 발판 마련" },
        { "year": "2001", "event": "GS칼텍스로 사명 변경", "desc": "GS그룹 출범과 함께 새 브랜드 아이덴티티 확립" },
        { "year": "2005", "event": "방향족 세계 최대급", "desc": "파라자일렌 등 방향족 생산능력 세계 최고 수준 달성" },
        { "year": "2010", "event": "MFC 준공", "desc": "연간 90만 톤 에틸렌 생산 가능 혼합분해시설 완공" },
        { "year": "2015", "event": "그린에너지 전환 선언", "desc": "신재생·저탄소 에너지 중심의 미래 전략 공표" },
        { "year": "2019", "event": "Deep Transformation 선언", "desc": "BX·DX·GX 3대 혁신 축 기반 경영 전략 발표" },
        { "year": "2021", "event": "ISCC PLUS 인증 획득", "desc": "바이오 기반 원료 지속가능성 국제 인증 취득" },
        { "year": "2023", "event": "정제능력 세계 4위", "desc": "단일 공장 기준 세계 4위 정제시설 지위 확인" },
        { "year": "2025", "event": "NCSI 17년 연속 1위", "desc": "국가고객만족도 주유소 부문 최장 기간 1위 달성" }
      ]
    },
    {
      "id": "1-1",
      "title": "대한민국의 석유산업",
      "type": "chart-section",
      "description": "단일 정유공장 기준 세계 4위의 원유 정제시설과 국내 최대의 정유 고도화 시설을 갖춘 GS칼텍스는, 대한민국을 원유 수입국에서 정제능력 세계 5위(2023년 기준)의 국가로 끌어올리며 에너지 역사의 새로운 유산을 만들어가고 있습니다.",
      "chart": {
        "type": "bar",
        "data": {
          "labels": ["Paraguana\n(베네수엘라)", "SK에너지\n(울산)", "Abu Dhabi\n(루와이스)", "GS칼텍스\n(여수)", "S-OIL\n(울산)", "Reliance\n(잠나가르)"],
          "datasets": [{
            "label": "정제능력 (천 배럴/일)",
            "data": [955, 840, 817, 800, 669, 663],
            "backgroundColor": ["#CFD8DC","#CFD8DC","#CFD8DC","#00C853","#CFD8DC","#CFD8DC"],
            "hoverBackgroundColor": ["#B0BEC5","#B0BEC5","#B0BEC5","#00E676","#B0BEC5","#B0BEC5"],
            "borderRadius": 6,
            "borderSkipped": false,
            "barThickness": 28
          }]
        },
        "options": {
          "scales": {
            "x": {
              "grid": { "display": false },
              "border": { "display": false },
              "ticks": { "color": "#888", "font": { "size": 11 }, "maxRotation": 0 }
            },
            "y": {
              "beginAtZero": true,
              "max": 1100,
              "grid": { "color": "rgba(0,0,0,0.05)", "drawTicks": false },
              "border": { "display": false },
              "ticks": { "color": "#aaa", "font": { "size": 11 }, "padding": 12, "stepSize": 200 }
            }
          }
        }
      }
    }
  ]
}
```

### Step 2: chapter1.html 전면 재작성

- [ ] `sections/chapter1.html`을 아래 내용으로 완전히 교체한다.

```html
<div class="hero">
  <div class="hero__bg" data-bg="heroImage"></div>
  <div class="hero__content">
    <p class="hero__tag" data-bind="tag"></p>
    <h1 class="hero__title" data-bind="title"></h1>
  </div>
</div>

<!-- 성장 타임라인 -->
<section class="ch1-timeline">
  <div class="section-block">
    <div class="section-block__header reveal">
      <p class="section-block__tag">1 — [Heritage Plus]</p>
      <h2 class="section-block__title">반세기를 넘어온 여정</h2>
    </div>
    <div class="ch1-timeline__track">
      <div class="ch1-timeline__item reveal" data-reveal-delay="0">
        <div class="ch1-timeline__year">1967</div>
        <div class="ch1-timeline__dot"></div>
        <div class="ch1-timeline__body">
          <strong>GS칼텍스 창립</strong>
          <p>호남정유로 출발, 대한민국 정유산업의 시작</p>
        </div>
      </div>
      <div class="ch1-timeline__item reveal" data-reveal-delay="80">
        <div class="ch1-timeline__year">1969</div>
        <div class="ch1-timeline__dot"></div>
        <div class="ch1-timeline__body">
          <strong>여수공장 가동</strong>
          <p>전남 여수에 국내 최초 대규모 정유설비 준공</p>
        </div>
      </div>
      <div class="ch1-timeline__item reveal" data-reveal-delay="160">
        <div class="ch1-timeline__year">1971</div>
        <div class="ch1-timeline__dot"></div>
        <div class="ch1-timeline__body">
          <strong>내수 첫 공급</strong>
          <p>국산 석유제품 전국 공급망 구축</p>
        </div>
      </div>
      <div class="ch1-timeline__item reveal" data-reveal-delay="240">
        <div class="ch1-timeline__year">1987</div>
        <div class="ch1-timeline__dot"></div>
        <div class="ch1-timeline__body">
          <strong>중질유 분해시설 준공</strong>
          <p>국내 최대 중질유 분해·처리 시설 가동</p>
        </div>
      </div>
      <div class="ch1-timeline__item reveal" data-reveal-delay="320">
        <div class="ch1-timeline__year">1995</div>
        <div class="ch1-timeline__dot"></div>
        <div class="ch1-timeline__body">
          <strong>인천 윤활유공장 가동</strong>
          <p>HCR 공법 기반 고품질 베이스오일 생산 시작</p>
        </div>
      </div>
      <div class="ch1-timeline__item reveal" data-reveal-delay="400">
        <div class="ch1-timeline__year">2001</div>
        <div class="ch1-timeline__dot"></div>
        <div class="ch1-timeline__body">
          <strong>GS칼텍스로 사명 변경</strong>
          <p>GS그룹 출범과 함께 새 브랜드 아이덴티티 확립</p>
        </div>
      </div>
      <div class="ch1-timeline__item reveal" data-reveal-delay="480">
        <div class="ch1-timeline__year">2010</div>
        <div class="ch1-timeline__dot"></div>
        <div class="ch1-timeline__body">
          <strong>MFC 준공</strong>
          <p>연간 90만 톤 에틸렌 생산 가능 혼합분해시설 완공</p>
        </div>
      </div>
      <div class="ch1-timeline__item reveal" data-reveal-delay="560">
        <div class="ch1-timeline__year">2019</div>
        <div class="ch1-timeline__dot"></div>
        <div class="ch1-timeline__body">
          <strong>Deep Transformation 선언</strong>
          <p>BX·DX·GX 3대 혁신 축 기반 경영 전략 발표</p>
        </div>
      </div>
      <div class="ch1-timeline__item reveal" data-reveal-delay="640">
        <div class="ch1-timeline__year">2023</div>
        <div class="ch1-timeline__dot"></div>
        <div class="ch1-timeline__body">
          <strong>정제능력 세계 4위</strong>
          <p>단일 공장 기준 세계 4위 정제시설 지위 확인</p>
        </div>
      </div>
      <div class="ch1-timeline__item reveal" data-reveal-delay="720">
        <div class="ch1-timeline__year">2025</div>
        <div class="ch1-timeline__dot ch1-timeline__dot--current"></div>
        <div class="ch1-timeline__body">
          <strong>NCSI 17년 연속 1위</strong>
          <p>국가고객만족도 주유소 부문 최장 기간 1위 달성</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- 여수공장 인포그래픽 -->
<section class="ch1-factory">
  <div class="ch1-factory__inner">
    <div class="ch1-factory__header reveal">
      <p class="ch1-factory__tag">YEOSU COMPLEX</p>
      <h2 class="ch1-factory__title">세계가 주목하는<br>여수 에너지 복합단지</h2>
    </div>
    <div class="ch1-factory__grid">
      <div class="ch1-factory__stat reveal" data-reveal-delay="0">
        <div class="ch1-factory__num"><span class="stat-count" data-count="800000">800,000</span></div>
        <div class="ch1-factory__unit">bbl/day</div>
        <div class="ch1-factory__label">원유 정제 처리량</div>
      </div>
      <div class="ch1-factory__stat reveal" data-reveal-delay="120">
        <div class="ch1-factory__num"><span class="stat-count" data-count="275000">275,000</span></div>
        <div class="ch1-factory__unit">bbl/day</div>
        <div class="ch1-factory__label">중질유 분해 처리량</div>
      </div>
      <div class="ch1-factory__stat reveal" data-reveal-delay="240">
        <div class="ch1-factory__num"><span class="stat-count" data-count="325">325</span><span class="ch1-factory__suffix">기</span></div>
        <div class="ch1-factory__unit">&nbsp;</div>
        <div class="ch1-factory__label">제품 저장 탱크</div>
      </div>
      <div class="ch1-factory__stat reveal" data-reveal-delay="360">
        <div class="ch1-factory__num"><span class="stat-count" data-count="100000">100,000</span></div>
        <div class="ch1-factory__unit">kW</div>
        <div class="ch1-factory__label">자체 발전 능력</div>
      </div>
    </div>
  </div>
</section>

<!-- 정제능력 순위 차트 -->
<div class="section-block">
  <div class="section-block__header reveal">
    <p class="section-block__tag">1 — [Heritage Plus]</p>
    <h2 class="section-block__title">대한민국의 석유산업</h2>
    <p class="section-block__desc" data-bind="sections.1.description"></p>
  </div>
  <div class="chart-section reveal">
    <div class="chart-section__canvas-wrap">
      <canvas id="ch1-bar-chart"></canvas>
    </div>
  </div>
</div>
```

**주의:** `data-bind="sections.1.description"` — 타임라인 섹션이 `sections[0]`이 되었으므로 기존 chart-section이 `sections[1]`로 이동했다. 이에 맞게 인덱스를 1로 변경.

### Step 3: chapter1.css 재작성

- [ ] `css/sections/chapter1.css`를 아래 내용으로 완전히 교체한다.

```css
#chapter1 .hero { background: var(--color-navy); }

/* 타임라인 */
.ch1-timeline { background: #F8F9FA; }

.ch1-timeline__track {
  position: relative;
  padding: 2rem 0 2rem 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
}

.ch1-timeline__track::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, transparent, var(--color-green) 10%, var(--color-green) 90%, transparent);
  transform: translateX(-50%);
}

.ch1-timeline__item {
  display: grid;
  grid-template-columns: 1fr 40px 1fr;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem 0;
}

.ch1-timeline__item:nth-child(odd) .ch1-timeline__year {
  text-align: right;
  order: 0;
}
.ch1-timeline__item:nth-child(odd) .ch1-timeline__dot { order: 1; }
.ch1-timeline__item:nth-child(odd) .ch1-timeline__body {
  order: 2;
  text-align: left;
}

.ch1-timeline__item:nth-child(even) .ch1-timeline__year {
  text-align: right;
  order: 2;
}
.ch1-timeline__item:nth-child(even) .ch1-timeline__dot { order: 1; }
.ch1-timeline__item:nth-child(even) .ch1-timeline__body {
  order: 0;
  text-align: right;
}

.ch1-timeline__year {
  font-family: var(--font-en);
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-green);
  line-height: 1;
}

.ch1-timeline__dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--color-white);
  border: 3px solid var(--color-green);
  justify-self: center;
  z-index: 1;
}

.ch1-timeline__dot--current {
  background: var(--color-green);
  box-shadow: 0 0 0 6px rgba(0, 200, 83, 0.2);
}

.ch1-timeline__body strong {
  display: block;
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-navy);
  margin-bottom: 0.25rem;
}

.ch1-timeline__body p {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  line-height: 1.5;
}

/* 팩토리 인포그래픽 */
.ch1-factory {
  background: var(--color-navy);
  padding: 80px 5%;
}

.ch1-factory__inner {
  max-width: 1400px;
  margin: 0 auto;
}

.ch1-factory__tag {
  font-family: var(--font-en);
  font-size: 0.875rem;
  letter-spacing: 0.3em;
  color: var(--color-green);
  margin-bottom: 1rem;
}

.ch1-factory__title {
  font-size: clamp(1.75rem, 3.5vw, 3rem);
  font-weight: 700;
  color: var(--color-white);
  line-height: 1.3;
  margin-bottom: 4rem;
}

.ch1-factory__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.ch1-factory__stat {
  border-left: 2px solid rgba(255,255,255,0.1);
  padding-left: 2rem;
}

.ch1-factory__num {
  font-family: var(--font-en);
  font-size: clamp(2.5rem, 4vw, 3.5rem);
  color: var(--color-green);
  line-height: 1;
  margin-bottom: 0.25rem;
}

.ch1-factory__suffix {
  font-size: 2rem;
}

.ch1-factory__unit {
  font-size: 0.875rem;
  color: rgba(255,255,255,0.4);
  margin-bottom: 0.75rem;
  min-height: 1.4em;
}

.ch1-factory__label {
  font-size: 0.9375rem;
  color: rgba(255,255,255,0.75);
}

/* 차트 섹션 배경 */
#chapter1 .section-block { background: #F8F9FA; }

@media (max-width: 768px) {
  .ch1-timeline__track::before { left: 20px; }
  .ch1-timeline__item {
    grid-template-columns: 40px 1fr;
    padding: 1rem 0;
  }
  .ch1-timeline__item:nth-child(odd) .ch1-timeline__year,
  .ch1-timeline__item:nth-child(even) .ch1-timeline__year { display: none; }
  .ch1-timeline__item:nth-child(odd) .ch1-timeline__dot,
  .ch1-timeline__item:nth-child(even) .ch1-timeline__dot { order: 0; }
  .ch1-timeline__item:nth-child(odd) .ch1-timeline__body,
  .ch1-timeline__item:nth-child(even) .ch1-timeline__body { order: 1; text-align: left; }
  .ch1-factory__grid { grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
}
```

- [ ] **Step 4: 브라우저 확인**

서버 실행 후 Chapter 1 이동. 확인 항목:
1. 타임라인이 지그재그 배열로 표시됨
2. 스크롤 시 각 타임라인 항목이 순서대로 페이드인됨
3. 팩토리 인포그래픽 다크 섹션이 표시됨
4. 수치들이 스크롤 시 카운터 애니메이션됨
5. 바 차트가 하단에 표시됨

- [ ] **Step 5: 커밋**

```bash
git add data/chapter1.json sections/chapter1.html css/sections/chapter1.css
git commit -m "feat: chapter1 — timeline and factory infographic"
```

---

## Task 3: Chapter 2 — 세계 수출 맵 + 핀드 스탯

**Files:**
- Modify: `data/chapter2.json`
- Modify: `sections/chapter2.html`
- Modify: `css/sections/chapter2.css`

### Step 1: chapter2.json에 세계 거점 데이터 추가

- [ ] `data/chapter2.json`의 `"sections"` 배열 끝에 아래 항목을 추가한다. 기존 tab-section과 bubble-stat 항목은 그대로 유지한다.

```json
{
  "id": "2-6",
  "type": "world-map",
  "headline": "50개국 수출",
  "subline": "10개국 13개 거점",
  "locations": [
    { "city": "London",     "country": "UK",        "cx": 500, "cy": 107 },
    { "city": "Prague",     "country": "Czech",     "cx": 540, "cy": 111 },
    { "city": "Rome",       "country": "Italy",     "cx": 535, "cy": 133 },
    { "city": "Moscow",     "country": "Russia",    "cx": 604, "cy": 95  },
    { "city": "Dubai",      "country": "UAE",       "cx": 654, "cy": 180 },
    { "city": "Mumbai",     "country": "India",     "cx": 702, "cy": 197 },
    { "city": "Shanghai",   "country": "China",     "cx": 838, "cy": 163 },
    { "city": "Tokyo",      "country": "Japan",     "cx": 888, "cy": 151 },
    { "city": "Ho Chi Minh","country": "Vietnam",   "cx": 796, "cy": 220 },
    { "city": "Singapore",  "country": "Singapore", "cx": 788, "cy": 247 }
  ]
}
```

### Step 2: chapter2.html 재작성

- [ ] `sections/chapter2.html`을 아래 내용으로 완전히 교체한다.

```html
<div class="hero">
  <div class="hero__bg" data-bg="heroImage"></div>
  <div class="hero__content">
    <p class="hero__tag" data-bind="tag"></p>
    <h1 class="hero__title" data-bind="title"></h1>
  </div>
</div>

<!-- 사업영역 탭섹션 -->
<div class="section-block">
  <div class="section-block__header reveal">
    <p class="section-block__tag">2 — [Value Plus]</p>
    <h2 class="section-block__title">사업영역 소개</h2>
  </div>
  <div id="ch2-business-tabs"></div>
</div>

<!-- 세계 수출 맵 -->
<section class="ch2-world">
  <div class="ch2-world__header reveal">
    <p class="ch2-world__tag">GLOBAL NETWORK</p>
    <h2 class="ch2-world__headline"><span class="ch2-world__big">50</span>개국 수출</h2>
    <p class="ch2-world__sub">10개국 13개 글로벌 거점 운영</p>
  </div>
  <div class="ch2-world__map-wrap reveal" data-reveal-delay="200">
    <svg class="ch2-world__svg" id="ch2-world-map" viewBox="0 0 1000 500" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
      <!-- 대륙 외곽선 (equirectangular 투영, 1000×500) -->
      <path d="M120,60 L240,50 L270,100 L250,180 L220,220 L170,200 L130,160 L100,120Z" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
      <path d="M185,240 L250,235 L270,270 L260,370 L230,420 L195,390 L175,330 L175,280Z" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
      <path d="M455,55 L545,50 L570,90 L560,135 L490,148 L455,122Z" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
      <path d="M455,148 L560,138 L605,195 L592,345 L532,395 L470,362 L448,262 L453,188Z" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
      <path d="M540,28 L890,22 L905,92 L855,112 L725,102 L622,118 L570,90 L545,50Z" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
      <path d="M552,142 L685,132 L715,182 L682,222 L602,228 L568,192Z" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
      <path d="M642,162 L858,157 L905,202 L872,252 L812,272 L722,262 L682,232 L662,202Z" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
      <path d="M730,312 L882,307 L922,362 L902,432 L812,442 L752,402 L722,362Z" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
      <!-- JS로 location circle dots 주입 -->
    </svg>
  </div>
  <div class="ch2-world__locations reveal" data-reveal-delay="400">
    <span class="ch2-world__loc-item">🇬🇧 UK</span>
    <span class="ch2-world__loc-item">🇷🇺 Russia</span>
    <span class="ch2-world__loc-item">🇨🇿 Czech</span>
    <span class="ch2-world__loc-item">🇮🇹 Italy</span>
    <span class="ch2-world__loc-item">🇦🇪 UAE</span>
    <span class="ch2-world__loc-item">🇮🇳 India</span>
    <span class="ch2-world__loc-item">🇯🇵 Japan</span>
    <span class="ch2-world__loc-item">🇨🇳 China</span>
    <span class="ch2-world__loc-item">🇻🇳 Vietnam</span>
    <span class="ch2-world__loc-item">🇸🇬 Singapore</span>
  </div>
</section>

<!-- 핀드 스탯: 전국 네트워크 -->
<section class="ch2-network">
  <div class="ch2-network__inner">
    <div class="ch2-network__item reveal" data-reveal-delay="0">
      <div class="ch2-network__num">
        <span class="stat-count" data-count="2068">2,068</span>
      </div>
      <div class="ch2-network__label">전국 주유소</div>
      <div class="ch2-network__note">2024년 2월 기준</div>
    </div>
    <div class="ch2-network__divider"></div>
    <div class="ch2-network__item reveal" data-reveal-delay="150">
      <div class="ch2-network__num">
        <span class="stat-count" data-count="343">343</span>
      </div>
      <div class="ch2-network__label">전국 충전소</div>
      <div class="ch2-network__note">2024년 2월 기준</div>
    </div>
  </div>
</section>
```

### Step 3: chapter2.css 재작성

- [ ] `css/sections/chapter2.css`를 아래 내용으로 완전히 교체한다.

```css
#chapter2 .hero { background: #0A2540; }
#chapter2 .tab-section__tab.active { border-color: var(--color-teal); }
#chapter2 .tab-section__tab-icon { background: var(--color-teal); }

/* 세계 수출 맵 */
.ch2-world {
  background: var(--color-navy);
  padding: 80px 5%;
  overflow: hidden;
}

.ch2-world__tag {
  font-family: var(--font-en);
  font-size: 0.875rem;
  letter-spacing: 0.3em;
  color: var(--color-green);
  margin-bottom: 1rem;
}

.ch2-world__headline {
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 700;
  color: var(--color-white);
  line-height: 1.1;
  margin-bottom: 0.5rem;
}

.ch2-world__big {
  font-family: var(--font-en);
  font-size: clamp(4rem, 10vw, 8rem);
  color: var(--color-green);
  line-height: 0.9;
  display: inline-block;
}

.ch2-world__sub {
  font-size: 1.125rem;
  color: rgba(255,255,255,0.6);
  margin-bottom: 3rem;
}

.ch2-world__map-wrap {
  width: 100%;
  max-width: 900px;
  margin: 0 auto 2rem;
}

.ch2-world__svg {
  width: 100%;
  height: auto;
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 8px;
  display: block;
}

/* SVG circle dots (js로 주입) */
.ch2-map-dot {
  fill: var(--color-green);
  opacity: 0;
  animation: dotAppear 0.4s ease forwards;
  cursor: pointer;
}

.ch2-map-dot-ring {
  fill: none;
  stroke: var(--color-green);
  stroke-width: 1.5;
  opacity: 0;
  animation: dotRing 2s ease-in-out infinite;
}

@keyframes dotAppear {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes dotRing {
  0%   { r: 6; opacity: 0.6; }
  100% { r: 14; opacity: 0; }
}

.ch2-world__locations {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  max-width: 900px;
  margin: 0 auto;
}

.ch2-world__loc-item {
  font-size: 0.875rem;
  color: rgba(255,255,255,0.6);
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 0.375rem 0.875rem;
  border-radius: 999px;
}

/* 핀드 스탯 */
.ch2-network {
  background: var(--color-white);
  padding: 80px 5%;
}

.ch2-network__inner {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
}

.ch2-network__item {
  flex: 1;
  text-align: center;
  padding: 2rem;
}

.ch2-network__divider {
  width: 1px;
  height: 120px;
  background: var(--color-light-bg);
  flex-shrink: 0;
}

.ch2-network__num {
  font-family: var(--font-en);
  font-size: clamp(3.5rem, 7vw, 6rem);
  color: var(--color-navy);
  line-height: 1;
  margin-bottom: 0.5rem;
}

.ch2-network__label {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--color-navy);
  margin-bottom: 0.25rem;
}

.ch2-network__note {
  font-size: 0.8125rem;
  color: var(--color-text-muted);
}

@media (max-width: 768px) {
  .ch2-network__inner { flex-direction: column; }
  .ch2-network__divider { width: 60px; height: 1px; }
}
```

### Step 4: loader.js에 세계 맵 dots 렌더링 추가

- [ ] `components/loader.js`에서 `// Chapter 2: render tab sections` 블록을 찾아 아래와 같이 세계 맵 렌더링 코드를 추가한다. 기존 TabSection.render 코드는 그대로 유지한다.

```javascript
// Chapter 2: render tab sections + world map dots
const ch2 = document.getElementById('chapter2');
if (ch2) {
  const data = JSON.parse(ch2.dataset.config);
  const tabSection = data.sections.find(s => s.type === 'tab-section');
  const tabContainer = ch2.querySelector('#ch2-business-tabs');
  if (tabSection && tabContainer) TabSection.render(tabContainer, tabSection);

  const worldMap = data.sections.find(s => s.type === 'world-map');
  const mapSvg = ch2.querySelector('#ch2-world-map');
  if (worldMap && mapSvg) {
    const NS = 'http://www.w3.org/2000/svg';
    worldMap.locations.forEach((loc, i) => {
      const delay = `${i * 0.2}s`;

      const ring = document.createElementNS(NS, 'circle');
      ring.setAttribute('cx', loc.cx);
      ring.setAttribute('cy', loc.cy);
      ring.setAttribute('r', 6);
      ring.setAttribute('class', 'ch2-map-dot-ring');
      ring.style.animationDelay = delay;
      mapSvg.appendChild(ring);

      const circle = document.createElementNS(NS, 'circle');
      circle.setAttribute('cx', loc.cx);
      circle.setAttribute('cy', loc.cy);
      circle.setAttribute('r', 5);
      circle.setAttribute('class', 'ch2-map-dot');
      circle.style.animationDelay = delay;

      const title = document.createElementNS(NS, 'title');
      title.textContent = `${loc.city}, ${loc.country}`;
      circle.appendChild(title);

      mapSvg.appendChild(circle);
    });
  }
}
```

- [ ] **Step 5: 브라우저 확인**

Chapter 2 이동. 확인 항목:
1. 탭 섹션이 정상 표시됨
2. 세계 맵 섹션 — 다크 배경에 초록색 점들이 순서대로 나타남
3. 각 점에 마우스 호버 시 도시명 레이블이 나타남
4. 핀드 스탯 — 2,068 / 343 대형 수치 표시 및 카운터 애니메이션
5. 스크롤 시 섹션들이 페이드인됨

- [ ] **Step 6: 커밋**

```bash
git add data/chapter2.json sections/chapter2.html css/sections/chapter2.css components/loader.js
git commit -m "feat: chapter2 — world map and network stats"
```

---

## Task 4: Chapter 3 — DAX 카드 + Green 수치 + YouTube

**Files:**
- Modify: `data/chapter3.json`
- Modify: `sections/chapter3.html`
- Modify: `css/sections/chapter3.css`

### Step 1: chapter3.json 업데이트

- [ ] `data/chapter3.json`을 아래 내용으로 완전히 교체한다.

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
    },
    {
      "id": "3-2",
      "type": "dax-cards",
      "title": "AI가 이끄는 스마트 에너지",
      "cards": [
        {
          "icon": "🤖",
          "title": "AiU AI 포털",
          "desc": "전사 통합 AI 업무 플랫폼. 구성원 누구나 AI 기반 업무 자동화를 활용할 수 있는 환경 구축"
        },
        {
          "icon": "🏭",
          "title": "AI 공장운영",
          "desc": "실시간 생산 데이터 분석으로 설비 최적화, 품질 예측, 에너지 효율 향상을 자동화"
        },
        {
          "icon": "🛡️",
          "title": "AI 안전체계",
          "desc": "CCTV·센서 기반 실시간 위험 감지 시스템으로 중대재해 사전 예방 및 안전 환경 구현"
        },
        {
          "icon": "⛽",
          "title": "바로주유",
          "desc": "앱 기반 비대면 주유 서비스. 차량 번호판 인식으로 간편결제와 멤버십 혜택을 동시에 제공"
        }
      ]
    },
    {
      "id": "3-3",
      "type": "green-stats",
      "title": "탄소를 줄이고, 지속가능성을 높이다",
      "stats": [
        { "value": "80.1", "unit": "%", "label": "폐기물 재활용률", "note": "2023년 기준" },
        { "value": "19",   "unit": "%↓", "label": "CO₂ 배출 감축",  "note": "2019년 대비" },
        { "value": "30",   "unit": "%↓", "label": "미세먼지 감축",   "note": "2019년 대비" }
      ],
      "badge": "ISCC PLUS 인증 획득"
    }
  ]
}
```

### Step 2: chapter3.html 재작성

- [ ] `sections/chapter3.html`을 아래 내용으로 완전히 교체한다.

```html
<div class="hero">
  <div class="hero__bg" data-bg="heroImage"></div>
  <div class="hero__content">
    <p class="hero__tag" data-bind="tag"></p>
    <h1 class="hero__title" data-bind="title"></h1>
  </div>
</div>

<!-- BX/DX/GX 탭 -->
<div class="section-block">
  <div class="section-block__header reveal">
    <p class="section-block__tag">3 — [Energy Plus]</p>
    <h2 class="section-block__title">Deep Transformation</h2>
  </div>
  <div id="ch3-dx-tabs"></div>
</div>

<!-- DAX / AI 카드 섹션 -->
<section class="ch3-dax">
  <div class="ch3-dax__inner">
    <div class="ch3-dax__header reveal">
      <p class="ch3-dax__tag">DIGITAL AI TRANSFORMATION</p>
      <h2 class="ch3-dax__title">AI가 이끄는 스마트 에너지</h2>
    </div>
    <div class="ch3-dax__grid">
      <div class="ch3-dax__card reveal" data-reveal-delay="0">
        <div class="ch3-dax__icon">🤖</div>
        <h3 class="ch3-dax__card-title">AiU AI 포털</h3>
        <p class="ch3-dax__card-desc">전사 통합 AI 업무 플랫폼. 구성원 누구나 AI 기반 업무 자동화를 활용할 수 있는 환경 구축</p>
      </div>
      <div class="ch3-dax__card reveal" data-reveal-delay="100">
        <div class="ch3-dax__icon">🏭</div>
        <h3 class="ch3-dax__card-title">AI 공장운영</h3>
        <p class="ch3-dax__card-desc">실시간 생산 데이터 분석으로 설비 최적화, 품질 예측, 에너지 효율 향상을 자동화</p>
      </div>
      <div class="ch3-dax__card reveal" data-reveal-delay="200">
        <div class="ch3-dax__icon">🛡️</div>
        <h3 class="ch3-dax__card-title">AI 안전체계</h3>
        <p class="ch3-dax__card-desc">CCTV·센서 기반 실시간 위험 감지 시스템으로 중대재해 사전 예방 및 안전 환경 구현</p>
      </div>
      <div class="ch3-dax__card reveal" data-reveal-delay="300">
        <div class="ch3-dax__icon">⛽</div>
        <h3 class="ch3-dax__card-title">바로주유</h3>
        <p class="ch3-dax__card-desc">앱 기반 비대면 주유 서비스. 차량 번호판 인식으로 간편결제와 멤버십 혜택을 동시에 제공</p>
      </div>
    </div>
  </div>
</section>

<!-- Green Transformation 수치 -->
<section class="ch3-green">
  <div class="ch3-green__inner">
    <div class="ch3-green__header reveal">
      <p class="ch3-green__tag">GREEN TRANSFORMATION</p>
      <h2 class="ch3-green__title">탄소를 줄이고,<br>지속가능성을 높이다</h2>
    </div>
    <div class="ch3-green__stats">
      <div class="ch3-green__stat reveal" data-reveal-delay="0">
        <div class="ch3-green__num">
          <span class="stat-count" data-count="80">80</span><span class="ch3-green__decimal">.1</span>
          <span class="ch3-green__unit">%</span>
        </div>
        <div class="ch3-green__label">폐기물 재활용률</div>
        <div class="ch3-green__note">2023년 기준</div>
      </div>
      <div class="ch3-green__stat reveal" data-reveal-delay="150">
        <div class="ch3-green__num">
          <span class="stat-count" data-count="19">19</span>
          <span class="ch3-green__unit">%↓</span>
        </div>
        <div class="ch3-green__label">CO₂ 배출 감축</div>
        <div class="ch3-green__note">2019년 대비</div>
      </div>
      <div class="ch3-green__stat reveal" data-reveal-delay="300">
        <div class="ch3-green__num">
          <span class="stat-count" data-count="30">30</span>
          <span class="ch3-green__unit">%↓</span>
        </div>
        <div class="ch3-green__label">미세먼지 감축</div>
        <div class="ch3-green__note">2019년 대비</div>
      </div>
    </div>
    <div class="ch3-green__badge reveal" data-reveal-delay="400">
      <span>✓ ISCC PLUS 인증 획득</span>
    </div>
  </div>
</section>

<!-- YouTube 영상 -->
<section class="ch3-video">
  <div class="ch3-video__inner">
    <div class="ch3-video__header reveal">
      <p class="ch3-video__tag">DEEP TRANSFORMATION JOURNEY</p>
      <h2 class="ch3-video__title">변화의 현장을 직접 만나보세요</h2>
    </div>
    <div class="ch3-video__embed reveal" data-reveal-delay="200">
      <!--
        아래 VIDEO_ID를 실제 GS칼텍스 YouTube 채널(youtube.com/@GScaltex)의
        "Deep Transformation Journey" 영상 ID로 교체하세요.
        채널 ID: UC-L1ASPpGeohPaxCtm0REbA
        예시: https://www.youtube.com/watch?v=VIDEO_ID
      -->
      <iframe
        src="https://www.youtube.com/embed/TqJLO-TwGdQ?rel=0&modestbranding=1"
        title="GS칼텍스 Deep Transformation Journey"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
      </iframe>
    </div>
    <p class="ch3-video__caption reveal" data-reveal-delay="300">
      GS칼텍스 공식 유튜브 채널에서 더 많은 영상을 만나보세요.
    </p>
  </div>
</section>
```

**주의:** YouTube video ID `TqJLO-TwGdQ`는 GS칼텍스 공식 채널의 영상 예시입니다. 구현 후 실제 채널(youtube.com/@GScaltex)에서 최신 "Deep Transformation Journey" 영상 ID를 확인하여 교체하세요.

### Step 3: chapter3.css 재작성

- [ ] `css/sections/chapter3.css`를 아래 내용으로 완전히 교체한다.

```css
#chapter3 .hero { background: #0D1B2A; }
#chapter3 .tab-section__sidebar { background: #101828; }
#chapter3 .tab-section__tab-icon { background: var(--color-green); }

/* DAX 카드 섹션 */
.ch3-dax {
  background: var(--color-navy);
  padding: 80px 5%;
}

.ch3-dax__inner {
  max-width: 1400px;
  margin: 0 auto;
}

.ch3-dax__tag {
  font-family: var(--font-en);
  font-size: 0.875rem;
  letter-spacing: 0.3em;
  color: var(--color-green);
  margin-bottom: 1rem;
}

.ch3-dax__title {
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  font-weight: 700;
  color: var(--color-white);
  margin-bottom: 3rem;
}

.ch3-dax__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.ch3-dax__card {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px;
  padding: 2rem 1.5rem;
  transition: border-color var(--transition), background var(--transition);
}

.ch3-dax__card:hover {
  border-color: rgba(0,200,83,0.4);
  background: rgba(0,200,83,0.05);
}

.ch3-dax__icon {
  font-size: 2rem;
  margin-bottom: 1.25rem;
}

.ch3-dax__card-title {
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--color-white);
  margin-bottom: 0.75rem;
}

.ch3-dax__card-desc {
  font-size: 0.875rem;
  line-height: 1.7;
  color: rgba(255,255,255,0.55);
}

/* Green Transformation */
.ch3-green {
  background: #F8F9FA;
  padding: 80px 5%;
}

.ch3-green__inner {
  max-width: 1400px;
  margin: 0 auto;
}

.ch3-green__tag {
  font-family: var(--font-en);
  font-size: 0.875rem;
  letter-spacing: 0.3em;
  color: var(--color-green-dark);
  margin-bottom: 1rem;
}

.ch3-green__title {
  font-size: clamp(1.75rem, 3.5vw, 3rem);
  font-weight: 700;
  color: var(--color-navy);
  line-height: 1.3;
  margin-bottom: 3.5rem;
}

.ch3-green__stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 2.5rem;
}

.ch3-green__stat {
  border-top: 3px solid var(--color-green);
  padding-top: 1.5rem;
}

.ch3-green__num {
  font-family: var(--font-en);
  font-size: clamp(3rem, 6vw, 5rem);
  color: var(--color-navy);
  line-height: 1;
  margin-bottom: 0.5rem;
}

.ch3-green__decimal {
  font-size: 0.6em;
  opacity: 0.7;
}

.ch3-green__unit {
  font-size: 0.5em;
  color: var(--color-green-dark);
}

.ch3-green__label {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-navy);
  margin-bottom: 0.25rem;
}

.ch3-green__note {
  font-size: 0.8125rem;
  color: var(--color-text-muted);
}

.ch3-green__badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--color-green);
  color: var(--color-navy);
  font-weight: 700;
  font-size: 0.9375rem;
  padding: 0.75rem 1.5rem;
  border-radius: 999px;
}

/* YouTube 영상 */
.ch3-video {
  background: var(--color-white);
  padding: 80px 5%;
}

.ch3-video__inner {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}

.ch3-video__tag {
  font-family: var(--font-en);
  font-size: 0.875rem;
  letter-spacing: 0.3em;
  color: var(--color-text-muted);
  margin-bottom: 1rem;
}

.ch3-video__title {
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  font-weight: 700;
  color: var(--color-navy);
  margin-bottom: 2.5rem;
}

.ch3-video__embed {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 24px 60px rgba(0,0,0,0.12);
}

.ch3-video__embed iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.ch3-video__caption {
  margin-top: 1.5rem;
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

@media (max-width: 768px) {
  .ch3-dax__grid { grid-template-columns: repeat(2, 1fr); }
  .ch3-green__stats { grid-template-columns: 1fr; }
}
```

- [ ] **Step 4: 브라우저 확인**

Chapter 3 이동. 확인 항목:
1. BX/DX/GX 탭 섹션이 정상 표시됨
2. DAX 카드 4개가 다크 배경에 2×2 그리드로 표시됨
3. 카드 호버 시 테두리 색상이 초록으로 변함
4. Green 수치 3개가 대형 타이포로 표시됨
5. 수치들이 스크롤 시 카운터 애니메이션됨
6. ISCC PLUS 뱃지가 표시됨
7. YouTube iframe이 16:9 비율로 표시됨

- [ ] **Step 5: 커밋**

```bash
git add data/chapter3.json sections/chapter3.html css/sections/chapter3.css
git commit -m "feat: chapter3 — DAX cards, green stats, YouTube embed"
```

---

## Task 5: Chapter 4 — .reveal 클래스 추가

**Files:**
- Modify: `sections/chapter4.html`

- [ ] **Step 1: chapter4.html에 .reveal 클래스 추가**

`sections/chapter4.html`을 아래 내용으로 완전히 교체한다.

```html
<div class="hero">
  <div class="hero__bg" data-bg="heroImage"></div>
  <div class="hero__content">
    <p class="hero__tag" data-bind="tag"></p>
    <h1 class="hero__title" data-bind="title"></h1>
  </div>
</div>
<div class="section-block">
  <div class="section-block__header reveal">
    <p class="section-block__tag">4 — [Social Plus]</p>
    <h2 class="section-block__title">사회공헌활동</h2>
  </div>
  <div id="ch4-social-cards" class="reveal" data-reveal-delay="200"></div>
</div>
<div class="section-block" style="background: var(--color-navy);">
  <div class="section-block__header reveal">
    <p class="section-block__tag" style="color: var(--color-green);">4 — [Social Plus]</p>
    <h2 class="section-block__title" style="color: var(--color-white);">스포츠 후원 활동</h2>
  </div>
  <div id="ch4-sports-cards" class="reveal" data-reveal-delay="200"></div>
</div>
```

- [ ] **Step 2: 브라우저 확인**

Chapter 4 이동. 확인 항목:
1. 사회공헌 확장카드가 스크롤 시 페이드인됨
2. 스포츠단 확장카드가 스크롤 시 페이드인됨
3. 카드 클릭 시 기존 expand 동작이 정상적으로 작동함

- [ ] **Step 3: 커밋**

```bash
git add sections/chapter4.html
git commit -m "feat: chapter4 — add scroll-reveal animations"
```

---

## Task 6: 전체 통합 검증

- [ ] **Step 1: 전체 챕터 순서대로 탐색**

로컬 서버에서 Intro → Chapter 1 → 2 → 3 → 4 → Outro 순서로 이동하며 확인:

| 항목 | 확인 내용 |
|------|-----------|
| 타임라인 | 10개 항목이 지그재그 배열, 스크롤 시 순차 등장 |
| 팩토리 인포 | 4개 수치 카운터 애니메이션 |
| 바 차트 | 얇은 바, GS칼텍스 그린 강조 |
| 세계 맵 | 10개 도시 점 순차 등장, 호버 레이블 |
| 핀드 스탯 | 2,068 / 343 대형 수치 카운터 |
| DAX 카드 | 4개 카드 호버 효과 |
| Green 수치 | 80.1 / 19 / 30 카운터 |
| YouTube | iframe 정상 로드 |
| Chapter 4 | 확장카드 페이드인 + 클릭 동작 |

- [ ] **Step 2: nav 이전/다음 버튼 동작 확인**

모든 챕터에서 ← → 버튼으로 이동 시 오류 없음을 확인.

- [ ] **Step 3: 모바일 반응형 확인**

브라우저 DevTools에서 375px 너비로 확인:
- 타임라인: 단일 컬럼
- 팩토리 그리드: 2열
- DAX 그리드: 2열
- Green 수치: 단일 컬럼

- [ ] **Step 4: 최종 커밋**

```bash
git add -A
git commit -m "feat: phase2 digital brochure redesign complete"
```
