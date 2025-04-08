const { Book } = require('./models/Book');
const { books } = require('./data');
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
if (process.argv[2] === '-import') {
  importBooks();
} else if (process.argv[2] === '-remove') {
  removeBooks();
}
