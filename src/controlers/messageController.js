const {
  createMessage,
  getUserMessages,
} = require("../handlers/messageHandler.js");

const messageController = async () => {
  return {
    create: await createMessage,
    get: await getUserMessages,
  };
};

module.exports = messageController;
