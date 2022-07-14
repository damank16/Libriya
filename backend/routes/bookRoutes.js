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

router.route('/').get(getAllBooks).post(bookBodyValidator, addBook)

router.get('/unborrowed', getUnborrowedBooks)

router
  .route('/:id')
  .get(getBook)
  .delete(deleteBook)
  .put(bookBodyValidator, updateBook)

module.exports = router
