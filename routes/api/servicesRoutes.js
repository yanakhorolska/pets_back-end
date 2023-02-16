const express = require("express");
const { servicesControllers } = require("../../controllers");
const { ctrlWrapper } = require("../../helpers");

const router = express.Router();

router.get("/", ctrlWrapper(servicesControllers));

module.exports = router;
