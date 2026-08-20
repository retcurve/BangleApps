(function(back) {
  var FILE = "messagescroll.json";

  // Keep in step with the defaults at the top of app.js
  var DEFAULTS = {
    maxBright: true,
    doNotDim: true,
    speed: 180,
    loops: 3,
    fontSize: 2,
    rotate: 0,
    fg: '#fff',
    bg: '#000'
  };

  var settings = Object.assign({}, DEFAULTS, require('Storage').readJSON(FILE, true) || {});

  function saveSettings() {
    require('Storage').writeJSON(FILE, settings);
  }

  function writeSettings(key, value) {
    settings[key] = value;
    saveSettings();
  }

  var ROTATIONS = [0, 90, 180, 270];

  /* Colour presets rather than a full picker - the app only needs a fg/bg pair,
  and picking two arbitrary colours on this screen is more trouble than it's worth. */
  var THEMES = [
    {name: /*LANG*/"White", fg: '#fff', bg: '#000'},
    {name: /*LANG*/"Green", fg: '#0f0', bg: '#000'},
    {name: /*LANG*/"Cyan", fg: '#0ff', bg: '#000'},
    {name: /*LANG*/"Yellow", fg: '#ff0', bg: '#000'},
    {name: /*LANG*/"Red", fg: '#f00', bg: '#000'},
    {name: /*LANG*/"Inverted", fg: '#000', bg: '#fff'}
  ];

  function indexOrZero(i) { return i < 0 ? 0 : i; }

  function themeIndex() {
    for (var i = 0; i < THEMES.length; i++)
      if (THEMES[i].fg == settings.fg && THEMES[i].bg == settings.bg) return i;
    return 0;
  }

  E.showMenu({
    "": {"title": /*LANG*/"Message Scroll"},
    "< Back": back,
    /*LANG*/'Speed': {
      value: settings.speed,
      min: 30, max: 600, step: 10,
      format: v => v + "px/s",
      onchange: v => writeSettings("speed", v)
    },
    /*LANG*/'Repeats': {
      value: settings.loops,
      min: 1, max: 10, step: 1,
      onchange: v => writeSettings("loops", v)
    },
    /*LANG*/'Font size': {
      // 3 is the largest that still clears the message icon at the top
      value: settings.fontSize,
      min: 1, max: 3, step: 1,
      onchange: v => writeSettings("fontSize", v)
    },
    /*LANG*/'Rotate': {
      value: indexOrZero(ROTATIONS.indexOf(settings.rotate)),
      min: 0, max: ROTATIONS.length - 1, step: 1, wrap: true,
      format: v => ROTATIONS[v] + "\xB0",
      onchange: v => writeSettings("rotate", ROTATIONS[v])
    },
    /*LANG*/'Colours': {
      value: themeIndex(),
      min: 0, max: THEMES.length - 1, step: 1, wrap: true,
      format: v => THEMES[v].name,
      onchange: v => { // both colours change together, so save once
        settings.fg = THEMES[v].fg;
        settings.bg = THEMES[v].bg;
        saveSettings();
      }
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
})
