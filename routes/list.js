const express = require('express');
const router = express.Router();
const {listOfTransactions, ethereumPrice} = require('../controllers/list.js')

router.post('/transactions', listOfTransactions)
// router.get('/price', ethereumPrice)

module.exports=router

