// log
import store from "../store";

const fetchDataRequest = (payload) => {
  return {
    type: "CHECK_DATA_REQUEST",
    payload: payload
  };
};

const fetchDataSuccess = (payload) => {
  return {
    type: "CHECK_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchDataFailed = (payload) => {
  return {
    type: "CHECK_DATA_FAILED",
    payload: payload,
  };
};

export const fetchData = (account, idx) => {
  return async (dispatch) => {
    dispatch(fetchDataRequest({idx:idx}));
    
    try {
      let name = await store
        .getState()
        .blockchain.smartContract[idx].methods.name()
        .call();
      let totalSupply = await store
        .getState()
        .blockchain.smartContract[idx].methods.totalSupply()
        .call();
      let cost = await store
        .getState()
        .blockchain.smartContract[idx].methods.cost()
        .call();
      let nbOwned = await store
        .getState()
        .blockchain.smartContract[idx].methods.balanceOf(account)
        .call();

      dispatch(
        fetchDataSuccess({
          name,
          totalSupply,
          cost,
          nbOwned,
          idx
        })
      );
      console.log(await store.getState().blockchain)
      console.log(await store.getState().data)
    } catch (err) {
      console.log(err);
      dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
};
