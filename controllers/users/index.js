const { register } = require("./register");
const { login } = require("./login");
const { currentUser } = require("./currentUser");
const { updateSubscription } = require("./updateSubscription");

module.exports = {
  register,
  login,
  currentUser,
  updateSubscription,
};
