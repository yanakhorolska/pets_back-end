const { Notice, FavoriteNotice } = require("../../models/noticeModel");


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
            $addFields : {
              myads: {
                $eq:["$owner", user._id]
              }
            }
          },
          {
            $unset: ["owner", "createdAt", "updatedAt"],
          },
        ],
        as: "notice",
      },
    },
    {
      $sort : { "createdAt" : -1}
    },
    {
      $unwind: {
        'path': '$notice'
      }
    },
    {
      $replaceRoot : {
      newRoot: "$notice"
      }
    },
    {
       $addFields : {favorite : true}
    },
  ];

  await FavoriteNotice.aggregate(pipeline).exec((err, docs) => {
    const result = docs.map((doc) => {
      const { owner, ...docData } = Notice.hydrate(doc).toObject();
      return docData;
    });
    res.json({ status: "success", data: result });
  });
  
};

module.exports = getUsersFavoriteNotices;
