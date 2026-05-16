---
version: alpha
name: Apple Human Interface Guidelines
description: Apple HIG 기반 디자인 시스템. iOS/macOS의 공식 디자인 원칙과 토큰을 따른다.
colors:
  # System Colors (iOS Light Mode)
  primary: "#007AFF"
  primary-dark: "#0A84FF"
  green: "#34C759"
  green-dark: "#30D158"
  indigo: "#5856D6"
  indigo-dark: "#5E5CE6"
  orange: "#FF9500"
  orange-dark: "#FF9F0A"
  pink: "#FF2D55"
  pink-dark: "#FF375F"
  purple: "#AF52DE"
  purple-dark: "#BF5AF2"
  red: "#FF3B30"
  red-dark: "#FF453A"
  teal: "#5AC8FA"
  teal-dark: "#64D2FF"
  yellow: "#FFCC00"
  yellow-dark: "#FFD60A"
  # Label Colors
  label: "#000000"
  label-secondary: "#3C3C43"
  label-tertiary: "#AEAEB2"
  label-quaternary: "#CACACE"
  # Background Colors
  background: "#FFFFFF"
  background-secondary: "#F2F2F7"
  background-tertiary: "#FFFFFF"
  background-grouped: "#F2F2F7"
  background-grouped-secondary: "#FFFFFF"
  # Separator & Fill
  separator: "#C6C6C8"
  separator-opaque: "#C6C6C8"
  fill: "#D4D4D7"
  fill-secondary: "#DADADD"
  fill-tertiary: "#E3E3E6"
  fill-quaternary: "#EDEDF0"
  # On Colors
  on-primary: "#FFFFFF"
typography:
  large-title:
    fontFamily: SF Pro Display
    fontSize: 2.125rem
    fontWeight: 400
    lineHeight: 1.21
    letterSpacing: -0.022em
  title-1:
    fontFamily: SF Pro Display
    fontSize: 1.75rem
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: 0em
  title-2:
    fontFamily: SF Pro Display
    fontSize: 1.375rem
    fontWeight: 400
    lineHeight: 1.27
    letterSpacing: 0em
  title-3:
    fontFamily: SF Pro Display
    fontSize: 1.25rem
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: 0em
  headline:
    fontFamily: SF Pro Text
    fontSize: 1.0625rem
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: -0.022em
  body:
    fontFamily: SF Pro Text
    fontSize: 1.0625rem
    fontWeight: 400
    lineHeight: 1.47
    letterSpacing: -0.022em
  callout:
    fontFamily: SF Pro Text
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.375
    letterSpacing: -0.022em
  subheadline:
    fontFamily: SF Pro Text
    fontSize: 0.9375rem
    fontWeight: 400
    lineHeight: 1.33
    letterSpacing: -0.016em
  footnote:
    fontFamily: SF Pro Text
    fontSize: 0.8125rem
    fontWeight: 400
    lineHeight: 1.385
    letterSpacing: -0.008em
  caption-1:
    fontFamily: SF Pro Text
    fontSize: 0.75rem
    fontWeight: 400
    lineHeight: 1.33
    letterSpacing: 0em
  caption-2:
    fontFamily: SF Pro Text
    fontSize: 0.6875rem
    fontWeight: 400
    lineHeight: 1.27
    letterSpacing: 0.006em
rounded:
  xs: 4px
  sm: 6px
  md: 10px
  lg: 13px
  xl: 16px
  2xl: 20px
  full: 9999px
spacing:
  1: 4px
  2: 8px
  3: 12px
  4: 16px
  5: 20px
  6: 24px
  8: 32px
  10: 40px
  12: 48px
  16: 64px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.headline}"
    rounded: "{rounded.md}"
    padding: 16px 20px
  button-primary-hover:
    backgroundColor: "#0066DD"
  button-secondary:
    backgroundColor: "{colors.fill}"
    textColor: "{colors.primary}"
    typography: "{typography.headline}"
    rounded: "{rounded.md}"
    padding: 16px 20px
  button-destructive:
    backgroundColor: "{colors.red}"
    textColor: "{colors.on-primary}"
    typography: "{typography.headline}"
    rounded: "{rounded.md}"
    padding: 16px 20px
  card:
    backgroundColor: "{colors.background}"
    rounded: "{rounded.xl}"
    padding: 16px
  card-grouped:
    backgroundColor: "{colors.background-grouped-secondary}"
    rounded: "{rounded.xl}"
    padding: 16px
  navigation-bar:
    backgroundColor: "{colors.background}"
    textColor: "{colors.label}"
    typography: "{typography.headline}"
  tab-bar:
    backgroundColor: "{colors.background}"
    textColor: "{colors.label-secondary}"
  list-row:
    backgroundColor: "{colors.background}"
    textColor: "{colors.label}"
    typography: "{typography.body}"
    padding: 12px 16px
---

## Overview

Apple Human Interface Guidelines(HIG)는 Apple 플랫폼 전반에 걸쳐 일관되고 직관적인 사용자 경험을 만들기 위한 디자인 원칙이다.

**핵심 원칙:**
- **Clarity(명확성)**: 텍스트는 모든 크기에서 읽기 쉽고, 아이콘은 정확하고 의미 있어야 한다.
- **Deference(존중)**: 콘텐츠가 인터페이스를 지배하고, 기능은 콘텐츠를 돕는다.
- **Depth(깊이)**: 시각적 레이어와 사실적인 모션이 계층 구조를 전달한다.

## Colors

색상은 정보를 전달하고, 상호작용을 나타내며, 브랜드를 표현하는 데 사용된다.

- **Primary (#007AFF):** Apple 시스템 블루. 링크, 버튼, 선택 상태 등 인터랙티브 요소에 사용.
- **Label (#000000):** 주요 텍스트 색상. 라이트 모드 기준.
- **Background (#FFFFFF):** 기본 배경. 그룹화된 콘텐츠에는 `background-secondary (#F2F2F7)` 사용.
- **Separator (#C6C6C8):** 목록 구분선, 섹션 구분에 사용.
- **Red (#FF3B30):** 파괴적 액션(삭제, 경고)에만 사용.

색상은 의미를 단독으로 전달해서는 안 된다. 항상 텍스트나 아이콘과 함께 사용.

## Typography

SF Pro는 Apple 플랫폼의 공식 서체로, 가독성과 명확성을 위해 설계되었다. 웹 환경에서는 `-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif`를 폴백으로 사용한다.

| Style | Font | Size | Weight |
|-------|------|------|--------|
| Large Title | SF Pro Display | 34pt | Regular |
| Title 1 | SF Pro Display | 28pt | Regular |
| Title 2 | SF Pro Display | 22pt | Regular |
| Title 3 | SF Pro Display | 20pt | Regular |
| Headline | SF Pro Text | 17pt | Semibold |
| Body | SF Pro Text | 17pt | Regular |
| Callout | SF Pro Text | 16pt | Regular |
| Subheadline | SF Pro Text | 15pt | Regular |
| Footnote | SF Pro Text | 13pt | Regular |
| Caption 1 | SF Pro Text | 12pt | Regular |
| Caption 2 | SF Pro Text | 11pt | Regular |

Dynamic Type를 지원해야 한다. 절대 크기보다 상대 단위(`rem`, `em`)를 사용.

## Layout

4pt 그리드 시스템을 기반으로 한다. 모든 간격은 4의 배수여야 한다.

- **최소 터치 타겟:** 44×44pt
- **콘텐츠 여백:** 좌우 16pt (safe area 고려)
- **섹션 간격:** 24–32pt
- **그룹화된 레이아웃:** 인셋 그룹 스타일에서 좌우 여백 16pt

## Elevation & Depth

Apple HIG는 물리적 깊이감보다 레이어 투명도로 계층을 표현한다.

- **Level 0 (Base):** 기본 배경 (`#F2F2F7`)
- **Level 1 (Card):** 흰 배경 위 카드 (`#FFFFFF`, 그림자 없음)
- **Level 2 (Popover):** `box-shadow: 0 4px 16px rgba(0,0,0,0.12)` — 팝오버, 드롭다운
- **Level 3 (Modal):** `box-shadow: 0 8px 32px rgba(0,0,0,0.18)` — 시트, 모달

## Shapes

- **아이콘/앱 아이콘:** 연속 곡선(squircle) — `rounded.2xl` (20px)
- **버튼:** `rounded.md` (10px)
- **카드/셀:** `rounded.xl` (16px)
- **작은 배지/태그:** `rounded.sm` (6px)
- **알약형 버튼:** `rounded.full` (9999px)

날카로운 모서리(0px)는 Apple HIG에서 사용하지 않는다.

## Components

### 버튼
- Primary: 파란 배경(`#007AFF`) + 흰 텍스트. 화면당 하나만 사용.
- Secondary: 배경 없이 파란 텍스트, 또는 반투명 fill.
- Destructive: 빨간 배경. 되돌릴 수 없는 액션에만 사용.
- 비활성화: `opacity: 0.3`

### 카드
- 흰 배경, `rounded.xl`, 그림자 없이 배경색 대비로만 구분.
- 인터랙티브 카드는 탭 시 `fill-secondary` 배경으로 피드백.

### 목록
- 각 행의 최소 높이: 44pt.
- 구분선은 텍스트 시작 지점에서 시작 (전체 폭 구분선 지양).

## Do's and Don'ts

**Do:**
- 시스템 색상을 그대로 사용해 다크 모드 자동 지원
- 44pt 이상의 터치 타겟 확보
- 4pt 그리드를 따른 일관된 간격
- SF Pro / 시스템 폰트 우선 사용

**Don't:**
- 파란색(`primary`)을 비인터랙티브 요소에 사용하지 않는다
- 색상만으로 정보를 전달하지 않는다 (접근성)
- 8px 미만의 둥근 모서리를 사용하지 않는다
- 그림자를 과도하게 쌓지 않는다
