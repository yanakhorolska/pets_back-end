const { Notice } = require('../../models/noticeModel')

const noticesUser =  async (req, res, next) => {
  const {_id: owner} = req.user
  const pipieline = [
    {
      $match: {
        owner,
      },
    },
    {
      $lookup: {
        from: "favoritenotices",
        let: {
          notice: "$_id",
          owner: "$owner",
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
                    $eq: ["$user", "$$owner"],
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
      $unset: ["owner", "createdAt", "updatedAt"],
    },
    {
      $addFields: {
        id: "$_id",
        favorite: { $convert: { input: { $size: "$favorite" }, to: "bool" } },
      },
    },
  ];

  const result = await Notice.aggregate(pipieline)

  res.json({status: "sucsess", data: result})

}

module.exports = noticesUser;