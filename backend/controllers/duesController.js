const expressAsyncHandler = require("express-async-handler")
const Book = require("../models/Book")
const { Cart } = require("../models/cart/cartModel")

const getDuesController = expressAsyncHandler(async (req, res) => {
  const userDetails = req.body
  const cartList = await Cart.find({ ...userDetails })
  const booksOrig = await Book.find()
  let filteredBooks = []
  let a = []
  if (cartList) {
    booksOrig.forEach((book) => {
      const cartWithBook = cartList.find((cart) => {
        return cart.bookId == book._id
      })
      if (cartWithBook && cartWithBook.isFineDue) {
        const bookDetails = {}
        const checkin_date = new Date(cartWithBook.checkin_date)
        const due_date = new Date(cartWithBook.due_date)
        var Difference_In_Time = checkin_date.getTime() - due_date.getTime()
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24)
        bookDetails["bookID"] = cartWithBook.bookId
        bookDetails["issueDate"] = cartWithBook.checkout_date.split(" ")[0]
        bookDetails["returnDate"] = cartWithBook.checkin_date.split(" ")[0]
        bookDetails["dueDate"] = cartWithBook.due_date.split(" ")[0]
        bookDetails["fine"] = Difference_In_Days.toFixed(0) * 0.5
        bookDetails["name"] = book.title
        filteredBooks.push(bookDetails)
      }
    })
  }

  let response = {
    message: "Books retrieved",
    success: true,
    books: [...filteredBooks],
  }
  res.send(response)
})

const updatesDuesController = expressAsyncHandler(async (req, res) => {
  const userDetails = req.body
  await Cart.updateMany({ ...userDetails }, { isFineDue: false }, { new: true })
  let response = {
    message: "Fine updated successfully",
    success: true,
  }
  res.send(response)
})

module.exports = { getDuesController, updatesDuesController }
