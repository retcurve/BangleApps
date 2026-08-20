# ![Image](app.png "icon") Message Scroll

Scrolls new messages across the whole screen in a huge font, so they can be read
at arm's length without unlocking the watch.

When a message arrives while the watch is **locked** and showing a **clock**, the
message icon is drawn at the top of the screen and the message text scrolls
underneath it three times. After that the watch returns to the clock, leaving the
message unread so the usual bell shows up in the widget bar.

Messages that arrive while you are in another app are left alone, so nothing gets
interrupted - they buzz and appear in the widget bar as normal.

## Usage

There is nothing to launch. Install it and it takes over when a message arrives.

* **Unlock the watch** (or press the button) while a message is scrolling to open
  it in the normal Messages app.
* Otherwise just wait - it returns to the clock on its own.

## Settings

There is no settings menu yet. Settings are read from `messagescroll.json`:

| Key | Default | Meaning |
| --- | --- | --- |
| `speed` | `150` | Scroll speed, in pixels per second |
| `loops` | `3` | Times to scroll the message before giving up |
| `fontSize` | `2` | Doto font scale |
| `rotate` | `0` | Screen rotation, `0`/`90`/`180`/`270` |
| `maxBright` | `true` | Force maximum LCD brightness while scrolling |
| `doNotDim` | `true` | Keep the backlight on while scrolling |
| `fg` | `'#fff'` | Text colour |
| `bg` | `'#000'` | Background colour |

In Quiet Mode the message is still shown, but the brightness and backlight are
left alone and the watch does not buzz.

## How it works

`messagescroll.0.boot.js` is named with a `0` so it runs before
`messagegui.boot.js` and gets first refusal on the message. If the watch is
locked on a clock face, it saves the message, marks it handled so the normal
Messages UI does not open on top, and loads `messagescroll.app.js`.

Using a full `load()` rather than a fast load is deliberate: the scrolling app
then starts with no widgets and no inherited LCD options, so nothing redraws over
the top of it mid-scroll, and `.bootcde` puts brightness, rotation and the
backlight timeout back on its own when the app exits.

The scroll itself only clears and redraws the band of screen the text occupies -
the message icon above it is drawn once - and takes its position from the clock
rather than from a frame counter, so `speed` stays honest however long a frame
actually takes to draw.

## Author

Woogal [github](https://github.com/retcurve)
