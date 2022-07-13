var StudyRoomBooking = require('../models/studyRoomBooking');
var StudyRooms = require('../models/studyRooms');
const {v4: uuidv4} = require('uuid');

// create and save new rooms
exports.addrooms = (req,res)=>{
  // validate request
  if(!req.body){
      res.status(400).send({ message : "Content can not be emtpy!"});
      return;
  }

  // add new room
  const newroom = new StudyRooms({
      room_id : req.body.room_id,
      room_name: req.body.room_name,
      is_available: req.body.is_available
  })

  // save booking in the database
  newroom
      .save(newroom)
      .then(data => {
          res.status(200).send({
            message : "Successfully added"
        });
      })
      .catch(err =>{
          res.status(500).send({
              message : err.message || "Some error occurred while creating a create operation"
          });
      });

}

//----------------------------------------------------


// create and save new booking
exports.newbooking = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }
    console.log('logging request body');
    console.log(req.body);
    // new booking
    const booking = new StudyRoomBooking({
        booking_id : uuidv4(),
        room_id : req.body.room_id,
        user_id: req.body.user_id,
        title : req.body.title,
        description: req.body.description
    })

    // save booking in the database
    booking
        .save(booking)
        .then(data => {
          console.log(data);
            console.log('booked!');
            StudyRooms.findOneAndUpdate({room_id: req.body.room_id}, {is_available:false}, { useFindAndModify: false})
            .then(updateRes => {
                console.log('update request completed');
                if(!updateRes){
                    return res.status(404).send({ status:false, message : 'Cannot Update room. Maybe room not found!'})
                }
                else{
                  return res.status(200).send({
                    status: true,
                    message : "Successfully booked"
                  });
                }
            })
            .catch(err1 =>{
                return res.status(500).send({ status:false, message : "Error Update room availability information"})
            })
        })
        .catch(err2 => {
            res.status(500).send({
                message : err2.message || "Some error occurred while creating a create operation"
            });
        });
}

//-----------------------------------------------------------------------


// load all the available rooms

exports.listallrooms = (req, res) => {
  StudyRooms.find({is_available:true})
  .then(rooms=>{
    res.send(rooms)
  })
  .catch(err =>{
    res.status(500).send({
        message : err.message || "Some error occurred"
    });
  });
}

//-------------------------------------------------------------------------

// load all the booked rooms to relieve or cancel for the particular user
exports.listbookedroomstorelieveorcancel = (req, res) => {
   
  const user_id = req.params.user_id
console.log(user_id);
  StudyRoomBooking.find({user_id: user_id})
  .then(rooms=>{
    res.send(rooms)
  })
  .catch(err =>{
    console.log("List booked  room exception")
    res.status(500).send({
        message : err.message || "Some error occurred"
    });
  });
}

//--------------------------------------------------------------------------

// relieve or cancel the booking for particular user
exports.relieveorcancelbooking = (req, res) => {
  
  const booking_id = req.params.booking_id;
  const room_id = req.params.room_id;

  // delete from booking table
  StudyRoomBooking.findOneAndDelete({booking_id: booking_id})
    .then(data => {
        if(!data){
            res.status(404).send({ message : `Cannot delete booked room with ${booking_id}. Maybe booked room not found!`})
        }else{
          // update availability in rooms table
          StudyRooms.findOneAndUpdate({room_id: room_id}, {is_available:true}, { useFindAndModify: false})
          .then(roomupdate => {
              if(!roomupdate){
                  res.status(404).send({ message : `Cannot Update room with ${room_id}. Maybe room not found!`})
              }
          })
          .catch(err =>{
              res.status(500).send({ message : "Error Update user information"})
          })
          res.status(200).send({status:true, message: "Booking cancelled"});
        }
    })
    .catch(err =>{
        res.status(500).send({ message : "Error delete booked room information"})
    })
    //end

    

}

//-------------------------------------------------------------------------


// list all booking info
exports.listallbookings = (req, res) => {
  StudyRoomBooking.find()
  .then(rooms=>{
    res.send(rooms)
  })
  .catch(err =>{
    res.status(500).send({
        message : err.message || "Some error occurred"
    });
  });
}


//--------------------------------------------------------------------------


exports.useme = (req, res) => {
  console.log("Default controller");
  return res.send("yo there");
};