import * as React from "react";
import { useState } from "react";
import {
  Snackbar,
  Box,
  Grid,
  Link,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Container } from "@mui/material";
import useInput from "../../hooks/use-input";
import { useNavigate } from "react-router-dom";

// Email Validation Regex
const regex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

// Handle input changes
const simpleChangeHandler = (event) => {
  return event.target.value;
};

const ForgotPassowrd = () => {
  const navigate = useNavigate();
  const [snackOpen, setSnackOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Close SnackBar
  const closeSnackbar = () => setSnackOpen(false);

  // Email
  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => regex.test(value) === true, simpleChangeHandler);

  // Form Submit Handler
  const formSubmissionHandler = (event) => {
    event.preventDefault();

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSnackOpen(true);

      setTimeout(() => {
        // Reset Form
        resetEmailInput();
        navigate("/login");
      }, 2000);
    }, 2000);
  };

  return (
    <Container maxWidth="md">
      <Paper sx={{ m: "50px", p: "30px" }}>
        <Typography
          variant="h5"
          component="h5"
          sx={{ lineHeight: 1.2, mb: 2 }}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {"Forgot Password"}
        </Typography>

        <form onSubmit={formSubmissionHandler}>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            fullWidth={true}
            sx={{
              mt: 2,
            }}
            value={email}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            error={emailHasError}
            helperText={emailHasError && "Valid Email is required"}
          />

          <Box
            sx={{ mt: 4, position: "relative" }}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Button
              type="submit"
              variant="contained"
              disabled={!emailIsValid}
              sx={{
                backgroundColor: "#455A64",
              }}
            >
              Send Reset Link
            </Button>
            {loading && <CircularProgress size={24} sx={{ ml: 2 }} />}
          </Box>
        </form>
        <Grid
          container
          justifyContent="flex-end"
          onClick={() => navigate("/login")}
        >
          <Grid item>
            <Link variant="body2">Cancel</Link>
          </Grid>
        </Grid>
        <Snackbar
          open={snackOpen}
          autoHideDuration={6000}
          onClose={closeSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={closeSnackbar}
            severity="success"
            sx={{ width: "100%" }}
            variant="filled"
          >
            Password Reset Email Sent Successfully
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default ForgotPassowrd;
