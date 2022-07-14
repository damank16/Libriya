// Author: Sai Chand Kolloju

import { useState, useEffect } from 'react'
import validate from '../../utils/validateBookForm'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'material-react-toastify'
import axios from 'axios'
import BookForm from '../../components/books/BookForm'

function EditBook() {
  const { id } = useParams()
  navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      try {
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
          toast.error(message, { toastId: 'EditBook-Get-Diff' })
          navigate('/admin/dashboard')
        }
      } catch (err) {
        if (err.name === 'AxiosError') {
          const {
            data: { message },
          } = err.response
          toast.error(message, { toastId: 'EditBook-GetBook' })
          navigate('/admin/dashboard')
        }
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

      toast.error(message, { toastId: 'EditBook-Diff' })
    } catch (err) {
      if (err.name === 'AxiosError') {
        const {
          data: { errors, message },
        } = err.response
        const serverErrors = {}
        errors.forEach((error) => {
          serverErrors[error.param] = error.msg
        })
        setErrors(serverErrors)
        if (message) {
          toast.error(message, { toastId: 'EditBook' })
        }
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
