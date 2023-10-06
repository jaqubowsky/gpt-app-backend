const Room = require("../models/roomModel.js");
const User = require("../models/userModel.js");

const createRoom = async (name, owner) => {
  try {
    if (!name) {
      throw new Error("Name is required");
    }

    if (!owner) {
      throw new Error("Owner is required");
    }
    const room = await Room.create({
      name,
      owner,
      users: [owner],
    });

    await room.save();

    return room;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getRoomMessages = async (id) => {
  try {
    const room = await Room.findById(id).populate("messages").exec();

    return room.messages;
  } catch (err) {
    throw new Error(err.message);
  }
};

const addUserToRoom = async (roomId, email) => {
  try {
    const room = await Room.findById(roomId).exec();

    if (!roomId) {
      throw new Error("Room id is required");
    }

    if (!email) {
      throw new Error("Email is required");
    }

    if (!room) {
      throw new Error("Room not found");
    }

    const user = await User.findOne({ email }).exec();

    if (!user) {
      throw new Error("User not found");
    }

    if (room.users.includes(user.id)) {
      throw new Error("User already in room");
    }

    if (room.users.length >= 2) {
      throw new Error("Room is full");
    }

    room.users.push(user);

    await room.save();
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = { createRoom, getRoomMessages, addUserToRoom };
