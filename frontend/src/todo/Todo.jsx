import React, { useState, useContext, useEffect } from "react";
import "./todo.css";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { AuthContext } from "../context/AuthContextProvider";
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Todo = () => {
  const { todo, setTodo, update } = useContext(AuthContext);

  // get all todo
  useEffect(() => {
    const getTodo = async () => {
      const res = await axios.get(`http://localhost:5500/api/todo`);
      setTodo(res.data);
    };
    getTodo();
  }, [update]);

  return (
    <>
      <div className="main">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3}>
            {todo.length != 0
              ? todo.map((data) => (
                  <Grid item xs={4} key={Math.random()}>
                    <Item>
                      <div className="title">
                        <h3 className="">{data.title}</h3>
                      </div>
                      <div className="description">
                        <p>{data.description}</p>
                      </div>
                      <div className="status">
                        <span>
                          Status :{" "}
                          <span style={{ fontWeight: "bold" }}>
                            {data.status}
                          </span>
                        </span>
                      </div>
                    </Item>
                  </Grid>
                ))
              : ""}
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default Todo;
