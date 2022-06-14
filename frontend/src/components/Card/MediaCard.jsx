import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material"

function MediaCard({ title, author, thumbnail}) {
  return (
    <Card>

      <CardActionArea>
        <CardMedia component='img' image={thumbnail} sx={{height: {
          xs: 150,
          md: 300
        }, width: {md: '100%'}}}/>
        <CardContent>
          <Typography variant='h5'>{title}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
export default MediaCard