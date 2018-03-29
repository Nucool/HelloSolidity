pragma solidity ^0.4.17;

contract HelloSolidity {
  address creator;

  function HelloSolidity() {
    creator = msg.sender;
  }

  function sayHello(string name) returns(string) {
    return strConcat("Hi : ", name);
  }

  function sayHello() returns(string) {
    return "Hello world";
  }

  function strConcat(string _a, string _b) internal returns (string){
    bytes memory _ba = bytes(_a);
    bytes memory _bb = bytes(_b);
    string memory ab = new string(_ba.length + _bb.length);
    bytes memory result = bytes(ab);
    uint k = 0;
    for (uint i = 0; i < _ba.length; i++) result[k++] = _ba[i];
    for (i = 0; i < _bb.length; i++) result[k++] = _bb[i];
    return string(result);
  }
}
