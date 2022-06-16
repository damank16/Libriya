import { Delete, Edit } from '@mui/icons-material'
import { IconButton, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { toast } from 'material-react-toastify'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import books from '../../data/books'

function AdminDashboard() {
  const navigate = useNavigate()
  const [allBooks, setAllBooks] = useState(books)

  const deleteBook = (id) => {
    setAllBooks(allBooks.filter((book) => book.id !== id))
    toast.success('Book deleted')
    navigate('/admin/dashboard')
  }

  const onCellClick = ({ field, id }) => {
    if (field !== 'action') navigate(`/admin/book/${id}`)
  }

  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.2 },
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
      valueGetter: ({ value }) => value.getFullYear(),
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
      <div
        style={{
          height: 400,
          display: 'flex',
        }}
      >
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            sx={{ '&:hover': { cursor: 'pointer' } }}
            rows={allBooks}
            onCellClick={onCellClick}
            columns={columns}
            hei
            pageSize={6}
            rowsPerPageOptions={[6]}
            disableSelectionOnClick
          />
        </div>
      </div>
    </>
  )
}

export default AdminDashboard
