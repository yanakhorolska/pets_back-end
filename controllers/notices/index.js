const getAllNotices = require("./getAllNotices");
const getNoticeById = require("./getNoticeById");
const createNotice = require("./createNotice");
const getNoticesByCategory = require("./getNoticesByCategory");
const getAllUsersNotices = require("./getAllUsersNotices");
const deleteNoticeById = require("./deleteNoticeById");
const updateNoticeImage = require("./updateNoticeImage");
const getUsersFavoriteNotices = require("./getUsersFavoriteNotices");
const addToFavorites = require("./addToFavorites");
const removeFromFavorites = require("./removeFromFavorites");

module.exports = {
  getAllNotices,
  getNoticeById,
  createNotice,
  getNoticesByCategory,
  getAllUsersNotices,
  deleteNoticeById,
  updateNoticeImage,
  getUsersFavoriteNotices,
  addToFavorites,
  removeFromFavorites,
};
