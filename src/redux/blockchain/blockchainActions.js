// constants
import Web3EthContract from "web3-eth-contract";
import Web3 from "web3";
import ARKS from "../../contracts/ARKS.json";
import LIDX from "../../contracts/LIDX.json";
import LMEMO from "../../contracts/LMEMO.json";
// log
import { fetchData } from "../data/dataActions";
import appconfig from "../../appconfig";
const abis = [ARKS.abi, LIDX.abi, LMEMO.abi]
const connectRequest = (payload) => {
  return {
    type: "CONNECTION_REQUEST",
    payload: payload
  };
};

const connectSuccess = (payload) => {
  return {
    type: "CONNECTION_SUCCESS",
    payload: payload,
  };
};

const connectFailed = (payload) => {
  return {
    type: "CONNECTION_FAILED",
    payload: payload,
  };
};

const updateAccountRequest = (payload) => {
  return {
    type: "UPDATE_ACCOUNT",
    payload: payload,
  };
};

export const connect = (idx) => {
  return async (dispatch) => {
    dispatch(connectRequest({idx: idx}));
    const { ethereum } = window;
    const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
    if (metamaskIsInstalled) {
      Web3EthContract.setProvider(ethereum);
      let web3 = new Web3(ethereum);
      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log('accounts')
        console.log(accounts)
        const networkId = await ethereum.request({
          method: "net_version",
        });
        console.log('NET ID')
        console.log(networkId == 4)
        // const NetworkData = await SmartContract.networks[networkId];
        if (networkId == appconfig.networkId) {
          const SmartContractObj = new Web3EthContract(
            abis[idx],
            appconfig.tokens[idx].address
          );
          dispatch(
            connectSuccess({
              account: accounts[0],
              idx: idx,
              smartContract: SmartContractObj,
              web3: web3,
            })
          );
          dispatch(fetchData(accounts[0],idx))
          // Add listeners start
          ethereum.on("accountsChanged", (accounts) => {
            dispatch(updateAccount(accounts[0]));
          });
          ethereum.on("chainChanged", () => {
            window.location.reload();
          });
          // Add listeners end
        } else {
          dispatch(connectFailed("Change network to Ethereum."));
        }
      } catch (err) {
        dispatch(connectFailed("Something went wrong."));
      }
    } else {
      dispatch(connectFailed("Install Metamask."));
    }
  };
};

export const updateAccount = (account) => {
  return async (dispatch) => {
    dispatch(updateAccountRequest({ account: account }));
    dispatch(fetchData(account));
  };
};
