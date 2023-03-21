const mongoose = require('mongoose');
const txSchema = new mongoose.Schema({
    blockNumber: String,
    transactionHash:String,
    timeStamp: String,
        hash: String,
        nonce: String,
        blockHash: String,
        transactionIndex: String,
        from: String,
        to: String,
        value: String,
        gas: String,
        gasPrice: String,
        isError: String,
        txreceipt_status: String,
        input: String,
        contractAddress: String,
        cumulativeGasUsed: String,
        gasUsed: String,
        confirmations: String,
        methodId: String,
        functionName: String
  });
  const Transaction = mongoose.model('Transaction', txSchema);
  module.exports = Transaction