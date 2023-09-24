const { genPassword, issueJWT } = require("../helpers/utils.js");

const userService = require("../services/userService.js");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const { hashedPassword, salt } = genPassword(password);

    const authentication = {
      hashedPassword,
      salt,
    };

    const user = await userService.createUser(username, email, authentication);

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

    const user = await userService.validateUser(email, password);

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

    await userService.deleteUser(id);

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

    const rooms = await userService.getUserRooms(id);

    res.status(200).json({ success: true, rooms });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const leaveRoom = async (req, res) => {
  try {
    const { id } = req.params;

    await userService.leaveRoom(id);

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
