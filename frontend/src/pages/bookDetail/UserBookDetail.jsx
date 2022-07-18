// Author: Sai Chand Kolloju

import { Favorite } from '@mui/icons-material'
import { Box, Button, IconButton } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import BookDetail from '../../components/books/BookDetail'
import { toast } from 'material-react-toastify'
import { useContext } from 'react'
import CartContext from '../context/CartContext'

function UserBookDetail() {
  const { id } = useParams()
  const [book, setBook] = useState({})
  const [isUserFavorite, setIsUserFavorite] = useState(false)
  const navigate = useNavigate()
  const { addToCart, removeFromCart, isInCart } = useContext(CartContext)

  const onFavoriteHandler = async () => {
    axios
      .post(
        '/api/users/favorites',
        {
          bookId: id,
        },
        {
          headers: {
            Authorization: localStorage.getItem('LIBRIYA_TOKEN'),
          },
        }
      )
      .then((res) => {
        console.log(res)
        setIsUserFavorite(!isUserFavorite)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await axios.get(`/api/books/${id}`)
        const { success, book, message } = data
        if (success) {
          setBook(book)
        } else {
          toast.error(message, { toastId: 'UserBookDetail-Diff' })
          navigate('/dashboard')
        }
      } catch (err) {
        if (err.name === 'AxiosError') {
          const {
            data: { message },
          } = err.response
          toast.error(message, { toastId: 'UserBookDetail-GetBook' })
          navigate('/dashboard')
        }
      }
    })()
  }, [id])

  const { title, genre, author, thumbnail } = book

  return (
    <BookDetail book={book}>
      {!isInCart(id) ? (
        <Button
          variant='contained'
          color='secondary'
          style={{ display: isInCart(id) ? 'none' : 'inline-block' }}
          onClick={() => addToCart(id, title, author, thumbnail, genre)}
        >
          Add To Cart
        </Button>
      ) : (
        <Button
          variant='contained'
          color='error'
          hidden={!isInCart(id)}
          style={{ display: !isInCart(id) ? 'none' : 'inline-block' }}
          onClick={() => removeFromCart(id)}
        >
          Remove From Cart
        </Button>
      )}

      <IconButton onClick={onFavoriteHandler}>
        <Favorite
          size='small'
          sx={{
            color: isUserFavorite ? '#e74c3c' : '#7f8c8d',
          }}
        />
      </IconButton>
    </BookDetail>
  )
}
export default UserBookDetail
