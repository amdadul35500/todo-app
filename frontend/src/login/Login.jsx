import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AuthContext } from "../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const { loading, error, dispatch } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    name: undefined,
    email: undefined,
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LIGIN_START" });
    try {
      const res = await axios.post(
        `http://localhost:5500/api/user/signin`,
        credentials
      );

      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/");
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
    }
  };

  return (
    <>
      <div className="register">
        <div className="box1">
          <TextField
            type="email"
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
            required
            className="inputFeild"
            onChange={handleChange}
          />
          <TextField
            type="password"
            id="password"
            label="Password"
            variant="outlined"
            fullWidth
            required
            onChange={handleChange}
          />

          <Button
            variant="contained"
            className="regButton"
            onClick={handleClick}
          >
            Login
          </Button>
        </div>
      </div>
    </>
  );
};

export default Login;
