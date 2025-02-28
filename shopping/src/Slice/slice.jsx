import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk(
  "productsList/fetchProducts", //(action type)
  //callback (payload creators)
  async () => {
    const response = await fetch("https://api.escuelajs.co/api/v1/products");
    const data = await response.json();
    return data;
  }
);
//Display particular product when click!!
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id) => {
    const response = await fetch(
      `https://api.escuelajs.co/api/v1/products/${id}`
    );
    const data = await response.json();
    return data;
  }
);

const productSlice = createSlice({
  name: "productsList",
  initialState: {
    products: [],
    product: null, //store sigle product
    status: "save",
    error: "",
  },
  reducers: {}, //generate action creators
  //options object
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
