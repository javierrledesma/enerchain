var Tx = require('ethereumjs-tx').Transaction;
var Web3 = require('web3');
var rpcURL = "http://127.0.0.1:8545";
var web3 = new Web3(rpcURL);
var PrivateKey1="1C683702C99162CE3489E5C0752192D13544AD69DDB02AB53750F0F02619AB4F"
var contractAddresses = require('../contractAddresses/addresses.json');


var electricMeterArtifact = require('../build/contracts/ElectricMeter.json');
var electricMeterAbi = electricMeterArtifact.abi;
var electricMeterContractAddress = JSON.stringify(contractAddresses.ElectricMeterAddress).toLowerCase().split("\"")[1];
var electricMeterContract = new web3.eth.Contract(electricMeterAbi, electricMeterContractAddress)


const account1 = '0x4430DD8f5636899409936fE45383d1A1581cD52c' // Your account usuario

const privateKey1 = Buffer.from(PrivateKey1, 'hex')

console.log('Extraer el ether del contrato')

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

