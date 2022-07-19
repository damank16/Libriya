/*

Authors:

- Damandeep Kaur 
- Sai Chand Kolloju

*/
import { useState, useEffect } from 'react'
import { Grid, Typography } from '@mui/material'
import MediaCard from '../../components/Card/MediaCard'
import Filter from '../../components/search/filterMenu'
import SearchIcon from '@mui/icons-material/Search'
import SearchDialogForm from '../../components/search/searchFormDialog'
import axios from 'axios'
import Spinner from '../../components/common/Spinner'

function Dashboard() {
  const [checked, setChecked] = useState(false)
  const [searchDialogOpen, setsearchDialogOpen] = useState(false)
  const [searchedBooks, setSearchedBooks] = useState([])
  const handleSearchDialogOpen = () => setsearchDialogOpen(true)
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState({})
  

  const [searchFields, setSearchFields] = useState({
    title: '',
    author: '',
    genre: '',
    publisher: '',
    publicationYear: '',
  })

  const [sortMethod, setSortMethod] = useState('')

  useEffect(() => {
    console.log('searchedBooks test: ', searchedBooks)
  }, [searchedBooks])

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const { data } = await axios.get('/api/books/unborrowed')
      setLoading(false)
      const { success, books } = data

      if (success) {
        setBooks(books)
      }
      try {
        const currentUser = await axios.get('/api/users/me', {
          headers: {
            Authorization: localStorage.getItem('LIBRIYA_TOKEN'),
          },
        })
        setLoggedInUser(currentUser.data.user)
      } catch (err) {
        console.log(err)
      }
    })()
  }, [])


  const renderBooks = () => { 
    if (loading) return <Spinner />
    return !checked ? (
      books.length === 0 ?  <Grid item md={3} sm={4} xs={6}>
      {' '}
      No Books Found{' '}
    </Grid>:
      books.map((book) => (
        <Grid item md={3} sm={4} xs={6} key={book._id}>
          <MediaCard id={book._id} {...book} user={loggedInUser} />
        </Grid>
      ))
    ) : searchedBooks.length ? (
      searchedBooks.map((book) => (
        <Grid item md={3} sm={4} xs={6} key={book._id}>
          <MediaCard id={book._id} {...book} user={loggedInUser} />
        </Grid>
      ))
    ) : (
      <Grid item md={3} sm={4} xs={6}>
        {' '}
        No Books Found{' '}
      </Grid>
    )
  }

  return (
    <>
      <Grid
        container
        sx={{
          flexFlow: 'row',
          width: '100%',
        }}
      >
        <Filter
          setChecked={setChecked}
          checked={checked}
          setSearchedBooks={setSearchedBooks}
          searchedBooks={searchedBooks}
        />
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
              setDialogOpenState={setsearchDialogOpen}
              setChecked={setChecked}
              setSearchedBooks={setSearchedBooks}
              searchFields={searchFields}
              setSearchFields={setSearchFields}
              sortMethod={sortMethod}
              setSortMethod={setSortMethod}
            />
          </Grid>
          <Grid container spacing={3} rowGap={2}>
            {renderBooks()}
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
export default Dashboard
