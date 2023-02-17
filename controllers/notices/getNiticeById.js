const { Notice } = require("../../models/noticeModel");
const { NotFound } = require("http-errors");

const getNoticeById = async (req, res) => {
  const { noticeId } = req.params;

  const notice = await Notice.findById(noticeId).populate("owner");

  if (notice) {
    res.json(notice);
  } else {
    throw NotFound(`Can not find contact with ID:${noticeId}`);
  }
};

module.exports = getNoticeById;
