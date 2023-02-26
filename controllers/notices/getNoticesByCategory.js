const { Notice } = require("../../models/noticeModel");

const getNoticesByCategory = async (req, res) => {
  const { category } = req.params;
  const user = req?.user;

  if (!user) {
    const notices = await Notice.find(
      { category },
      "-owner -createdAt -updatedAt"
    ).sort({ createdAt: -1 });

    return res.json({ status: "success", data: notices });
  }

  const pipeline = [
    {
      $match: {
        category
      }
    },
    {
      $lookup: {
        from: "favoritenotices",
        let: {
          notice: "$_id",
          user: user._id,
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ["$user", "$$user"],
                  },
                  {
                    $eq: ["$notice", "$$notice"],
                  },
                ],
              },
            },
          },
        ],
        as: "favorite",
      },
    },
    {
      $addFields: {
        myads: {
          $eq:["$owner", user._id]
        },
        favorite: {
          $convert: {
            input: {
              $size: "$favorite",
            },
            to: "bool",
          },
        },
      },
    },
    {
      $sort : { "createdAt" : -1}
    },
    {
      $unset: ["owner", "createdAt", "updatedAt"],
    },
  ];

  await Notice.aggregate(pipeline).exec((err, docs) => {
    const result = docs.map((doc) => {
      const { owner, ...docData } = Notice.hydrate(doc).toObject();
      return docData;
    }); 
    res.json({status: "success", data: result});
  });
  
};

module.exports = getNoticesByCategory;
