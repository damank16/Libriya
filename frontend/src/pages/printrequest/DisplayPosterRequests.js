// Author: Ali Shan Khawaja|
import React, { useState,useEffect } from 'react';
import { styled } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import PendingIcon from '@mui/icons-material/Pending';
import { Button, Grid } from '@mui/material';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 650,
    },
    tableContainer: {
        borderRadius: 15,
        margin: '10px 10px',
        maxWidth: 1000,
        alignContent: 'center'
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.getContrastText(theme.palette.primary.dark)
    }

  }));



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
  



const DisplayPosterRequests = () => {

    
    const classes = useStyles();
    const navigate = useNavigate();
    const [printRequests,setprintRequestsState] = useState([]);
    const [printRequest,setprintRequest] = useState("");

    useEffect(() => {
      let oneTime = false;

      if (!oneTime)  fetchprintRequests() 
      return () => { oneTime = true; }
      },[]);

      const fetchprintRequests = async (event) =>{
        //  event.preventDefault();
          
          console.log('inside fetching print requests');
          const userObject = JSON.parse(localStorage.getItem("LIBRIYA_USER"));
          
          const getAllOnlineUsers = await axios.get('/api/printRequests/'+userObject._id)
          const allOnlineUserData = getAllOnlineUsers.data;

          const onlineUsersList = allOnlineUserData.printRequestsPerUser;

          setprintRequestsState(onlineUsersList);

          

           
      }

      const handleDelete = async (request_id) =>{

      const deletePrintrequest =   await axios.delete('/api/printRequests/'+request_id);
        const response = await deletePrintrequest.data;
       
        fetchprintRequests();

      }

      const handleEdit = async (request_id) =>{

        
       navigate("/printrequest/editRequest/"+request_id);


      }


    

return(
    <TableContainer component={Paper} className={classes.tableContainer}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell align="left" width={90}>Poster Name</StyledTableCell>
          <StyledTableCell align="left">Poster Description</StyledTableCell>
          <StyledTableCell align="left">Width</StyledTableCell>
          <StyledTableCell align="left">Height</StyledTableCell>
          <StyledTableCell align="left" width={90}>Action</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {printRequests && printRequests.map((row) => (
          <StyledTableRow key={row.request_id}>
            <StyledTableCell component="th" scope="row">
              {row.name}
            </StyledTableCell>
            <StyledTableCell align="left">{row.description}</StyledTableCell>
            <StyledTableCell align="left">{row.width}</StyledTableCell>
            <StyledTableCell align="left">{row.height}</StyledTableCell>
            <StyledTableCell align="left">
            <Grid container direction="row" alignItems="center">
                <Grid item>
                    <PendingIcon   />
                </Grid>
                <Grid item fontSize={17}>
                    Pending
                </Grid>
                <Grid> <Button onClick={() =>handleDelete(row.request_id)}>Delete </Button> </Grid>
                <Grid> <Button onClick={() =>handleEdit(row.request_id)}>Edit </Button> </Grid>
                </Grid>
                </StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
}

export default DisplayPosterRequests;
