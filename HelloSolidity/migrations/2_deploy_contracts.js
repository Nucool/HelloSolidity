var SimpleStorage = artifacts.require("SimpleStorage");
var HelloSolidity = artifacts.require("HelloSolidity");

module.exports = function(deployer) {
  deployer.deploy(HelloSolidity);
};
