const cloudinary = require('cloudinary').v2;
const { log } = require('console');
//const { Readable } = require("stream");

const fs = require('fs/promises')

const {
  CLOUDINARY_CLOUD_NAME:cloud_name,
  CLOUDINARY_API_KEY: api_key,
  CLOUDINARY_API_SECRET: api_secret,
  CLOUDINARY_FOLDER: mainFolder,
  CLOUDINARY_IMAGES_WIDTH: width = 250,
} = process.env;

cloudinary.config({cloud_name, api_key, api_secret})

const getBufferFromFile = async (pathToFile) => {
  const fs = require('fs/promises')

  const buffer = await fs.readFile(pathToFile)
  fs.unlink(pathToFile)
  return buffer
}

const getTempLoad = async (fileToUpload) =>{
  const {path, buffer} = fileToUpload;

  if (!path) {
    return buffer
  }
  
  return await getBufferFromFile(path);
}

const cloudinaryUpload = async (imagePath, public_id, path) => {

  const tempUpload = await getTempLoad(imagePath);

  const upload = () => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { public_id, folder: `${mainFolder}/${path}`, width},
        (err, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(err);
          }
        }
      ).end(tempUpload);
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
    return "";
  }
};

const cloudinaryDelete = async (path, public_id) => {

  const destroy = () => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(`${mainFolder}/${path}/${public_id}`, (err, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(err);
        }
      })
    })
  }

  try {
    const resultDestroy = await destroy();
    return resultDestroy;
  } catch (error) {
    console.log("cloudinaryUpload", error);
    return "";
  }

}


module.exports = { cloudinaryUpload, cloudinaryDelete }