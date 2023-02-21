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
        favorite: { $convert: { input: { $size: "$favorite" }, to: "bool" } },
      },
    },
  ];

  await Notice.aggregate(pipieline).exec((err, docs) => {
    const result = docs.map((doc) => Notice.hydrate(doc));
    res.json({ status: "sucsess", data: result });
  });

}

module.exports = noticesUser;