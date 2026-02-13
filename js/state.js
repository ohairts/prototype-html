// js/state.js
const GAME_KEYS = {
  startTs: "nightshift_start_ts",
  score: "nightshift_score",
  social: "nightshift_social",

  // NEW: kardex flags
  p2DetailsShown: "nightshift_kardex_p2_details_shown",
  p2DetailsAnimated: "nightshift_p2_details2_animated",
  p2PanelShown: "nightshift_kardex_p2_panel_shown",
  p2PharmacyDone: "nightshift_kardex_p2_called_pharmacy",
  p2WifeDone: "nightshift_kardex_p2_called_wife",
};

function nowMs(){ return Date.now(); }

// Initialize / reset game state
export function initGame({ resetScore = true, resetTimer = true } = {}){
  if (resetTimer) localStorage.setItem(GAME_KEYS.startTs, String(nowMs()));
  if (resetScore) localStorage.setItem(GAME_KEYS.score, "0");

  if (localStorage.getItem(GAME_KEYS.social) === null) localStorage.setItem(GAME_KEYS.social, "0");

  // RESET kardex per-game state
  localStorage.removeItem(GAME_KEYS.p2DetailsShown);
  localStorage.removeItem(GAME_KEYS.p2DetailsAnimated);
  localStorage.removeItem(GAME_KEYS.p2PanelShown);
  localStorage.removeItem(GAME_KEYS.p2PharmacyDone);
  localStorage.removeItem(GAME_KEYS.p2WifeDone);
}


/* ===== Overall score ===== */
export function getScore(){
  return Number(localStorage.getItem(GAME_KEYS.score) || "0");
}

export function addScore(delta){
  const next = getScore() + Number(delta);
  localStorage.setItem(GAME_KEYS.score, String(next));
  return next;
}

export function setScore(value){
  localStorage.setItem(GAME_KEYS.score, String(Number(value)));
}

/* ===== Social score ===== */
export function getSocial(){
  return Number(localStorage.getItem(GAME_KEYS.social) || "0");
}

// Use this from fly-ins: addSocial(1) / addSocial(2) / addSocial(3)
export function addSocial(delta){
  const next = getSocial() + Number(delta);
  localStorage.setItem(GAME_KEYS.social, String(next));
  return next;
}

export function setSocial(value){
  localStorage.setItem(GAME_KEYS.social, String(Number(value)));
}

export function resetSocial(){
  localStorage.setItem(GAME_KEYS.social, "0");
}

/* ===== Timer ===== */
export function ensureTimerStarted(){
  if (!localStorage.getItem(GAME_KEYS.startTs)){
    localStorage.setItem(GAME_KEYS.startTs, String(nowMs()));
  }
}

export function getElapsedMs(){
  const start = Number(localStorage.getItem(GAME_KEYS.startTs) || "0");
  if (!start) return 0;
  return Math.max(0, nowMs() - start);
}

export function formatMs(ms){
  const totalSeconds = Math.floor(ms / 1000);
  const mm = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const ss = String(totalSeconds % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}
