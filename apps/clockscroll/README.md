# ![Image](app.png "icon") Clock Scroll

Scrolls the current time across the whole screen in a large font, so it can be
read at arm's length.

## Usage

Unlock the watch while the clock face is showing and the time scrolls across the
screen. After it has scrolled the set number of repeats it returns to the clock
on its own.

* **Tap the screen**, **press the button**, or **lock the watch** to go back to
  the clock straight away.
* If you unlock the watch while an app (rather than a clock) is running, nothing
  happens - the app is left alone.
* Launching `Clock Scroll` from the launcher scrolls the time as well, which is
  handy for trying out settings.

## Settings

`Settings` -> `Apps` -> `Clock Scroll`:

| Setting | Default | Meaning |
| --- | --- | --- |
| Enabled | `on` | Scroll the time on unlock. Turn off to keep the app but stop it taking over |
| Speed | `Medium` | Scrolling speed. Slow, Medium, or Fast |
| Repeats | `3` | Number of times to scroll the time |
| Font size | `Medium` | Small, Medium, or Large |
| Rotate | `0°` | Screen rotation, in 90 degree steps |
| Colour | `Theme` | Text colour. `Theme` follows the system theme foreground |
| Show date | `off` | Scroll the date after the time |
| Max bright | `on` | Force maximum LCD brightness while scrolling |
| Don't dim | `on` | Keep the backlight on while scrolling |
| Countdown | `off` | Show a 3-2-1 countdown before the time scrolls |

The time is rebuilt at the start of every repeat, so a long scroll never shows a
stale minute. 12 or 24 hour format follows the system setting.

## Author

Woogal [github](https://github.com/retcurve)
