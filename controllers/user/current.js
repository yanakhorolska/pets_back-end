// const { User } = require("../../models/userModel");
const { Unauthorized } = require("http-errors");

const current = async (req, res) => {
  if (!req.user) {
    throw Unauthorized("Missing User in request body!");
  }

  const { name, birthday, email, city, phone, avatarURL } = req.user;
  res.json({
    status: "sucsses",
    data: { name, birthday, email, city, phone, avatarURL },
  });
};

// #alternative
// const current = async (req, res) => {
//   const { _id: id } = req.user;

//   const result = await User.findById(id, "-_id -password -createdAt -updatedAt -token -verify")

//   res.json({status: "sucsses", data: result})
// }

// #alternative add Pets user
// const current = async (req, res) => {
//   const { _id: id } = req.user;

//   const pipieline = [
//     {
//       $match: {
//         _id: id,
//       },
//     },
//     {
//       $lookup: {
//         from: "pets",
//         let: {
//           owner: "$_id",
//         },
//         pipeline: [
//           {
//             $match: {
//               $expr: {
//                 $eq: ["$owner", "$$owner"],
//               },
//             },
//           },
//           {
//             $unset: ["owner", "createdAt", "updatedAt"],
//           },
//           {
//             $addFields: {
//               id: "$_id",
//             },
//           },
//         ],
//         as: "pets",
//       },
//     },
//     {
//       $unset: ["_id", "password", "createdAt", "updatedAt", "token", "verify"],
//     },
//   ];

//   const result = await User.aggregate(pipieline);

//   res.json({ status: "sucsses", data: result });
// };

module.exports = current;
