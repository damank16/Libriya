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



export default function BookingDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleCancel = (param,event) => {
    navigate('/bookingdetails');
  }
  
  const handleCreate = (param,event) => {
    alert("Booked successfully")
  }

  return (
    <div className='bookingdetails'>
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper style = {{opacity: 0.95, background: '#dde2e9'}} variant="outlined" sx={{ my: { xs: 5, md: 6 }, p: { xs: 2, md: 3 } }}>
        {/* style={{ background: '#f2f6fc' }} */}
          <Typography component="h1" variant="h4" align="center">
            Booking Details
          </Typography>
      
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        New Reservation
      </Typography>
      <br/>
      <br/>
      
      <Typography variant="h6" gutterBottom align='left'  color="blue">
        Andrew Shaw
      </Typography>

      <Typography variant="h6" gutterBottom align='left'>
        Room: Jupiter
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
          />
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
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
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
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="termsofservice" value="yes" />}
            label="I accept the terms of service"
          />
        </Grid>
      </Grid>


      <Button onClick={handleCancel} variant="outlined" sx={{ mt: 6, ml: 37 }}>
          Cancel
      </Button>

      <Button onClick={handleCreate} variant="contained" sx={{ mt: 6, ml:3  }}>
          Create     
      </Button>

     


    </React.Fragment>
    </Paper>
    </Container>
    </div>
  );
}