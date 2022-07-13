const router = require('express').Router()
const {
  getAllBooks,
  getBook,
  updateBook,
  deleteBook,
  addBook,
} = require('../controllers/bookController')

router.route('/').get(getAllBooks).post(addBook)

router.route('/:id').get(getBook).delete(deleteBook).put(updateBook)

module.exports = router
