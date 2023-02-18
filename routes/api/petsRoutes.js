const { Router } = require("express");
const { schemas, customMessage } = require('../../models/petModel')

const { pets: ctrl } = require("../../controllers");

const { ctrlWrapper } = require("../../helpers");

const { authentificate, validation, isValidId, upload } = require("../../middlewares");

const router = Router()

router
  .get("/", authentificate, ctrlWrapper(ctrl.getAll))
  .post("/", authentificate, validation(schemas.addSchema, customMessage.post), ctrlWrapper(ctrl.addPet))

  .patch("/:petId/avatars", authentificate, upload.single("avatar"), isValidId("petId"), ctrlWrapper(ctrl.updateAvatar))

  .get("/:petId", authentificate, isValidId("petId"), ctrlWrapper(ctrl.getByID))
  .put("/:petId", authentificate, validation(schemas.addSchema, customMessage.put), isValidId("petId"), ctrlWrapper(ctrl.up))
  
  .delete(":/petId", authentificate, isValidId("petId"), ctrlWrapper(ctrl.deletePet))

module.exports = router