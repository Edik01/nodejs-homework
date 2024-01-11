const { ctrlWrapper, HttpError, sendEmail } = require("../../helpers");
const { User } = require("../../models/users");
const { BASE_URL } = process.env;
const resendVerificationEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw HttpError(404, "User not found");
  const { verify, verificationToken } = user;
  if (verify) throw HttpError(400, "Verification has already been passed");
  const verifyEmail = {
    to: email,
    subject: "verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">click for verify</a>`,
  };
  await sendEmail(verifyEmail);
  res.json({
    message: "Verification email sent",
  });
};

module.exports = {
  resendVerificationEmail: ctrlWrapper(resendVerificationEmail),
};
