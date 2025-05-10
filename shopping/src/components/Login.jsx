import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { FaUnlockKeyhole } from "react-icons/fa6";
import { login } from "../Slice/slice";
import "./style.css";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, token } = useSelector(
    (state) => state.productsList
  );
  const location = useLocation();
  const path = location.pathname.split("/").pop();
  /* useEffect(() => {
    if (token) {
      if (path === "admin") {
        navigate("/adminPage");
      } else {
        navigate("/home");
      }
    }
  }, [token, navigate, path]);
 */

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("role", path);

      const pendingCartItem = JSON.parse(
        localStorage.getItem("pendingCartItem")
      );
      const storedCart = JSON.parse(localStorage.getItem("cartSet")) || [];

      if (pendingCartItem) {
        const existingItem = storedCart.find(
          (item) => item.id === pendingCartItem.id
        );

        let updatedCart = existingItem
          ? storedCart.map((item) =>
              item.id === pendingCartItem.id
                ? { ...item, cartTotalQuantity: item.cartTotalQuantity + 1 }
                : item
            )
          : [...storedCart, { ...pendingCartItem, cartTotalQuantity: 1 }];

        localStorage.setItem("cartSet", JSON.stringify(updatedCart));
        localStorage.removeItem("pendingCartItem");
        navigate("/cartpage");
      } else {
        if (path === "admin") {
          navigate("/adminPage");
        } else {
          navigate("/home");
        }
      }
    }
  }, [token, navigate, path]);

  const handleLogin = (e) => {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      toast.error("Plz enter both username & password", {
        position: "top-right",
        autoClose: 1500,
      });
      return;
    }

    dispatch(login({ email, password }));
  };

  return (
    <div className="mainBody">
      <h1 className="user px-3 py-3 mb-0">
        {path === "admin" ? "ADMIN LOGIN" : "USER LOGIN"}
      </h1>
      <h1 className="user px-3 py-3 mb-0">
        {path === "admin" ? "Welcome Admin" : "Welcome User"}
      </h1>
      <div className="mainBodySd d-flex justify-content-center px-5">
        <form className="formSet">
          <div className="d-flex gap-3 px-3 py-3 align-items-center">
            <span>
              <FaUserAlt />
            </span>
            <input
              type="text"
              placeholder="Enter Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="inputs"
            />
          </div>
          <div className="d-flex gap-3 px-3 py-3 align-items-center">
            <span>
              <FaUnlockKeyhole />
            </span>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="inputs"
            />
          </div>
          <span className="d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-warning"
              onClick={handleLogin}
            >
              Login
            </button>
          </span>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
