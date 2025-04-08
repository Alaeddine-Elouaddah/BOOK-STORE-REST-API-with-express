const { Book } = require('./models/Book');
const { Author } = require('./models/Author');
const { books, authors } = require('./data');
const connectToDb = require('./config/db');
require('dotenv').config();
//Conncection to db
connectToDb();
// Import Books(Sedding Database )
const importBooks = async () => {
  try {
    await Book.insertMany(books);
    console.log('Book Iserted Succeesful ');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
// Deleted Books
const removeBooks = async () => {
  try {
    await Book.deleteMany();
    console.log('Book Deleted Succes ');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
const importAuthors = async () => {
  try {
    await Author.insertMany(authors);
    console.log('Author Imported');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === '-import') {
  importBooks();
} else if (process.argv[2] === '-remove') {
  removeBooks();
} else if (process.argv[2] === '-importA') {
  importAuthors();
}
