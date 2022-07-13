import * as React from 'react'
import { useState } from 'react'
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
} from '@mui/material'
import { Container } from '@mui/material'
import useInput from '../../hooks/use-input'
import { useNavigate } from 'react-router-dom'

// Email Validation Regex
const regex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

// Handle input changes
const simpleChangeHandler = (event) => {
  return event.target.value
}

const Login = () => {
  const navigate = useNavigate()
  const [snackOpen, setSnackOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  // Close SnackBar
  const closeSnackbar = () => setSnackOpen(false)

  // Email
  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => regex.test(value) === true, simpleChangeHandler)

  // Password
  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.trim() !== '', simpleChangeHandler)

  let formIsValid = false

  if (emailIsValid && passwordIsValid) {
    formIsValid = true
  }

  // Form Submit Handler
  const formSubmissionHandler = (event) => {
    event.preventDefault()

    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      setSnackOpen(true)

      setTimeout(() => {
        // Reset Form
        resetEmailInput()
        resetPasswordInput()
        navigate('/dashboard')
      }, 2000)
    }, 2000)
  }

  return (
    <Container maxWidth='md'>
      <Paper sx={{ m: '50px', p: '30px' }}>
        <Typography
          variant='h5'
          component='h5'
          sx={{ lineHeight: 1.2, mb: 2 }}
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          {'Sign In'}
        </Typography>

        <form onSubmit={formSubmissionHandler}>
          <TextField
            id='email'
            label='Email'
            variant='outlined'
            fullWidth={true}
            sx={{
              mt: 2,
            }}
            value={email}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            error={emailHasError}
            helperText={emailHasError && 'Valid Email is required'}
          />

          <TextField
            id='password'
            label='Password'
            type='password'
            variant='outlined'
            fullWidth={true}
            sx={{
              mt: 2,
            }}
            value={password}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            error={passwordHasError}
            helperText={passwordHasError && 'Password is required'}
          />

          <Box
            sx={{ mt: 4, position: 'relative' }}
            display='flex'
            alignItems='center'
            justifyContent='center'
          >
            <Button
              type='submit'
              variant='contained'
              disabled={!formIsValid}
              sx={{
                backgroundColor: '#455A64',
              }}
            >
              Login
            </Button>
            {loading && <CircularProgress size={24} sx={{ ml: 2 }} />}
          </Box>
        </form>
        <Grid container justifyContent='flex-end'>
          <Grid item xs>
            <Link variant='body2' onClick={() => navigate('/forgot-password')}>
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link variant='body2' onClick={() => navigate('/registration')}>
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
        <Snackbar
          open={snackOpen}
          autoHideDuration={6000}
          onClose={closeSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            onClose={closeSnackbar}
            severity='success'
            sx={{ width: '100%' }}
            variant='filled'
          >
            Login Successful
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  )
}

export default Login
