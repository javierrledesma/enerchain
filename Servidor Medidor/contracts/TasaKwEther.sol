pragma solidity ^0.5.2;

contract TasaKwEther {
    uint tasaEther;
    uint tasaKw;
    uint precision;

    constructor(uint tE, uint tKw, uint p) public {
        tasaEther = tE;
        tasaKw=tKw;
        precision=p;
    }

    function setTasaEther(uint x) public{
        tasaEther = x;
    }

    function getTasaEther() public returns (uint) {
        return tasaEther;
    }
    function setTasaKw(uint x) public{
        tasaKw = x;
    }

    function getTasaKw() public returns (uint) {
        return tasaKw;
    }
    function setPrecision(uint x) public{
        precision = x;
    }

    function getPrecision() public returns (uint) {
        return precision;
    }
}