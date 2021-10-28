// constants
import Web3EthContract from "web3-eth-contract";
import Web3 from "web3";
import ARKS369 from "../../contracts/ARKS369.json";
import LIDX369 from "../../contracts/LIDX369.json";
import LMEMO369 from "../../contracts/LMEMO369.json";
// log
import { fetchData } from "../data/dataActions";
import appconfig from "../../appconfig";
const abis = [LIDX369.abi, ARKS369.abi, LMEMO369.abi]
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
