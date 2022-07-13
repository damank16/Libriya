const { Schema, model } = require('mongoose')

const BookSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
    publicationYear: {
      type: Date,
      required: true,
    },
    isBorrowed: {
      type: Boolean,
      default: false,
    },
    thumbnail: String,
    thumbnailId: String,
  },
  { timestamps: true }
)

module.exports = model('book', BookSchema)
