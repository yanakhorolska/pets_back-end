const { Notice } = require("../../models/noticeModel");
const { cloudinaryUpload } = require("../../services");

const updateNoticeImage = async (req, res) => {
  const { noticeId } = req.params;

  const imageUrl = await cloudinaryUpload(req.file, noticeId, "notices");
  await Notice.findByIdAndUpdate(noticeId, { imageUrl });
  res.json({ status: "success", data: imageUrl });

};

module.exports = updateNoticeImage;
