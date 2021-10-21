const LIDX = artifacts.require("LIDX");
const ARKS = artifacts.require("ARKS");
const LMEMO = artifacts.require("LMEMO");

module.exports = function (deployer) {
  deployer.deploy(LIDX, "Lost Index", "LIDX", "ipfs://QmReWVt3WHCV6xvWN41Er49dTqZFxSoiFW8gaVRQv2rp67/");
  deployer.deploy(ARKS, "The Arkonauts", "ARKS", "ipfs://Qme6M3RWu1QHbnRDo7jLdXhknPAzLzYHM9LCr3R5Vb3ioT/");
  deployer.deploy(LMEMO, "Lost Memories", "LMEMO", "ipfs://QmRFw68ir6UcQn8dJ6zjDgxqXSW2VvjnYwFYxiA3Pzc8Sr/");
};
