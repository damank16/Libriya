import { Button, Grid, IconButton, Stack, Typography } from '@mui/material'
import { toast } from 'material-react-toastify'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import books from '../../data/books'

function BookDetail() {
  const { id } = useParams()
  const [book, setBook] = useState({})

  const navigate = useNavigate()

  useEffect(() => {
    const book = books.find((book) => book.id.toString() === id)
    setBook(book)
  }, [id])

  const deleteBook = (id) => {
    toast.success('Book deleted')
    navigate('/admin/dashboard')
  }

  return (
    <Grid container spacing={3}>
      <Grid item sm={6} xs={12} sx={{}}>
        <img
          src={book?.thumbnail ?? '/assets/book.jpeg'}
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
            {book.publicationYear?.getFullYear()}
          </Typography>
        </Stack>
        <Stack direction='row' my={1} spacing={2}>
          <Button
            component={Link}
            to={`/admin/book/edit/${id}`}
            variant='contained'
            color='info'
          >
            Edit
          </Button>

          <Button
            onClick={() => deleteBook(id)}
            variant='contained'
            color='error'
          >
            Delete
          </Button>
        </Stack>
      </Grid>
    </Grid>
  )
}
export default BookDetail
