const initialState = {
  loading: false,
  name: {0:"", 1:"", 2:""},
  totalSupply: {0:0, 1:0, 2:0},
  cost: {0:0, 1:0, 2:0},
  error: false,
  errorMsg: "",
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHECK_DATA_REQUEST":
      return {
        ...state,
        loading: true,
        error: false,
        errorMsg: "",
      };
    case "CHECK_DATA_SUCCESS":
      return {
        ...state,
        loading: false,
        name: { ...state.name, [action.payload.idx]: action.payload.name },
        totalSupply: { ...state.totalSupply, [action.payload.idx]: action.payload.totalSupply },
        cost: { ...state.cost, [action.payload.idx]: action.payload.cost },
        error: false,
        errorMsg: "",
      };
    case "CHECK_DATA_FAILED":
      return {
        ...initialState,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    default:
      return state;
  }
};

export default dataReducer;
