const gravatar = require("gravatar");
const { v4 } = require("uuid");
const { ctrlWrapper, HttpError, sendEmail } = require("../../helpers");
const bcrypt = require("bcrypt");
const { User } = require("../../models/users");
const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) throw HttpError(409, "Email in use");
  const hashPassword = await bcrypt.hash(password, 10);
  const verifyToken = v4();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL: gravatar.url(email),
    verificationToken: verifyToken,
  });
  const verifyEmail = {
    to: email,
    subject: "verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verifyToken}">click for verify</a>`,
  };
  await sendEmail(verifyEmail);
  res.status(201).json({
    user: {
      email: email,
      subscription: "starter",
    },
  });
};

module.exports = { register: ctrlWrapper(register) };
