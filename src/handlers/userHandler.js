const User = require("../models/userModel.js");
const Room = require("../models/roomModel.js");
const {
  genPassword,
  validatePassword,
  issueJWT,
} = require("../helpers/utils.js");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const { hashedPassword, salt } = genPassword(password);

    const user = await User.create({
      username,
      email,
      authentication: { hashedPassword, salt },
    });

    res.status(201).json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).exec();

    if (!user) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid credentials" });
    }

    const isValid = await validatePassword(
      password,
      user.authentication.hashedPassword,
      user.authentication.salt
    );

    if (!isValid) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid credentials" });
    }

    const { token, expires } = issueJWT(user);

    res.cookie("jwt", token, {
      expires,
      httpOnly: false,
      secure: false,
    });

    return res.status(200).json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const logout = (req, res) => {
  if (req.cookies["jwt"]) {
    res.clearCookie("jwt").status(200).json({
      message: "You have logged out successfully.",
    });
  } else {
    res.status(401).json({
      success: false,
      error: "Already logged out.",
    });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const { id } = req.user;

    await User.findByIdAndDelete(id).exec();

    res.clearCookie("jwt");
    res
      .status(200)
      .json({ success: true, message: "Account deleted successfully." });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const getMe = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "You are not logged in.",
      });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const getUserRooms = async (req, res) => {
  try {
    const { id } = req.user;

    const rooms = await Room.find({ users: id })
      .populate("users", "email username _id")
      .populate("owner", "email username _id")
      .exec();

    res.status(200).json({ success: true, rooms });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const leaveRoom = async (req, res) => {
  try {
    const { id } = req.params;

    const room = await Room.findById(id).exec();

    if (!room) {
      return res.status(404).json({ success: false, error: "Room not found" });
    }

    const userIndex = room.users.findIndex((user) => user == req.user.id);

    if (userIndex === -1) {
      return res
        .status(400)
        .json({ success: false, error: "You are not in this room" });
    }

    room.users.splice(userIndex, 1);

    await room.save();

    res.status(200).json({ success: true, room });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  register,
  login,
  logout,
  deleteAccount,
  getMe,
  getUserRooms,
  leaveRoom,
};
