const express = require("express");
const router= express.Router();

const controller = require("../controllers/studyRoomController");

router.get("/test", controller.useme);

// API
router.post('/addroom', controller.addrooms);
router.post('/booking', controller.newbooking);
router.get('/listrooms', controller.listallrooms);
router.get('/listbookedrooms/:user_id', controller.listbookedroomstorelieveorcancel);
router.put('/updatebooking/:booking_id/:room_id', controller.relieveorcancelbooking);
router.get('/listallbookings', controller.listallbookings);

module.exports = router;