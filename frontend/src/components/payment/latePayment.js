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

export default function LatePayment() {
  const [totalFine, setTotalFine] = React.useState(0)
  const rows = [
    createRow('Book1', '01-JUN-22', '10-JUN-22', '14-JUN-22', 2),
    createRow('Book2', '02-JUN-22', '11-JUN-22', '12-JUN-22', 0.5),
    createRow('Book3', '28-MAY-22', '08-MAY-22', '14-JUN-22', 3),
  ]

  function createRow(name, issueDate, dueDate, returnDate, fine) {
    return { name, issueDate, dueDate, returnDate, fine }
  }

  React.useEffect(() => {
    calculateTotal()
  }, [rows])

  function calculateTotal() {
    let totalFine = 0
    rows.map((row) => {
      totalFine = totalFine + row.fine
    })
    setTotalFine(totalFine)
  }

  return (
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
              {rows.map((row) => (
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
          <Payment />
        </Box>
      </Grid>
    </Grid>
  )
}
