const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { ctrlWrapper } = require("../../helpers");
const { User } = require("../../models/users");
const avatarDir = path.join(__dirname, "../", "../", "public", "avatars");
const updateAvatar = async (req, res) => {
  const { _id } = req.user;
};

module.exports = { updateAvatar: ctrlWrapper(updateAvatar) };
