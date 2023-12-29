const gravatar = require("gravatar");

const { ctrlWrapper, HttpError } = require("../../helpers");
const bcrypt = require("bcrypt");
const { User } = require("../../models/users");
const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) throw HttpError(409, "Email in use");
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL: gravatar.url(email),
  });
  res.status(201).json({
    user: {
      email: "example@example.com",
      subscription: "starter",
    },
  });
};

module.exports = { register: ctrlWrapper(register) };
