/*
 * riku-common.js  (全アプリ共通)
 *  1) 「← メニュー」ボタンを表示して index.html に戻れるようにする
 *  2) rikuLog(app, label, score, total) : 成績を共通の記録(riku_log)に追加する
 * 使い方: 各アプリの </body> の直前に <script src="riku-common.js"></script>
 * ボタンの位置: data-pos="bottom-left | bottom-right | top-left | top-right"
 */
(function () {
  var me = document.currentScript;

  // ---- 共通の成績記録 ----
  var KEY = "riku_log", MAX = 500;
  window.rikuLog = function (app, label, sc, n) {
    try {
      sc = +sc; n = +n;
      if (!(n > 0) || !isFinite(sc)) return;
      var a = [];
      try { a = JSON.parse(localStorage.getItem(KEY) || "[]"); if (!Array.isArray(a)) a = []; } catch (e) { a = []; }
      a.push({ t: Date.now(), app: String(app), label: String(label || ""), sc: Math.round(sc * 10) / 10, n: n });
      if (a.length > MAX) a = a.slice(-MAX);
      localStorage.setItem(KEY, JSON.stringify(a));
    } catch (e) {}
  };

  // ---- メニューに戻るボタン ----
  if (document.getElementById("riku-menu-btn")) return;
  var pos = (me && me.getAttribute("data-pos")) || "bottom-left";
  var parts = pos.split("-");
  var v = parts[0] === "top" ? "top" : "bottom";
  var h = parts[1] === "right" ? "right" : "left";

  var style = document.createElement("style");
  style.textContent =
    "#riku-menu-btn{position:fixed;z-index:2147483000;" +
    v + ":calc(10px + env(safe-area-inset-" + v + ",0px));" +
    h + ":calc(10px + env(safe-area-inset-" + h + ",0px));" +
    "display:inline-block;padding:7px 14px;border-radius:99px;" +
    "font:700 13px/1.2 'Hiragino Sans','Yu Gothic UI','Meiryo',sans-serif;" +
    "text-decoration:none;color:#1d2b53;background:rgba(255,255,255,.92);" +
    "border:1.5px solid #c9d6e2;box-shadow:0 2px 6px rgba(29,43,83,.18);" +
    "-webkit-tap-highlight-color:transparent}" +
    "#riku-menu-btn:hover{border-color:#1d2b53}" +
    "#riku-menu-btn:focus-visible{outline:3px solid #d6303a;outline-offset:2px}" +
    "@media (prefers-color-scheme:dark){#riku-menu-btn{color:#eaf0ff;" +
    "background:rgba(29,37,64,.92);border-color:#33406a}}" +
    "@media print{#riku-menu-btn{display:none}}";

  function add() {
    document.head.appendChild(style);
    var a = document.createElement("a");
    a.id = "riku-menu-btn";
    a.href = "index.html";
    a.textContent = "\u2190 \u30e1\u30cb\u30e5\u30fc";
    a.setAttribute("aria-label", "\u30c8\u30c3\u30d7\u30e1\u30cb\u30e5\u30fc\u306b\u623b\u308b");
    document.body.appendChild(a);
  }
  if (document.body) add(); else document.addEventListener("DOMContentLoaded", add);
})();
