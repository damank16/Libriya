import { Grid, Typography } from '@mui/material'
import MediaCard from '../../components/Card/MediaCard'
import books from '../../data/books'

function Dashboard() {
  return (
    <>
      <Typography variant='h4' my={1}>
        Books
      </Typography>
      <Grid container spacing={3} rowGap={2}>
        {books.map((book) => (
          <Grid item md={3} sm={4} xs={6}>
            <MediaCard key={book.id} {...book} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}
export default Dashboard
