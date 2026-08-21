# 호하사 포켓 카툰 — 배포 방법 (GitHub Pages)

카톡방에 이미지 여러 장 대신 **링크 하나**로 공유하는 웹앱입니다.
스마트폰 세로·가로 모두 대응하고, 좌우로 탭/스와이프하며 넘겨 봅니다.

## 1. 로컬에서 먼저 확인 (선택)
```
python3 -m http.server -d webapp 8000
# 브라우저에서 http://localhost:8000
```

## 2. GitHub Pages로 올리기
1. GitHub에서 새 저장소 생성 (예: `hohasa-pocket`), Public.
2. 이 `webapp` 폴더 안의 파일 전부(`index.html`, `cards/`, `.nojekyll`)를 저장소 루트에 업로드.
   - 웹에서 "Add file → Upload files"로 드래그해도 됨.
3. 저장소 **Settings → Pages** →
   - Source: `Deploy from a branch`
   - Branch: `main` / 폴더 `/ (root)` → Save
4. 1~2분 뒤 `https://<사용자명>.github.io/hohasa-pocket/` 링크 생성.
5. 이 링크를 카톡방에 공유 → 누르면 뷰어가 열림.

## 3. 새 회차 갱신
```
# 새 대화 카드들을 만든 뒤:
python3 build_webapp.py --cover images/cover_hohasa.png \
    --cards <카드폴더> --title "호하사 포켓 카툰" --date 2026.07.25 --out webapp
```
그리고 `webapp` 폴더를 저장소에 다시 업로드(덮어쓰기)하면 링크는 그대로, 내용만 갱신됩니다.

## 조작
- 오른쪽 탭 / 왼쪽으로 스와이프 / → 키 : 다음
- 왼쪽 탭 / 오른쪽으로 스와이프 / ← 키 : 이전
- 1페이지는 항상 커버(브랜드·일자), 2페이지부터 대화 카드.
