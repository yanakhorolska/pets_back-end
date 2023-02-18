const { Schema , model } = require('mongoose')

const favoriteNoticeSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "user" },
    notice: { type: Schema.Types.ObjectId, ref: "notice" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const FavoriteNotice = model("favoritenotice", favoriteNoticeSchema);

module.exports =  { FavoriteNotice }