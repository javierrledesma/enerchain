const ipfsAPI = require('ipfs-api');
const fs = require('fs');

var Tx = require('ethereumjs-tx').Transaction;
var Web3 = require('web3');
var rpcURL = "http://127.0.0.1:8545";
var web3 = new Web3(rpcURL);
var PrivateKey1="a9e4675c67dc3dcaa59287775a3c4eae3835316aa77cf9e5739eaac1cc1e657f"
var contractAddresses = require('../../contractAddresses/addresses.json');


var electricMeterArtifact = require('../../build/contracts/ElectricMeter.json');
var electricMeterAbi = electricMeterArtifact.abi;
var electricMeterContractAddress = JSON.stringify(contractAddresses.ElectricMeterAddress).toLowerCase().split("\"")[1];
var electricMeterContract = new web3.eth.Contract(electricMeterAbi, electricMeterContractAddress)


const account1 = '0xab02d613Af710d249d084c9b649E83DdfbEaF55a' // Your account address 1

const privateKey1 = Buffer.from(PrivateKey1, 'hex')


const medidasJson = require('./lecturaPorHoras')
const medidas = medidasJson.lecturas
var contadorMedidas=0
// var arrayHtlmIpfs = [
//   ['Dia', 'medida']   
// ]

medidas.forEach(element => {
  console.log(element.lectura)
  contadorMedidas= contadorMedidas + element.lectura
  //arrayHtlmIpfs.push([verFecha(element.date),element.lectura])
});
console.log(contadorMedidas)
//Connceting to the ipfs network via infura gateway
const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'})
//Reading file from computer
let testFile = fs.readFileSync("./lecturaPorHoras.json");
//Creating buffer for ipfs function to add file to the system
let testBuffer = new Buffer(testFile);
//Addfile router for adding file a local file to the IPFS network without any local node
// https://ipfs.io/ipfs/

ipfs.files.add(testBuffer, function (err, file) {
    if (err) {
      console.log(err);
    }

    web3.eth.getTransactionCount(account1, (err, txCount) => {
      var txObject = {
        nonce:    web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(100000), // Raise the gas limit to a much higher amount
        gasPrice: web3.utils.toHex(web3.utils.toWei('100', 'gwei')),
        // from: account1,
        to: electricMeterContractAddress,
        data: electricMeterContract.methods.incrementCount(contadorMedidas,file[0].hash,'0xF5aBa703B29CA17766910680e784b0B8b75dC5b3').encodeABI()
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

    console.log(file[0].hash)



  })