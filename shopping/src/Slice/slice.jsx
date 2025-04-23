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

      const data = await response.json(); //api response is converted into json
      if (!response.ok) {
        throw new Error("Invalid Username or Password");
      }

      localStorage.setItem(
        "UserDatas",
        JSON.stringify({ username: email, token: password })
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

//Fetch products(Admin Page)
export const fetchAdminProds = createAsyncThunk(
  "productsList/fetchAdminProds",
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

//Add Products by (Admin)
export const addProduct = createAsyncThunk(
  "productsList/addProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await fetch("https://api.escuelajs.co/api/v1/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Error adding product");

      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

//edit product by(Admin)
export const updateProduct = createAsyncThunk(
  "productsList/updateProduct",
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/products/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData),
        }
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to update product");
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
//Delete Products by (Admin)

export const deleteProduct = createAsyncThunk(
  "productsList/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/products/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to delete product");
      }

      return id; // returning the deleted product's ID to remove it from state
    } catch (err) {
      return rejectWithValue(err.message);
    }
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
    adminProducts: [],
    status: "idle",
    error: null,
    loading: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.error = null;
    },
  },
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
      })
      .addCase(fetchAdminProds.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAdminProds.fulfilled, (state, action) => {
        state.status = "success";
        state.adminProducts = action.payload;
      })
      .addCase(fetchAdminProds.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.adminProducts.unshift(action.payload); // Adds to top
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.adminProducts.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index > 0) {
          state.adminProducts[index] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.adminProducts = state.adminProducts.filter(
          (product) => product.id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});
export const { logout } = productSlice.actions;
export default productSlice.reducer;
