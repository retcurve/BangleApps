(function(back) {
  var FILE = "messagescroll.json";

  // Keep in step with the defaults at the top of app.js
  var DEFAULTS = {
    maxBright: true,
    doNotDim: true,
    speed: 300,
    loops: 3,
    fontSize: 2,
    rotate: 0,
    fg: ''
  };

  var settings = Object.assign({}, DEFAULTS, require('Storage').readJSON(FILE, true) || {});
  delete settings.bg; // background follows the system theme now; drop the old key

  function writeSettings(key, value) {
    settings[key] = value;
    require('Storage').writeJSON(FILE, settings);
  }

  /* Stored value is what g.setRotation() wants (0-3 quarter turns); only the
  label is in degrees. Storing degrees here is a silent no-op on the device. */
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

  /* Text colour only - the background always follows the system theme. "Theme"
  keeps the text readable whichever theme is set; the rest are B2-safe colours. */
  var COLOURS = [
    {name: /*LANG*/"Theme", value: ''},
    {name: /*LANG*/"White", value: '#fff'},
    {name: /*LANG*/"Green", value: '#0f0'},
    {name: /*LANG*/"Cyan", value: '#0ff'},
    {name: /*LANG*/"Yellow", value: '#ff0'},
    {name: /*LANG*/"Magenta", value: '#f0f'},
    {name: /*LANG*/"Red", value: '#f00'},
    {name: /*LANG*/"Blue", value: '#00f'}
  ];

  function colourIndex() {
    for (var i = 0; i < COLOURS.length; i++)
      if (COLOURS[i].value == settings.fg) return i;
    return 0;
  }

  E.showMenu({
    "": {"title": /*LANG*/"Message Scroll"},
    "< Back": back,
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
      // 3 is the largest that still clears the message icon at the top
      value: settings.fontSize,
      min: 1, max: 3, step: 1,
      onchange: v => writeSettings("fontSize", v)
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
