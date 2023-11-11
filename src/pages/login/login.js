import "./login.css";
import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { authContext } from "../../helpers/authContext";
import { notification } from "antd";
import Menu from  "../../fragments/menu/menu"

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(authContext);

  const login = (event) => {
    event.preventDefault();
    Axios.post("http://localhost:3001/login", {
      email: email,
      password: password,
    }).then((response) => {
      if (response.data.type === "error") {
        notification[response.data.type]({
          message: response.data.message,
          description: response.data.description,
        });
      } else {
        notification[response.data.type]({
          message: response.data.message,
          description: response.data.description,
        });
        localStorage.setItem("token", response.data.token);
        setAuthState({
          username: response.data.username,
          status: true,
        });
        navigate("/lessons");
      }
    });
  };

  return (
    <>
    <Menu/>
      <div className="container">
        <form name="form1" className="box">
          <h5>LOGIN INTO YOUR ACCOUNT</h5>
          <input
            type="text"
            placeholder="Email"
            autoComplete="on"
            className="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Passsword"
            autoComplete="off"
            className="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button onClick={login} className="btn1">
            Login
          </button>
        </form>
        <div className="forgot-new">
          <Link to="/register" className="dnthave">
            Need an account?
          </Link>
        </div>
      </div>
    </>
  );
}

export default Login;