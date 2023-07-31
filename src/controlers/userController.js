const {
  login,
  register,
  deleteAccount,
  logout,
} = require("../handlers/userHandler.js");

const userController = async () => {
  return {
    signup: await register,
    login: await login,
    logout: await logout,
    deleteAccount: await deleteAccount,
  };
};

module.exports = userController;
