var Tx = require('ethereumjs-tx').Transaction;
var Web3 = require('web3');
var rpcURL = "http://127.0.0.1:8545";
var web3 = new Web3(rpcURL);
var keys =require( '../variables')
var PrivateKey1="1fd97f0f8bf8baa8bda6899f99950617ad05a0503bc34ead7715a4c61053e6fa"
var contractAddresses = require('../contractAddresses/addresses.json');


var electricMeterArtifact = require('../build/contracts/ElectricMeter.json');
var electricMeterAbi = electricMeterArtifact.abi;
var electricMeterContractAddress = JSON.stringify(contractAddresses.ElectricMeterAddress).toLowerCase().split("\"")[1];
var electricMeterContract = new web3.eth.Contract(electricMeterAbi, electricMeterContractAddress)


const account1 = '0xF5aBa703B29CA17766910680e784b0B8b75dC5b3' // Your account address 1

const privateKey1 = Buffer.from(PrivateKey1, 'hex')

console.log('Pago del medidor')

//AddUser 1
web3.eth.getTransactionCount(account1, (err, txCount) => {
  var txObject = {
    nonce:    web3.utils.toHex(txCount),
    gasLimit: web3.utils.toHex(100000), // Raise the gas limit to a much higher amount
    gasPrice: web3.utils.toHex(web3.utils.toWei('100', 'gwei')),
    // from: account1,
    to: electricMeterContractAddress,
    data: electricMeterContract.methods.rejectFounds().encodeABI()
  }

  var tx = new Tx(txObject)
  tx.sign(privateKey1)

  var serializedTx = tx.serialize()
  var raw = '0x' + serializedTx.toString('hex')

  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log('err:', err, 'txHash:', txHash)
    // Use this txHash to find the contract on Etherscan!
  })
})

