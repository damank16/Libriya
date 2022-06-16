import { Favorite } from '@mui/icons-material'
import { Box, Button, Grid, IconButton, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import books from '../../data/books'

function BookDetail() {
  const { id } = useParams()
  const [book, setBook] = useState({})

  useEffect(() => {
    const book = books.find((book) => book.id == id)
    setBook(book)
  }, [])

  return (
    <Grid container spacing={3}>
      <Grid item sm={6} xs={12} sx={{}}>
        <img
          src={book.thumbnail}
          style={{
            width: '100%',
            maxHeight: '500px',
            height: '100%',
            textAlign: 'center',
          }}
          alt={book.title}
        />
      </Grid>
      <Grid item sm={6} xs={12}>
        <Stack gap={1}>
          <Typography fontSize={20} fontWeight='400'>
            {book.title}
          </Typography>

          <Typography>
            <strong>Written By </strong> {book.author}
          </Typography>

          <Typography>
            <strong>Genre </strong> {book.genre}
          </Typography>

          <Typography>
            <strong>Publisher </strong> {book.publisher}
          </Typography>

          <Typography>
            <strong>Publication Year </strong> {book.publicationYear}
          </Typography>
        </Stack>
        <Stack direction='row' my={1} spacing={2}>
          <Button variant='contained' color='secondary'>
            Add To Cart
          </Button>
          <IconButton>
            <Favorite size='small' />
          </IconButton>
        </Stack>
      </Grid>
    </Grid>
  )
}
export default BookDetail
