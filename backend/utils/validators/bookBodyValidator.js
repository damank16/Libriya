// Author: Sai Chand Kolloju

const { check, validationResult } = require('express-validator')

// Validator for validating request body in addBook and updateBook controllers
const bookBodyValidators = [
  check('title', 'Title is required').trim().notEmpty(),
  check('author')
    .trim()
    .notEmpty()
    .withMessage('Author is required')
    .bail()
    .isAlpha('en-US', { ignore: ' ' })
    .withMessage('Author can only have letters'),
  check('genre')
    .trim()
    .notEmpty()
    .withMessage('Genre is required')
    .isAlpha('en-US', { ignore: ' ' })
    .bail()
    .withMessage('Genre can only have letters'),
  check('publisher', 'Publisher is required').trim().notEmpty(),
  check('publicationYear')
    .notEmpty()
    .withMessage('Publication year is required')
    .bail()
    .isISO8601()
    .withMessage('Publication year must be a date')
    .bail()
    .custom((date) => {
      const year = new Date(date).getFullYear()
      return year >= 1900 && year <= new Date().getFullYear()
    })
    .withMessage('Publication year must be between 1900 and current year'),
  (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() })
    }
    next()
  },
]

module.exports = bookBodyValidators
