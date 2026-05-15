# PR2팀 AI 활용 마스터 SOP

**버전:** 1.0 | **최종 업데이트:** 2026-05-15 | **담당:** 팀장

---

## AI 활용 기본 원칙 (5가지)

1. **사람이 최종 결정한다:** AI 초안은 시작점. 발행 전 담당자 편집 + 팀장 승인 필수 (외부 발행 시)
2. **팩트는 반드시 확인한다:** AI가 생성한 수치·사실은 원본 소스로 대조 확인 후 사용
3. **브랜드 보이스를 지킨다:** 모든 외부 발행 콘텐츠는 [브랜드 보이스 가이드](../prompts/brand-voice/gscaltex-brand-voice.md) 준수
4. **프롬프트 라이브러리를 쓴다:** 처음부터 새로 쓰지 말고 `prompts/` 폴더 먼저 확인
5. **배운 것은 기록한다:** 잘 된 프롬프트, 실패한 사례 모두 지식베이스에 공유

---

## 모든 업무 공통 흐름 (8단계)

1. **브리프 작성** — 목적·타겟·핵심 메시지·기한 명시
2. **프롬프트 선택** — 해당 도메인 `prompts/` 폴더에서 적합한 프롬프트 선택
3. **변수 입력** — 브리프 내용을 프롬프트 `[VARIABLE]` 자리에 입력
4. **AI 초안 생성** — Claude 권장 (CEO 보이스는 Claude Projects 필수)
5. **팩트 확인** — 수치·날짜·인명·직책 원본 소스 대조
6. **브랜드 보이스 체크 + 담당자 편집** — [review-checklist.md](./review-checklist.md) 활용
7. **팀장 최종 승인** — 외부 발행 콘텐츠에 한함
8. **사후 기록** — 최종본 + 사용 프롬프트를 지식베이스에 기록

---

## 도메인별 권장 도구 및 프롬프트 위치

| 도메인 | 권장 도구 | 프롬프트 파일 |
|--------|---------|-------------|
| SNS/디지털 | Claude, Canva AI | `prompts/brand-voice/sns-caption-prompts.md` |
| 대외홍보/PR | Claude, Perplexity | `prompts/pr/press-release-templates.md` |
| 위기대응 | Claude | `prompts/pr/crisis-response-playbook.md` |
| Internal Comm (G식노트) | Claude, ElevenLabs | `prompts/internal-comm/g-note-script-prompt.md` |
| Internal Comm (언박싱) | Claude | `prompts/internal-comm/unboxing-script-prompt.md` |
| Internal Comm (Face+Time) | Claude | `prompts/internal-comm/facetime-script-prompt.md` |
| PI (연설문·메시지) | Claude Projects | `prompts/pi/speech-prompt-templates.md` |
| Stakeholder 보고 | Claude, Google Sheets | `prompts/shared/stakeholder-report-prompt.md` |
| CSR | Claude | `prompts/shared/csr-comms-prompt.md` |
| 캠페인 | Claude, Gamma | `prompts/shared/campaign-brief-prompt.md` |
| 스포츠 | Claude | `prompts/shared/sports-content-prompt.md` |

---

## 승인 게이트

| 콘텐츠 유형 | 승인자 | 목표 검토 시간 |
|------------|--------|-------------|
| 외부 보도자료·공식 입장 | 팀장 | 당일 |
| SNS 포스팅 | 담당자 자체 검토 | — |
| CEO 연설문·메시지 | 팀장 → 실장 | 발행 2~3일 전 |
| 경영진 보고서 | 팀장 | 전날 |
| Internal Comm 콘텐츠 | 담당자 → 팀장 | 발행 1일 전 |
| 위기 1등급 대응 | 팀장 → 실장 | 2시간 내 |

---

## AI 사용 금지 사항

- 미공개 내부 정보를 AI에 직접 입력하지 않는다 (비공개 시스템이 아닌 경우)
- AI 생성 콘텐츠를 수정 없이 그대로 발행하지 않는다
- 확인되지 않은 정보가 포함된 위기 대응 자료를 발행하지 않는다
