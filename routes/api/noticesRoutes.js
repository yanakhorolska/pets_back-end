const express = require("express");
const router = express.Router();

const { notices: ctrl } = require("../../controllers");
const { ctrlWrapper } = require("../../helpers");

const { addNoticeSchema } = require("../../models/noticeModel");
const { validation, isValidId, authentificate } = require("../../middlewares");

router.get("/", ctrlWrapper(ctrl.getAllNotices));

router
  // отримання одного оголошення
  .get("/:noticeId", isValidId("noticeId"), ctrlWrapper(ctrl.getNoticeById));

router
  // отримання оголошень по категоріям
  .get("/category/:category", ctrlWrapper(ctrl.getNoticesByCategory))
  // додавання оголошень відповідно до обраної категорії
  .post(
    "/category/:category",
    authentificate,
    validation(addNoticeSchema),
    ctrlWrapper(ctrl.createNotice)
  );

router //
  // отримання оголошень авторизованого кристувача створених цим же користувачем
  .get("/myNotices", authentificate, ctrl.getAllUsersNotices);

router
  // видалення оголошення авторизованого користувача створеного цим же користувачем
  .delete("/myNotices/:noticeId", authentificate, isValidId("noticeId"));

router
  // отримання оголошень авторизованого користувача доданих ним же в обрані
  .get("/favorites", authentificate);

router
  // додавання оголошення авторизованого користувача до обраних
  .post("/favorites/:noticeId", authentificate, isValidId("noticeId"))
  // видалення оголошення авторизованого користувача доданих цим же до обраних
  .delete("/favorites/:noticeId", authentificate, isValidId("noticeId"));

module.exports = router;
