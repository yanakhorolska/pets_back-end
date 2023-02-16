const cloudinary = require('cloudinary').v2;
//const { Readable } = require("stream");

const fs = require('fs/promises')

const {
  CLOUDINARY_CLOUD_NAME:cloud_name,
  CLOUDINARY_API_KEY: api_key,
  CLOUDINARY_API_SECRET: api_secret,
  CLOUDINARY_FOLDER: mainFolder,
} = process.env;

cloudinary.config({cloud_name, api_key, api_secret})

const cloudinaryUpload = async (imagePath, public_id, path) => {

  try {
    const resultUpload = await cloudinary.uploader.upload(
      imagePath,
      { public_id, folder: `${mainFolder}/${path}` },
      async (err, result) => { fs.unlink(imagePath); if (err) throw err;}
    );
    const url = cloudinary.url(public_id, {
      width: 100,
      height: 150,
      Crop: 'fill'
    });
    return resultUpload.secure_url;
  } catch (error) {
    throw error;
  }
};

module.exports = cloudinaryUpload