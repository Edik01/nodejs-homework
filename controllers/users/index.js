const { register } = require("./register");
const { login } = require("./login");
const { currentUser } = require("./currentUser");
const { updateSubscription } = require("./updateSubscription");
const { logout } = require("./logout");
const { updateAvatar } = require("./updateAvatar");

module.exports = {
  register,
  login,
  currentUser,
  updateSubscription,
  logout,
  updateAvatar,
};
