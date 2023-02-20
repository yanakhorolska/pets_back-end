const { FavoriteNotice } = require("../../models/noticeModel");

const addToFavorites = async (req, res) => {
  const { _id: user } = req.user;
  const { noticeId } = req.params;

  const query = { notice: noticeId, user };
  await FavoriteNotice.findOneAndUpdate(query, query, {
    upsert: true,
  });

  res.status(201).json({ status: "sucsess" });
};

module.exports = addToFavorites;
