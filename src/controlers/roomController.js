const {
  createRoom,
  getRoomMessages,
  addUserToRoom,
} = require("../handlers/roomHandler.js");

const roomController = async () => {
  return {
    create: await createRoom,
    getMessages: await getRoomMessages,
    addUser: await addUserToRoom,
  };
};

module.exports = roomController;
