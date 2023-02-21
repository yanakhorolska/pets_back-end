const { Notice } = require("../../models/noticeModel");

const getAllUsersNotices = async (req, res) => {
  const user = req.user;
  const notices = await Notice.find({ owner: user._id }, "-owner -createdAt -updatedAt");

  res.json({status: "success", data: notices});
};

module.exports = getAllUsersNotices;
