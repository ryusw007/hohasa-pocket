# 호하사 데일리 다이제스트 — 구조와 배포 방법 (GitHub Pages)

카톡방에 이미지 여러 장 대신 **링크 하나**로 공유하는 웹앱(PWA)입니다.
주소: https://ryusw007.github.io/hohasa-pocket/

## 구조
| 파일 | 역할 |
|---|---|
| `index.html` | 홈 — 최신 회차 + 지난 회차 가로 스크롤 (회차 목록은 빌드 시 주입) |
| `viewer.html?d=YYYY-MM-DD` | 카툰 뷰어 — `issues.json`을 읽어 페이지 목록 구성 (`d` 없으면 최신 회차) |
| `lessons.html`, `lesson_viewer.html?id=lessonNN` | 강의툰 목록/뷰어 — `lessons/lessons.json` 사용 |
| `news.html` + `news/latest.json` | 뉴스 브리핑 — `hohasa-news` 저장소의 워크플로가 매일 자동 갱신 |
| `issues/<날짜>/00_cover.jpg, 01.jpg…` | 회차 이미지 (`issues.json`의 `count` = 표지 포함 장수) |
| `sw.js`, `manifest.webmanifest` | 오프라인 캐시 / 앱 설치 |

## 새 회차 발행 (로컬 `card_news_program`)
```
python build_site.py --date 2026-10-07 --cover images/cover_hohasa.png \
    --cards "<카드 경로들>" --out site
```
- `--title`을 생략하면 "호하사 데일리 다이제스트 · 10월 7일" 형식으로 자동 생성됩니다.
- 업로드할 때 **아래 파일은 항상 함께** 올립니다(하나라도 빠지면 옛 버전이 남습니다):
  `index.html`, `viewer.html`, `news.html`, `issues.json`, `sw.js`, `manifest.webmanifest`, `og.png`, `issues/<날짜>/`

## 강의툰 발행
```
python publish_lesson_pages.py --pages <이미지들> --id lesson26 --title "제목" --date 2026-10-07 --out site
```
업로드: `lessons.html`, `lesson_viewer.html`, `lessons/lessons.json`, `lessons/<id>/`

## 페이지만 다시 만들기 (이미지 추가 없음)
템플릿을 고쳤거나 `issues.json`을 손으로 수정했을 때:
```
python build_site.py --rebuild-only --out <사이트 폴더>
```
index/viewer/news/lessons/lesson_viewer.html, sw.js, manifest를 다시 만듭니다.

## 캐시 정책 (sw.js)
- 이미지: 캐시 먼저 보여주고 뒤에서 새 버전 확인(같은 파일명으로 고쳐 올려도 다음 방문 때 반영), 최대 250장 보관
- HTML/JSON: 항상 네트워크 우선, 오프라인일 때만 캐시
- 빌드할 때마다 버전이 바뀌어 옛 캐시는 자동 삭제됩니다.

## 조작
- 오른쪽 탭 / 왼쪽으로 스와이프 / → 키 : 다음
- 왼쪽 탭 / 오른쪽으로 스와이프 / ← 키 : 이전
