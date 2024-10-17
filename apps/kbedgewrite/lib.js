exports.input = function(options) {

  options = options||{};
  let text = options.text;
  if ('string' != typeof text) text='';

  // Colours for number of corner occurrences
  let colours = ['#ff0', '#0f0', '#f00', '#00f' ,'#0ff', '#f0f', '#fff'];

  const cornerSize = g.getWidth() / 3;
  let punctuationMode = false;
  let path = '';
  let cursorPos = text.length;

  let characterSet = Object.assign({}, require('Storage').readJSON('kbedgewrite.charset.json', true) || {});

  function draw() {
    g.clearRect(Bangle.appRect).setClipRect(Bangle.appRect.x, Bangle.appRect.y, Bangle.appRect.x2, Bangle.appRect.y2);

    // Draw the text string
    let l = g.setFont('6x8:4').wrapString(text.substring(0, cursorPos) + '_' + text.substring(cursorPos), g.getWidth());
    if (!l) l = [];
    if (l.length>5) {
      let textPos = 0;
      let lineNum;
      for (lineNum = 0; lineNum < l.length; lineNum++) {
        textPos = textPos + l[lineNum].length - 1;
        if (textPos >= cursorPos) break;
      }
      l=l.slice(lineNum - l.length - 5);
    }
    g.setColor(g.theme.fg);
    g.setFontAlign(-1, -1, 0);
    g.drawString(l.join('\n'), Bangle.appRect.x, Bangle.appRect.y);

    // Draw punctuation flag
    if (punctuationMode > 0) {
      let x = (g.getWidth() / 2) - 12;
      let y = g.getHeight() - 32;
      g.setColor('#F00');
      g.fillRect(x,y,x+24,y+32);
      g.setColor('#FFF');
      g.setFont('6x8:4');
      g.drawString('P', x+4, y+4, false);
    }

    // Draw corners
    for (let corner=1; corner<5; corner++) {
      // Count the occurences of the current corner to set the appropriate colour
      let regex = new RegExp(corner.toString(), 'g' );
      let count = (path.match(regex)||[]).length;
      if (count>0) {
        g.setColor(colours[count-1]);
        let x = (corner<3) ? 0 : g.getWidth() - (cornerSize);
        let y = (corner>1 && corner<4) ? 0 : g.getHeight() - (cornerSize);
        g.fillRect(x, y, x + (cornerSize), y + (cornerSize));
      }
    }
  }

  function processPath() {
    let capital = false;

    // Punctuation paths end in 5
    if (punctuationMode) {
      path = path + '5';
    }

    // Capital letters end in 2, remove that and set a capital flag
    // but only if the path isn't 232 (cursor right)
    if (path != '232' && path.length > 2 && path.slice(-1) == '2') {
      path = path.slice(0,-1);
      capital = true;
    }

    // Find character from path
    let char = characterSet[path];

    // Handle capitals
    if (capital && char != 'undefined') {
      if (char.charCodeAt(0)>96 && char.charCodeAt(0)<123) {
      char = char.toUpperCase();
      } else {
        // Anything that can't be capitalised is an invalid path
        char = undefined;
      }
    }

    if (char != 'undefined') {
      switch (char) {
        // Backspace
        case '#bs': {
          text = text.substring(0,cursorPos-1) + text.substring(cursorPos);
          cursorPos--;
          break;
        }
        // Word Backspace
        case '#wbs': {
          let lastIndex = text.substring(0, cursorPos).lastIndexOf(' ');

          // If cursor character is the break character, remove it
          if (lastIndex == cursorPos - 1) {
            text = text.substring(0, cursorPos-1) + text.substring(cursorPos);
            cursorPos--;
          }
          // Remove everything up to the last word break character
          let words = text.substring(0, cursorPos).split(' ');
          text = words.slice(0, -1).join(' ') + ' ' + text.substring(cursorPos);
          cursorPos = cursorPos - words.slice(-1)[0].length;
          break;
        }
        // Enable punctuation mode
        case '#pu-on': {
          punctuationMode = true;
          break;
        }
        // Disable punctuation mode
        case '#pu-off': {
          punctuationMode = false;
          break;
        }
        case '#cur-left': {
          if (cursorPos > 0) {
            cursorPos--;
          }
          break;
        }
        case '#cur-right': {
          if (cursorPos < text.length) {
            cursorPos++;
          }
          break;
        }
        case '#cur-word-left': {
          if (text.substring(cursorPos-1, cursorPos) == ' ') {
              cursorPos--;
          }
          cursorPos = 1 + text.substring(0, cursorPos).lastIndexOf(' ');
          break;
        }
        case '#cur-word-right': {
          if (text.substring(cursorPos, cursorPos+1) == ' ') {
              cursorPos++;
          }
          let nextPos = text.substring(cursorPos).indexOf(' ');
          if (nextPos > -1) {
            cursorPos = cursorPos + nextPos;
          } else {
            cursorPos = text.length;
          }
          break;
        }
        case '#cur-home': {
          cursorPos = 0;
          break;
        }
        case '#cur-end': {
          cursorPos = text.length;
          break;
        }
        // Append character
        default: {
          text = text.substring(0, cursorPos) + char + text.substring(cursorPos);
          cursorPos++;
        }
      }
    }
    // Reset path
    path = "";
  }

  let dragHandler = e=>{
    'ram';
    if (e.b == 0) { // Finger lifted, process completed path
      processPath();
      draw();
    } else {
      let corner = 0;

      if (e.x < cornerSize) {
        if (e.y < cornerSize) {
          corner = 2;
        } else if (e.y > g.getHeight() - cornerSize) {
          corner = 1;
        }
      } else if (e.x > g.getWidth() - cornerSize) {
        if (e.y < cornerSize) {
          corner = 3;
        } else if (e.y > g.getHeight() - cornerSize) {
          corner = 4;
        }
      }

      // Append new corner to path
      if (corner > 0 && path.slice(-1) != corner) {
        path += corner;
        draw();
      }
    }
  };

  // Draw initial string
  g.setBgColor(g.theme.bg);
  draw();

  return new Promise((resolve,reject) => {
    Bangle.setUI({mode: 'custom', drag: dragHandler, btn: () => {
      // Exit and return text on button
      Bangle.setUI();
      g.clearRect(Bangle.appRect);
      resolve(text);
    }});
  });


};
