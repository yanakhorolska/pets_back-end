const { Notice } = require("../../models/noticeModel");

const getNoticesByCategory = async (req, res) => {
  const { category } = req.params;
  const user = req.user;

  if (!user) {
    const notices = await Notice.find({ category }).populate(
      "owner",
      "_id name email"
    );

    res.json(notices);
  }

  const pipeline = [
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
  ];

  const result = await Notice.aggregate(pipeline);
  res.json({status: "success", data: result});
};

module.exports = getNoticesByCategory;
