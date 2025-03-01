const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ctrlWrapper, HttpError } = require("../../helpers");
const { User } = require("../../models/users");
const { SECRET_KEY } = process.env;
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw HttpError(401, "Email or password is wrong");
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) throw HttpError(401, "Email or password is wrong");
  const payload = { id: user._id };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "10h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: {
      email,
      subscription: user.subscription,
    },
  });
};

module.exports = { login: ctrlWrapper(login) };
