/*

Authors:

- Damandeep Kaur (B00904831)

*/

import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import { Grid } from '@mui/material'
import Typography from '@mui/material/Typography'
import axios from 'axios'

export default function SearchDialogForm(props) {
  const {
    open,
    setDialogOpenState,
    setChecked,
    setSearchedBooks,
    searchFields,
    setSearchFields,
    sortMethod,
    setSortMethod,
  } = props
  const [disableSearch, setDisableSearch] = React.useState(true)
  const handleDisableSearch = () => setDisableSearch(true)

  const handleSort = (event) => {
    if (event.target.value === sortMethod) {
      setSortMethod('')
    } else {
      setSortMethod(event.target.value)
    }
  }

  const handleSearchFeildOnChanges = (event, param) => {
    let obj = {}
    if (param === 'publicationYear')
      event.target.value = event.target.value.replace(/\D/g, '')
    obj[param] = event.target.value
    setSearchFields((prevSearchFields) => ({
      ...prevSearchFields,
      ...obj,
    }))
  }

  const handleSearch = (event) => {
    if (event) {
      event.preventDefault()
    }
    getSearchResults()
    setDialogOpenState(false)
  }

  const handleReset = (event) => {
    if (event) {
      event.preventDefault()
    }
    setChecked(false)
    setSearchFields({
      title: '',
      author: '',
      genre: '',
      publisher: '',
      publicationYear: '',
    })
    setSortMethod('')
    setDialogOpenState(false)
    handleDisableSearch()
  }

  const getSearchResults = async () => {
    axios
      .post('/searchbooks', {
        ...searchFields,
        sort: sortMethod,
      })
      .then((res) => {
        setSearchedBooks(res.data.books)
        setChecked(true)
      })
  }

  React.useEffect(() => {
    const disableSearch = Object.values(searchFields).some((searchField) => {
      if (searchField) {
        return true
      }
      return false
    })
    setDisableSearch(!disableSearch)
  }, [searchFields])

  const handleDialogClose = () => {
    setDialogOpenState(false)
  }

  return (
    <Dialog open={open} onBackdropClick={handleDialogClose}>
      <DialogTitle id='search_dialog_title_id'>{'Search Books'}</DialogTitle>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            id='name_search_id'
            label='Book Name'
            value={searchFields.title}
            variant='outlined'
            onChange={(event) => {
              handleSearchFeildOnChanges(event, 'title')
            }}
            sx={{
              marginLeft: '10px',
              marginRight: '10px',
              width: 'calc(100% - 20px)',
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          {/* Code Attribution 1*/}
          {/* [URL]:hhttps://mui.com/material-ui/react-text-field/ */}
          <TextField
            id='author_search_id'
            label='Author'
            value={searchFields.author}
            variant='outlined'
            onChange={(event) => {
              handleSearchFeildOnChanges(event, 'author')
            }}
            sx={{
              marginLeft: '10px',
              marginRight: '10px',
              width: 'calc(100% - 20px)',
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id='subject_search_id'
            label='Genre'
            value={searchFields.genre}
            variant='outlined'
            onChange={(event) => {
              handleSearchFeildOnChanges(event, 'genre')
            }}
            sx={{
              marginLeft: '10px',
              marginRight: '10px',
              width: 'calc(100% - 20px)',
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id='publication_search_id'
            label='Publication'
            value={searchFields.publisher}
            variant='outlined'
            onChange={(event) => {
              handleSearchFeildOnChanges(event, 'publisher')
            }}
            sx={{
              marginLeft: '10px',
              marginRight: '10px',
              width: 'calc(100% - 20px)',
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id='publication_year_search_id'
            label='Publication Year (YYYY)'
            value={searchFields.publicationYear}
            variant='outlined'
            inputProps={{ maxLength: 4 }}
            onChange={(event) => {
              handleSearchFeildOnChanges(event, 'publicationYear')
            }}
            sx={{
              marginLeft: '10px',
              marginRight: '10px',
              width: 'calc(100% - 20px)',
            }}
          />
        </Grid>
      </Grid>
      <br />
      <Typography
        sx={{
          marginLeft: '10px',
          marginRight: '10px',
          width: 'calc(100% - 20px)',
        }}
      >
        Sort By
      </Typography>
      <RadioGroup
        row
        aria-labelledby='demo-row-radio-buttons-group-label'
        name='row-radio-buttons-group'
        sx={{
          marginLeft: '10px',
          marginRight: '10px',
          width: 'calc(100% - 20px)',
        }}
        value={sortMethod}
      >
        <FormControlLabel
          value='title'
          control={<Radio onClick={handleSort} />}
          label='Name'
        />
        <FormControlLabel
          value='author'
          control={<Radio onClick={handleSort} />}
          label='Author'
        />
        <FormControlLabel
          value='publicationYear'
          control={<Radio onClick={handleSort} />}
          label='Publication Year'
        />
      </RadioGroup>
      <DialogActions>
        <Button
          disabled={disableSearch}
          onClick={(e) => {
            handleSearch(e)
          }}
        >
          Search
        </Button>
        <Button
          onClick={(e) => {
            handleReset(e)
          }}
        >
          Reset
        </Button>
      </DialogActions>
    </Dialog>
  )
}
