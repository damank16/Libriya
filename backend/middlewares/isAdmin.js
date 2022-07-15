// Author: Sai Chand Kolloju

const isAdmin = async (req, res, next) => {
  if (!req.user.admin) {
    return res.status(401).json({ message: 'Unauthorized', success: false })
  }

  next()
}

module.exports = isAdmin
