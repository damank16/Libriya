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
} from "@mui/material";
import { Link } from "react-router-dom";
import { Favorite, RemoveShoppingCart, ShoppingCart } from "@mui/icons-material";
import { useContext } from "react";
import CartContext from "../../pages/context/CartContext";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function MediaCard({ id, title, author, thumbnail, genre, user }) {
  const [isUserFavorite, setIsUserFavorite] = useState(false);
  const { isInCart, removeFromCart } = useContext(CartContext);

  useEffect(() => {
    if (user.favorites?.includes(id)) {
      setIsUserFavorite(true);
    }
  }, [user]);

  const onFavoriteHandler = async () => {
    axios
      .post(
        "/api/users/favorites",
        {
          bookId: id,
        },
        {
          headers: {
            Authorization: localStorage.getItem("LIBRIYA_TOKEN"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        setIsUserFavorite(!isUserFavorite);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const { addToCart } = useContext(CartContext);
  return (
    <Card>
      <CardActionArea component={Link} to={`/book/${id}`}>
        <CardMedia
          component="img"
          image={thumbnail ?? "/assets/book.jpeg"}
          sx={{
            height: {
              xs: 150,
              md: 200,
            },
            width: { md: "100%" },
          }}
        />
        <CardContent>
          <Typography
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="clip"
            fontSize={14}
            fontWeight="550"
          >
            {title}
          </Typography>
          <Typography sx={{ color: "#888" }} fontSize={12}>
            {author}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Grid container>
          <Grid item xs={9} sx={{ display: { xs: "none", sm: "block" } }}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              style={{display: isInCart(id) ? "none" : "inline-block"}}
              onClick={() => addToCart(id, title, author, thumbnail, genre)}
            >
              Add To Cart
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="error"
              style={{display: !isInCart(id) ? "none" : "inline-block"}}
              onClick={() => removeFromCart(id)}
            >
              Remove 
            </Button>
          </Grid>

          <Grid textAlign="center" item xs={3} sx={{ display: { sm: "none" } }}>
            <IconButton onClick={() => addToCart(id, title, author, thumbnail, genre)}  style={{display: isInCart(id) ? "none" : "inline-block"}}>
              <ShoppingCart size="small" />
            </IconButton>
            <IconButton onClick={() => removeFromCart(id)} style={{display: !isInCart(id) ? "none" : "inline-block"}}> 
              <RemoveShoppingCart size="small" />
            </IconButton>
          </Grid>

          <Grid textAlign="center" item xs={3}>
            <IconButton onClick={onFavoriteHandler}>
              <Favorite
                size="small"
                sx={{
                  color: isUserFavorite ? "#e74c3c" : "#7f8c8d",
                }}
              />
            </IconButton>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}
export default MediaCard;
