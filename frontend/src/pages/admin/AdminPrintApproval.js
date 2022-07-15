import React from "react";
import data from '../../resources/printrequests.json';
import { styled } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';


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


let printRequests = data;

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
  

console.log(printRequests);
const AdminPrintApproval = () => {
    const classes = useStyles();

    const denyButtonHandler = requestId => () =>{
        console.log("in deny method");
        let acceptId = 'accept'+requestId;
        let denyId = 'deny'+requestId;
        const btn = document.getElementById(denyId);
        btn.textContent = 'Denied';
        document.getElementById(denyId).style.backgroundColor = "#ec4d4d";
        document.getElementById(acceptId).disabled = true;
        document.getElementById(denyId).disabled = true;
        document.getElementById(acceptId).style.backgroundColor = "#989997";
        document.getElementById(acceptId).style.color = "#3B3B3B"
        document.getElementById(acceptId).style.pointerEvents = "none"
        document.getElementById(denyId).style.pointerEvents = "none"

    }

    const acceptButtonHandler = requestId => () =>{
        console.log("in accept method");
        let acceptId = 'accept'+requestId;
        let denyId = 'deny'+requestId;
        const btn = document.getElementById(acceptId);
        btn.textContent = 'Accepted';
        document.getElementById(acceptId).style.backgroundColor = "#007500";
        document.getElementById(acceptId).disabled = true;
        document.getElementById(denyId).disabled = true;
        document.getElementById(denyId).style.backgroundColor = "#989997";
        document.getElementById(denyId).style.color = "#3B3B3B"
        document.getElementById(acceptId).style.pointerEvents = "none"
        document.getElementById(denyId).style.pointerEvents = "none"
    }

return(
    <TableContainer component={Paper} className={classes.tableContainer}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell width={90}>User Name</StyledTableCell>
          <StyledTableCell align="left" width={90}>Poster Name</StyledTableCell>
          <StyledTableCell align="left">Poster Description</StyledTableCell>
          <StyledTableCell align="left">Width</StyledTableCell>
          <StyledTableCell align="left">Height</StyledTableCell>
          <StyledTableCell align="left" width={90}>Action</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {printRequests.map((row) => (
          <StyledTableRow key={row.user_name}>
            <StyledTableCell component="th" scope="row">
              {row.user_name}
            </StyledTableCell>
            <StyledTableCell align="left">{row.name}</StyledTableCell>
            <StyledTableCell align="left">{row.description}</StyledTableCell>
            <StyledTableCell align="left">{row.width}</StyledTableCell>
            <StyledTableCell align="left">{row.height}</StyledTableCell>
            <StyledTableCell align="left">
                <Button variant="contained" 
                onClick={acceptButtonHandler(row.user_id)} id={"accept"+row.user_id}
                style={{
                maxWidth: "100px",
                maxHeight: "50px",
                minWidth: "100px",
                minHeight: "30px",
                borderRadius: "3px",
                color: "white",
                backgroundColor: "#00D100",
                fontWeight: "bold"
      
        }}>Accept
        </Button>
        &nbsp;
        <Button variant="contained"
        id={"deny"+row.user_id}
        onClick={denyButtonHandler(row.user_id)}
        style={{
          maxWidth: "100px",
          maxHeight: "50px",
          minWidth: "100px",
          minHeight: "30px",
          borderRadius: "3px",
          color: "white",
          backgroundColor: "#FF0000",
          fontWeight: "bold"
        }}>Deny</Button>
                </StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
}

export default AdminPrintApproval;
