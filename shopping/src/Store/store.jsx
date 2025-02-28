import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../Slice/slice.jsx";

const store = configureStore({
  reducer: {
    productsList: productReducer,
  },
});

export default store;
