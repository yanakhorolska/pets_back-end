const { Notice, FavoriteNotice } = require("../../models/noticeModel");
const { NotFound } = require("http-errors");
const { cloudinaryDelete } = require("../../services");

const deleteNoticeById = async (req, res) => {
  const { noticeId } = req.params;

  const { deletedCount } = await Notice.deleteOne({
    _id: noticeId,
  });
  if (deletedCount) {
    await cloudinaryDelete("notices", noticeId);
    await FavoriteNotice.deleteMany({ notice: noticeId });
    res.json({status: "success", data :{
      message: "notice deleted",
      id: noticeId,
    }});
  } else {
    throw NotFound(`Can not find notice with ID:${noticeId}`);
  }
};

module.exports = deleteNoticeById;
