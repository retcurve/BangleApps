(function(back) {
  var FILE = "clockscroll.json";

  // Keep in step with the defaults at the top of app.js
  var DEFAULTS = {
    run: 'unlock',
    maxBright: true,
    doNotDim: true,
    speed: 300,
    loops: 3,
    fontSize: 3,
    rotate: 0,
    fg: '',
    showTime: true,
    showDate: false
  };

  var saved = require('Storage').readJSON(FILE, true) || {};
  // enabled was the pre-0.07 setting, and only ever meant "on unlock" or "off"
  if (saved.run === undefined && saved.enabled === false) saved.run = 'off';
  var settings = Object.assign({}, DEFAULTS, saved);

  function writeSettings(key, value) {
    settings[key] = value;
    require('Storage').writeJSON(FILE, settings);
  }

  /* Both content settings can be off while the menu is open, but there'd be
  nothing left to scroll, so say so rather than letting the user walk away
  from it. */
  function exitMenu() {
    if (settings.showTime === false && !settings.showDate) {
      E.showAlert(/*LANG*/"Time or date\nmust be on", /*LANG*/"Clock Scroll").then(showMain);
      return;
    }
    back();
  }

  var RUN_MODES = [
    {name: /*LANG*/"On unlock", value: 'unlock'},
    {name: /*LANG*/"On button", value: 'button'},
    {name: /*LANG*/"Off", value: 'off'}
  ];

  function runIndex() {
    for (var i = 0; i < RUN_MODES.length; i++)
      if (RUN_MODES[i].value == settings.run) return i;
    return 0; // On unlock, matching the default
  }

  var ROTATIONS = [0, 90, 180, 270];

  var SPEEDS = [
    {name: /*LANG*/"Slow", value: 200},
    {name: /*LANG*/"Medium", value: 300},
    {name: /*LANG*/"Fast", value: 400}
  ];

  function speedIndex() {
    var best = 0, bestDiff;
    for (var i = 0; i < SPEEDS.length; i++) {
      var diff = Math.abs(SPEEDS[i].value - settings.speed);
      if (bestDiff === undefined || diff < bestDiff) { bestDiff = diff; best = i; }
    }
    return best; // nearest, so an old hand-edited speed still lands somewhere sane
  }

  // 4 is the largest that still fits the screen height
  var FONT_SIZES = [
    {name: /*LANG*/"Small", value: 2},
    {name: /*LANG*/"Medium", value: 3},
    {name: /*LANG*/"Large", value: 4}
  ];

  function fontSizeIndex() {
    for (var i = 0; i < FONT_SIZES.length; i++)
      if (FONT_SIZES[i].value == settings.fontSize) return i;
    return 1; // Medium, matching the default
  }

  var COLOURS = [
    {name: /*LANG*/"Theme", value: ''},
    {name: /*LANG*/"Green", value: '#0f0'},
    {name: /*LANG*/"Cyan", value: '#0ff'},
    {name: /*LANG*/"Yellow", value: '#ff0'},
    {name: /*LANG*/"Magenta", value: '#f0f'},
    {name: /*LANG*/"Red", value: '#f00'},
    {name: /*LANG*/"Blue", value: '#00f'},
    {name: /*LANG*/"White", value: '#fff'},
    {name: /*LANG*/"Black", value: '#000'}
  ];

  function colourIndex() {
    for (var i = 0; i < COLOURS.length; i++)
      if (COLOURS[i].value == settings.fg) return i;
    return 0;
  }

  function showMain() {
    E.showMenu({
      "": {"title": /*LANG*/"Clock Scroll"},
      "< Back": exitMenu,
      /*LANG*/'Run': {
        value: runIndex(),
        min: 0, max: RUN_MODES.length - 1, step: 1, wrap: true,
        format: v => RUN_MODES[v].name,
        onchange: v => writeSettings("run", RUN_MODES[v].value)
      },
      /*LANG*/'Speed': {
        value: speedIndex(),
        min: 0, max: SPEEDS.length - 1, step: 1, wrap: true,
        format: v => SPEEDS[v].name,
        onchange: v => writeSettings("speed", SPEEDS[v].value)
      },
      /*LANG*/'Repeats': {
        value: settings.loops,
        min: 1, max: 10, step: 1,
        onchange: v => writeSettings("loops", v)
      },
      /*LANG*/'Font size': {
        value: fontSizeIndex(),
        min: 0, max: FONT_SIZES.length - 1, step: 1, wrap: true,
        format: v => FONT_SIZES[v].name,
        onchange: v => writeSettings("fontSize", FONT_SIZES[v].value)
      },
      /*LANG*/'Rotate': {
        value: (settings.rotate >= 0 && settings.rotate <= 3) ? settings.rotate : 0,
        min: 0, max: ROTATIONS.length - 1, step: 1, wrap: true,
        format: v => ROTATIONS[v] + "\xB0",
        onchange: v => writeSettings("rotate", v)
      },
      /*LANG*/'Colour': {
        value: colourIndex(),
        min: 0, max: COLOURS.length - 1, step: 1, wrap: true,
        format: v => COLOURS[v].name,
        onchange: v => writeSettings("fg", COLOURS[v].value)
      },
      /*LANG*/'Show time': {
        value: settings.showTime !== false,
        onchange: v => writeSettings("showTime", v)
      },
      /*LANG*/'Show date': {
        value: !!settings.showDate,
        onchange: v => writeSettings("showDate", v)
      },
      /*LANG*/'Max bright': {
        value: !!settings.maxBright,
        onchange: v => writeSettings("maxBright", v)
      },
      /*LANG*/"Don't dim": {
        value: !!settings.doNotDim,
        onchange: v => writeSettings("doNotDim", v)
      }
    });
  }

  showMain();
})
