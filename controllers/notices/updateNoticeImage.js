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

  try {
    const imageUrl = await cloudinaryUpload(tempUpload, noticeId, "notices");
    await Notice.findByIdAndUpdate(noticeId, { imageUrl });
    res.json({ imageUrl });
  } catch (error) {
    InternalServerError(error.message);
  }
};

module.exports = updateNoticeImage;
