const { Router } = require("express");
const { sponsors : ctrl } = require("../../controllers");
const { ctrlWrapper } = require("../../helpers");

const router = Router();

router.get("/", ctrlWrapper(ctrl.getAll));

module.exports = router;