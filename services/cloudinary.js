const cloudinary = require('cloudinary').v2;
const { log } = require('console');
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

  const upload = () => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { public_id, folder: `${mainFolder}/${path}`},
        (err, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(err);
          }
        }
      ).end(imagePath);
    });
  };

    // const resultUpload = () => { cloudinary.uploader.upload_stream(
    //   { public_id, folder: `${mainFolder}/${path}` },
    //   (err, result) => { console.log("callback", result.secure_url); result.secure_url }  //{ if (err) throw err; console.log(result.secure_url) }
    // ).end(imagePath)}

    // const url = cloudinary.url(public_id, {
    //   width: 100,
    //   height: 150,
    //   Crop: 'fill'
    // });
  try {
    const resultUpload = await upload(); 
    return resultUpload.secure_url;
  } catch (error) {
    console.log("cloudinaryUpload", error);
    throw error;
  }
};

module.exports = cloudinaryUpload