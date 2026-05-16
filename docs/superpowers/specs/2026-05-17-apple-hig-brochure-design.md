# Apple HIG 디지털 브로슈어 적용 설계

**날짜:** 2026-05-17  
**대상:** GS칼텍스 디지털 브로슈어 (`/디지털브로슈어`)  
**디자인 참조:** `/DESIGN.md` (Apple Human Interface Guidelines)  
**전략:** HIG 원칙 + GS 브랜드 색상 유지 (Option B)  
**구현 방식:** CSS 변수 일괄 리팩토링 (Option A)  
**범위:** Chapter1 파일럿 → 나머지 챕터 확장

---

## 1. 핵심 결정 사항

### 변경하는 것
- CSS 변수 체계를 DESIGN.md 토큰 기반으로 재정의
- 타이포그래피: Bebas Neue 제거, Pretendard 단일 폰트 + HIG 스케일 적용
- 네비게이션: 다크 네이비 → 반투명 라이트 + 세그먼트 컨트롤
- 팩토리 통계 레이아웃: 4열 카드 그리드 → HIG Grouped List
- 탭 컴포넌트 사이드바 → HIG Segmented Control
- 섹션 배경색: `#F5F5F5` → HIG `#F2F2F7`
- 카드 모서리 반경: `8px` → `13px` (HIG `rounded.lg`)

### 변경하지 않는 것
- GS칼텍스 브랜드 색상: 네이비 `#0D1B2A`, 그린 `#00C853`, 그린다크 `#00962D`
- 전체 HTML 구조 및 JS 컴포넌트 로직
- 데이터 파일 (`data/*.json`)
- Hero 섹션의 다크 네이비 배경 (브랜드 강도 유지)
- 타임라인 좌우 교차 레이아웃

---

## 2. CSS 변수 재정의 (`css/base.css`)

```css
:root {
  /* === GS 브랜드 색상 (유지) === */
  --color-green:      #00C853;
  --color-green-dark: #00962D;
  --color-navy:       #0D1B2A;
  --color-teal:       #00897B;
  --color-purple:     #1A237E;
  --color-white:      #FFFFFF;

  /* === HIG 의미론적 색상 (신규) === */
  --color-bg:              #FFFFFF;       /* HIG background */
  --color-bg-secondary:    #F2F2F7;       /* HIG background-secondary */
  --color-bg-grouped:      #F2F2F7;       /* HIG background-grouped */
  --color-bg-card:         #FFFFFF;       /* HIG background-grouped-secondary */
  --color-text:            #1C1C1E;       /* HIG label (기존 #1A1A1A 대체) */
  --color-text-secondary:  #3C3C43;       /* HIG label-secondary */
  --color-text-muted:      #8E8E93;       /* HIG label-tertiary 근사값 */
  --color-separator:       #E5E5EA;       /* HIG separator */

  /* === HIG 폰트 스케일 === */
  --font-ko: 'Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
  /* --font-en 제거 (Bebas Neue 사용 중단) */

  --text-large-title: 2.125rem;  /* 34pt */
  --text-title1:      1.75rem;   /* 28pt */
  --text-title2:      1.375rem;  /* 22pt */
  --text-title3:      1.25rem;   /* 20pt */
  --text-headline:    1.0625rem; /* 17pt, weight 600 */
  --text-body:        1.0625rem; /* 17pt, weight 400 */
  --text-callout:     1rem;      /* 16pt */
  --text-subheadline: 0.9375rem; /* 15pt */
  --text-footnote:    0.8125rem; /* 13pt */
  --text-caption1:    0.75rem;   /* 12pt */

  /* === HIG 모서리 반경 === */
  --rounded-sm:   6px;
  --rounded-md:   10px;
  --rounded-lg:   13px;   /* 카드, Grouped List */
  --rounded-xl:   16px;   /* 모달, 시트 */
  --rounded-full: 9999px; /* 알약형 버튼 */

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
  --nav-height:  52px;   /* 기존 64px → HIG 52px */
  --transition:  0.25s ease;
}
```

---

## 3. 네비게이션 (`css/nav.css`)

### 변경 사항
- 배경: `rgba(navy, 0.95)` → `rgba(255,255,255,0.92)` + `backdrop-filter: blur(20px)`
- 높이: `64px` → `52px`
- 로고 색상: `white` → `var(--color-navy)`
- 챕터 탭: `<ul>` 개별 `<li>` → HIG Segmented Control 스타일

### Segmented Control 구조
```css
/* 컨테이너 */
.nav-chapters {
  display: flex;
  background: var(--color-separator);  /* #E5E5EA */
  border-radius: 9px;
  padding: 2px;
  gap: 0;
}

/* 개별 아이템 */
.nav-chapters li {
  padding: 5px 14px;
  border-radius: 7px;
  font-size: var(--text-caption1);  /* 12px */
  font-weight: 500;
  color: var(--color-text-muted);
}

/* 활성 상태 */
.nav-chapters li.active {
  background: var(--color-navy);
  color: var(--color-white);
  font-weight: 600;
  box-shadow: 0 1px 4px rgba(0,0,0,0.2);
}
```

### 이전/다음 버튼
- 이전: 라이트 그레이 배경 (`#E5E5EA`)
- 다음: 네이비 배경 (`#0D1B2A`)
- 두 버튼 모두 `border-radius: var(--rounded-full)`

---

## 4. 섹션 공통 스타일 (`css/base.css`)

### 타이포그래피 업데이트
```css
/* 기존 .hero__title */
.hero__title {
  font-size: var(--text-large-title);  /* 34pt */
  font-weight: 700;
  letter-spacing: -0.022em;
  line-height: 1.18;
}

/* 기존 .section-block__title */
.section-block__title {
  font-size: var(--text-title2);  /* 22pt */
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.27;
}

/* 기존 .section-block__desc */
.section-block__desc {
  font-size: var(--text-subheadline);  /* 15pt */
  color: var(--color-text-muted);
  line-height: 1.6;
}

/* 기존 .section-block__tag */
.section-block__tag {
  font-size: var(--text-caption1);  /* 12pt */
  font-weight: 600;
  color: var(--color-text-muted);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
```

### 섹션 배경
```css
.section-block { background: var(--color-bg-secondary); }  /* #F2F2F7 */
.section-block--white { background: var(--color-bg); }
```

---

## 5. Chapter1 컴포넌트 (`css/sections/chapter1.css`)

### 5-1. 타임라인
- 연도 폰트: `font-family: var(--font-ko)` + `font-size: var(--text-title3)` (20pt), `font-weight: 700`
- 닷 크기: `14px` → `12px`, border `3px` → `2.5px`
- 배경: `#F8F9FA` → `var(--color-bg-secondary)` (`#F2F2F7`)

### 5-2. 팩토리 인포그래픽 → HIG Grouped List
기존 4열 카드 그리드를 HIG Grouped List 패턴으로 교체.

```css
.ch1-factory__grid {
  /* 기존: display: grid; grid-template-columns: repeat(4, 1fr); */
  /* 신규: */
  display: flex;
  flex-direction: column;
  background: rgba(255,255,255,0.07);
  border-radius: var(--rounded-lg);  /* 13px */
  overflow: hidden;
}

.ch1-factory__stat {
  /* 기존: border-left 스타일 */
  /* 신규: */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-3) var(--space-4);  /* 12px 16px */
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.ch1-factory__stat:last-child { border-bottom: none; }

.ch1-factory__num {
  font-size: var(--text-title3);  /* 20pt */
  font-weight: 700;
  color: var(--color-green);
  letter-spacing: -0.02em;
  line-height: 1;
}

.ch1-factory__label {
  font-size: var(--text-subheadline);  /* 15pt */
  color: rgba(255,255,255,0.75);
}
```

팩토리 제목도 업데이트:
```css
.ch1-factory__title {
  font-size: var(--text-title1);  /* 28pt */
  font-weight: 700;
  letter-spacing: -0.022em;
  line-height: 1.25;
}
```

### 5-3. 탭 섹션 → HIG Segmented Control

기존 `.tab-section` (사이드바 + 콘텐츠 분리 레이아웃)을 Segmented Control 패턴으로 재구성.

```css
/* 탭 컨테이너 */
.tab-section {
  display: block;  /* 기존 grid 해제 */
  padding: var(--space-8) var(--space-6);
  background: var(--color-bg-secondary);
}

/* Segmented Control */
.tab-section__sidebar {
  display: flex;
  background: var(--color-separator);  /* #E5E5EA */
  border-radius: 9px;
  padding: 2px;
  gap: 0;
  margin-bottom: var(--space-4);
}

.tab-section__tab {
  flex: 1;
  padding: 7px var(--space-3);
  border-radius: 7px;
  font-size: var(--text-footnote);  /* 13pt */
  font-weight: 500;
  color: var(--color-text-muted);
  text-align: center;
  border: none;  /* 기존 border-color: green 제거 */
  background: transparent;
}

.tab-section__tab.active {
  background: var(--color-bg);  /* #fff */
  color: var(--color-text);     /* #1C1C1E */
  font-weight: 600;
  box-shadow: 0 1px 4px rgba(0,0,0,0.12);
  /* 기존 border-color: green, green background 제거 */
}

/* 세그먼트 컨트롤에서 아이콘·설명 숨김 — HTML 변경 없이 CSS만으로 처리 */
.tab-section__tab-icon { display: none; }
.tab-section__tab-info { display: none; }

/* 탭 콘텐츠 카드 */
.tab-section__content {
  background: var(--color-bg-card);  /* #fff */
  border-radius: var(--rounded-lg);  /* 13px */
  padding: var(--space-5);
}

/* 통계 칩 */
.tab-section__stat-item {
  background: var(--color-bg-secondary);  /* #F2F2F7 */
  border-radius: var(--rounded-md);        /* 10px */
}

.tab-section__stat-value {
  font-family: var(--font-ko);
  font-size: var(--text-title2);  /* 22pt */
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-navy);
}
```

---

## 6. 파일별 작업 목록

| 파일 | 작업 유형 | 주요 변경 |
|------|-----------|-----------|
| `css/base.css` | 전면 개정 | CSS 변수 재정의, 타이포 스케일, 섹션 배경 |
| `css/nav.css` | 전면 재작성 | 라이트 반투명 배경, Segmented Control |
| `css/components.css` | 부분 수정 | 탭 Segmented Control, 카드 모서리 |
| `css/sections/chapter1.css` | 부분 수정 | 타임라인 폰트, 팩토리 Grouped List |

나머지 챕터 CSS (`chapter2~4.css`, `intro.css`)는 Chapter1 검증 후 동일 패턴으로 확장.

---

## 7. 적용하지 않는 HIG 토큰

- **색상 교체** (`#007AFF` 등): GS 브랜드 정체성 보호를 위해 적용 안 함
- **SF Pro 폰트**: 웹 라이선스 없음, Pretendard로 대체
- **다크 모드 토큰**: 현재 브로슈어는 단일 테마
- **HIG 접근성 기준 (WCAG AA 4.5:1)**: 그린 `#00C853`은 대비율 미달이나 GS 브랜드 색상이므로 유지 — 단, 아이콘 또는 텍스트 크기 보정으로 보완

---

## 8. 성공 기준

- [ ] `npx @google/design.md lint DESIGN.md` — 에러 0개 유지
- [ ] Chapter1 브라우저 렌더링 — 깨짐 없음
- [ ] 모바일(768px) 반응형 — 세그먼트 컨트롤 스크롤 처리 확인
- [ ] 기존 JS 컴포넌트 (`tab-section.js`, `expand-card.js`) — 동작 이상 없음
