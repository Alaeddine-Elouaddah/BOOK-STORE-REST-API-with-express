const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose
  .connect('mongodb://localhost/bookStoreDb')
  .then(() => console.log('Connected To MongoDb !'))
  .catch(() => console.log('Connection failed to MongoDb', error));
const PORT = 8000;
app.listen(PORT, () => console.log(`Server is runnig on PORT ${PORT}`));
app.use(express.json());
const booksPath = require('./routes/books');
const authorPath = require('./routes/authors');
app.use('/api/books', booksPath);
app.use('/api/authors', authorPath);
