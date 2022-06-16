import * as React from "react";
import { useState } from "react";
import {
  Paper,
  Container,
  Avatar,
  Typography,
  Stack,
  Box,
  Button,
  Grid,
} from "@mui/material";
import useInput from "../../hooks/use-input";
import { useNavigate } from "react-router-dom";
import { display } from "@mui/system";
import Favorites from "./favorites";

const Profile = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Paper sx={{ p: 1.5, my: 1 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              sx={{
                bgcolor: "#2c3e50",
                height: "100px",
                width: "100px",
                mr: 4,
                ml: 8,
              }}
              alt="Remy Sharp"
            />
            <Stack sx={{ display: "flex", flex: 1, m: 1 }}>
              <Typography variant="h4">John Doe</Typography>
              <Typography variant="subtitle">example@email.com</Typography>
            </Stack>
          </Box>
          <Grid justifyContent="flex-end">
            <Button variant="contained">Edit Profile</Button>
          </Grid>
        </Stack>

        <Typography
          variant="subtitle"
          justifyContent="center"
          display="flex"
          mt={2}
        >
          Recent Books
        </Typography>
        <Stack
          direction="row"
          sx={{ display: "flex", flex: 1, m: 1 }}
          justifyContent="center"
          display="flex"
          spacing={2}
        >
          <Avatar
            sx={{
              bgcolor: "#e8e8e8",
              height: "75px",
              width: "75px",
            }}
            alt="Remy Sharp"
            src="https://www.bloomsbury.com/media/cmpemfmb/blms_hp_tt_cvr_slider_hub.png"
          />
          <Avatar
            sx={{
              bgcolor: "#e8e8e8",
              height: "75px",
              width: "75px",
            }}
            alt="Remy Sharp"
            src="https://fostervictor.com/wp-content/uploads/2019/12/AtomicHabits_1book-768x993.png?_t=1576791368"
          />
          <Avatar
            sx={{
              bgcolor: "#e8e8e8",
              height: "75px",
              width: "75px",
            }}
            alt="Remy Sharp"
            src="http://daretodream.typepad.com/.a/6a00d8341c007f53ef0167648276f3970b-800wi"
          />
          <Avatar
            sx={{
              bgcolor: "#e8e8e8",
              height: "75px",
              width: "75px",
            }}
            alt="Remy Sharp"
            src="https://www.bloomsbury.com/media/cmpemfmb/blms_hp_tt_cvr_slider_hub.png"
          />
          <Avatar
            sx={{
              bgcolor: "#e8e8e8",
              height: "75px",
              width: "75px",
            }}
            alt="Remy Sharp"
            src="https://fostervictor.com/wp-content/uploads/2019/12/AtomicHabits_1book-768x993.png?_t=1576791368"
          />
          <Avatar
            sx={{
              bgcolor: "#e8e8e8",
              height: "75px",
              width: "75px",
            }}
            alt="Remy Sharp"
            src="http://daretodream.typepad.com/.a/6a00d8341c007f53ef0167648276f3970b-800wi"
          />
        </Stack>

        <Typography
          variant="overline"
          justifyContent="flex-end"
          display="flex"
          mt={2}
        >
          Member Since: January 12, 2021
        </Typography>
      </Paper>

      <Typography variant="h6" justifyContent="center" display="flex" my={4}>
        My Favorites
      </Typography>

      <Favorites />
    </Container>
  );
};

export default Profile;