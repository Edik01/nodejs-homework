const { ctrlWrapper } = require("../../helpers");

const currentUser = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

module.exports = { currentUser: ctrlWrapper(currentUser) };
