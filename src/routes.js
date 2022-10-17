import BooksController from './controller/books-controller.js'

const routes = [
  ...BooksController,
  {
    method: '*',
    path: '/{any*}',
    handler: (request, h) => {
      const response = h.response({
        status: 'fail',
        message: 'Halaman tidak ditemukan'
      })

      response.code(404)
      return response
    }
  }
]

export default routes
