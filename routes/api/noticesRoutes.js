const express = require("express");
const router = express.Router();

const { notices: ctrl } = require("../../controllers");

const { ctrlWrapper } = require("../../helpers");

router.get("/", ctrlWrapper(ctrl.getAllNotices));

router.get("/:noticeId", ctrlWrapper(ctrl.getNoticeById));

module.exports = router;
