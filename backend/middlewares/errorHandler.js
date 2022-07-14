// Author: Sai Chand Kolloju

const defaultErrorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500

  res.status(statusCode)

  res.json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  })
}

module.exports = defaultErrorHandler
