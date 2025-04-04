const express = require('express');
const app = express();
const mongoose = require('mongoose');
const env = require('dotenv');
env.config();
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected To MongoDb !'))
  .catch(() => console.log('Connection failed to MongoDb', error));
// const PORT = process.env.PORT on peut faire || 87544 ;
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is runnig on PORT ${PORT}`));
app.use(express.json());
const booksPath = require('./routes/books');
const authorPath = require('./routes/authors');
app.use('/api/books', booksPath);
app.use('/api/authors', authorPath);
