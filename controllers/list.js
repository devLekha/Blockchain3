const axios = require('axios')
var CronJob = require('cron').CronJob;
const transactions = require('../models/transactions')
const price = require('../models/price')
exports.listOfTransactions = async function (req, res, next){
   const acc = req.body.account;
   try {
    if(acc){
    const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${acc}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${process.env.API_KEY}`
    const txs = await axios.get(url)
    transactions.insertMany(txs.data.result).then(function(){
      console.log("Data inserted")  // Success
  }).catch(function(error){
      console.log(error)      // Failure
  });
    console.log(transactions)
     res.json(txs.data.result)
    }
    else
    res.json('address not found')
   } catch (error) {
    res.error(error)
   }
   next();
}

exports.job = new CronJob(
   '*/10 * * * *',
   async function() {
       // console.log('You will see this message every second');
       const url = "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr"
       const newPrice = await axios.get(url)
       const m = new price(newPrice.data.ethereum);
       m.save();
      console.log("inserted")
   },
   null,
   true 
);