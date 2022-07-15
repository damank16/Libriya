import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';  
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';



export default function BookingDetails() {

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    redirectToListingPage();
  };

  const location = useLocation();
  const navigate = useNavigate();
  const room_id = location.state.room_id;
  const room_name = location.state.room_name;
  const [title, setTitle] = React.useState();
  const [description, setDescription] = React.useState();
  const [formErrors, setFormErrors] = React.useState({'title':'','description':''});
  const [error, setError] = React.useState(true);

  const redirectToListingPage = (param,event) => {
    navigate('/studyroombookings');
  }
  
  const handleCreate = (param,event) => {
    //apply validations
    if(error == true){
      alert("Please enter the details.")
    }
    else{
        //call booking api
        let reqBody = {
          "room_id" : room_id,
          "user_id": localStorage.getItem("USER_ID"),
          "title" : title, 
          "description": description
      }
      let data = JSON.stringify(reqBody);
      
      let config = {
        method: 'post',
        url: '/api/booking',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        console.log(response.data.status);
        if(response.data.status == true){
          console.log('I am here');
          handleClickOpen();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }
  const handleValueChange = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    validateField(name, value);
  }
  const validateField = (fieldName, value) => {
    let updatedFormErrors = formErrors
    switch(fieldName) {
      case 'title':
        setTitle(value);
        updatedFormErrors.title = '';
        if (value === '' || value == null){
          updatedFormErrors.title = "Please provide title";
        }
        break;
      case 'description':
        setDescription(value);
        updatedFormErrors.description = '';
        if (value === '' || value == null){
          updatedFormErrors.description = "Please provide description";
        }
      break;
      default:
        break;
    }
    setFormErrors(updatedFormErrors);
    setError(false);
    for (let x in updatedFormErrors) {
      if (updatedFormErrors[x] !== '') {
        setError(true);
      }
    }
    console.log(formErrors);

    console.log(error);
  }

  return (
    <div>  
    <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    >
    <DialogTitle id="alert-dialog-title">
    {"Booking Confirmation"}
    </DialogTitle>
    <DialogContent>
    <DialogContentText id="alert-dialog-description">
    {room_name} is successfully booked. Happy Learning!
    </DialogContentText>
    </DialogContent>
    <DialogActions>
    <Button onClick={handleClose}>Close</Button>
    </DialogActions>
    </Dialog>

  <div className='bookingdetails'>
      

      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper style = {{opacity: 0.95, background: '#dde2e9'}} variant="outlined" sx={{ my: { xs: 5, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Typography component="h1" variant="h4" align="center">
              Booking Details
            </Typography>
        
      <React.Fragment>
        <Typography variant="h5" gutterBottom>
          New Reservation
        </Typography>
        
        
        <Typography variant="h6" gutterBottom align='left'  color="blue">
          Andrew Shaw
        </Typography>

        <Typography variant="h6" gutterBottom align='left'>
          Room ID: {room_id}
        </Typography>
        <Typography variant="h6" gutterBottom align='left'>
          Room Name: {room_name}
        </Typography>


        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="title"
              name="title"
              label="Title of reservation"
              fullWidth
              autoComplete="given-title"
              variant="standard"
              value={title}
              onChange={handleValueChange}
            />
            <span color='red'>{formErrors.title}</span>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="description"
              name="description"
              label="Description of reservation"
              fullWidth
              autoComplete="given-description"
              variant="standard"
              value={description}
              onChange={handleValueChange}
            />
            <span color='red'>{formErrors.description}</span>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="participants"
              name="participants"
              label="List of participants"
              fullWidth
              autoComplete="given-participants"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="phonenumber"
              name="phonenumber"
              label="Phone Number"
              fullWidth
              autoComplete="sgiven-phonenumber"
              variant="standard"
            />
          </Grid>
        </Grid>


        <Button onClick={redirectToListingPage} variant="outlined" sx={{ mt: 6, ml: 37 }}>
            Cancel
        </Button>

        <Button onClick={handleCreate} variant="contained" sx={{ mt: 6, ml:3  }}>
            Create      
        </Button>

      


      </React.Fragment>
      </Paper>
      </Container>
      </div>

    </div>
    
  );
}