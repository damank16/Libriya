import { Delete, Edit } from '@mui/icons-material'
import { IconButton, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { toast } from 'material-react-toastify'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import Spinner from '../../components/common/Spinner'

function AdminDashboard() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [allBooks, setAllBooks] = useState([])

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const { data } = await axios.get('/api/books')
      setLoading(false)
      const { success, books, message } = data

      if (!success) {
        toast.error(message)
      } else {
        setAllBooks(books)
      }
    })()
  }, [])

  const deleteBook = async (id) => {
    const { data } = await axios.delete(`/api/books/${id}`)
    const { success, message } = data

    if (success) {
      setAllBooks(allBooks.filter((book) => book._id !== id))
      toast.success('Book deleted')
      navigate('/admin/dashboard')
      return
    }

    toast.error(message)
  }

  const onCellClick = ({ field, id }) => {
    if (field !== 'action') navigate(`/admin/book/${id}`)
  }

  const columns = [
    { field: '_id', headerName: 'ID', flex: 0.2 },
    {
      field: 'title',
      headerName: 'Title',
      flex: 1,
    },
    {
      field: 'author',
      headerName: 'Author',
      flex: 0.8,
    },
    {
      field: 'genre',
      headerName: 'Genre',
      flex: 0.8,
    },
    {
      field: 'publisher',
      headerName: 'Publisher',
      sortable: false,
      flex: 0.5,
    },
    {
      field: 'publicationYear',
      headerName: 'Publication Year',
      valueGetter: ({ value }) => new Date(value).getFullYear(),
      flex: 0.6,
    },
    {
      field: 'action',
      headerName: '',
      sortable: false,
      renderCell: ({ id }) => {
        return (
          <>
            <IconButton
              color='info'
              component={Link}
              to={`/admin/book/edit/${id}`}
            >
              <Edit />
            </IconButton>
            <IconButton color='error' onClick={() => deleteBook(id)}>
              <Delete />
            </IconButton>
          </>
        )
      },
    },
  ]

  return (
    <>
      <Typography my={2} variant='h4'>
        All Books
      </Typography>
      {loading ? (
        <Spinner />
      ) : (
        <div
          style={{
            height: 700,
            display: 'flex',
          }}
        >
          {allBooks.length === 0 ? (
            <Typography>No books in the library</Typography>
          ) : (
            <div style={{ flexGrow: 1 }}>
              <DataGrid
                sx={{ '&:hover': { cursor: 'pointer' } }}
                rows={allBooks}
                getRowId={(row) => row._id}
                onCellClick={onCellClick}
                columns={columns}
                hei
                pageSize={12}
                // rowsPerPageOptions={[1]}
                disableSelectionOnClick
              />
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default AdminDashboard
