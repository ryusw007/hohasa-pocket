// 호하사 회원 게시판 설정 — 여기 값은 브라우저에 공개되는 값만 둔다(비밀 키 금지).
window.HOHASA_BOARD = {
  SUPABASE_URL: "https://vgfrwcdgxqgaevoybpjs.supabase.co",
  // Supabase > Settings > API Keys > Publishable key (sb_publishable_...) — 공개용이라 넣어도 안전
  SUPABASE_PUBLISHABLE_KEY: "sb_publishable_dLEJETLT_0-wxvczDwk62A_Xo52dP61",
  APP_URL: "https://ryusw007.github.io/hohasa-pocket/",   // ← 홈(데일리 앱)으로 돌아가기
  IMAGE_MAX_SIDE: 1600                                    // 사진 업로드 시 긴 변 최대 픽셀
};
