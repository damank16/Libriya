// Author: Sai Chand Kolloju

const router = require('express').Router()
const bookBodyValidator = require('../utils/validators/bookBodyValidator')
const {
  getAllBooks,
  getBook,
  getUnborrowedBooks,
  updateBook,
  deleteBook,
  addBook,
} = require('../controllers/bookController')

const isAuthenticated = require('../middlewares/isAuthenticated')
const isAdmin = require('../middlewares/isAdmin')

router
  .route('/')
  .get(isAuthenticated, isAdmin, getAllBooks)
  .post(isAuthenticated, isAdmin, bookBodyValidator, addBook)

router.get('/unborrowed', isAuthenticated, getUnborrowedBooks)

router
  .route('/:id')
  .get(isAuthenticated, getBook)
  .delete(isAuthenticated, isAdmin, deleteBook)
  .put(isAuthenticated, isAdmin, bookBodyValidator, updateBook)

module.exports = router
