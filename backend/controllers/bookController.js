// Author: Sai Chand Kolloju

const expressAsyncHandler = require('express-async-handler')
const { extname } = require('path')
const Book = require('../models/Book')
const { uploadImage, destroyImage } = require('../utils/imageUploadUtil')

const getAllBooks = expressAsyncHandler(async (req, res) => {
  const books = await Book.find()
  res.status(200).json({ success: true, books })
})

const getBook = expressAsyncHandler(async (req, res) => {
  const { id: bookId } = req.params
  const book = await Book.findById(bookId)

  if (!book) {
    res.status(404)
    throw new Error('Book not found')
  }

  res.status(200).json({ success: true, book })
})

const getUnborrowedBooks = expressAsyncHandler(async (req, res) => {
  const unborrowedBooks = await Book.find({ isBorrowed: false })
  res.status(200).json({ success: true, books: unborrowedBooks })
})

const addBook = expressAsyncHandler(async (req, res) => {
  const bookData = req.body
  let uploadedImageResponse = null

  if (req.files) {
    const { thumbnail } = req.files
    if (thumbnail) {
      const extension = extname(thumbnail.name)
      const allowedExtensions = ['.jpg', '.png', '.jpeg']

      if (!allowedExtensions.includes(extension)) {
        res.status(422)
        throw new Error(
          'Unsupported image type. Only png and jpg files are allowed.'
        )
      }

      uploadedImageResponse = await uploadImage(thumbnail.data)
    }
  }

  let bookToCreate = { ...bookData, thumbnail: undefined }

  if (uploadedImageResponse) {
    const { public_id, secure_url } = uploadedImageResponse
    bookToCreate = {
      ...bookToCreate,
      thumbnail: secure_url,
      thumbnailId: public_id,
    }
  }
  const createdBook = await Book.create(bookToCreate)
  res.status(201).json({ success: true, book: createdBook })
})

const updateBook = expressAsyncHandler(async (req, res) => {
  const { id: bookId } = req.params

  const book = await Book.findById(bookId)

  if (!book) {
    res.status(404)
    throw new Error('Book not found')
  }

  const bookData = req.body
  let uploadedImageResponse = null

  if (req.files) {
    const { thumbnail } = req.files
    if (thumbnail) {
      const extension = extname(thumbnail.name)
      const allowedExtensions = ['.jpg', '.png', '.jpeg']

      if (!allowedExtensions.includes(extension)) {
        res.status(422)
        throw new Error(
          'Unsupported image type. Only png and jpg files are allowed.'
        )
      }
      if (book.thumbnail && book.thumbnailId) {
        await destroyImage(book.thumbnailId)
      }
      uploadedImageResponse = await uploadImage(thumbnail.data)
    }
  }

  let newBook = { ...bookData, thumbnail: undefined }

  if (uploadedImageResponse) {
    const { public_id, secure_url } = uploadedImageResponse
    newBook = {
      ...newBook,
      thumbnail: secure_url,
      thumbnailId: public_id,
    }
  }
  const updatedBook = await Book.findByIdAndUpdate(bookId, newBook, {
    new: true,
  })
  res.status(200).json({ success: true, book: updatedBook })
})

const deleteBook = expressAsyncHandler(async (req, res) => {
  const { id: bookId } = req.params

  const book = await Book.findById(bookId)

  if (!book) {
    res.status(404)
    throw new Error('Book not found')
  }

  if (book.thumbnail && book.thumbnailId) {
    await destroyImage(book.thumbnailId)
  }

  await Book.findByIdAndDelete(bookId)
  res.status(200).json({ success: true })
})

module.exports = {
  addBook,
  getAllBooks,
  getUnborrowedBooks,
  getBook,
  updateBook,
  deleteBook,
}
