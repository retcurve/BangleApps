/* Button-triggered entry point. The app itself is one file, and load() wipes
the interpreter, so the only way to tell it how it was started is to come in
through a different door: eval reads straight out of flash, so this costs a
couple of lines rather than a second copy of the app. */
global.CLOCKSCROLL_BUTTON = true;
eval(require("Storage").read("clockscroll.app.js"));
