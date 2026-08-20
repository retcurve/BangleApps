/* Scroll new messages full-screen on the clock face, locked or not.

Named *.0.boot.js so this runs before messagegui.boot.js and gets first refusal
on the message (see bthrm.0.boot.js / messagesoverlay.0.boot.js for the same
trick). */
Bangle.on("message", function(type, msg) {
  if (msg.handled) return;
  // only handle some event types
  if (!(type == "text" || type == "call")) return;
  if (type == "text" && msg.id == "nav") return;
  if (msg.t != "add" || !msg.new) return;
  if (!Bangle.CLOCK) return; // in an app - don't hijack it, just let it buzz as usual

  /* Save before claiming the message. messages.write() deletes `handled` from
  the objects it writes, and ours is one of them, so setting it first would let
  messagegui open on top of us. Saving also puts the message where the app can
  find it, and leaves it in the store for the widget if we time out. */
  require("messages").save(msg);
  msg.handled = true;

  /* Plain load(), not Bangle.load(): a full interpreter reset means the app
  inherits no widgets, fonts or LCD options, and .bootcde restores all of them
  from setting.json when it exits - so there is no global state to unwind. */
  load("messagescroll.app.js");
});
