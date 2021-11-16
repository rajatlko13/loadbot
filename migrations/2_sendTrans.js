const SendTrans = artifacts.require("SendTrans");

module.exports = function (deployer, network) {
  deployer.deploy(SendTrans);
};