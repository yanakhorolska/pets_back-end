const { Notice } = require("../../models/noticeModel");
// const { InternalServerError } = require("http-errors");
const { cloudinaryUpload } = require("../../services");

const createNotice = async (req, res) => {
  const user = req.user;
  const { category } = req.params;

  const newNotice = new Notice({
    ...req.body,
    category,
    owner: user._id,
  });

  if (req.file) {
    const imageUrl = await cloudinaryUpload(req.file, newNotice._id, "notices");
    newNotice.imageUrl = imageUrl;
  }
  await newNotice.save();

  const result = await Notice.findById(newNotice._id, "-owner -createdAt -updatedAt")

  console.log(result);

  res.status(201).json({status: "success", data: result});
};

module.exports = createNotice;
