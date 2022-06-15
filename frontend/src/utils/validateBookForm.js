const validate = ({ title, author, genre, publisher, publicationYear }) => {
  const lettersRegex = /^[ a-zA-Z]+$/i

  const errors = {}
  if (!title.trim()) {
    errors.title = 'Title is required'
  } else if (!lettersRegex.test(title)) {
    errors.title = 'Title can only have letters'
  }

  if (!author.trim()) {
    errors.author = 'Author is required'
  } else if (!lettersRegex.test(author)) {
    errors.author = 'Author can only have letters'
  }

  if (!genre.trim()) {
    errors.genre = 'Genre is required'
  } else if (!lettersRegex.test(genre)) {
    errors.genre = 'Genre can only have letters'
  }

  if (!publisher.trim()) {
    errors.publisher = 'Publisher is required'
  } else if (!lettersRegex.test(publisher)) {
    errors.publisher = 'Publisher can only have letters'
  }

  if (!publicationYear) {
    errors.publicationYear = 'Publication year is required'
  } else if (
    publicationYear.getFullYear() < 1900 ||
    publicationYear.getFullYear() > new Date().getFullYear()
  ) {
    errors.publicationYear =
      'Publication year must be between 1900 and current year'
  }

  return errors
}

export default validate
