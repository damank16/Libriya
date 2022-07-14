// Author: Sai Chand Kolloju

import { useState, useEffect } from 'react'
import validate from '../../utils/validateBookForm'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'material-react-toastify'
import axios from 'axios'
import BookForm from '../../components/books/BookForm'

function EditBook() {
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
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
    <BookForm
      formData={formData}
      setFormData={setFormData}
      errors={errors}
      onChange={onChange}
      onSubmit={onSubmit}
      pageTitle='Update Book'
      thumbnailButtonText='Update Thumbnail'
      submitButtonText='Update'
      onFileSelected={onFileSelected}
    />
  )
}

export default EditBook
