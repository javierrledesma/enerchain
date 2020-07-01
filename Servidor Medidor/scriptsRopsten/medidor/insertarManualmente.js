const ipfsAPI = require('ipfs-api');
const fs = require('fs');
var generadorMedidas = require( './generadorJSONAleatorio.js')
var Tx = require('ethereumjs-tx').Transaction;
var Web3 = require('web3');
var rpcURL = 'https://ropsten.infura.io/v3/2cb97754892a4ceda6e6e837dd9e4ba1';
var web3 = new Web3(rpcURL);
var contractAddresses = require('../../contractAddresses/addresses.json');
var electricMeterArtifact = require('../../build/contracts/ElectricMeter.json');
var electricMeterAbi = electricMeterArtifact.abi;
var electricMeterContractAddress = JSON.stringify(contractAddresses.ElectricMeterAddress).toLowerCase().split("\"")[1];
var electricMeterContract = new web3.eth.Contract(electricMeterAbi, electricMeterContractAddress)
var PrivateKey1="081FB7D7F98EE3D4C838A68A60D3E6E0A6A15C0E8D7D7D0114042545758542CE"
const account1 = '0xfee1639d096A76b4AD506e06F17cB3d159f9CD36' // Your account address 1
const privateKey1 = Buffer.from(PrivateKey1, 'hex')



generadorMedidas.obtenerJSON().then(json=>{

console.log(json)
 
const medidasJson = require('./lecturaPorHoras')
const medidas = medidasJson.lecturas
var contadorMedidas=0

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
        gasLimit: web3.utils.toHex(200000), // Raise the gas limit to a much higher amount
        gasPrice: web3.utils.toHex(web3.utils.toWei('100', 'gwei')),
        // from: account1,
        to: electricMeterContractAddress,
        data: electricMeterContract.methods.incrementCount(contadorMedidas,file[0].hash,'0x4430DD8f5636899409936fE45383d1A1581cD52c').encodeABI()
      }
    
      var tx = new Tx(txObject,{chain:'ropsten',hardfork:'petersburg'},)
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
})
