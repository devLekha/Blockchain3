const express = require('express');
const router = express.Router();
const {listOfTransactions, balanceCheck} = require('../controllers/list.js')

router.post('/transactions', listOfTransactions)
router.post('/balance', balanceCheck)

module.exports=router

