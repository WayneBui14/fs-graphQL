require('dotenv').config()
const connectDB = require('./db')
const startServer = require('./server')
const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT || 4000
const main = async () => {
  await connectDB(MONGODB_URI)
  startServer(PORT)
}
main()


/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conexión con el libro
 */


/*
  you can remove the placeholder query once your first one has been implemented 
*/





