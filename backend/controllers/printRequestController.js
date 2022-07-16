// Author: Ali Shan Khawaja

const expressAsyncHandler = require('express-async-handler')
const printRequest = require('../models/printRequest')
const {v4: uuidv4} = require('uuid');

// method to ftech all requests which are pending
const getAllPrintRequests = expressAsyncHandler(async (req, res) => {
    const nonApprovedRequests = {isAccepted:""}
    const printRequests = await printRequest.find(nonApprovedRequests)
    res.status(200).json({ success: true, printRequests })
  })
// method to ftech all requests of a particular user
  const getAllPrintRequestsPerUser = expressAsyncHandler(async (req, res) => {
    const user_id = {user_id:req.params.id, isAccepted: "" }
    //req.params.id
    const printRequestsPerUser = await printRequest.find(user_id)
    if (!printRequestsPerUser) {
        res.status(404)
        console.log(printRequestsPerUser)
        throw new Error('Print Request Not Fount')
      }
    
    res.status(200).json({ success: true, printRequestsPerUser })
  })
// method to ftech all a particular request
  const getSinglePrintRequest = expressAsyncHandler(async (req, res) => {
    const request_id = {request_id:req.params.id}
    //req.params.id
    const singlePrintRequest = await printRequest.find(request_id)
    if (!singlePrintRequest) {
        res.status(404)
        console.log(singlePrintRequest)
        throw new Error('Print Request Not Fount')
      }
    
    res.status(200).json({ success: true, resultantPrintRequest: singlePrintRequest[0] })
  })
// method to approve a print request
  const approveRequest = expressAsyncHandler(async (req, res) => {
    const reqId = { request_id: req.params.id }
    console.log(reqId)
    
    const requestData = {isAccepted: "true"}
    const updatedprintRequest = await printRequest.findOneAndUpdate(reqId, requestData,{
      new: true
    })

    res.status(200).json({ success: true, updatedprintRequest })
  })
// method to deny a print request
  const denyRequest = expressAsyncHandler(async (req, res) => {
    const reqId = { request_id: req.params.id }
       
    const requestData = {isAccepted: "false"}
    const updatedprintRequest = await printRequest.findOneAndUpdate(reqId, requestData,{
      new: true
    })
    res.status(200).json({ success: true, updatedprintRequest })
  })
// method to add a print request
  const addPrintRequest = expressAsyncHandler(async (req, res) => {

    const printRequestID = { request_id : req.params.id } 
    console.log(printRequestID)
  
    const singlePrintRequest = await printRequest.find(printRequestID)
    console.log(singlePrintRequest)
    if (!singlePrintRequest) {
      res.status(404)
      throw new Error('Print request not found')
    }

    const printRequestData = {
            request_id: uuidv4(),
            user_id: req.params.id,
            user_name: req.body.user_name,
            name: req.body.name,
            description: req.body.description,
            width: req.body.width,
            height: req.body.height,
            Location: req.body.Location,
            isAccepted: ""
    }
    console.log(printRequestData);
    const createdPrintRequest = await printRequest.create(printRequestData)
    res.status(201).json({ success: true, printRequest: createdPrintRequest })
  })
// method to delete a print request
  const deletePrintRequest = expressAsyncHandler(async (req, res) => {
    const printRequestID = { request_id : req.params.id } 
    console.log(printRequestID)
  
    const singlePrintRequest = await printRequest.find(printRequestID)
    console.log(singlePrintRequest)
    if (!singlePrintRequest) {
      res.status(404)
      throw new Error('Print request not found')
    }
    await printRequest.deleteOne(printRequestID)
    res.status(200).json({ success: true })
  })
// method to delete a print request
  const editPrintRequest = expressAsyncHandler(async (req, res) => {
    const updatedPrintRequest = req.body 
    console.log(updatedPrintRequest)
  
    const singlePrintRequest = await printRequest.find({request_id : updatedPrintRequest.request_id})
    //console.log(singlePrintRequest)
    if (!singlePrintRequest) {
      res.status(404)
      throw new Error('Print request not found')
    }
    const updatedprintRequest = await printRequest.findOneAndUpdate({request_id : updatedPrintRequest.request_id}, updatedPrintRequest,{
      new: true
    })
    res.status(200).json({ success: true, updatedprintRequest })

  })

  module.exports = {
    getAllPrintRequests,getAllPrintRequestsPerUser,addPrintRequest,deletePrintRequest,
    getSinglePrintRequest,approveRequest,denyRequest,editPrintRequest
  }