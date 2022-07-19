import * as React from 'react'
import { Grid, Typography } from '@mui/material'
import MediaCard from '../../components/Card/MediaCard'
import books from '../../data/books'
import SearchIcon from '@mui/icons-material/Search'
import SearchDialogForm from '../../components/search/searchFormDialog'
import { useState } from "react";
import { useEffect } from "react";

function Favorites({ user }) {
  // const [user, setCurrentUser] = useState(user);
  // useEffect(() => {
  //   setCurrentUser(user);
  // }, [user]);
  const [searchDialogOpen, setsearchDialogOpen] = React.useState(false);
  const handleSearchDialogOpen = () => setsearchDialogOpen(true);
  return (
    <>
      <Grid
        container
        sx={{
          flexFlow: 'row',
          width: '100%',
        }}
      >
        <Grid
          container
          sx={{
            display: 'flex',
            flexFlow: 'column nowrap',
            marginLeft: '2%',
          }}
        >
          <Grid
            container
            sx={{
              flexFlow: 'row',
              justifyContent: 'space-between',
            }}
          ></Grid>
          <Grid container spacing={3} rowGap={2}>
            {user?.favorites?.map((book) => (
              <Grid item md={3} sm={4} xs={6} key={book._id}>
                <MediaCard
                  id={book._id}
                  title={book.title}
                  author={book.author}
                  thumbnail={book.thumbnail}
                  genre={book.genre}
                  user={user}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
export default Favorites
