const { Notice } = require("../../models/noticeModel");

const getNoticesByCategory = async (req, res) => {
  const { category } = req.params;

  const notices = await Notice.find({ category }).populate("owner");

  res.json(notices);
};

module.exports = getNoticesByCategory;
