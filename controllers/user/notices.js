const { Notice } = require('../../models/noticeModel')

const noticesUser =  async (req, res, next) => {
  res.json();
//   const {_id: owner} = req.user

//   const pipieline = [
//     {
//       $match: {
//         owner
//       },
//     },
//     {
//       $lookup: {
//         from: 'favoritenotices', 
//         let: {
//           notice: '$_id', 
//           owner: '$owner'
//         }, 
//         pipeline: [
//           {
//             $match: {
//               $expr: {
//                 $and: [
//                   {
//                     $eq: [
//                       '$notice', '$$notice'
//                     ]
//                   }, {
//                     $eq: [
//                       '$user', '$$owner'
//                     ]
//                   }
//                 ]
//               }
//             }
//           }
//         ], 
//         as: 'favorite'
//       }
//     }
//   ];

//   const callback = (err, result, next) => {
//     if (err) { console.log(err);  next(err); }
  
//     result.forEach(element => {
//       element.favorite = new Boolean(element.favorite.length);
//     });
     
//     res.json({status: "sucsess", data: result})
//    }

//   await Notice.aggregate(pipieline, callback)

}

module.exports = noticesUser;