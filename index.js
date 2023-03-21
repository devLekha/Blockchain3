const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const TransactionList= require('./routes/list')
const {job}= require('./controllers/list')
require('dotenv').config()
const app = express();
app.use(bodyParser.json());
app.use('/list', TransactionList);


job
// const client = new MongoClient();
async function main() {
await mongoose.connect(process.env.MONGODBURL)
    
    console.log("Database created!");
    // db.close();
  };
main()
app.listen(8000, console.log("listening to port 8000"))
