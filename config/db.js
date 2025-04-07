const mongoose = require('mongoose');
function connectToMongoDb() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDb '))
    .catch(() => console.log('Connect to mongo is failed'));
}
module.exports = connectToMongoDb;
