const { Notice } = require("../../models/noticeModel");

const getAllNotices = async (req, res) => {
  const user = req?.user;

  if (!user) {
    const notices = await Notice.find({}, "-owner -createdAt -updatedAt")
    return res.json({status: "success", data: result});
  }

  const pipeline = [
    {
      $lookup: {
        from: "favoritenotices",
        let: {
          notice: "$_id",
          user : user._id,
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ["$notice", "$$notice"],
                  },
                  {
                    $eq: ["$user", "$$user"],
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
      $unset: ["createdAt", "updatedAt"],
    },
    {
      $addFields: {
        favorite: { $convert: { input: { $size: "$favorite" }, to: "bool" } },
      },
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

module.exports = getAllNotices;
