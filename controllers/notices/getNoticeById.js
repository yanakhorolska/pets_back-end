const { Notice } = require("../../models/noticeModel");
const { NotFound } = require("http-errors");

const getNoticeById = async (req, res) => {
  const { noticeId } = req.params;

  const notice = await Notice.findById(noticeId, ).populate(
    "owner",
    "_id name email"
  );

  if (notice) {
    res.json({status: "success", data: notice});
  } else {
    throw NotFound(`Can not find notice with ID:${noticeId}`);
  }
};

module.exports = getNoticeById;
