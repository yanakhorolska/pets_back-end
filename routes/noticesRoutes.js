const express = require("express");
const router = express.Router();

const { getAllNotices } = require("../controllers/notices");

const { ctrlWrapper } = require("../middlewares");

router.get("/", ctrlWrapper(getAllNotices));

module.exports = router;
