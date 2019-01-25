var DateTime = artifacts.require("./DateTime.sol");
var ProofOfExistence = artifacts.require("./ProofOfExistence.sol");

module.exports = function(deployer) {
  deployer.deploy(DateTime);
  deployer.link(DateTime, ProofOfExistence);
  deployer.deploy(ProofOfExistence);
};
