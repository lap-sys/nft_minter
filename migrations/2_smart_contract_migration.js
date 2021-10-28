const LIDX = artifacts.require("LIDX369");
const ARKS = artifacts.require("ARKS369");
const LMEMO = artifacts.require("LMEMO369");

module.exports = function (deployer) {
  deployer.deploy(LIDX, "Lost Index", "LIDX369", "ipfs://QmReWVt3WHCV6xvWN41Er49dTqZFxSoiFW8gaVRQv2rp67/");
  deployer.deploy(ARKS, "The Arkonauts", "ARKS369", "ipfs://Qme6M3RWu1QHbnRDo7jLdXhknPAzLzYHM9LCr3R5Vb3ioT/");
  deployer.deploy(LMEMO, "Lost Memories", "LMEMO369", "ipfs://QmRFw68ir6UcQn8dJ6zjDgxqXSW2VvjnYwFYxiA3Pzc8Sr/");
};
