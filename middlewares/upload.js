const multer = require('multer')
// #filesistem
// const path = require('path')

// const tempDir = path.join(__dirname, '../', "temp");

// const multerConfig = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, tempDir)
//   },
//   file: (req, file, cb) => {
//     cb(null, file.originalname)
//   }
// })

// const upload = multer({storage: multerConfig});

// #cloudinary
// const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');

// const {
//   cloudinary_cloud_name: cloud_name,
//   cloudinary_api_key: api_key,
//   cloudinary_api_secret: api_secret,
//   cloudinary_folder: mainFolder,
// } = process.env;

// cloudinary.config({cloud_name, api_key, api_secret})

// const cloudinaryStorage = new CloudinaryStorage ({
//   cloudinary,
//   params: {
//     folder: mainFolder
//   }
// }
// )

// const upload = multer({storage: cloudinaryStorage})

// #memoryStorage
const upload = multer({storage: multer.memoryStorage()})

module.exports = upload;