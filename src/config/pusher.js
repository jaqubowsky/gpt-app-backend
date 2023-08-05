const { PUSHER_APP_ID, PUSHER_KEY, PUSHER_SECRET } = require("./config");

const Pusher = require("pusher");

const pusher = new Pusher({
  appId: PUSHER_APP_ID,
  key: PUSHER_KEY,
  secret: PUSHER_SECRET,
  cluster: "eu",
  useTLS: true,
});

module.exports = pusher;
