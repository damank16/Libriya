// Author: Sai Chand Kolloju

const cloudinary = require('cloudinary').v2

// Cloudinary configuration for uploading images to Cloudinary cloud
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

module.exports = cloudinary
