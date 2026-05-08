# GS칼텍스 디지털 브로슈어 설계 문서

**날짜:** 2026-05-08  
**참조:** `디지털브로슈어/GSCaltex_DigiBR_KR_print 4.pdf` (36페이지), 라이브 사이트 `https://www.gscaltex.com/digitalbrochure/en/index.html`

---

## 목표

PDF 인쇄본을 기반으로 GS칼텍스 스타일의 인터랙티브 웹 디지털 브로슈어를 새로 제작한다.  
콘텐츠(텍스트·수치)와 레이아웃(HTML/JS)을 분리하여, 데이터 업데이트 시 JSON 파일만 수정하면 되도록 구조화한다.

---

## 콘텐츠 구조 (PDF 기반)

| 챕터 | 태그 | 서브섹션 | 주요 인터랙션 |
|------|------|----------|--------------|
| Intro | - | GS칼텍스의 생활 속 제품들 | 석유→제품 인포그래픽 |
| Chapter 1 | Heritage Plus | 1-1 석유산업 / 1-2 성장 히스토리 / 1-3 네트워크 | 막대차트, 선·면차트, 세계지도 |
| Chapter 2 | Value Plus | 2-1 사업영역 / 2-2 여수공장 / 2-3 부문별 실적 / 2-4 수출국가 / 2-5 주유소·충전소 | P/C/L 탭, 파이차트, 수출 지도 |
| Chapter 3 | Energy Plus | 3-1 Deep Transformation / 3-2 순환경제 / 3-3 에너지플러스 / 3-4 에너지플러스 에코 | B/D/G 탭, 순환 다이어그램 |
| Chapter 4 | Social Plus | 4-1 사회공헌활동 / 4-2 스포츠 후원 | 3열 확장 카드 |
| Outro | - | 지속가능한 미래를 위해 | 풀스크린 마무리 |

---

## 아키텍처

```
디지털브로슈어/
├── index.html                  # 네비게이션 쉘 + 섹션 로더
├── data/
│   ├── intro.json
│   ├── chapter1.json
│   ├── chapter2.json
│   ├── chapter3.json
│   └── chapter4.json
├── sections/
│   ├── intro.html
│   ├── chapter1.html
│   ├── chapter2.html
│   ├── chapter3.html
│   └── chapter4.html
├── components/
│   ├── tab-section.js
│   ├── expand-card.js
│   ├── stat-counter.js
│   └── nav.js
├── css/
│   ├── base.css
│   └── sections/
│       ├── intro.css
│       ├── chapter1.css
│       ├── chapter2.css
│       ├── chapter3.css
│       └── chapter4.css
└── assets/
    └── images/
```

---

## JSON 데이터 스키마

각 `data/chapterN.json`은 아래 구조를 따른다.

```json
{
  "id": "chapterN",
  "tag": "Value Plus",
  "title": "챕터 제목",
  "heroImage": "assets/images/chN-hero.jpg",
  "sections": [
    {
      "id": "N-1",
      "title": "서브섹션 제목",
      "type": "<컴포넌트 타입>",
      "description": "...",
      "stats": [
        { "label": "항목명", "value": "800,000", "unit": "bbl/day" }
      ]
    }
  ]
}
```

### 지원 컴포넌트 타입

| type | 용도 | 사용 섹션 |
|------|------|----------|
| `hero-text` | 풀스크린 배경 이미지 + 텍스트 페이드인 | 챕터 인트로 전체 |
| `tab-section` | 좌측 고정 아이콘, 우측 탭 전환 콘텐츠 | 2-1 사업영역, 3-1 Deep Transformation |
| `expand-card` | 3열 카드, + 버튼 클릭 시 전면 확대 | 4-1 사회공헌, 4-2 스포츠 |
| `bubble-stat` | 큰 원형 배경 위 핵심 숫자 표시 | 2-5 주유소·충전소 |
| `chart-section` | 막대·면·파이 차트 (Chart.js 사용) | 1-1, 1-2, 2-3 |
| `map-section` | SVG 기반 세계지도·한국지도 | 1-3 네트워크, 2-4 수출국가 |
| `infographic` | 커스텀 인포그래픽 (석유 증류탑 등) | Intro |
| `circular-diagram` | 순환 화살표 다이어그램 | 3-2 순환경제 |

---

## 네비게이션 & 인터랙션

**네비게이션**
- 상단 고정 헤더: 챕터 번호 클릭 → 해당 챕터로 이동
- 좌/우 화살표(또는 키보드): 챕터 간 전환
- 챕터 내 서브섹션: 세로 스크롤로 순서 노출

**인터랙션 패턴**
- **탭 전환:** 클릭 시 좌측 아이콘·설명 유지, 우측 콘텐츠 교체 (CSS transition)
- **확장 카드:** + 클릭 시 해당 카드 전면 확대, 나머지 축소
- **숫자 카운터:** 섹션 진입 시 IntersectionObserver로 감지 → 0에서 최종값으로 애니메이션
- **챕터 인트로:** 풀스크린 배경 이미지 + 텍스트 페이드인

**데이터 업데이트 흐름**
```
data/*.json 수정 → 브라우저 새로고침 → 자동 렌더링
```
별도 빌드 과정 없음.

---

## 기술 스택

- **HTML/CSS/Vanilla JS** — 빌드 도구 없이 브라우저에서 바로 실행
- **Chart.js** — 막대·면·파이 차트
- **SVG** — 지도 시각화 (세계지도, 한국지도)
- **IntersectionObserver API** — 스크롤 진입 감지 및 애니메이션 트리거
- **Fetch API** — JSON 파일 로드

---

## 디자인 토큰 (PDF 기반)

```css
--color-green: #00C853;       /* GS칼텍스 메인 그린 */
--color-dark-navy: #0D1B2A;   /* 다크 배경 */
--color-teal: #00897B;        /* 2장 Value 섹션 */
--color-purple: #1A237E;      /* 석유화학 */
--color-light-bg: #F5F5F5;    /* 밝은 섹션 배경 */
--font-primary: 'Pretendard', sans-serif;
--font-en: 'Bebas Neue', sans-serif;  /* 챕터 태그 */
```

---

## 범위 외 (이번 구현에서 제외)

- 실제 이미지 에셋 (별도 준비 필요)
- 영문 버전 (`/en/`)
- 서버 배포 설정
- 데이터 CMS 연동
