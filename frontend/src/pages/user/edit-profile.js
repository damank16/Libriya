import * as React from 'react'
import { useState, useEffect } from 'react'
import {
  Snackbar,
  Box,
  Stack,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Divider,
} from '@mui/material'
import { Container } from '@mui/material'
import useInput from '../../hooks/use-input'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

// Handle changes and only accept alphabets
const onlyTextChangeHandler = (event) => {
  return event.target.value.replace(/[^a-z]/gi, '')
}

// Handle input changes
const simpleChangeHandler = (event) => {
  return event.target.value
}

const EditProfile = () => {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [snackOpen, setSnackOpen] = useState(false)
  const [snackSuccess, setSnackSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  // Close SnackBar
  const closeSnackbar = () => setSnackOpen(false)

  useEffect(() => {
    const user = state?.user
    setAddress1(user.address1 ?? '')
    setAddress2(user.address2 ?? '')
    setFirstName(user.firstName ?? '')
    setLastName(user.lastName ?? '')
    setCity(user.city ?? '')
    setProvince(user.province ?? '')
    setZipCode(user.zipCode ?? '')
  }, [])

  // First Name
  const {
    value: firstName,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstNameInput,
    setEnteredValue: setFirstName,
  } = useInput((value) => value.trim() !== '', onlyTextChangeHandler)

  // Last Name
  const {
    value: lastName,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastNameInput,
    setEnteredValue: setLastName,
  } = useInput((value) => value.trim() !== '', onlyTextChangeHandler)

  // Address Line 1
  const {
    value: address1,
    isValid: address1IsValid,
    hasError: address1HasError,
    valueChangeHandler: address1ChangeHandler,
    inputBlurHandler: address1BlurHandler,
    reset: resetAddress1Input,
    setEnteredValue: setAddress1,
  } = useInput((value) => value.trim() !== '', simpleChangeHandler)

  // Address Line 2
  const {
    value: address2,
    isValid: address2IsValid,
    hasError: address2HasError,
    valueChangeHandler: address2ChangeHandler,
    inputBlurHandler: address2BlurHandler,
    reset: resetAddress2Input,
    setEnteredValue: setAddress2,
  } = useInput((value) => true, simpleChangeHandler)

  // City
  const {
    value: city,
    isValid: cityIsValid,
    hasError: cityHasError,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
    reset: resetCityInput,
    setEnteredValue: setCity,
  } = useInput((value) => value.trim() !== '', simpleChangeHandler)

  // Province
  const {
    value: province,
    isValid: provinceIsValid,
    hasError: provinceHasError,
    valueChangeHandler: provinceChangeHandler,
    inputBlurHandler: provinceBlurHandler,
    reset: resetProvinceInput,
    setEnteredValue: setProvince,
  } = useInput((value) => value.trim() !== '', simpleChangeHandler)

  // ZipCode
  const {
    value: zipCode,
    isValid: zipCodeIsValid,
    hasError: zipCodeHasError,
    valueChangeHandler: zipCodeChangeHandler,
    inputBlurHandler: zipCodeBlurHandler,
    reset: resetZipCodeInput,
    setEnteredValue: setZipCode,
  } = useInput((value) => value.length === 6, simpleChangeHandler)

  let formIsValid = false

  if (
    firstNameIsValid &&
    lastNameIsValid &&
    address1IsValid &&
    cityIsValid &&
    provinceIsValid &&
    zipCodeIsValid
  ) {
    formIsValid = true
  }

  // Form Submit Handler
  const formSubmissionHandler = (event) => {
    event.preventDefault()

    setLoading(true)

    const userData = {
      address1,
      address2,
      firstName,
      lastName,
      city,
      province,
      zipCode,
    }
    setLoading(false)
    axios
      .put('/api/users/', userData, {
        headers: {
          Authorization: localStorage.getItem('LIBRIYA_TOKEN'),
        },
      })
      .then((res) => {
        setLoading(false)
        setSnackOpen(true)
        setSnackSuccess(true)
        localStorage.setItem('LIBRIYA_USER', JSON.stringify(res.data.user))
        navigate('/profile')
      })
      .catch((err) => {
        setLoading(false)
        setSnackOpen(true)
        console.log(err)
      })

    // setTimeout(() => {
    //   setLoading(false);
    //   setSnackOpen(true);

    //   setTimeout(() => {
    //     // Reset Form
    //     resetFirstNameInput();
    //     resetLastNameInput();
    //     resetAddress1Input();
    //     resetAddress2Input();
    //     resetCityInput();
    //     resetProvinceInput();
    //     resetZipCodeInput();
    //     navigate("/profile");
    //   }, 2000);
    // }, 2000);
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
          {'Profile Information'}
        </Typography>

        <form onSubmit={formSubmissionHandler}>
          <TextField
            id='first_name'
            label='First Name'
            variant='outlined'
            fullWidth={true}
            sx={{
              mt: 2,
            }}
            value={firstName}
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
            error={firstNameHasError}
            helperText={firstNameHasError && 'First Name is required'}
          />

          <TextField
            id='last_name'
            label='Last Name'
            variant='outlined'
            fullWidth={true}
            sx={{
              mt: 2,
            }}
            value={lastName}
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
            error={lastNameHasError}
            helperText={lastNameHasError && 'Last Name is required'}
          />

          <Divider sx={{ my: 4 }} />

          <Typography
            variant='body2'
            sx={{ lineHeight: 1.2, mb: 2 }}
            display='flex'
            alignItems='center'
            justifyContent='flex-start'
          >
            {'Address'}
          </Typography>

          {/* Address Line 1 */}
          <TextField
            id='address_line_1'
            label='Street # and Name (Line 1)'
            variant='outlined'
            fullWidth={true}
            sx={{
              mt: 2,
            }}
            value={address1}
            onChange={address1ChangeHandler}
            onBlur={address1BlurHandler}
            error={address1HasError}
            helperText={address1HasError && 'Address is required'}
          />

          {/* Address Line 2 */}
          <TextField
            id='address_line_2'
            label='(Apt/Suite/Building (Optional)'
            variant='outlined'
            fullWidth={true}
            sx={{
              mt: 2,
            }}
            value={address2}
            onChange={address2ChangeHandler}
            onBlur={address2BlurHandler}
            error={address2HasError}
            helperText={address2HasError && 'This is Optional'}
          />

          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            spacing={2}
            sx={{
              mt: 2,
            }}
          >
            {/* City */}
            <TextField
              id='city'
              label='City'
              variant='outlined'
              value={city}
              onChange={cityChangeHandler}
              onBlur={cityBlurHandler}
              error={cityHasError}
              helperText={cityHasError && 'City is required'}
            />

            {/* Province */}
            <TextField
              id='province'
              label='Province'
              variant='outlined'
              value={province}
              onChange={provinceChangeHandler}
              onBlur={provinceBlurHandler}
              error={provinceHasError}
              helperText={provinceHasError && 'Province is required'}
            />

            {/* ZipCode */}
            <TextField
              id='zip_code'
              label='Zip Code'
              variant='outlined'
              value={zipCode}
              onChange={zipCodeChangeHandler}
              onBlur={zipCodeBlurHandler}
              error={zipCodeHasError}
              helperText={zipCodeHasError && 'Valid Zip Code is required'}
            />
          </Stack>

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
              Update
            </Button>
            {loading && <CircularProgress size={24} sx={{ ml: 2 }} />}
          </Box>
        </form>
        <Snackbar
          open={snackOpen}
          autoHideDuration={6000}
          onClose={closeSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            onClose={closeSnackbar}
            severity={snackSuccess ? 'success' : 'error'}
            sx={{ width: '100%' }}
            variant='filled'
          >
            {snackSuccess ? 'Profile Updated' : 'Profile Update Failed'}
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  )
}

export default EditProfile
