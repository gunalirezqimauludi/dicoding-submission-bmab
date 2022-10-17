import books from '../model/books.js'

class BookRepository {
  save (payload) {
    books.push(payload)
    return books.filter((book) => book.id === payload.id).length > 0
  }

  update (bookId, payload) {
    const index = books.findIndex((book) => book.id === bookId)
    if (index !== -1) {
      books[index] = {
        ...books[index],
        ...payload
      }
      return true
    }

    return false
  }

  delete (bookId) {
    const index = books.findIndex((book) => book.id === bookId)

    if (index !== -1) {
      books.splice(index, 1)
      return true
    }

    return false
  }

  findById (bookId) {
    return books.filter((b) => b.id === bookId)[0]
  }

  findAll (query) {
    const { name, reading, finished } = query

    let filteredBooks = books

    if (name) {
      filteredBooks = books.filter((b) => b.name.toLowerCase().includes(name.toLowerCase()))
    } else if (reading) {
      filteredBooks = books.filter((b) => Number(b.reading) === Number(reading))
    } else if (finished) {
      filteredBooks = books.filter((b) => Number(b.finished) === Number(finished))
    }

    return filteredBooks.map((b) => ({
      id: b.id,
      name: b.name,
      publisher: b.publisher
    }))
  }
}

export default BookRepository
