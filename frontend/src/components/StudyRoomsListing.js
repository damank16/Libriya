import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid'
import { styled } from '@mui/material/styles';

import Table from '@mui/material/Table';

import TableBody from '@mui/material/TableBody';

import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import {useLocation, useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import { Button, Paper, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import axios from 'axios';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
  fontSize: 14,
  },
}));
  
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
  backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function DataTable() {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    window.location.reload(false);
  };
  const location = useLocation();
  const [rows, setRows] = React.useState([]);
  const [bookedRooms, setBookedRooms] = React.useState([]);
  const navigate = useNavigate();
  const getAvailableRooms = () => {
    axios
    .get('http://localhost:4000/listrooms')
    .then((res) => {
      if(res.data.length >0) {
        console.log(res.data);
        setRows(res.data);
      }
    })
  }

  const getBookedRooms = () => {
    axios
    .get('http://localhost:4000/listbookedrooms/vignesh')
    .then((br) => {
      if(br.data.length >0) {
        console.log(br.data);
        setBookedRooms(br.data);
      }
    })
  }
  useEffect(() => {
    getAvailableRooms();
    getBookedRooms();
  },[])

  const reserveRoom = (room_id, room_name) => {
      navigate('/bookingdetails', {state:{'room_id':room_id, 'room_name': room_name}});
  }
  const cancelBooking = (booking_id, room_id) => {
    let config = {
      method: 'put',
      url: 'http://localhost:4000/updatebooking/'+booking_id+'/'+room_id,
      headers: { }
    };
    console.log(config.url);
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      // getAvailableRooms();
      // getBookedRooms();
      handleClickOpen();
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <>
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      >
      <DialogTitle id="alert-dialog-title">
      {"Done"}
      </DialogTitle>
      <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Room availability has been updated!
      </DialogContentText>
      </DialogContent>
      <DialogActions>
      <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>

    <Typography align="center" variant="h5" gutterBottom component="div">
       Available Rooms
    </Typography>
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Room ID</StyledTableCell>
            <StyledTableCell align="center">Room Name</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>

        </TableHead>
        <TableBody>
          {rows.map((row) => (
          <StyledTableRow key={row.room_id}>
          <StyledTableCell component="th" scope="row">
          {row.room_id}
          </StyledTableCell>
          <StyledTableCell align="center">{row.room_name}</StyledTableCell>
          <StyledTableCell align="center">
          <Button variant="outlined" onClick={()=>reserveRoom(row.room_id, row.room_name)}>Reserve</Button>
          </StyledTableCell>
          </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
<br/>
    {
      bookedRooms.length>0 ?
      <>
        <Typography align="center" variant="h5" gutterBottom component="div">
          Booked Rooms
        </Typography>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Room ID</StyledTableCell>
                <StyledTableCell align="center">Title</StyledTableCell>
                <StyledTableCell align="center">Description</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>

            </TableHead>
            <TableBody>
              {bookedRooms.map((br) => (
              <StyledTableRow key={br.booking_id}>
              <StyledTableCell component="th" scope="row">
              {br.room_id}
              </StyledTableCell>
              <StyledTableCell align="center">{br.title}</StyledTableCell>
              <StyledTableCell align="center">{br.description}</StyledTableCell>
              <StyledTableCell align="center">
              <Button variant="outlined" onClick={()=>cancelBooking(br.booking_id, br.room_id)}>Cancel</Button>
              &nbsp; <Button variant="outlined" onClick={()=>cancelBooking(br.booking_id, br.room_id)}>Relieve</Button>
              </StyledTableCell>
              </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
      
    : ''
    }

    </>
  )
}

export default DataTable
