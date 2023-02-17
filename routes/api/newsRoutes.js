const { Router } = require("express");
const { news : ctrl } = require("../../controllers");
const { ctrlWrapper } = require("../../helpers");

const router = Router();

router.get("/", ctrlWrapper(ctrl.getNews));

module.exports = router;
