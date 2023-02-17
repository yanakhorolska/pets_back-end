const { Router } = require("express");

const { pets: ctrl } = require("../../controllers");

const { ctrlWrapper } = require("../../helpers");

const { authentificate, validation, upload } = require("../../middlewares");

const router = Router()

router
    .get("/", ctrlWrapper(ctrl.getAll))
    .post("/", authentificate, ctrlWrapper(ctrl.addPet))

    .get("/kind", ctrlWrapper(ctrl.getAllKind))
    .post("/kind", ctrlWrapper(ctrl.addKind))
  
    .get("/breed", ctrlWrapper(ctrl.getAllBreedOfKind))
    .post("/breed", ctrlWrapper(ctrl.addBreed))

module.exports = router