const getAllNotices = require("./getAllNotices");
const getNoticeById = require("./getNiticeById");
const createNotice = require("./createNotice");
const getNoticesByCategory = require("./getNoticesByCategory");
const getAllUsersNotices = require("./getAllUsersNotices");
const deleteNoticeById = require("./deleteNoticeById");
const updateNoticeImage = require("./updateNoticeImage");

module.exports = {
  getAllNotices,
  getNoticeById,
  createNotice,
  getNoticesByCategory,
  getAllUsersNotices,
  deleteNoticeById,
  updateNoticeImage,
};
