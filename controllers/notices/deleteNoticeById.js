const { Notice } = require("../../models/noticeModel");
const { NotFound } = require("http-errors");

const deleteNoticeById = async (req, res) => {
  const { noticeId } = req.params;

  const { deletedCount } = await Notice.deleteOne({
    _id: noticeId,
  });
  if (deletedCount) {
    res.json({
      message: "notice deleted",
      id: noticeId,
    });
  } else {
    throw NotFound(`Can not find notice with ID:${noticeId}`);
  }
};

module.exports = deleteNoticeById;
