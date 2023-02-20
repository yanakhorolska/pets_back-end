const { FavoriteNotice } = require("../../models/noticeModel");

const removeFromFavorites = async (req, res) => {
  const { _id: user } = req.user;
  const { noticeId } = req.params;

  await FavoriteNotice.findOneAndDelete({ notice: noticeId, user });

  res.status(204).json({ status: "success" });
};

module.exports = removeFromFavorites;
