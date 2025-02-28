import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";
import CartPage from "./Cart.jsx";
import NotFound from "./NotFound.jsx";
import Store from "../Store/store.jsx";
import ViewProduct from "./viewProduct.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/cartpage",
    element: <CartPage />,
  },
  {
    path: "*",
    element: <Navigate to="/notFound" replace />,
  },
  {
    path: "/notFound",
    element: <NotFound />,
  },
  {
    path: "/product/:id",
    element: <ViewProduct />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={Store}>
      <ToastContainer />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
