const router = require('express').Router()

const {
  getAllPrintRequests, getAllPrintRequestsPerUser,addPrintRequest,deletePrintRequest,getSinglePrintRequest
  ,approveRequest,denyRequest,editPrintRequest
} = require('../controllers/printRequestController')

router.route('/').get(getAllPrintRequests)
router.route('/:id').get(getAllPrintRequestsPerUser)
router.route('/requestId/:id').get(getSinglePrintRequest)
router.route('/:id').post(addPrintRequest)
router.route('/accept/:id').post(approveRequest)
router.route('/deny/:id').post(denyRequest)
router.route('/').put(editPrintRequest)

router.route('/:id').delete(deletePrintRequest)

module.exports = router