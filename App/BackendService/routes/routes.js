const Web3 = require('web3')
const fs = require('fs')
const contracttruff = require('truffle-contract')

const voting_artifacts = require('../../../VotingChain/build/contracts/Voting.json')
//const voting_artifacts = require('../../../MetaCoin/build/contracts/MetaCoin.json')
//const voting_artifacts = require('../../../CoursetroChain/build/contracts/Coursetro.json')

let json = voting_artifacts

let address = '0x895aa0f0391fb2e4687e1f6158dd159cd68e47a3'

var contract = contracttruff(json);
// Step 3: Provision the contract with a web3 provider
contract.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));
if (typeof contract.currentProvider.sendAsync !== "function") {
  contract.currentProvider.sendAsync = function() {
    return contract.currentProvider.send.apply(
      contract.currentProvider, arguments
    );
  };
}

const accountAA = '0xef5e72d932457d87e1491a2e4304535cf57b9218';
const accountBB = '0x74885a2d99287f72fd2e34d7b311dd7b7a1e7da1';
var metaContract;
var appRouter = function (app) {
  app.get("/", function(req, res) {
    res.status(200).send("Welcome to our restful API");
    contract.deployed().then(function(deployed) {
      metaContract = deployed
      console.log('deployed successful!')
      return metaContract.getBalance.call(accountAA)
      //return metaContract.sendCoin('0x9f751c9560a045649268fa4e0f9432c70f4b6c47', 10, {from: '0x8036abd3cb65087a4a1d596b240a03b55edc6462'});
    })
    .then(function(result) {
      console.log('Balance Account AAAAA:: ', result.valueOf())
      return metaContract.getBalance.call(accountBB)
    })
    .then(function(result) {
      console.log('Balance Account BBBBB:: ', result.valueOf())
      return metaContract.sendCoin(accountBB, 2000, {from: accountAA});
    })
    .then(function(result){
      console.log("Transaction successful!")
      console.log("Result :::::: ", result)
      return metaContract.getBalance.call(accountAA)
      //return metaContract.getBalance('0x9f751c9560a045649268fa4e0f9432c70f4b6c47')
    })
    .then(function(result) {
      console.log('Balance Account :: ', result.valueOf())
    })
    .catch(function(e) {
      console.log('error',e)
    })
  })

  app.get("/contract", function (req, res) {

    let metaContract2;
    contract.deployed().then(function(deployed) {
      metaContract2 = deployed
      return metaContract2.setInstructor('test', 2, {from: '0x8605aacc3ff3b5dad4aa37f6ce35ee01b8499107'})
      //return metaContract2.totalVotesFor.call(candidateName)
    }).then(function(result) {
      console.log('result', result)
      return metaContract2.getInstructor.call({from: '0x8605aacc3ff3b5dad4aa37f6ce35ee01b8499107'})
    }).then(function(result) {
      console.log('getInstructor result', result)
    })

    var data = ({
      firstName: 'test'
    });
    res.status(200).send(data);
  })

  app.post("/voting/:candidateName", function (req, res) {
    const candidateName = req.params.candidateName

    contract.deployed().then(function(deployed) {
      metaContract2 = deployed
      return metaContract2.voteForCandidate(candidateName, {from: '0x4bbf678034af27438bcb3bdf10a2a674b5d6b64e'})
    }).then(function(result) {
      console.log('vote')
    })
    var data = ({
      result: 'success'
    });
    res.status(200).send(data);
  })

  app.get("/voting/:candidateName", function (req, res) {
    const candidateName = req.params.candidateName
    let metaContract2;
    /*contract.deployed().then(function(deployed) {
    metaContract2 = deployed
    return metaContract2.voteForCandidate(candidateName, {from: '0x4bbf678034af27438bcb3bdf10a2a674b5d6b64e'})
    //return metaContract2.totalVotesFor.call(candidateName)
  }).then(function(result) {
  return metaContract2.totalVotesFor.call(candidateName, {from: '0x8605aacc3ff3b5dad4aa37f6ce35ee01b8499107'})
}).then(function(result) {
console.log('totalVotesFor result', result.toNumber())
})*/
contract.deployed().then(function(deployed) {
  metaContract2 = deployed
  return metaContract2.totalVotesFor.call(candidateName, {from: '0x8605aacc3ff3b5dad4aa37f6ce35ee01b8499107'})
}).then(function(result) {
  let totalVote = result.toNumber()
  console.log('totalVotesFor result', totalVote)
  var data = ({
    firstName: candidateName,
    voteCount: totalVote
  });
  res.status(200).send(data);
})
});
}

module.exports = appRouter;
