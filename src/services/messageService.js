const Message = require("../models/messageModel.js");

const getMessages = async (id) => {
  try {
    const messages = await Message.find({ user: id }).exec();

    return messages;
  } catch (err) {
    throw new Error(err.message);
  }
};

const createMessage = async (content, user, room) => {
  try {
    const message = await Message.create({
      content,
      user,
      room,
    });

    return message;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = { getMessages, createMessage };
