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
import axios from "axios";
import { AuthContext } from "../../context";
import { useContext } from "react";

// Email Validation Regex
const regex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

// Handle input changes
const simpleChangeHandler = (event) => {
  return event.target.value;
};

// Handle changes and only accept alphabets
const onlyTextChangeHandler = (event) => {
  return event.target.value.replace(/[^a-z]/gi, "");
};

const Registration = () => {
  const navigate = useNavigate();
  const { isLogin, setLogin } = useContext(AuthContext);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackSuccess, setSnackSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Close SnackBar
  const closeSnackbar = () => setSnackOpen(false);

  // First Name
  const {
    value: firstName,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
  } = useInput((value) => value.trim() !== "", onlyTextChangeHandler);

  // Last Name
  const {
    value: lastName,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
  } = useInput((value) => value.trim() !== "", onlyTextChangeHandler);

  // Email
  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput((value) => regex.test(value) === true, simpleChangeHandler);

  // Password
  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput((value) => value.length >= 8, simpleChangeHandler);

  // Confirm Password
  const {
    value: confirmPassword,
    isValid: confirmPasswordIsValid,
    hasError: confirmPasswordHasError,
    valueChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
  } = useInput((value) => value.trim() === password, simpleChangeHandler);

  let formIsValid = false;

  if (
    firstNameIsValid &&
    lastNameIsValid &&
    emailIsValid &&
    passwordIsValid &&
    confirmPasswordIsValid
  ) {
    formIsValid = true;
  }

  // Form Submit Handler
  const formSubmissionHandler = (event) => {
    event.preventDefault();

    setLoading(true);
    const userData = {
      firstName,
      lastName,
      email,
      password,
    };
    axios
      .post("/api/users/", userData)
      .then((res) => {
        setLoading(false);
        setSnackSuccess(true);
        setSnackOpen(true);
        setLogin(true);
        localStorage.setItem("LIBRIYA_TOKEN", res.data?.user?.token);
        localStorage.setItem("USER_ID", res.data.user._id.toString());
        localStorage.setItem("LIBRIYA_USER", JSON.stringify(res.data.user));
        navigate("/home");
      })
      .catch((e) => {
        setLoading(false);
        setSnackOpen(true);
      });
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
          {"User Registration"}
        </Typography>

        <form onSubmit={formSubmissionHandler}>
          <TextField
            id="first_name"
            label="First Name"
            variant="outlined"
            fullWidth={true}
            sx={{
              mt: 2,
            }}
            value={firstName}
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
            error={firstNameHasError}
            helperText={firstNameHasError && "First Name is required"}
          />

          <TextField
            id="last_name"
            label="Last Name"
            variant="outlined"
            fullWidth={true}
            sx={{
              mt: 2,
            }}
            value={lastName}
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
            error={lastNameHasError}
            helperText={lastNameHasError && "Last Name is required"}
          />

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

          <TextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth={true}
            sx={{
              mt: 2,
            }}
            value={password}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            error={passwordHasError}
            helperText={
              passwordHasError &&
              "Password is required with minimum 8 characters"
            }
          />

          <TextField
            id="confirm_password"
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth={true}
            sx={{
              mt: 2,
            }}
            value={confirmPassword}
            onChange={confirmPasswordChangeHandler}
            onBlur={confirmPasswordBlurHandler}
            error={confirmPasswordHasError}
            helperText={confirmPasswordHasError && "Passwords do not match."}
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
              disabled={!formIsValid}
              sx={{
                backgroundColor: "#455A64",
              }}
            >
              Register
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
            <Link variant="body2">Already have an account? Sign in</Link>
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
            severity={snackSuccess ? "success" : "error"}
            sx={{ width: "100%" }}
            variant="filled"
          >
            {snackSuccess
              ? "User Registration Successfully"
              : "User Registration Failure"}
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default Registration;
