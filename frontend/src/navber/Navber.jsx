import React, { useState, useContext } from "react";
import "./navber.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";
import axios from "axios";
import Todo from "../todo/Todo";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

const Navber = () => {
  const { dispatch, user, setTodo, setUpdate, update } =
    useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    user ? setOpen(true) : alert("Please Login");
  };
  const handleClose = () => setOpen(false);

  const handleChange2 = (event) => {
    setCredentials((prev) => ({ ...prev, status: event.target.value }));
  };

  const [credentials, setCredentials] = useState({
    title: undefined,
    description: undefined,
    status: undefined,
  });

  const handleChange = (e) => {
    console.log(e.target.id);
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // handle click
  const handleClick = async (e) => {
    if (credentials.title && credentials.description && credentials.status) {
      e.preventDefault();
      try {
        const res = await axios.post(
          `http://localhost:5500/api/todo`,
          credentials
        );
        handleClose();
        setUpdate(!update);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please fill all items!");
    }
  };

  return (
    <>
      <nav className="nav">
        <div className="logo">
          <div>
            <img
              src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
              alt="img"
              className="logoImg"
            />
          </div>
          <span>Todo App</span>
        </div>
        <div className="search" onClick={handleOpen}>
          <div className="searchBar">
            <button
              type="text"
              className="searchInput"
              style={{
                backgroundColor: "transparent",
                width: "100%",
                fontSize: "16px",
                marginLeft: "8px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Take a note...
            </button>
          </div>
        </div>
        {user ? (
          <div className="profile">
            <span>{user.name}</span>
            <img src="../public/logo.webp" alt="img" />
          </div>
        ) : (
          <div>
            <NavLink to="register">
              <Button variant="outlined">Register</Button>
            </NavLink>
            <NavLink to="login">
              <Button variant="outlined" style={{ marginLeft: "15px" }}>
                Login
              </Button>
            </NavLink>
          </div>
        )}
      </nav>
      <Todo />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <input
              className="modalInpt"
              type="text"
              id="title"
              placeholder="Title"
              onChange={handleChange}
            />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <textarea
              className="textarea"
              name="description"
              id="description"
              cols="30"
              rows="10"
              placeholder="Note"
              onChange={handleChange}
            ></textarea>
          </Typography>
          <Typography>
            <div>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="status"
                  value={credentials.status}
                  label="Status"
                  onChange={handleChange2}
                >
                  <MenuItem value="todo">todo</MenuItem>
                  <MenuItem value="in-progress">in-progress</MenuItem>
                  <MenuItem value="done">done</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Typography>
          <Button
            onClose={handleClose}
            variant="contained"
            className="regButton"
            onClick={handleClick}
            style={{ marginTop: "12px" }}
          >
            Add
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default Navber;
