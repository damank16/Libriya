// Author: Sai Chand Kolloju

import { Button } from '@mui/material'
import axios from 'axios'
import { toast } from 'material-react-toastify'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import BookDetail from '../../components/books/BookDetail'

function AdminBookDetail() {
  const { id } = useParams()
  const [book, setBook] = useState({})

  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await axios.get(`/api/books/${id}`)
        const { success, book, message } = data
        if (success) {
          setBook(book)
          return
        }
        toast.error(message, { toastId: 'AdminBookDetail-Diff' })
        navigate('/admin/dashboard')
      } catch (err) {
        if (err.name === 'AxiosError') {
          const {
            data: { message },
          } = err.response
          toast.error(message, { toastId: 'AdminBookDetail-GetBook' })
          navigate('/admin/dashboard')
        }
      }
    })()
  }, [id])

  const deleteBook = async (id) => {
    try {
      const { data } = await axios.delete(`/api/books/${id}`)
      const { success, message } = data

      if (success) {
        toast.success('Book deleted')
        navigate('/admin/dashboard')
        return
      }
      toast.error(message, { toastId: 'AdminBookDetail-Diff' })
      navigate('/admin/dashboard')
    } catch (err) {
      if (err.name === 'AxiosError') {
        const {
          data: { message },
        } = err.response
        toast.error(message, { toastId: 'AdminBookDetail-DeleteBook' })
        navigate('/admin/dashboard')
      }
    }
  }

  return (
    <BookDetail book={book}>
      <Button
        component={Link}
        to={`/admin/book/edit/${id}`}
        variant='contained'
        color='info'
      >
        Edit
      </Button>

      <Button onClick={() => deleteBook(id)} variant='contained' color='error'>
        Delete
      </Button>
    </BookDetail>
  )
}
export default AdminBookDetail
