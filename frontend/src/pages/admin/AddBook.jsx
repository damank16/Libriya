// Author: Sai Chand Kolloju

import { useState } from 'react'
import validate from '../../utils/validateBookForm'
import { useNavigate } from 'react-router-dom'
import { toast } from 'material-react-toastify'
import axios from 'axios'
import BookForm from '../../components/books/BookForm'

function AddBook() {
  const navigate = useNavigate()
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
      const { data } = await axios.post('/api/books', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      const { success, message } = data

      if (success) {
        toast.success('Book added to the inventory')
        return navigate('/admin/dashboard')
      }

      toast.error(message, { toastId: 'AddBook-Diff' })
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
          toast.error(message, { toastId: 'AddBook' })
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
      pageTitle='Add Book'
      thumbnailButtonText='Upload Thumbnail'
      submitButtonText='Add'
      onFileSelected={onFileSelected}
    />
  )
}

export default AddBook
