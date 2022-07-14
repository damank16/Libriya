import { useState } from 'react'
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import validate from '../../utils/validateBookForm'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'material-react-toastify'
import { DatePicker } from '@mui/x-date-pickers'
import { useEffect } from 'react'
//import books from '../../data/books'
import axios from 'axios'

function EditBook() {
  const { id } = useParams();                                                                                                               
  navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/api/books/${id}`)

      const { book, message, success } = data

      if (success) {
        const { title, genre, author, publicationYear, publisher } = book
        setFormData({
          ...formData,
          title,
          author,
          genre,
          publicationYear,
          publisher,
        })
      } else {
        toast.error(message)
      }
    })()
  }, [id])

  const [formData, setFormData] = useState({
    thumbnail: null,
    title: '',
    author: '',
    genre: '',
    publisher: '',
    publicationYear: null,
  })
  const [errors, setErrors] = useState({})
  const { title, author, genre, publisher, publicationYear, thumbnail } =
    formData

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onFileSelected = (e) => {
    setFormData({ ...formData, thumbnail: e.target.files[0] })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate(formData)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    try {
      const { data } = await axios.put(`/api/books/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      const { success, message } = data

      if (success) {
        toast.success('Book updated')
        return navigate('/admin/dashboard')
      }

      toast.error(message)
    } catch (err) {
      console.log(err)
      if (err.name === 'AxiosError') {
        const {
          data: { errors },
        } = err.response
        const serverErrors = {}
        errors.forEach((error) => {
          serverErrors[error.param] = error.msg
        })
        setErrors(serverErrors)
      }
    }
  }

  return (
    <Grid container justifyContent='center' my={2}>
      <Grid item md={8} sm={10} xs={12}>
        <Box my={2}>
          <Button
            variant='contained'
            color='secondary'
            component='span'
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
          <Typography textAlign='center' variant='h4'>
            Update Book
          </Typography>
        </Box>
        <form onSubmit={onSubmit}>
          <Box my={2}>
            <Button variant='contained' component='label'>
              Update Thumbnail
              <input
                type='file'
                name='thumbnail'
                onChange={onFileSelected}
                accept='image/jpeg, image/png'
                id=''
                hidden
              />
            </Button>
            {thumbnail && (
              <Typography variant='body2' component='span' mx={1}>
                {thumbnail.name}
              </Typography>
            )}
          </Box>
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
              label='Publication year'
              value={publicationYear}
              name='publicationYear'
              disableFuture
              onChange={(value) => {
                setFormData({ ...formData, publicationYear: value })
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant='standard'
                  fullWidth
                  name='publicationYear'
                  error={Boolean(errors.publicationYear)}
                  helperText={errors?.publicationYear}
                />
              )}
            />
          </Box>
          <Box mb={10}>
            <Button
              fullWidth
              variant='contained'
              color='secondary'
              type='submit'
            >
              Update
            </Button>
          </Box>
        </form>
      </Grid>
    </Grid>
  )
}

export default EditBook
