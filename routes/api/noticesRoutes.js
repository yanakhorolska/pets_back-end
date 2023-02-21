const { Router } = require("express");

const { notices: ctrl } = require("../../controllers");
const { ctrlWrapper } = require("../../helpers");

const { addNoticeSchema } = require("../../models/noticeModel");

const {
  validation,
  isValidId,
  authentificate,
  upload,
  checkUser,
} = require("../../middlewares");

const router = Router();

router
  // отримання оголошень по категоріям
  .get("/category/:category", checkUser, ctrlWrapper(ctrl.getNoticesByCategory))
  // додавання оголошень відповідно до обраної категорії
  .post(
    "/category/:category",
    authentificate,
    upload.single("imageUrl"),
    validation(addNoticeSchema),
    ctrlWrapper(ctrl.createNotice)
  );

router //
  // отримання оголошень авторизованого кристувача створених цим же користувачем
  .get("/myNotices", authentificate, ctrlWrapper(ctrl.getAllUsersNotices));

router
  // видалення оголошення авторизованого користувача створеного цим же користувачем
  .delete(
    "/myNotices/:noticeId",
    authentificate,
    isValidId("noticeId"),
    ctrlWrapper(ctrl.deleteNoticeById)
  );

router
  // отримання оголошень авторизованого користувача доданих ним же в обрані
  .get("/favorites", authentificate, ctrlWrapper(ctrl.getUsersFavoriteNotices));

router
  // додавання оголошення авторизованого користувача до обраних
  .post(
    "/favorites/:noticeId",
    authentificate,
    isValidId("noticeId"),
    ctrlWrapper(ctrl.addToFavorites)
  )
  // видалення оголошення авторизованого користувача доданих цим же до обраних
  .delete(
    "/favorites/:noticeId",
    authentificate,
    isValidId("noticeId"),
    ctrlWrapper(ctrl.removeFromFavorites)
  );

router
  // отримання одного оголошення
  .get("/:noticeId", isValidId("noticeId"), checkUser, ctrlWrapper(ctrl.getNoticeById))
  .patch(
    "/:noticeId/imageUrl",
    isValidId("noticeId"),
    authentificate,
    upload.single("notice"),
    ctrl.updateNoticeImage
  );

router.get("/", checkUser, ctrlWrapper(ctrl.getAllNotices));

module.exports = router; 
