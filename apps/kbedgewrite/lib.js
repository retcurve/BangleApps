exports.input = function(options) {
  options = options||{};
  var text = options.text;
  if ("string"!=typeof text) text="";

  var path = {};

  var characterset = Object.assign({}, require('Storage').readJSON("characterset.json", true) || {});

  function findMarker(strArr) {
    if (strArr.length == 0) {
      Rx1 = 4;
      Rx2 = 6*4;
      Ry1 = 8*4 + R.y;
      Ry2 = 8*4 + 3 + R.y;
    } else if (strArr.length <= 4) {
      Rx1 = (strArr[strArr.length-1].length)%7*6*4 + 4 ;
      Rx2 = (strArr[strArr.length-1].length)%7*6*4 + 6*4;
      Ry1 = (strArr.length)*(8*4) + Math.floor((strArr[strArr.length-1].length)/7)*(8*4) + R.y;
      Ry2 = (strArr.length)*(8*4) + Math.floor((strArr[strArr.length-1].length)/7)*(8*4) + 3 + R.y;
    } else {
      Rx1 = (strArr[strArr.length-1].length)%7*6*4 + 4 ;
      Rx2 = (strArr[strArr.length-1].length)%7*6*4 + 6*4;
      Ry1 = (4)*(8*4) + Math.floor((strArr[strArr.length-1].length)/7)*(8*4) + R.y;
      Ry2 = (4)*(8*4) + Math.floor((strArr[strArr.length-1].length)/7)*(8*4) + 3 + R.y;
    }
    return {x:Rx1,y:Ry1,x2:Rx2,y2:Ry2};
  }

  function draw(noclear) {
    g.reset();
    var l = g.setFont("6x8:4").wrapString(text+' ', R.w-8);
    if (!l) l = [];
    if (!noclear) (flashToggle?(g.fillRect(findMarker(l))):(g.clearRect(findMarker(l))));
    if (l.length>4) l=l.slice(-4);
    g.drawString(l.join("\n"),R.x+4,R.y+4);
  }

  function isInside(rect, e) {
    return e.x>=rect.x && e.x<rect.x+rect.w
          && e.y>=rect.y && e.y<=rect.y+rect.h;
  }

  g.reset().clearRect(R);
  draw(false);

  var flashInterval = setInterval(() => {
    flashToggle = !flashToggle;
    draw(false);
  }, 1000);

  let dragHandlerKB = e=>{
    "ram";
    if (isInside(R, e)) {
      if (lastDrag) g.reset().setColor("#f00").drawLine(lastDrag.x,lastDrag.y,e.x,e.y);
      lastDrag = e.b ? e : 0;
    }
    print(e.x)
    print(e.y)
  }

  let catchSwipe = ()=>{
    E.stopEventPropagation&&E.stopEventPropagation();
  };

  return new Promise((resolve,reject) => {
    Bangle.setUI({mode:"custom", drag:dragHandlerKB, touch:touchHandlerKB, back:()=>{
      Bangle.removeListener("stroke", strokeHandler);
      Bangle.prependListener&&Bangle.removeListener('swipe', catchSwipe); // Remove swipe lister if it was added with `Bangle.prependListener()` (fw2v19 and up).
      if (flashInterval) clearInterval(flashInterval);
      Bangle.setUI();
      g.clearRect(Bangle.appRect);
      resolve(text);
    }});
    Bangle.prependListener&&Bangle.prependListener('swipe', catchSwipe); // Intercept swipes on fw2v19 and later. Should not break on older firmwares.
  });
};
