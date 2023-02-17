const express = require("express");
const router = express.Router();

const { notices: ctrl } = require("../../controllers");
const { ctrlWrapper } = require("../../helpers");

const { addNoticeSchema } = require("../../models/noticeModel");
const { validation, isValidId } = require("../../middlewares");

router
  .get("/", ctrlWrapper(ctrl.getAllNotices))
  .post("/", validation(addNoticeSchema), ctrlWrapper(ctrl.createNotice));

router //
  .get("/:noticeId", isValidId, ctrlWrapper(ctrl.getNoticeById));

module.exports = router;
