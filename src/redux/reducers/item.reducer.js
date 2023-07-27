const itemReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_ITEMS":
      return action.payload;
    default:
      return state;
  }
};

// items will be on the redux state at:
// state.items
export default itemReducer;
