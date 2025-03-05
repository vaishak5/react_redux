import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { FaUnlockKeyhole } from "react-icons/fa6";
import { login } from "../Slice/slice";
import "./style.css";
import { toast } from "react-toastify";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, token } = useSelector(
    (state) => state.productsList
  );

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [token, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      toast.error("Plz enter both username & password", {
        position: "top-right",
        autoClose: 1000,
      });
      return;
    }

    dispatch(login({ email, password }));
  };

  return (
    <div className="mainBody">
      <h1 className="user px-3 py-3 mb-0">USER LOGIN</h1>
      <h3 className="welcome px-3 py-3">Welcome!!!</h3>
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
