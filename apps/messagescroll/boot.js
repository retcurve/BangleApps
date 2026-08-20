/* Scroll new messages full-screen when on the clock face.

Named *.0.boot.js so this runs before messagegui.boot.js and gets first refusal
on the message */
Bangle.on("message", function(type, msg) {
  if (msg.handled) return;
  // only handle some event types
  if (!(type == "text" || type == "call")) return;
  if (type == "text" && msg.id == "nav") return;
  if (msg.t != "add" || !msg.new) return;
  if (!Bangle.CLOCK) return; // in an app - don't hijack it, just let it buzz as usual

  require("messages").save(msg);
  msg.handled = true;

  load("messagescroll.app.js");
});
