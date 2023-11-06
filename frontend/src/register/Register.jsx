import React, { useState, useContext } from "react";
import "./register.css";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AuthContext } from "../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { loading, error, dispatch } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    name: undefined,
    email: undefined,
    password: undefined,
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const navigate = useNavigate();
  // handle click
  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "REGISTER_START" });
    try {
      const res = await axios.post(
        `http://localhost:5500/api/user/signup`,
        credentials
      );

      dispatch({ type: "REGISTER_SUCCESS", payload: res.data });
      navigate("/");
    } catch (error) {
      dispatch({ type: "REGISTER_FAILURE", payload: error.response.data });
    }
  };

  return (
    <>
      <div className="register">
        <div className="box1">
          <TextField
            type="text"
            id="name"
            label="Name"
            variant="outlined"
            fullWidth
            required
            className="inputFeild"
            onChange={handleChange}
          />
          <TextField
            type="email"
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
            required
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
            Register
          </Button>
        </div>
      </div>
    </>
  );
};

export default Register;
