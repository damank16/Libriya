import { useState } from 'react'
import { Alert, Box, Button, Grid, Snackbar, TextField, Typography } from '@mui/material'
import validate from '../../utils/validateBookForm'
import { useNavigate } from 'react-router-dom'
import { toast } from 'material-react-toastify'
import { DatePicker } from '@mui/x-date-pickers'

function AddBook() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    publisher: '',
    publicationYear: null,
  })
  const [errors, setErrors] = useState({})
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
  const { title, author, genre, publisher, publicationYear } = formData

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate(formData)
    setErrors(validationErrors)

    if(Object.keys(validationErrors).length > 0) {
      return
    }

    toast.success('Book added to the inventory')
    navigate('/admin/dashboard')
  }

  return (
    <Grid container justifyContent='center' my={2}>

<Snackbar open={isSnackbarOpen} autoHideDuration={3000} onClose={() => setIsSnackbarOpen(false)}>
  <Alert color='success' severity="success" sx={{ width: '100%' }}>
    Book added to the inventory
  </Alert>
</Snackbar>

      <Grid item md={8} sm={10} xs={12}>
      <Box my={2}>
      <Typography textAlign='center' variant='h4'>Add Book</Typography>
      </Box>
      <form onSubmit={onSubmit}>
        <Box my={2}>
          <TextField
            type='text'
            label='Title'
            fullWidth
            variant='standard'
            onChange={onChange}
            name='title'
            value={title}
            error={Boolean(errors.title)}
            helperText={errors?.title}
          />
        </Box>

        <Box my={2}>
          <TextField
            type='text'
            label='Author'
            fullWidth
            variant='standard'
            onChange={onChange}
            name='author'
            value={author}
            error={Boolean(errors.author)}
            helperText={errors?.author}
          />
        </Box>

        <Box my={2}>
          <TextField
            type='text'
            label='Genre'
            fullWidth
            variant='standard'
            onChange={onChange}
            name='genre'
            value={genre}
            error={Boolean(errors.genre)}
            helperText={errors?.genre}
          />
        </Box>

        <Box my={2}>
          <TextField
            type='text'
            label='Publisher'
            fullWidth
            variant='standard'
            onChange={onChange}
            name='publisher'
            value={publisher}
            error={Boolean(errors.publisher)}
            helperText={errors?.publisher}
          />
        </Box>

        <Box my={2}>

        <DatePicker
          views={['year']}
          label="Publication year"
          value={publicationYear}
          name='publicationYear'
          disableFuture
          onChange={(value) => {setFormData({...formData, publicationYear: value})}}
          renderInput={(params) => <TextField  {...params} variant='standard' fullWidth name='publicationYear'  error={Boolean(errors.publicationYear)}
          helperText={
            errors?.publicationYear 
          }/>}
        />

          {/* <TextField
            type='number'
            label='Publication year'
            placeholder='yyyy'
            fullWidth
            variant='standard'
            onChange={onChange}
            name='publicationYear'
            value={publicationYear}
            error={Boolean(errors.publicationYear)}
            helperText={
              errors?.publicationYear 
            }
          /> */}
        </Box>
        <Box mb={10}>
          <Button
            fullWidth
            variant='contained'
            color='secondary'
            type='submit'
          >
            Add
          </Button>
        </Box>
      </form>
      </Grid>
    </Grid>
  )
}

export default AddBook
