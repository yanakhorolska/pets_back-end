const { Notice } = require("../../models/noticeModel");

const getAllUsersNotices = async (req, res) => {
  const user = req.user;
  console.log(user._id);
  const notices = await Notice.find({ "owner._id": user._id });

  res.json(notices);
};

module.exports = getAllUsersNotices;
