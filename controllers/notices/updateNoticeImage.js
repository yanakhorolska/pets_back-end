const { Notice } = require("../../models/noticeModel");
const { InternalServerError } = require("http-errors");
const fs = require("fs/promises");
const { cloudinaryUpload } = require("../../services");

const getBufferFromFile = async (pathToFile) => {
  const buffer = await fs.readFile(pathToFile);
  fs.unlink(pathToFile);
  return buffer;
};

const getTempLoad = async (fileToUpload) => {
  const { path, buffer } = fileToUpload;

  if (!path) {
    return buffer;
  }

  return await getBufferFromFile(path);
};

const updateNoticeImage = async (req, res) => {
  const { noticeId } = req.params;

  const tempUpload = await getTempLoad(req.file);

  let imageURL = null;

  try {
    imageURL = await cloudinaryUpload(tempUpload, noticeId, "notices");
    console.log(imageURL);
    const result = await Notice.findByIdAndUpdate(noticeId, { imageURL });
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
    InternalServerError(error.message);
  }
};

module.exports = updateNoticeImage;
