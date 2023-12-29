const { ctrlWrapper } = require("../../helpers");
const { User } = require("../../models/users");
const logout = async (req, res) => {
  const { _id } = req.user;

  const user = await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json();
};

module.exports = { logout: ctrlWrapper(logout) };
