pragma solidity ^0.4.21;

contract Voting {

  mapping (bytes32 => uint8) public votesReceived;

  bytes32[] public candidateList;
  event VoteFor(bytes32 candidate);

  function Voting(bytes32[] candidateNames) public {
    candidateList = candidateNames;
  }

  function totalVotesFor(bytes32 candidate) public returns (uint8) {
    require(validCandidate(candidate));
    emit VoteFor(candidate);
    return votesReceived[candidate];
  }

  function voteForCandidate(bytes32 candidate) public {
    require(validCandidate(candidate));
    emit VoteFor(candidate);
    votesReceived[candidate] += 1;
  }

  function validCandidate(bytes32 candidate) view public returns (bool) {
    for(uint i = 0; i < candidateList.length; i++) {
      if (candidateList[i] == candidate) {
        return true;
      }
    }
    return false;
  }
}
