/* Scroll the current time full-screen when the watch is unlocked on the clock.

Wrapped in a function so the local names don't leak into the shared .boot0. */
(function() {
  Bangle.on("lock", function(locked) {
    if (locked) return;      // only interested in unlocking
    if (!Bangle.CLOCK) return; // in an app - don't hijack it
    var s = require("Storage").readJSON("clockscroll.json", 1) || {};
    if (s.enabled === false) return;
    load("clockscroll.app.js");
  });
})();
