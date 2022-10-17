import { nanoid } from 'nanoid'
import BookRepository from '../repository/books-repository.js'

const bookRepository = new BookRepository()

class BookServices {
  create (request, h) {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload

    const id = nanoid(16)
    const insertedAt = new Date().toISOString()
    const finished = pageCount === readPage
    const updatedAt = insertedAt

    const books = {
      id,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      insertedAt,
      updatedAt
    }

    if (name === undefined) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku'
      })

      response.code(400)
      return response
    } else if (readPage > pageCount) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
      })

      response.code(400)
      return response
    } else if (bookRepository.save(books)) {
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: id
        }
      })

      response.code(201)
      return response
    }

    const response = h.response({
      status: 'fail',
      message: 'Buku gagal ditambahkan'
    })

    response.code(500)
    return response
  }

  get (request, h) {
    const { bookId } = request.params
    const book = bookRepository.findById(bookId)

    if (book !== undefined) {
      const response = h.response({
        status: 'success',
        data: {
          book
        }
      })

      response.code(200)
      return response
    }

    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan'
    })

    response.code(404)
    return response
  }

  update (request, h) {
    const { bookId } = request.params
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload
    const finished = pageCount === readPage
    const updatedAt = new Date().toISOString()

    const payload = {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      updatedAt
    }

    if (name === undefined) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku'
      })

      response.code(400)
      return response
    } else if (readPage > pageCount) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
      })

      response.code(400)
      return response
    } else if (bookRepository.update(bookId, payload)) {
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil diperbarui'
      })

      response.code(200)
      return response
    }

    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan'
    })

    response.code(404)
    return response
  }

  delete (request, h) {
    const { bookId } = request.params

    if (bookRepository.delete(bookId)) {
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil dihapus'
      })

      response.code(200)
      return response
    }

    const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan'
    })

    response.code(404)
    return response
  }

  list (request, h) {
    const books = bookRepository.findAll(request.query)
    const response = h.response({
      status: 'success',
      data: {
        books
      }
    })

    response.code(200)
    return response
  }
}

export default BookServices
