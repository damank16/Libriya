import { Grid } from '@mui/material'
import MediaCard from '../../components/Card/MediaCard'
import books from '../../data/books'

function Dashboard() {
  return (
    <Grid container spacing={3} rowGap={2}>
      {books.map((book) => (
        <Grid item md={3} sm={4} xs={12}>
          <MediaCard key={book.id} {...book} />
        </Grid>
      ))}
    </Grid>
  )
}
export default Dashboard
