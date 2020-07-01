var electricMeter = artifacts.require("./ElectricMeter.sol");
var tasaKwEtherAddress = artifacts.require("./TasaKwEther.sol");
var fs = require("fs");

module.exports = function(deployer) {
  deployer.then(async () =>{
    await deployer.deploy(tasaKwEtherAddress, 510, 3500, 10000000 )
  })
  .then(function() {
    return deployer.deploy(electricMeter, tasaKwEtherAddress.address)})
  .then(function(){
    var Addresses = {
      ElectricMeterAddress: electricMeter.address,
      TasaKwEtherAddress: tasaKwEtherAddress.address
    }
    console.log(Addresses)
    fs.writeFile("./contractAddresses/addresses.json", JSON.stringify(Addresses), (err) => {
      if (err) {
          console.error(err);
          return;
      };
      console.log("File has been created");
  });
  })
}; 