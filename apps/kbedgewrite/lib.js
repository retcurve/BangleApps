exports.input = function(options) {
  options = options||{};
  var colours = ['#ff0', '#0f0', '#f00', '#00f'];
  var text = options.text;
  var punctuationMode = false;
  var extendedMode = false;
  var overlay = Graphics.createArrayBuffer(g.getWidth(), g.getHeight(), 8, {msb:true});
  overlay.transparent = 0;
  overlay.setFont("6x8:3");
  
  Bangle.setLCDOverlay(overlay,0,0, {id: "cornerOverlay"});

  if ("string"!=typeof text) text="";

  const cornerSize = g.getWidth() / 3;

  var path = "";
  var flashToggle = false;
  var corner = 0;

  var characterSet = Object.assign({}, require('Storage').readJSON("characterset.json", true) || {});

  function resetOverlay() {
    let modeChar = "";
    overlay.clear();
    if (punctuationMode) {
      modeChar = "P";
    }
    if (extendedMode) {
      modeChar = "E";
    }
    if (modeChar.length > 0) {
      let x = (g.getWidth() / 2) - 12;
      let y = g.getHeight() - 32;
      overlay.setColor("#F00");
      overlay.fillRect(x,y,x+24,y+32);
      overlay.setColor("#FFF");
      overlay.drawString(modeChar, x+4, y+4, false);
    }
    Bangle.setLCDOverlay(overlay,0,0, {id: "cornerOverlay"});
  }

  function draw() {
    g.reset().clearRect(Bangle.appRect);
    var l = g.setFont("6x8:4").wrapString(text+'_', Bangle.appRect.w-8);
    if (!l) l = [];
    if (l.length>4) l=l.slice(-4);
    g.drawString(l.join("\n"),Bangle.appRect.x+4,Bangle.appRect.y+4);
    print(text);
    print(l[0]);
  }

  function processPath() {
    let capital = false;
    if (punctuationMode) {
      path = path + '5';
    }
    if (extendedMode) {
      path = path + '6';
    }
    if (path.length > 2 && path.slice(-1) == '2') { // capital
      path = path.slice(0,-1);
      capital = true;
    }
    let char = characterSet[path];
    if (capital && char != "undefined") {
      if (char.charCodeAt(0)>96 && char.charCodeAt(0)<123) {
      char = char.toUpperCase();
      } else {
        char = undefined;
      }
    }
    if (char != "undefined") {
      print(char);
      switch (char) {
        case "#bs":
          text = text.slice(0, -1);
          break;
        case "#pu-on":
          punctuationMode = true;
          break;
        case "#pu-off":
          punctuationMode = false;
          break;
        case "#ex-on":
          extendedMode = true;
          break;
        case "#ex-off":
          extendedMode = false;
          break;
        default:
          text += char;
      }
      draw();
    }
    resetOverlay();
    path = "";
  }

  g.reset().clearRect(Bangle.appRect);
  draw();

  let dragHandler = e=>{
    "ram";
    if (e.b == 0) {
      processPath();
    } else {
      corner = 0;
      if (e.x < cornerSize && e.y < cornerSize) {
        corner = 2;
      }
      if (e.x < cornerSize && e.y > g.getHeight() - cornerSize) {
        corner = 1;
      }
      if (e.x > g.getWidth() - cornerSize && e.y < cornerSize) {
        corner = 3;
      }
      if (e.x > g.getWidth() - cornerSize && e.y > g.getHeight() - cornerSize) {
        corner = 4;
      }

      if (corner > 0 && path.slice(-1) != corner) {
        path += corner;

        let regex = new RegExp(corner.toString(), 'g' );
        let count = (path.match(regex)||[]).length;
        overlay.setColor(colours[count-1]);
        print(count);
        print(corner);
        let x = (corner<3) ? 0 : g.getWidth() - (cornerSize);
        let y = (corner>1 && corner<4) ? 0 : g.getHeight() - (cornerSize);
        print(x);
        print(y);
        print(cornerSize);
        overlay.fillRect(x, y, x + (cornerSize), y + (cornerSize));
        Bangle.setLCDOverlay(overlay,0,0, {id: "cornerOverlay"});
        print(path);
      }
    }
  }

  return new Promise((resolve,reject) => {
    Bangle.setUI({mode:"custom", drag:dragHandler, btn:()=>{
      print('exit');
      Bangle.setUI();
      g.clearRect(Bangle.appRect);
      Bangle.setLCDOverlay(undefined, {id: "cornerOverlay"});
      resolve(text);
    }});
  });
};
