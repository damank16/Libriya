import { useState } from 'react'
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import validate from '../../utils/validateBookForm'

function AddBook() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    publisher: '',
    publicationYear: '',
  })
  const [errors, setErrors] = useState({})

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

    console.log('valid')
  }

  return (
    <Grid container justifyContent='center' my={2}>
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
          <TextField
            type='number'
            label='Publication year'
            fullWidth
            variant='standard'
            onChange={onChange}
            name='publicationYear'
            value={publicationYear}
            error={Boolean(errors.publicationYear)}
            helperText={
              errors?.publicationYear 
            }
          />
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
