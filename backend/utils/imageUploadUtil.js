const imageUploader = require('../config/imageUploader')
const streamifier = require('streamifier')

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

async function destroyImage(publicId) {
  await imageUploader.uploader.destroy(publicId)
}

module.exports = { uploadImage, destroyImage }
