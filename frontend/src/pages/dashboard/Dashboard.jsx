/*

Authors:

- Sai Chand Kolloju

*/

import { useState, useEffect } from 'react'
import { Grid, Typography } from '@mui/material'
import MediaCard from '../../components/Card/MediaCard'
import Filter from '../../components/filterMenu'
import SearchIcon from '@mui/icons-material/Search'
import SearchDialogForm from '../../components/searchFormDialog'
import axios from 'axios'
import Spinner from '../../components/common/Spinner'

function Dashboard() {
  const [checked, setChecked] = useState(true)
  const [searchDialogOpen, setsearchDialogOpen] = useState(false)
  const handleSearchDialogOpen = () => setsearchDialogOpen(true)

  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const { data } = await axios.get('/api/books/unborrowed')
      setLoading(false)
      const { success, books } = data

      if (success) {
        setBooks(books)
      }
    })()
  }, [])

  return (
    <>
      <Grid
        container
        sx={{
          flexFlow: 'row',
          width: '100%',
        }}
      >
        <Filter setChecked={setChecked} checked={checked} />
        <Grid
          container
          sx={{
            display: 'flex',
            flexFlow: 'column nowrap',
            marginLeft: '2%',
          }}
        >
          <Grid
            container
            sx={{
              flexFlow: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant='h4' my={1}>
              Books
            </Typography>
            <SearchIcon
              sx={{ display: { sx: 'flex', md: 'none' } }}
              onClick={handleSearchDialogOpen}
            />
            <SearchDialogForm
              open={searchDialogOpen}
              // onClose={setsearchDialogOpen}
              setDialogOpenState={setsearchDialogOpen}
              //handleClickQuery  = {handleClickQuery}
            />
          </Grid>
          <Grid container spacing={3} rowGap={2}>
            {loading ? (
              <Spinner />
            ) : books.length === 0 ? (
              <Typography>No books available at the moment</Typography>
            ) : (
              books.map((book) => (
                <Grid item md={3} sm={4} xs={6} key={book._id}>
                  <MediaCard {...book} id={book._id} />
                </Grid>
              ))
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
export default Dashboard
