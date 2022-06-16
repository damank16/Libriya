import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { Favorite, ShoppingCart } from '@mui/icons-material'

function MediaCard({ id, title, author, thumbnail }) {
  return (
    <Card>
      <CardActionArea component={Link} to={`/book/${id}`}>
        <CardMedia
          component='img'
          image={thumbnail ?? '/assets/book.jpeg'}
          sx={{
            height: {
              xs: 150,
              md: 200,
            },
            width: { md: '100%' },
          }}
        />
        <CardContent>
          <Typography fontSize={14} fontWeight='550'>
            {title}
          </Typography>
          <Typography sx={{ color: '#888' }} fontSize={12}>
            {author}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Grid container>
          <Grid item xs={9} sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Button fullWidth variant='contained' color='secondary'>
              Add To Cart
            </Button>
          </Grid>

          <Grid textAlign='center' item xs={3} sx={{ display: { sm: 'none' } }}>
            <IconButton>
              <ShoppingCart size='small' />
            </IconButton>
          </Grid>

          <Grid textAlign='center' item xs={3}>
            <IconButton>
              <Favorite size='small' />
            </IconButton>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  )
}
export default MediaCard
