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

/* Loaded by messagescroll.0.boot.js, which has already saved the message and
claimed it. We own the whole screen and the whole interpreter: no widgets are
loaded, so nothing calls g.reset() behind our back, and exiting via load()
restores every global we touch. */

// Load settings
const SETTINGS = 'messagescroll.json';
const settings = Object.assign({
  maxBright: true,  // force max LCD brightness while scrolling
  doNotDim: true,   // keep the backlight on while scrolling
  speed: 300,       // scroll speed, in pixels per second
  loops: 3,         // times to scroll the message before giving up
  fontSize: 2,      // Doto font scale
  rotate: 0,        // screen rotation, 0-3 quarter turns (as g.setRotation)
  fg: ''            // text colour; '' follows the system theme foreground
}, require('Storage').readJSON(SETTINGS, true) || {});

const FONT_HEIGHT = 40; // base height of the Doto font, see setFontDoto above
const ICON_SIZE = 48;   // 24x24 message icon at scale 2
const BODY_CHARS = 60;  // how much of the message body to show
const FRAME_MS = 20;    // target frame interval
const IDLE_MS = 5;      // always yield at least this long, so BLE/buzz aren't starved

const quiet = (require('Storage').readJSON('setting.json', 1) || {}).quiet;

/* The boot handler saved the message immediately before loading us, so it is
the newest entry in the store. Skip music/nav in case one landed in between. */
const msg = require("messages").getMessages().find(
  m => m.id !== "music" && m.id !== "nav"
);

let text, textWidth, textY, bandY1, bandY2, startX, pxPerMs;
let t0, loopsDone = 0;
let scrollTimeout, lockHandler, dismissWatch;

function buildText(m) {
  let t = "";
  if (m.sender) t += m.sender + " ";
  if (m.title) t += m.title + " ";
  if (m.subject) t += m.subject + " ";
  if (m.body) t += (m.body.length > BODY_CHARS ? m.body.substr(0, BODY_CHARS) + "..." : m.body) + " ";
  if (m.tel) t += m.tel + " ";
  return t.replace(/[\n\r]+/g, " ");
}

function exitScroll(openGui) {
  if (scrollTimeout) clearTimeout(scrollTimeout);
  scrollTimeout = undefined;
  if (lockHandler) {
    Bangle.removeListener('lock', lockHandler);
    lockHandler = undefined;
  }
  if (dismissWatch !== undefined) {
    clearWatch(dismissWatch);
    dismissWatch = undefined;
  }
  require("messages").stopBuzz(); // otherwise repeat buzzes outlive the scroll
  // No need to undo setRotation/setOptions/setLCDBrightness - load() resets them.
  if (openGui && require("Storage").read("messagegui")) require("messages").openGUI(msg);
  else Bangle.load();
}

/* Draw one frame. Only the text band is cleared and redrawn - the icon above it
never moves, so it is drawn once in start() and left alone. */
function frame() {
  const frameStart = Date.now();
  const x = startX - (frameStart - t0) * pxPerMs;

  g.clearRect(0, bandY1, g.getWidth() - 1, bandY2);
  g.drawString(text, x, textY);

  if (x < -textWidth) { // scrolled off the left edge
    if (++loopsDone >= settings.loops) return exitScroll(false);
    t0 = Date.now();
  }

  /* Self-paced rather than setInterval: a slow frame delays the next one instead
  of queueing up behind it, and IDLE_MS guarantees the interpreter always gets a
  breather for BLE and the buzz timers. Position comes from the clock, not the
  frame count, so `speed` stays honest however long a frame actually takes. */
  scrollTimeout = setTimeout(frame, Math.max(IDLE_MS, FRAME_MS - (Date.now() - frameStart)));
}

function start() {
  text = buildText(msg);
  pxPerMs = settings.speed / 1000;

  /* Runs whether the watch is locked or not, so give both a way to dismiss
  into the messages GUI: unlocking (if we started locked), or the back button
  (if we started unlocked and so will see no lock transition at all). */
  lockHandler = locked => { if (!locked) exitScroll(true); };
  Bangle.on('lock', lockHandler);
  dismissWatch = setWatch(() => exitScroll(true), BTN1, {edge: "falling", debounce: 50});

  if (settings.doNotDim) {
    Bangle.setOptions({backlightTimeout: 0});
    if (!quiet) Bangle.setBacklight(1);
  }
  if (settings.maxBright && !quiet) Bangle.setLCDBrightness(1);
  /* 0-3 quarter turns. Anything else (an older build stored degrees here) falls
  back to 0, matching what the settings menu shows for an out-of-range value. */
  g.setRotation((settings.rotate >= 0 && settings.rotate <= 3) ? settings.rotate : 0);

  /* Buzz with the user's configured pattern - messages.buzz is a no-op in quiet
  mode - then cancel the repeat, since the message is already filling the screen.
  Drop the stopBuzz call to get the usual nagging repeat back. */
  require("messages").buzz(msg.src);
  require("messages").stopBuzz();

  // Static part of the screen, drawn once. The background always follows the
  // system theme, so the scroll doesn't look out of place against the clock.
  g.setBgColor(g.theme.bg).clear();
  g.setColor(require("messageicons").getColor(msg));
  g.drawImage(require("messageicons").getImage(msg),
    (g.getWidth() - ICON_SIZE) / 2, 0, {scale: 2});

  // Scrolling text band, filling the screen below the icon
  g.setFontDoto(settings.fontSize);
  g.setFontAlign(-1, 0);
  g.setColor(settings.fg || g.theme.fg);
  textWidth = g.stringWidth(text); // cached: it never changes
  textY = (ICON_SIZE + g.getHeight()) / 2;
  const half = (FONT_HEIGHT * settings.fontSize) / 2 + 1;
  bandY1 = Math.max(0, textY - half);
  bandY2 = Math.min(g.getHeight() - 1, textY + half);
  g.setClipRect(0, bandY1, g.getWidth() - 1, bandY2);

  startX = g.getWidth(); // start the text just off the right edge
  t0 = Date.now();
  frame();
}

if (msg) start();
else Bangle.load();
