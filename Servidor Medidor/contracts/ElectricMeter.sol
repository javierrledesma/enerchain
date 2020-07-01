pragma solidity ^0.5.2;

import './TasaKwEther.sol';

contract ElectricMeter {

  TasaKwEther tasa;
  
  address  payable public seller=0x0DbD283cFC279ac5E2f630205b29883c0C2a9aBe;
  uint public valor;
  address public buyer;
  address payable public beneficiary;
  //variable para llevar el contador de medidas para cada pagador
  mapping (address => uint256) meterCount;  
  //variable para llevar el balance de cada pagador
  mapping (address => uint256) balance;

  mapping (address => bool) isBuyer;   

  event IncrementCount(
        uint _date,
        uint  increment,
        string   ipfsHash,
        address idUser
    );

  event Payments(
        uint _date,
        uint  medida,
        address idUser,
        uint tasaEther,
        uint tasaKw,
        uint precision
    );

    constructor(address tasaAddress) public {
        beneficiary = msg.sender;
        isBuyer[msg.sender] = true;
        tasa= TasaKwEther(tasaAddress);
       
    }
  

  function addNewUser(uint256   value, address user) public {
  
      meterCount[user] = value;
   
  }


    function incrementCount(uint256   value, string  memory ipfsHash, address user ) public returns (uint256){
      
      if ((meterCount[user]+value) >= 3000){
        meterCount[user] = meterCount[user] + value;
        pay(user);
        emit IncrementCount(now,value,ipfsHash,user);
      }
      else{
        meterCount[user] = meterCount[user] + value;
        emit IncrementCount(now,value,ipfsHash,user);
      }

      return balance[user] ;
   
  }

  function getCount(address user) public view returns (uint256  ) {
    return meterCount[user];
  }


   function pay(address user) private{

        // Enviamos todo el dinero que tenemos, porque
        // parte de las devoluciones pueden haber fallado.
       
        seller.transfer(meterCount[user] * tasa.getTasaEther() * tasa.getTasaKw() * tasa.getPrecision());
        
        balance[user]=balance[user]-(meterCount[user] * tasa.getTasaEther() * tasa.getTasaKw() * tasa.getPrecision() );
        emit Payments(now,meterCount[user],user,tasa.getTasaEther() , tasa.getTasaKw() , tasa.getPrecision());
        meterCount[user]=0;

    }

    //funcion para injectar fondos en el contrato
    function injectFounds() public payable {

        balance[msg.sender]=balance[msg.sender]+msg.value;
        isBuyer[msg.sender] = true;
       
    }

    function rejectFounds() public onlyBuyer{
        
        msg.sender.transfer(balance[msg.sender]);
        balance[msg.sender]=0;
    }

    //Devuelve el balance de el usuario que llama a esta funcion que ha injectado en el contrato
    function getBalance() public returns (uint256) {

      return  balance[msg.sender];
       
    }

   modifier onlyBuyer() {
         if (!isBuyer[msg.sender])
	        revert("El usuario no está dado de alta");
          _;
    }

        function()  external  payable  {
    // this function enables the contract to receive funds
    }

}