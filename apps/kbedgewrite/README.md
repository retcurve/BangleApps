# Edgewrite Keyboard

A library that provides a swipeable keyboard using the edgewrite system https://depts.washington.edu/ewrite/

Swipe from corner to corner to enter characters and press the button to submit the text to the calling app. Letters can be capitalised by finishing the stroke in the top left corner. 

![](letters.gif)

For a full character chart see https://depts.washington.edu/ewrite/downloads/EwChart.pdf

Supported: letters (including capitals), numbers, backspace, space, and punctuation.
Currently unsupported: Extended mode, accents, cursor controls, and word-level stroking.

## Usage

In your app's metadata, add:

```
  "dependencies": {"textinput":"type"},
```

From inside your app, call:

```
Bangle.loadWidgets();
Bangle.drawWidgets();
require("textinput").input({text:"Foo"}).then(result => {
  console.log("Text input", E.toJS(result));
});
```

The first argument to `input` is an object containing the following:

* `text` - initial text to edit

(in the future, the ability to restrict usage of newline/etc may be added)

