// Author: Sai Chand Kolloju

const imageUploader = require('../config/imageUploader')
const streamifier = require('streamifier')

// Uploads image data provided as argument to Cloudinary
function uploadImage(image) {
  return new Promise((resolve, reject) => {
    const stream = imageUploader.uploader.upload_stream((error, result) => {
      if (result) {
        resolve(result)
      } else {
        reject(error)
      }
    })

    streamifier.createReadStream(image).pipe(stream)
  })
}

// Deletes image from Cloudinary by its public ID
async function destroyImage(publicId) {
  await imageUploader.uploader.destroy(publicId)
}

module.exports = { uploadImage, destroyImage }
