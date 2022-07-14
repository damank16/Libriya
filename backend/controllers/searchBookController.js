const expressAsyncHandler = require('express-async-handler')
const { extname } = require('path')
const Book = require('../models/Book')

const removeEmptyOrNull = (obj) => {
  Object.keys(obj).forEach(
    (k) =>
      (obj[k] && typeof obj[k] === 'object' && removeEmptyOrNull(obj[k])) ||
      (!obj[k] && obj[k] !== undefined && delete obj[k])
  )
  return obj
}

function sort_by_key(array, key) {
  return array.sort(function (a, b) {
    var x = a[key]
    var y = b[key]
    return x < y ? -1 : x > y ? 1 : 0
  })
}

const searchController = expressAsyncHandler(async (req, res) => {
  //console.log("req: ", req);
  const booksSearchAndSortParameters = req.body
  const filteredObject = removeEmptyOrNull(booksSearchAndSortParameters)
  const sortCriteria = filteredObject['sort']
  delete filteredObject['sort']
  let searchParams = {
    ...filteredObject,
  }
  console.log(searchParams)
  let schemaObject = {}
  Object.keys(searchParams).forEach((param) => {
    if (param === 'publicationYear') {
      schemaObject[param] = {
        $gte: new Date(searchParams[param], 0, 1),
        $lte: new Date(searchParams[param], 11, 31),
      }
    } else {
      schemaObject[param] = {
        $regex: searchParams[param],
        $options: 'i',
      }
    }
  })
  console.log('schemaObject: ', schemaObject)
  const booksList = await Book.find({ ...schemaObject })
  if (booksList && sortCriteria) {
    console.log('sorting criteria ' + sortCriteria)
    sort_by_key(booksList, sortCriteria)
  }
  let response = {
    message: 'Books retrieved',
    success: true,
    books: [...booksList],
  }
  res.send(response)
})

module.exports = { searchController }
