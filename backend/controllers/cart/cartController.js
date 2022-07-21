/* Authored by Vanshika Gohel, B00888111, vn232426@dal.ca
 */
const { Cart } = require('../../models/cart/cartModel')
const Book = require('../../models/Book')

const convertDateToString = (date_ob) => {
  let date = ('0' + date_ob.getDate()).slice(-2)

  // current month
  let month = ('0' + (date_ob.getMonth() + 1)).slice(-2)

  // current year
  let year = date_ob.getFullYear()

  // current hours
  let hours = date_ob.getHours()

  // current minutes
  let minutes = date_ob.getMinutes()

  // current seconds
  let seconds = date_ob.getSeconds()

  let checkout_date =
    year +
    '-' +
    month +
    '-' +
    date +
    ' ' +
    hours +
    ':' +
    minutes +
    ':' +
    seconds

  return checkout_date.toString()
}

exports.checkout = async (req, res) => {
  const user_id = req.user._id
  let date_ob = new Date()
  let book_ids = req.body.items
  const dueDate = new Date()
  dueDate.setDate(date_ob.getDate() + 10)

  let checkout_date = convertDateToString(date_ob)
  let dueDateToString = convertDateToString(dueDate)

  var updated_data = book_ids.map((i) => ({
    bookId: i.bookId,
    user_id: user_id,
    checkout_date: checkout_date,
    due_date: dueDateToString,
  }))

  var ids = book_ids.map((i) => i.bookId)

  try {
    await Book.updateMany({ _id: { $in: ids } }, { $set: { isBorrowed: true } })

    await Cart.insertMany(updated_data)
    return res.status(201).json({
      message: 'checkout details added',
      success: true,
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      message: 'Internal server error',
      success: false,
    })
  }
}
exports.checkin = async (req, res) => {
  var conditions = req.body.bookId
  let date_ob = new Date()

  let checkin_date = convertDateToString(date_ob)

  var updated_data = {
    checkin_date: checkin_date,
  }

  try {
    const up = req.body.bookId
    await Book.updateOne(
      { _id: conditions.bookId },
      { $set: { isBorrowed: false } }
    )
    Cart.findOne({ bookId: req.body.bookId?.bookId }, function (error, data) {
      if (data === null) {
        return res.status(500).json({
          message: 'Book does not exist!',
          success: false,
        })
      } else {
        const dueDate = new Date(data.due_date)
        var Difference_In_Time = date_ob.getTime() - dueDate.getTime()
        if (Difference_In_Time > 0) {
          updated_data = { ...updated_data, isFineDue: true }
        }
        Cart.updateOne(conditions, updated_data).then((doc) => {
          return res.status(200).json({
            message: 'Book Checked in!',
            success: true,
          })
        })
      }
    })
  } catch (err) {
    return res.status(500).json({
      message: 'Book does not exist!',
      success: false,
    })
  }
}
