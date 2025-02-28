import React from "react";
import { Provider } from "react-redux";
import { createRoot } from 'react-dom/client'
import store from "../Store/store";
import Calculator from "./calculator";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Calculator />
  </Provider>,
  document.getElementById("root")
);
