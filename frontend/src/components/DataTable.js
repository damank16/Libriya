import React, {useState, useEffect} from 'react'
import { DataGrid } from '@material-ui/data-grid'
import {useLocation, useNavigate} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { darken, lighten } from '@mui/material/styles';


import { Theme } from '@emotion/react';
import { borderColor } from '@mui/system';


function DataTable() {

  const location = useLocation();
  const navigate = useNavigate();

  const columns = [
    {field: 'id', headerName: 'ID', headerClassName: 'super-app-theme--header'  },
    {field: 'name', headerName: 'ROOM NAME', width: 300, headerClassName: 'super-app-theme--header'},
    {
        field: "RESERVE",
        headerClassName: 'super-app-theme--header',
        renderCell: (cellValues) => {
          return (
            <button
              variant="contained"
              color="primary"
              onClick={(event) => {
                handleClick(event, cellValues);
              }}
            >
            Reserve
            </button>
          );
        },
        width: 250
      }
]

const handleClick = (param,event) => {
    navigate('/bookingdetails');
}

// https://smartdevpreneur.com/add-buttons-links-and-other-custom-cells-in-material-ui-datagrid/#How_to_Add_Other_Custom_Components

const rows = [
    { id: 1, name: 'Mercury',reserve: 'Book'},
    { id: 2, name: 'Venus',reserve: 'Book'},
    { id: 3, name: 'Jupiter',reserve: 'Book'},
    { id: 4, name: 'Saturn',reserve: 'Book'}

  ];



const getBackgroundColor = (color, mode) =>
  mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

const getHoverBackgroundColor = (color, mode) =>
  mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5);

    const [tableData, setTableData] = useState([])

    useEffect(()=> {
        fetch("https://jsonplaceholder.typicode.com/posts")
        .then((data)=>data.json())
        .then((data)=>setTableData(data))
    })


    return (
      <div className='datatable'>

          <div style={{height:400, width: 700}} className='datatable2'>

                <Typography component="h1" variant="h4" align="center">
                  Study Room Booking
                </Typography>
                <br/>

                <DataGrid 
                    rows = {rows}
                    columns = {columns}
                    pageSize = {10}
                    disableSelectionOnClick
                    sx={{
                          border: 10,
                          borderRadius: 2,
                    }}
                    getRowClassName={'super-app-theme--header'}
                />
            </div>

       </div>
    
       
    )
  }

export default DataTable;