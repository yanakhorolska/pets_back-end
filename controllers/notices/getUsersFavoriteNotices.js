const { FavoriteNotice } = require("../../models/noticeModel");

const getUsersFavoriteNotices = async (req, res) => {
  const user = req.user;

  const pipeline = [
    {
      $match: {
        user: user._id,
      },
    },
    {
      $lookup: {
        from: "notices",
        let: {
          notice_id: "$notice",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", "$$notice_id"],
              },
            },
          },
          {
            $unset: ["owner", "createdAt", "updatedAt"],
          },
        ],
        as: "notices",
      },
    },
    {
      $unset: ["_id", "notice", "user"],
    },
  ];

  const notices = await FavoriteNotice.aggregate(pipeline);
  res.json(notices);
};

module.exports = getUsersFavoriteNotices;
