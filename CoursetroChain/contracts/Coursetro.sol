pragma solidity ^0.4.17;

contract Coursetro {
  string fName;
  uint age;

  function setInstructor(string _fName, uint _age) public {
    fName = _fName;
    age = _age;
  }

  function getInstructor() view public returns (string, uint){
    return (fName, age);
  }
}
