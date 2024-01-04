const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { ctrlWrapper } = require("../../helpers");
const { User } = require("../../models/users");
const avatarDir = path.join(__dirname, "../", "../", "public", "avatars");
const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tmpUpload, originalname } = req.file;
  const newFileName = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarDir, newFileName);
  const avatar = await Jimp.read(tmpUpload);
  avatar.resize(250, 250).quality(70).write(resultUpload);
  await fs.rename(tmpUpload, resultUpload);
  const avatarURL = path.join("avatars", newFileName);
  await User.findByIdAndUpdate(_id, { avatarURL });
  res.json({ avatarURL });
};

module.exports = { updateAvatar: ctrlWrapper(updateAvatar) };
