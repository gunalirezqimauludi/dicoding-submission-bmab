import BookServices from '../service/books-service.js'

const bookServices = new BookServices()

const BooksController = [{
  method: 'POST',
  path: '/books',
  handler: bookServices.create
},
{
  method: 'GET',
  path: '/books',
  handler: bookServices.list
},
{
  method: 'GET',
  path: '/books/{bookId}',
  handler: bookServices.get
},
{
  method: 'PUT',
  path: '/books/{bookId}',
  handler: bookServices.update
},
{
  method: 'DELETE',
  path: '/books/{bookId}',
  handler: bookServices.delete
}]

export default BooksController
