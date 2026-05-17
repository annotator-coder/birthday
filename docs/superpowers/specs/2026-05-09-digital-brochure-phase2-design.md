# GS칼텍스 디지털 브로슈어 Phase 2 설계 문서

## 목표

현재 완성된 브로슈어(Phase 1)를 챕터별 전면 재설계(Approach B)로 대폭 개선한다. 전문 디지털 브로슈어 업체 레퍼런스(BMW Report, Adidas Report, GSAP 스크롤텔링)를 참조해 시각적 완성도와 정보 밀도를 높인다.

---

## 아키텍처

- 기존 Loader / Nav / 컴포넌트 시스템 유지
- 각 챕터의 HTML/CSS/JSON을 독립적으로 전면 재작성
- 새 공통 유틸 `scroll-reveal.js` 추가 (IntersectionObserver 기반)
- 새 섹션 타입(timeline, factory-infographic, world-map, video-embed)은 범용 컴포넌트 아님 — 각 챕터 HTML에 직접 마크업

### 공통 디자인 원칙

- Dark/Light 교차 배경: `--color-navy` ↔ `#FFFFFF` ↔ `#F5F5F5`
- 숫자 타이포그래피 주인공: stat 수치 64–96px (Bebas Neue)
- 스크롤 시 `.reveal` 클래스 요소가 아래→위 페이드인
- 챕터 Hero: 60vh 유지 (Intro/Outro만 100vh)

---

## 공통 시스템: scroll-reveal.js

```
components/scroll-reveal.js
```

- `RevealObserver.init()` — `.reveal` 클래스를 가진 모든 요소에 IntersectionObserver 등록
- threshold: 0.15, rootMargin: '0px 0px -60px 0px'
- 요소 진입 시 `.is-visible` 추가 → CSS transition으로 fadeInUp
- `data-reveal-delay="200"` 속성으로 개별 딜레이 지정 가능
- Loader.init() 완료 후 `RevealObserver.init()` 호출

CSS (base.css에 추가):
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

---

## Chapter 1: Heritage Plus

### 파일
- `sections/chapter1.html` — 전면 재작성
- `data/chapter1.json` — 타임라인 데이터 추가
- `css/sections/chapter1.css` — 전면 재작성

### 섹션 구성

**1. Hero (60vh)** — 현재 유지

**2. 성장 타임라인 (1967–2025)**
- 지그재그(좌우 교차) 세로 배열
- 마일스톤 25개 이상: 연도 + 사건명 + 짧은 설명
- `.reveal` 적용으로 스크롤 시 순서대로 등장
- JSON: `chapter1.json` → `sections[].type: "timeline"`, `milestones: [{year, event, desc}]`

주요 마일스톤 데이터:
```
1967 창립 / 1969 여수공장 가동 / 1971 내수 첫 공급
1987 중질유 분해시설 / 1995 윤활유 공장(인천) / 1999 IMF 위기 극복
2001 GS칼텍스로 사명 변경 / 2005 방향족 생산 세계 최대급
2010 MFC 준공 / 2015 그린에너지 전환 선언
2019 DX 전략 발표 / 2021 ISCC PLUS 인증 / 2023 정제능력 세계 4위
2025 NCSI 17년 연속 1위
```

**3. 여수공장 팩토리 인포그래픽**
- 다크 배경 (`--color-navy`) 섹션
- 4개 주요 수치를 대형 타이포로 배치:
  - `80만` 배럴/일 — 원유 정제 처리량
  - `27.5만` 배럴/일 — 중질유 분해 처리량
  - `325기` — 제품 저장 탱크
  - `100,000kW` — 자체 발전 능력
- 수치 아래 StatCounter 애니메이션 적용

**4. 정제능력 순위 바 차트** — 현재 유지 (바 두께 개선 완료)

---

## Chapter 2: Value Plus

### 파일
- `sections/chapter2.html` — 전면 재작성
- `data/chapter2.json` — 세계 거점 데이터 추가
- `css/sections/chapter2.css` — 전면 재작성

### 섹션 구성

**1. Hero (60vh)** — 현재 유지

**2. P/C/L 탭섹션** — 기존 유지, 탭 디자인 개선

**3. 세계 수출 맵**
- SVG 세계 지도 (단순화) 위에 거점 도시 점(dot) 표시
- 10개국 13개 거점: UK / Russia / Czech / Italy / UAE / India / Japan / China / Vietnam / Singapore
- 진입 시 점들이 순차적으로 페이드인 (애니메이션)
- 상단 헤드라인: `50개국` 수출, `10개국 13개 거점`
- JSON: `chapter2.json` → `globals: [{country, city, lat, lng}]`

**4. 핀드 스탯 — 전국 네트워크**
- 라이트 배경 섹션
- 두 수치를 나란히 대형 타이포:
  - `2,068` 전국 주유소
  - `343` 전국 충전소
- 수치 아래 출처: "2024년 2월 기준"

---

## Chapter 3: Energy Plus

### 파일
- `sections/chapter3.html` — 전면 재작성
- `data/chapter3.json` — DAX/Green 데이터 보강
- `css/sections/chapter3.css` — 전면 재작성

### 섹션 구성

**1. Hero (60vh)** — 현재 유지

**2. DAX/AI 트랜스포메이션 카드**
- 다크 배경 섹션
- 4개 카드 그리드 (2×2):
  - AiU AI 포털 — 통합 AI 업무 플랫폼
  - AI 공장운영 — 생산 최적화, 품질 예측
  - AI 안전체계 — 실시간 위험 감지
  - 바로주유 — 앱 기반 비대면 주유 서비스
- 각 카드: 아이콘 + 제목 + 설명 2줄

**3. Green Transformation 수치 섹션**
- 라이트 배경
- 3개 주요 지표를 대형 타이포로:
  - `80.1%` 폐기물 재활용률
  - `19%↓` CO₂ 감축
  - `30%↓` 미세먼지 감축
- 하단: ISCC PLUS 인증 뱃지 텍스트

**4. YouTube 영상 임베드**
- 채널: UC-L1ASPpGeohPaxCtm0REbA (GS칼텍스 공식)
- "Deep Transformation Journey" 시리즈 소개
- `<iframe>` 임베드, 16:9 비율, 최대 너비 800px

---

## Chapter 4: Social Plus

### 파일
- `sections/chapter4.html` — 유지 (소규모 개선)
- `data/chapter4.json` — 현재 유지
- `css/sections/chapter4.css` — 현재 유지

### 섹션 구성

- 기존 사회공헌 확장카드 (여울마루/마음톡톡/지구톡톡) 유지
- 기존 스포츠단 확장카드 (배구/골프/바둑) 유지
- `.reveal` 클래스 추가로 스크롤 애니메이션만 추가

---

## 파일 구조 변경 요약

```
추가:
  components/scroll-reveal.js       (신규)

수정:
  sections/chapter1.html            (타임라인 + 팩토리 인포그래픽 추가)
  sections/chapter2.html            (세계 맵 + 핀드 스탯 추가)
  sections/chapter3.html            (DAX 카드 + Green 수치 + YouTube 추가)
  data/chapter1.json                (타임라인 데이터)
  data/chapter2.json                (세계 거점 데이터)
  data/chapter3.json                (DAX/Green 데이터 보강)
  css/base.css                      (.reveal / .is-visible 추가)
  css/sections/chapter1.css
  css/sections/chapter2.css
  css/sections/chapter3.css
  index.html                        (scroll-reveal.js 스크립트 추가)

소규모 수정:
  sections/chapter4.html            (.reveal 클래스 추가만)

유지:
  data/chapter4.json
  css/sections/chapter4.css
  components/loader.js
  components/nav.js
  components/tab-section.js
  components/expand-card.js
  components/stat-counter.js
  components/chart-section.js
```

---

## 미결 사항

- 세계 수출 맵: SVG 세계 지도는 오픈소스(natural earth / simplemaps) 활용 또는 CSS 좌표 방식으로 구현. 구현 단계에서 결정.
- YouTube 임베드 영상 ID: 구현 시 채널 페이지에서 최신 영상 ID 확인 필요.
