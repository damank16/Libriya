import { Favorite } from '@mui/icons-material'
import { Button, Grid, IconButton, Stack, Typography, Box } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function BookDetail() {
  const { id } = useParams()
  const [book, setBook] = useState({})

  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      const { data } = await axios.get(`/api/books/${id}`)
      const { success, book } = data
      if (success) {
        setBook(book)
      }
    })()
  }, [id])

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box my={1}>
          <Button
            variant='contained'
            color='secondary'
            component='span'
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
          <Typography my={1} variant='h4'>
            Book Detail
          </Typography>
        </Box>
      </Grid>
      <Grid item sm={6} xs={12} sx={{}}>
        <img
          src={book?.thumbnail || '/assets/book.jpeg'}
          style={{
            width: '100%',
            maxHeight: '500px',
            height: '100%',
            textAlign: 'center',
          }}
          alt={book?.title}
        />
      </Grid>
      <Grid item sm={6} xs={12}>
        <Stack gap={1}>
          <Typography fontSize={20} fontWeight='400'>
            {book?.title}
          </Typography>

          <Typography>
            <strong>Written By </strong> {book?.author}
          </Typography>

          <Typography>
            <strong>Genre </strong> {book?.genre}
          </Typography>

          <Typography>
            <strong>Publisher </strong> {book?.publisher}
          </Typography>

          <Typography>
            <strong>Publication Year </strong>{' '}
            {book.publicationYear &&
              new Date(book.publicationYear).getFullYear()}
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
