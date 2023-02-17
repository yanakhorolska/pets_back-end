const express = require("express");
const router = express.Router();

const { notices: ctrl } = require("../../controllers");
const { ctrlWrapper } = require("../../helpers");

const { addNoticeSchema } = require("../../models/noticeModel");
const { validation, isValidId } = require("../../middlewares");

router.get("/", ctrlWrapper(ctrl.getAllNotices));

router
  // отримання оголошень по категоріям
  .get("/category/:category", ctrlWrapper(ctrl.getNoticesByCategory))
  // додавання оголошень відповідно до обраної категорії
  .post(
    "/category/:category",
    validation(addNoticeSchema),
    ctrlWrapper(ctrl.createNotice)
  );

router
  // отримання одного оголошення
  .get("/:noticeId", isValidId, ctrlWrapper(ctrl.getNoticeById));

router //
  // отримання оголошень авторизованого кристувача створених цим же користувачем
  .get("/myNotices")
  // видалення оголошення авторизованого користувача створеного цим же користувачем
  .delete("/myNotices/:noticeId", isValidId);

router
  // отримання оголошень авторизованого користувача доданих ним же в обрані
  .get("/favorites")
  // додавання оголошення авторизованого користувача до обраних
  .post("/favorites/:noticeId", isValidId)
  // видалення оголошення авторизованого користувача доданих цим же до обраних
  .delete("/favorites/:noticeId", isValidId);

module.exports = router;
