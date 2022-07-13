const expressAsyncHandler = require('express-async-handler')
const Book = require('../models/Book')

const getAllBooks = expressAsyncHandler(async (req, res) => {
  const books = await Book.find()
  res.json({ success: true, books })
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

const addBook = expressAsyncHandler(async (req, res) => {
  const bookData = req.body
  const createdBook = await Book.create(bookData)
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
  const updatedBook = await Book.findByIdAndUpdate(bookId, bookData, {
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

  await Book.findByIdAndDelete(bookId)
  res.status(200).json({ success: true })
})

module.exports = {
  addBook,
  getAllBooks,
  getBook,
  updateBook,
  deleteBook,
}
