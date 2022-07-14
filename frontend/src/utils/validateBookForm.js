// Author: Sai Chand Kolloju

const validate = ({ title, author, genre, publisher, publicationYear }) => {
  const lettersRegex = /^[ a-zA-Z]+$/i

  const errors = {}
  if (!title.trim()) {
    errors.title = 'Title is required'
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
  }

  if (!publicationYear) {
    errors.publicationYear = 'Publication year is required'
  } else if (
    new Date(publicationYear).getFullYear() < 1900 ||
    new Date(publicationYear).getFullYear() > new Date().getFullYear()
  ) {
    errors.publicationYear =
      'Publication year must be between 1900 and current year'
  }

  return errors
}

export default validate
