const mongoose = require('mongoose');
const dbURL = 'mongodb://localhost:27017/test';
mongoose.connect(dbURL);

module.exports = mongoose.connection;
