import { useState, useEffect } from 'react'
import { Grid, Typography } from '@mui/material'
import MediaCard from '../../components/Card/MediaCard'
//import books from '../../data/books'
import Filter from '../../components/filterMenu';
import SearchIcon from '@mui/icons-material/Search';
import SearchDialogForm from '../../components/searchFormDialog';
import axios from 'axios';
import Button from '@mui/material/Button';
import Spinner from '../../components/common/Spinner'

function Dashboard() {
  const [checked, setChecked] = useState(false);
  const [searchDialogOpen, setsearchDialogOpen] = useState(false);
  const [searchedBooks, setSearchedBooks] = useState([]);
  const handleSearchDialogOpen = () => setsearchDialogOpen(true);
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)

useEffect(() => {
    console.log("searchedBooks test: ", searchedBooks);
  }, [searchedBooks]);

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
    <Grid container sx={{
    flexFlow: 'row',
    width: '100%'}}>
      <Filter  setChecked={setChecked} checked= {checked}  setSearchedBooks = {setSearchedBooks} searchedBooks = {searchedBooks}/>
        <Grid container sx={{
          display: 'flex',
          flexFlow: 'column nowrap',
          marginLeft :'2%'}}>
            <Grid  container sx = {{
                flexFlow: 'row',
                justifyContent : 'space-between',}}>
              <Typography variant='h4' my={1}>
                Books
              </Typography>
              <SearchIcon sx={{display:{ sx:'flex', md: 'none'} }} onClick={handleSearchDialogOpen} />
              {/* <Button variant="contained" onClick={(e) => { resetFilters(e) }}   sx = {{
              margin:'2px',
              display:{ sx:'flex', md: 'none'} 
          }}>Reset</Button> */}
              <SearchDialogForm open={searchDialogOpen}  
              // onClose={setsearchDialogOpen}
              setDialogOpenState={setsearchDialogOpen}
              setChecked={setChecked} 
              checked= {checked}  
              setSearchedBooks = {setSearchedBooks} 
              searchedBooks = {searchedBooks}
              //handleClickQuery  = {handleClickQuery}
              /> 
            </Grid>
            <Grid container spacing={3} rowGap={2}>
              {!checked ? books.map((book) => (
                <Grid item md={3} sm={4} xs={6}>
                  <MediaCard key={book.id} {...book} />
                </Grid>
              )):
                searchedBooks.length ? searchedBooks.map((book) => (
                <Grid item md={3} sm={4} xs={6}>
                  <MediaCard key={book.id} {...book} />
                </Grid>)) : <Grid item md={3} sm={4} xs={6}> No Books Found </Grid>
                }
            </Grid>
        </Grid>
    </Grid>
    </>
  )
}
export default Dashboard
