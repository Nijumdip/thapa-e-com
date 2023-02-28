const FilterReducer = (state, action) => {
  switch (action.type) {

    case "LOAD_FILTER_PRODUCTS":

      let priceArr = action.payload.map((curElem) => {
        return curElem.price;
      })
      // console.log(priceArr);

      // 1st way
      // console.log(Math.max.apply(Math, priceArray));

      //  2nd way
      /*  let maxPrice = priceArr.reduce((initialVal, curVal) => Math.max(initialVal, curVal),0); */
      
      // 3rd way
      let maxPrice = Math.max(...priceArr);

      console.log(maxPrice);
      
      return {
        ...state,
        filter_products: [...action.payload],
        all_products: [...action.payload],
        filters: {
          ...state.filters,
          maxPrice,
          price:maxPrice
        }
      };
    
    case ("SET_GRID_VIEW"):
      return {
        ...state,
        grid_view: true,
      };
    
    case "SET_LIST_VIEW":
      return {
        ...state,
        grid_view: false,
      };
    
    case "GET_SORT_VALUE":
      // let userSortValue = document.getElementById("sort");
      // let sort_value = userSortValue.options[userSortValue.selectedIndex].value;
      // console.log(sort_value);
      return {
        ...state,
        // sorting_value: sort_value,
        sorting_value: action.payload,
      };
    
    case "SORTING_PRODUCTS":
      let newSortData;
      // let tempSortProduct = [...action.payload];

      const { filter_products, sorting_value } = state;
      let tempSortProduct = [...filter_products];

      const sortingProducts = ((a, b) => {

        if (sorting_value === "lowest") {
          return a.price - b.price;
        };

        if (sorting_value === "highest") {
          return b.price - a.price;
        };

        if (sorting_value === "a-z") {
          return a.name.localeCompare(b.name);
        };

        if (sorting_value === "z-a") {
          return b.name.localeCompare(a.name);
        };
      });
      newSortData = tempSortProduct.sort(sortingProducts);
     
      return {
        ...state,
        filter_products: newSortData
      };
    
    case "UPDATE_FILTER_VALUE":
      const { name, value } = action.payload;
      return {
        ...state,
        filters: {
          ...state.filters,
          [name] :value,
        }
      };
    
    case "FILTER_PRODUCTS":
      let { all_products } = state;
      let tempFilterProduct = [...all_products];

      const { text ,category,company, color } = state.filters;

      if (text) {
        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          return curElem.name.toLowerCase().includes(text);
        });
      };

      if (category !== "all") {
        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          return curElem.category === category;
        });
      };

      if (company !== "all") {
        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          return curElem.company.toLowerCase() === company.toLowerCase();
        });
      };

      if (color !=="all") {
        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          return curElem.colors.includes(color)
        })
      };

      return {
        ...state,
        filter_products: tempFilterProduct,
      }
    
    default:
      return state
  }
}


export default FilterReducer