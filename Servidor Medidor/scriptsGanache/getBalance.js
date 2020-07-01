var Web3 = require('web3');
var rpcURL = "http://127.0.0.1:8545";
var web3 = new Web3(rpcURL);
var contractAddresses = require('../contractAddresses/addresses.json');
var electricMeterContractAddress = JSON.stringify(contractAddresses.ElectricMeterAddress).toLowerCase().split("\"")[1];

console.log("balance seller")
web3.eth.getBalance("0x78033e6EB6F7b7288b3ADB8E058B78c339a27185")
.then(console.log);

console.log("balance pagador")
web3.eth.getBalance("0xF5aBa703B29CA17766910680e784b0B8b75dC5b3")
.then(console.log);


console.log("balance contrato")
web3.eth.getBalance(electricMeterContractAddress)
.then(console.log);