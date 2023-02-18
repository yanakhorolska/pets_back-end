const { Notice } = require("../../models/noticeModel");
const { InternalServerError } = require("http-errors");

const createNotice = async (req, res) => {
  const user = req.user;
  const { category } = req.params;

  const notice = await Notice.create({
    ...req.body,
    category,
    owner: user._id,
  });
  if (!notice) {
    throw InternalServerError("Can not create notice!");
  }

  res.status(201).json(notice);
};

module.exports = createNotice;
