const express = require("express");
const { servicesControllers } = require("../controllers");
const { asyncWrapper } = require("../helpers");

const router = express.Router();

router.get("/", asyncWrapper(servicesControllers));

module.exports = router;
