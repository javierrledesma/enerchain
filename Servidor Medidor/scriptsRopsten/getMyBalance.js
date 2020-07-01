var Tx = require('ethereumjs-tx').Transaction;
var Web3 = require('web3');
var rpcURL = 'https://ropsten.infura.io/v3/2cb97754892a4ceda6e6e837dd9e4ba1';
var web3 = new Web3(rpcURL);
var PrivateKey1="1C683702C99162CE3489E5C0752192D13544AD69DDB02AB53750F0F02619AB4F"
var contractAddresses = require('../contractAddresses/addresses.json');


var electricMeterArtifact = require('../build/contracts/ElectricMeter.json');
var electricMeterAbi = electricMeterArtifact.abi;
var electricMeterContractAddress = JSON.stringify(contractAddresses.ElectricMeterAddress).toLowerCase().split("\"")[1];
var electricMeterContract = new web3.eth.Contract(electricMeterAbi, electricMeterContractAddress)


const account1 = '0x4430DD8f5636899409936fE45383d1A1581cD52c' // Your account usuario

const privateKey1 = Buffer.from(PrivateKey1, 'hex')



electricMeterContract.methods.getBalance().call({from:account1},(err, balance) => {
    // console.log({ err, balance})
    console.log('mi ether inyectado en el contrato es: '+balance.toString()+ "wei")
  })

