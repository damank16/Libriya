// Author: Sai Chand Kolloju

import { Favorite } from '@mui/icons-material'
import { Button, IconButton } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import BookDetail from '../../components/books/BookDetail'

function UserBookDetail() {
  const { id } = useParams()
  const [book, setBook] = useState({})

  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      const { data } = await axios.get(`/api/books/${id}`)
      const { success, book } = data
      if (success) {
        setBook(book)
      }
    })()
  }, [id])

  return (
    <BookDetail book={book}>
      <Button variant='contained' color='secondary'>
        Add To Cart
      </Button>
      <IconButton>
        <Favorite size='small' />
      </IconButton>
    </BookDetail>
  )
}
export default UserBookDetail
