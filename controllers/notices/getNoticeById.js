const { Notice, FavoriteNotice } = require("../../models/noticeModel");
const { NotFound } = require("http-errors");

const getNoticeById = async (req, res) => {
  const { noticeId } = req.params;
  const user = req?.user;
 
  const notice = await Notice.findById(noticeId, "-createdAt -updatedAt").populate("owner")

  if (notice) {
    const { owner, ...result}  = notice.toObject()
    const { email = "", phone ="" } = owner
    const addInformation = {email, phone}
    if (user) {
      if (await FavoriteNotice.findOne({user, notice}))
        addInformation.favorite = true;
      else
        addInformation.favorite = false;
    }
    res.json({status: "success", data: {...result, ...addInformation}});
  } else {
    throw NotFound(`Can not find notice with ID:${noticeId}`);
  }
};

module.exports = getNoticeById;
