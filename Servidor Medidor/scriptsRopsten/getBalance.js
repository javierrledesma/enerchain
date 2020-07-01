var Web3 = require('web3');
//var rpcURL = "http://127.0.0.1:8545";
var rpcURL = 'https://ropsten.infura.io/v3/2cb97754892a4ceda6e6e837dd9e4ba1';
var web3 = new Web3(rpcURL);
var contractAddresses = require('../contractAddresses/addresses.json');
var electricMeterContractAddress = JSON.stringify(contractAddresses.ElectricMeterAddress).toLowerCase().split("\"")[1];

console.log("balance seller")
web3.eth.getBalance("0x0DbD283cFC279ac5E2f630205b29883c0C2a9aBe")
.then(console.log);

console.log("balance medidor")
web3.eth.getBalance("0xfee1639d096A76b4AD506e06F17cB3d159f9CD36")
.then(console.log);


// console.log("balance contrato")
// web3.eth.getBalance(electricMeterContractAddress)
// .then(console.log);