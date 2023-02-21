const { Notice } = require("../../models/noticeModel");

const getAllNotices = async (_, res) => {
  const notices = await Notice.find({}, "-owner");
  res.json({status: "success", data: notices});
};

module.exports = getAllNotices;
