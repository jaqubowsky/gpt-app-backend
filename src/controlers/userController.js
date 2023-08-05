const {
  login,
  register,
  deleteAccount,
  logout,
  getMe,
  getUserRooms,
} = require("../handlers/userHandler.js");

const userController = async () => {
  return {
    getMe: await getMe,
    getRooms: await getUserRooms,
    signup: await register,
    login: await login,
    logout: await logout,
    deleteAccount: await deleteAccount,
  };
};

module.exports = userController;
