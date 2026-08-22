/* Show the scrolling time from the clock face, either when the watch is
unlocked or when the button is pressed - see the Run setting.

Wrapped in a function so the local names don't leak into the shared .boot0. */
(function() {
  var s = require("Storage").readJSON("clockscroll.json", 1) || {};
  // enabled was the pre-0.07 setting, and only ever meant "on unlock" or "off"
  var run = s.run || (s.enabled === false ? "off" : "unlock");

  if (run == "unlock") {
    Bangle.on("lock", function(locked) {
      if (locked) return;        // only interested in unlocking
      if (!Bangle.CLOCK) return; // in an app - don't hijack it
      load("clockscroll.app.js");
    });
  } else if (run == "button") {
    /* Clock apps hand the button to Bangle.showLauncher(), so take that over
    while a clock is showing. The app itself calls this again to reach the real
    launcher, by which point Bangle.CLOCK is clear. */
    var launcher = Bangle.showLauncher;
    Bangle.showLauncher = function() {
      if (Bangle.CLOCK) load("clockscroll.app.js");
      else launcher();
    };
  }
})();
