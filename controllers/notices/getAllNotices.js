const { Notice } = require("../../models/noticeModel");

const getAllNotices = async (req, res) => {
  const notices = await Notice.find({}).populate("owner");
  res.json(notices);
};

module.exports = getAllNotices;
