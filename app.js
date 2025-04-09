const express = require('express');
const app = express();
const mongoose = require('mongoose');
const env = require('dotenv');
const logger = require('./middlewares/logger');
const { notFound, errorHandler } = require('./middlewares/errors');
const connectToMongoDb = require('./config/db');
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
env.config();
connectToMongoDb();
// const PORT = process.env.PORT on peut faire || 87544 ;
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is runnig on PORT ${PORT}`));
app.use(express.json());
app.use(logger);

const booksPath = require('./routes/books');
const authorPath = require('./routes/authors');
const authPath = require('./routes/auth');
const usersPath = require('./routes/users');
//Routes
app.use('/api/books', booksPath);
app.use('/api/authors', authorPath);
app.use('/api/auth', authPath);
app.use('/api/users', usersPath);
//Route Password Reset
app.use('/password', require('./routes/password'));
// Error Handler Middlaware
app.use(notFound);
app.use(errorHandler);
