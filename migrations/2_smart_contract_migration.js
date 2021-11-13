const LIDX369 = artifacts.require("LIDX369");
const ARKS369 = artifacts.require("ARKS369");
const LMEMO369 = artifacts.require("LMEMO369");

module.exports = function (deployer) {
  deployer.deploy(LIDX369, "Lost Index", "LIDX369", "ipfs://QmReWVt3WHCV6xvWN41Er49dTqZFxSoiFW8gaVRQv2rp67/");
  deployer.deploy(ARKS369, "The Arkonauts", "ARKS369", "ipfs://Qme6M3RWu1QHbnRDo7jLdXhknPAzLzYHM9LCr3R5Vb3ioT/");
  deployer.deploy(LMEMO369, "Lost Memories", "LMEMO369", "ipfs://QmRFw68ir6UcQn8dJ6zjDgxqXSW2VvjnYwFYxiA3Pzc8Sr/");
};
