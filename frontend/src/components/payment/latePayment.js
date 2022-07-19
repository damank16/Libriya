/*

Authors:

- Damandeep Kaur (B00904831)

*/

import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Payment from './payment'
import Box from '@mui/material/Box'
import axios from 'axios'
import { toast } from 'material-react-toastify'
import { useNavigate } from 'react-router-dom'
import { Typography } from '@mui/material'

export default function LatePayment() {
  const [totalFine, setTotalFine] = React.useState(0)
  const [lateReturnedBooks, setLateReturnedBooks] = React.useState([])
  const[paid, setPaid] = React.useState(false)
  const navigate = useNavigate()

  React.useEffect(() => {
    fetchBooksReturnedAfterDueDate()
  }, [])

  const fetchBooksReturnedAfterDueDate = async (event) => {
    //  event.preventDefault();
    const userObject = JSON.parse(localStorage.getItem('LIBRIYA_USER'))
    axios.post('/api/dues/', { user_id: userObject._id }).then((res) => {
      setLateReturnedBooks(res.data.books)
    })
  }

  React.useEffect(() => {
    if (lateReturnedBooks) {
      calculateTotal()
    }
  }, [lateReturnedBooks])

  React.useEffect(() => {
    if (paid) {
      const userObject = JSON.parse(localStorage.getItem('LIBRIYA_USER'))
      axios.put('/api/updateDues/', { user_id: userObject._id,  }).then((res) => {
       //console.log(res)
       toast.success('Payment successful!')
       navigate('/dashboard')
       setLateReturnedBooks()
      })
      setLateReturnedBooks([]) 
    }
  }, [paid])


  function calculateTotal() {
    let totalFine = 0
    lateReturnedBooks.map((row) => {
      totalFine = totalFine + row.fine
    })
    setTotalFine(totalFine)
  }

  return (
    <div>
     { !lateReturnedBooks.length ? <Typography  textAlign = "center" variant='h6' >No Fines due</Typography>:
      <Grid
        container
        spacing={2}
        sx={{
          display: 'flex',
          flexFlow: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
          marginTop: '5%',
        }}
      >
  

          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            sx={{
              width: '80%',
            }}
          >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label='spanning table'>
              <TableHead>
                <TableRow>
                  <TableCell
                    align='center'
                    colSpan={4}
                    sx={{ fontWeight: 'bold', fontSize: 'large' }}
                  >
                    Fine Details
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Book Name</TableCell>
                  <TableCell align='right'>Issue Date</TableCell>
                  <TableCell align='right'>Due Date</TableCell>
                  <TableCell align='right'>Return Date</TableCell>
                  <TableCell align='right'>Fine</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {lateReturnedBooks.map((row) => (
                  <TableRow key={row.name}> 
                    <TableCell>{row.name}</TableCell>
                    <TableCell align='right'>{row.issueDate}</TableCell>
                    <TableCell align='right'>{row.dueDate}</TableCell>
                    <TableCell align='right'>{row.returnDate}</TableCell>
                    <TableCell align='right'>{row.fine}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell rowSpan={1} />
                  <TableCell colSpan={3} sx={{ fontWeight: 'bold' }}>
                    Total
                  </TableCell>
                  <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                    {totalFine}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}
            >
              <Payment fine={totalFine} 
              setPaid = {setPaid} />
            </Box>
          </Grid>
      </Grid>
     }  
     </div>
  )
}
