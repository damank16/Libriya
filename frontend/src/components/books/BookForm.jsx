// Author: Sai Chand Kolloju

import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { useNavigate } from 'react-router-dom'

function BookForm({
  pageTitle,
  formData,
  setFormData,
  errors,
  thumbnailButtonText,
  submitButtonText,
  onChange,
  onSubmit,
  onFileSelected,
}) {
  const { title, author, genre, publisher, publicationYear, thumbnail } =
    formData
  const navigate = useNavigate()
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
            {pageTitle}
          </Typography>
        </Box>
        <form onSubmit={onSubmit}>
          <Box my={2}>
            <Button variant='contained' component='label'>
              {thumbnailButtonText}
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
              {submitButtonText}
            </Button>
          </Box>
        </form>
      </Grid>
    </Grid>
  )
}
export default BookForm
