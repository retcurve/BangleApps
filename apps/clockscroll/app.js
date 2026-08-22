Graphics.prototype.setFontDoto = function(scale) {
  // Actual height 40 (39 - 0)
  // 1 BPP
  return this.setFontCustom(
    E.toString(require('heatshrink').decompress(atob('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'))),
    32,
    atob("GAwQFBQUFAwQEBQUEBQQFBQUFBQUFBQUFBQQEBQUFBQUFBQUFBQUFBQQFBQUFBQUFBQUFBQUFBQUFBQQFBAUFBAUFBQUFBQUFBAUFBAUFBQUFBQUFBQUFBQUFBQMFBQAFgsQACcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADBQUExQGFBAUFBgXABQUEBYNDBAUFAwQCxQYHBwdFBQUFBQUFBQUFBQUFBAQEBAUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUEBAQEBQUFBQUFBQUFBQUFBQUFBQ="),
    40+(scale<<8)+(1<<16)
  );
};

// Load settings
const SETTINGS = 'clockscroll.json';
const settings = Object.assign({
  maxBright: true,  // force max LCD brightness while scrolling
  doNotDim: true,   // keep the backlight on while scrolling
  speed: 300,       // scroll speed, in pixels per second
  loops: 3,         // times to scroll the time across the screen
  fontSize: 3,      // Doto font scale
  rotate: 0,        // screen rotation, 0-3 quarter turns (as g.setRotation)
  fg: '',           // text colour; '' follows the system theme foreground
  showDate: false,  // scroll the date after the time
  countdown: false  // show a 3-2-1 countdown before scrolling starts
}, require('Storage').readJSON(SETTINGS, true) || {});

const FONT_HEIGHT = 40; // base height of the Doto font
const FRAME_MS = 20;    // target frame interval
const IDLE_MS = 5;      // always yield at least this long, so BLE isn't starved
const TOUCH_IGNORE_MS = 500; // ignore taps for this long after starting

const sysSettings = require('Storage').readJSON('setting.json', 1) || {};

let text, textWidth, textY, bandY1, bandY2, startX, pxPerMs;
let t0, loopsDone = 0;
let scrollTimeout, lockHandler, touchHandler, dismissWatch;
let origBacklightTimeout;
let countdownInterval, countdownNum;

/* The time is rebuilt at the start of every pass, so a long scroll never shows
a stale minute. */
function buildText() {
  const d = new Date();
  let h = d.getHours(), suffix = "";
  if (sysSettings["12hour"]) {
    suffix = h < 12 ? "am" : "pm";
    h = h % 12;
    if (h === 0) h = 12;
  }
  let t = h + ":" + ("0" + d.getMinutes()).substr(-2) + suffix;
  if (settings.showDate) t += " " + require("locale").date(d, 1);
  return t + " ";
}

function exitScroll() {
  if (scrollTimeout) clearTimeout(scrollTimeout);
  scrollTimeout = undefined;
  if (countdownInterval) clearInterval(countdownInterval);
  countdownInterval = undefined;
  if (lockHandler) {
    Bangle.removeListener('lock', lockHandler);
    lockHandler = undefined;
  }
  if (touchHandler) {
    Bangle.removeListener('touch', touchHandler);
    touchHandler = undefined;
  }
  if (dismissWatch !== undefined) {
    clearWatch(dismissWatch);
    dismissWatch = undefined;
  }
  restoreDisplay();
  Bangle.load(); // back to the clock we interrupted
}

/* Put the display back the way we found it. */
function restoreDisplay() {
  const rot = sysSettings.rotate || 0;
  g.setRotation(rot & 3, rot >> 2); // same decoding as .boot0 uses
  if (origBacklightTimeout !== undefined)
    Bangle.setOptions({backlightTimeout: origBacklightTimeout});
  if (settings.maxBright)
    Bangle.setLCDBrightness(sysSettings.brightness === undefined ? 1 : sysSettings.brightness);
}

function frame() {
  const frameStart = Date.now();
  const x = startX - (frameStart - t0) * pxPerMs;

  g.clearRect(0, bandY1, g.getWidth() - 1, bandY2);
  g.drawString(text, x, textY);

  if (x < -textWidth) { // scrolled off the left edge
    if (++loopsDone >= settings.loops) return exitScroll();
    beginScroll();
    return;
  }

  scrollTimeout = setTimeout(frame, Math.max(IDLE_MS, FRAME_MS - (Date.now() - frameStart)));
}

function start() {
  pxPerMs = settings.speed / 1000;

  /* Locking the watch, a tap, or the back button all send us straight back to
  the clock. */
  lockHandler = locked => { if (locked) exitScroll(); };
  Bangle.on('lock', lockHandler);
  /* Ignore taps for a moment: the tap that woke the watch can arrive just
  after we load, and would dismiss us before anything is readable. */
  const touchIgnoreUntil = Date.now() + TOUCH_IGNORE_MS;
  touchHandler = () => { if (Date.now() > touchIgnoreUntil) exitScroll(); };
  Bangle.on('touch', touchHandler);
  dismissWatch = setWatch(exitScroll, BTN1, {edge: "falling", debounce: 50});

  if (settings.doNotDim) {
    origBacklightTimeout = Bangle.getOptions().backlightTimeout;
    Bangle.setOptions({backlightTimeout: 0});
    Bangle.setBacklight(1);
  }
  if (settings.maxBright) Bangle.setLCDBrightness(1);
  g.setRotation((settings.rotate >= 0 && settings.rotate <= 3) ? settings.rotate : 0);

  g.setBgColor(g.theme.bg).clear();

  // Scrolling text band, centred on the screen
  g.setFontDoto(settings.fontSize);
  g.setFontAlign(-1, 0);
  g.setColor(settings.fg || g.theme.fg);
  textY = g.getHeight() / 2;
  const half = (FONT_HEIGHT * settings.fontSize) / 2 + 1;
  bandY1 = Math.max(0, textY - half);
  bandY2 = Math.min(g.getHeight() - 1, textY + half);
  g.setClipRect(0, bandY1, g.getWidth() - 1, bandY2);

  if (settings.countdown) {
    g.setFontAlign(0, 0);
    countdownNum = 3;
    drawCountdown();
    countdownInterval = setInterval(() => {
      if (countdownNum === 0) {
        clearInterval(countdownInterval);
        countdownInterval = undefined;
        g.setFontAlign(-1, 0);
        beginScroll();
      } else {
        drawCountdown();
      }
    }, 1000);
  } else {
    beginScroll();
  }
}

/* Show one countdown digit, then step it down for the next call. */
function drawCountdown() {
  g.clearRect(0, bandY1, g.getWidth() - 1, bandY2);
  g.drawString(countdownNum, g.getWidth() / 2, textY);
  countdownNum--;
}

function beginScroll() {
  text = buildText();
  textWidth = g.stringWidth(text);
  startX = g.getWidth(); // start the text just off the right edge
  t0 = Date.now();
  frame();
}

start();
