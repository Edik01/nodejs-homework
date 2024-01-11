const { register } = require("./register");
const { login } = require("./login");
const { currentUser } = require("./currentUser");
const { updateSubscription } = require("./updateSubscription");
const { logout } = require("./logout");
const { updateAvatar } = require("./updateAvatar");
const { verificationEmail } = require("./verificationEmail");
const { resendVerificationEmail } = require("./resendVerificationEmail");

module.exports = {
  register,
  login,
  currentUser,
  updateSubscription,
  logout,
  updateAvatar,
  verificationEmail,
  resendVerificationEmail,
};
