const axios = require('axios')
const Web3 = require('web3');
var CronJob = require('cron').CronJob;
const transactions = require('../models/transactions')
const price = require('../models/price')
const web3 = new Web3(Web3.givenProvider || "https://mainnet.infura.io/v3/1000bb39892247e68f442cbb06005948");
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

exports.balanceCheck =async function(req, res, next){
   const account = req.query.account;
   const balance = await web3.eth.getBalance(account);
   const etherValue = Web3.utils.fromWei(balance, 'ether');
   const price = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr')
   const resp = {
      ethers:etherValue,
      price:price.data
   }
   console.log(etherValue);
   res.json(resp)
}