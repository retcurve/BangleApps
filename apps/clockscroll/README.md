# ![Image](app.png "icon") Clock Scroll

Scrolls the current time across the whole screen in a large font, so it can be
read at arm's length.

## Usage

With `Run` set to `On unlock`, unlocking the watch while the clock face is
showing scrolls the time across the screen. `On button` adds the button to
that: pressing it on the clock scrolls the time too, whether the watch is
locked or not. After the set number of repeats it returns to the clock on its
own.

* **Tap the screen** or **lock the watch** to go back to the clock straight
  away.
* **Press the button** to go back to the clock too - except with `Run` set to
  `On button`, where it carries on to the launcher instead, which is where that
  press would have taken you from the clock. That goes for a scroll the button
  started and one that unlocking started alike.
* The watch is kept awake while the time is scrolling, so the auto-lock can't
  cut the repeats short. Your normal lock and backlight timeouts come back
  afterwards.
* If you unlock the watch while an app (rather than a clock) is running, nothing
  happens - the app is left alone.
* Launching `Clock Scroll` from the launcher scrolls the time as well, which is
  handy for trying out settings.

## Settings

`Settings` -> `Apps` -> `Clock Scroll`:

| Setting | Default | Meaning |
| --- | --- | --- |
| Run | `On unlock` | What starts the scroll: `On unlock`, `On button` (the button as well as unlocking), or `Off` to keep the app installed but stop it taking over |
| Speed | `Medium` | Scrolling speed. Slow, Medium, or Fast |
| Repeats | `3` | Number of times to scroll the time |
| Font size | `Medium` | Small, Medium, or Large |
| Rotate | `0°` | Screen rotation, in 90 degree steps |
| Colour | `Theme` | Text colour. `Theme` follows the system theme foreground |
| Show time | `on` | Scroll the time |
| Show date | `off` | Scroll the date, after the time if both are on |
| Max bright | `on` | Force maximum LCD brightness while scrolling |
| Don't dim | `on` | Keep the backlight on while scrolling |

`Show time` and `Show date` can both be off while you're in the menu, but
leaving it that way would mean nothing to scroll, so `< Back` shows an alert
and stays put until you turn one of them on.

The text is rebuilt at the start of every repeat, so a long scroll never shows a
stale minute. 12 or 24 hour format follows the system setting.

## Author

Woogal [github](https://github.com/retcurve)
