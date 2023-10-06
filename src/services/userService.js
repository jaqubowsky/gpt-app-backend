const User = require("../models/userModel");
const Room = require("../models/roomModel");
const { validatePassword } = require("../helpers/utils");

const createUser = async (username, email, authentication) => {
  try {
    const newUser = await User.create({
      username,
      email,
      authentication,
    });

    return newUser;
  } catch (err) {
    throw new Error(err.message);
  }
};

const validateUser = async (email, password) => {
  try {
    const user = await User.findOne({ email }).exec();

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isValid = await validatePassword(
      password,
      user.authentication.hashedPassword,
      user.authentication.salt
    );

    if (!isValid) {
      throw new Error("Invalid credentials");
    }

    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};

const deleteUser = async (id) => {
  try {
    await User.findByIdAndDelete(id).exec();
  } catch (err) {
    throw new Error(err.message);
  }
};

const getUserRooms = async (id) => {
  try {
    const rooms = await Room.find({ users: id })
      .populate("users", "email username _id")
      .populate("owner", "email username _id")
      .exec();

    return rooms;
  } catch (err) {
    throw new Error(err.message);
  }
};

const leaveRoom = async (userId, id) => {
  try {
    const room = await Room.findById(id).populate("users").exec();

    const userIndex = room.users.findIndex(
      (user) => user._id.toHexString() === userId.toHexString()
    );

    if (userIndex === -1) {
      throw new Error("User not found in room");
    }

    room.users.splice(userIndex, 1);

    await room.save();

    return room;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  createUser,
  validateUser,
  deleteUser,
  getUserRooms,
  leaveRoom,
};
