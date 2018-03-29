var Voting = artifacts.require("./Voting.sol");

module.exports = function(deployer) {
  deployer.deploy(Voting, ['Nopadon', 'Nop', 'Test'], {gas: 6700000});
};
