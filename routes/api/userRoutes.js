const express = require("express");

const { user: ctrl } = require("../../controllers");

const { ctrlWrapper } = require("../../helpers");

const { authentificate, validation, upload } = require("../../middlewares");

const router = express.Router();

router
  .get("/current", authentificate, ctrlWrapper(ctrl.currentUser))
  //.get("/pets", authentificate, ctrlWrapper(ctrl.userPets))

  .patch("/update", authentificate, ctrlWrapper( ctrl.updateFilds))
  .patch("/avatars", authentificate, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar))

module.exports = router
