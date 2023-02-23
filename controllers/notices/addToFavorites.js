const { FavoriteNotice, Notice } = require("../../models/noticeModel");
const { NotFound } = require("http-errors")

const addToFavorites = async (req, res, next) => {
  const { _id: user } = req.user;
  const { noticeId } = req.params;

  const query = { notice: noticeId, user };

  Notice.findById(noticeId, async (err, result) => {
    if (err || !result)
      return next(
        NotFound({
          status: "fail",
          message: err ? err.message : "Not find notice by ID",
        })
      );

    await FavoriteNotice.findOneAndUpdate(query, query, {
      upsert: true,
    });

    res.status(201).json({ status: "sucsess" });
  });

};

module.exports = addToFavorites;
