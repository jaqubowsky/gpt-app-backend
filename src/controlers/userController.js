const {
  login,
  register,
  deleteAccount,
  logout,
  getMe,
  getUserRooms,
  leaveRoom,
} = require("../handlers/userHandler.js");

const userController = async () => {
  return {
    getMe: await getMe,
    getRooms: await getUserRooms,
    signup: await register,
    login: await login,
    logout: await logout,
    deleteAccount: await deleteAccount,
    leave: await leaveRoom,
  };
};

module.exports = userController;
