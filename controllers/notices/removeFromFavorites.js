const { FavoriteNotice } = require("../../models/noticeModel");
const { NotFound } = require("http-errors")

const removeFromFavorites = async (req, res) => {
  const { _id: user } = req.user;
  const { noticeId } = req.params;

  const result = await FavoriteNotice.findOneAndDelete({ notice: noticeId, user });
  if (!result) throw NotFound({status: "fail", message: "Not find notice in favorite"})
  res.json({ status: "success", message : "Notice removed from favorite"});
};

module.exports = removeFromFavorites;
