const { ctrlWrapper, HttpError } = require("../../helpers");
const bcrypt = require("bcrypt");
const { User } = require("../../models/users");
const updateSubscription = async (req, res) => {
  const { subscription } = req.body;
  const { _id } = req.user;

  const user = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );

  res.json(user);
};

module.exports = { updateSubscription: ctrlWrapper(updateSubscription) };
