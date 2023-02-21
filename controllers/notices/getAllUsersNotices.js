const { Notice } = require("../../models/noticeModel");

const getAllUsersNotices = async (req, res) => {
  const user = req.user;
  const notices = await Notice.find({ owner: user._id });

  res.json(notices);
};

module.exports = getAllUsersNotices;
