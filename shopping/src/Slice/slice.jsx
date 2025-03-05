import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Login Page
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://api.escuelajs.co/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error("Invalid Username or Password");
      }

      localStorage.setItem(
        "UserDatas",
        JSON.stringify({ username: email, token: data.access_token })
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch products(Home Page)
export const fetchProducts = createAsyncThunk(
  "productsList/fetchProducts",
  async () => {
    const response = await fetch("https://api.escuelajs.co/api/v1/products");
    return response.json();
  }
);

// Fetch single product(View Single Product)
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id) => {
    const response = await fetch(
      `https://api.escuelajs.co/api/v1/products/${id}`
    );
    return response.json();
  }
);

const productSlice = createSlice({
  name: "productsList",
  initialState: {
    user: null,
    token: null,
    isLoading: false,
    products: [],
    product: "",
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.access_token;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
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
