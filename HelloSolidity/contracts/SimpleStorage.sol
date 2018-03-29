pragma solidity ^0.4.17;

contract SimpleStorage {
  uint myVariable;
  event SetStore(uint x);
  function set(uint x) public {
    myVariable = x;
    SetStore(x);
  }

  function get() constant public returns (uint) {
    return myVariable;
  }
}
