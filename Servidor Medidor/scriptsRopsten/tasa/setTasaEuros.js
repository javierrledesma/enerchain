
var Tx = require('ethereumjs-tx').Transaction;
var Web3 = require('web3');
var rpcURL = 'https://ropsten.infura.io/v3/2cb97754892a4ceda6e6e837dd9e4ba1';
var web3 = new Web3(rpcURL);

var contractAddresses = require('../../contractAddresses/addresses.json');
var tasaArtifact = require('../../build/contracts/TasaKwEther.json');
var tasaAbi = tasaArtifact.abi;
var tasaContractAddress = JSON.stringify(contractAddresses.TasaKwEtherAddress).toLowerCase().split("\"")[1];
var tasaContract = new web3.eth.Contract(tasaAbi, tasaContractAddress)

const account1 = '0xfee1639d096A76b4AD506e06F17cB3d159f9CD36' // Your account address 1
var PrivateKey1="081FB7D7F98EE3D4C838A68A60D3E6E0A6A15C0E8D7D7D0114042545758542CE"
const privateKey1 = Buffer.from(PrivateKey1, 'hex')

console.log("haciendo setTasaKw al contrato TasaKwEther....")
    web3.eth.getTransactionCount(account1, (err, txCount) => {
      var txObject = {
        nonce:    web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(200000), // Raise the gas limit to a much higher amount
        gasPrice: web3.utils.toHex(web3.utils.toWei('100', 'gwei')),
        // from: account1,
        to: tasaContractAddress,
        data: tasaContract.methods.setTasaKw(3040).encodeABI()
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
    
  
