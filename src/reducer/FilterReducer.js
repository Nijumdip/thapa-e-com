const FilterReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_FILTER_PRODUCTS":
      return {
        ...state,
        filter_products: [...action.payload],
        all_products: [...action.payload],
      };
    case ("SET_GRID_VIEW"):
      return {
        ...state,
        
      }
    default:
      return state
  }
}




export default FilterReducer