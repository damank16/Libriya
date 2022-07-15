// Author: Sai Chand Kolloju

import { Button, Grid, Stack, Typography, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function BookDetail({ book, children }) {
  const navigate = useNavigate()

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
          {children}
        </Stack>
      </Grid>
    </Grid>
  )
}
export default BookDetail
