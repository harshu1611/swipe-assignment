import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    addProduct: (state, action) => {
      state.push(action.payload);
    },
    deleteProduct: (state, action) => {
      return state.filter((product) => product.id !== action.payload);
    },
    updateProduct: (state, action) => {
      const index = state.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state[index].name = action.payload.name;
        state[index].price = action.payload.price;
        state[index].id = action.payload.id;
        state[index].description = action.payload.description;
      }
    },
  },
});

export const {
  addProduct,
  deleteProduct,
  updateProduct
} = productSlice.actions;

export const selectProducts = (state) => state.products;

export default productSlice.reducer;
