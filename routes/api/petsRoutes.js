const { Router } = require("express");
const { schemas, customMessage } = require('../../models/petModel')

const { pets: ctrl } = require("../../controllers");

const { ctrlWrapper } = require("../../helpers");

const { authentificate, validation, isValidId, upload } = require("../../middlewares");

const router = Router();

router
  .get("/", authentificate, ctrlWrapper(ctrl.getAll)) // TEMP ONLY FOR TEST
  .post("/", authentificate, upload.single("avatar"), validation(schemas.addSchema, customMessage.post), ctrlWrapper(ctrl.addPet))

  .patch("/:petId/avatars", authentificate, isValidId("petId"), upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar))

  .get("/:petId", authentificate, isValidId("petId"), ctrlWrapper(ctrl.getById))
  .patch("/:petId", authentificate, isValidId("petId"), validation(schemas.updateSchema, customMessage.patch), ctrlWrapper(ctrl.updateById))

  .delete("/:petId", authentificate, isValidId("petId"), ctrlWrapper(ctrl.deletePet))

module.exports = router