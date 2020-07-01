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



electricMeterContract.methods.getBalance().call({from:account1},(err, balance) => {
    // console.log({ err, balance})
    console.log('El numerito eeeessss: '+balance.toString())
  })

