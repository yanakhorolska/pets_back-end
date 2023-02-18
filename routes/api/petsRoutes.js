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
    // .put("/:petId", authentificate, isValidId("petId"), )
    
    .delete(":/petId", authentificate, isValidId("petId"), ctrlWrapper(ctrl.deletePet))

    // #features
    // .get("/kind", ctrlWrapper(ctrl.getAllKind))
    // .post("/kind", ctrlWrapper(ctrl.addKind))
  
    // .get("/breed", ctrlWrapper(ctrl.getAllBreedOfKind))
    // .post("/breed", ctrlWrapper(ctrl.addBreed))

module.exports = router