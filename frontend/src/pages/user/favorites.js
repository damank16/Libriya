import * as React from "react";
import { Grid, Typography } from "@mui/material";
import MediaCard from "../../components/Card/MediaCard";
//import books from "../../data/books";
import SearchIcon from "@mui/icons-material/Search";
import SearchDialogForm from "../../components/searchFormDialog";

function Favorites() {
  const [searchDialogOpen, setsearchDialogOpen] = React.useState(false);
  const handleSearchDialogOpen = () => setsearchDialogOpen(true);
  return (
    <>
      <Grid
        container
        sx={{
          flexFlow: "row",
          width: "100%",
        }}
      >
        <Grid
          container
          sx={{
            display: "flex",
            flexFlow: "column nowrap",
            marginLeft: "2%",
          }}
        >
          <Grid
            container
            sx={{
              flexFlow: "row",
              justifyContent: "space-between",
            }}
          >
          </Grid>
          <Grid container spacing={3} rowGap={2}>
            {/* {books.map((book) => (
              <Grid item md={3} sm={4} xs={6}>
                <MediaCard key={book.id} {...book} />
              </Grid>
            ))} */}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
export default Favorites;
