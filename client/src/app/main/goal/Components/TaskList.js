// src/components/TaskList.js
import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import axios from "axios";

const TaskList = () => {
  const [tasks, setTasks] = useState([
    { task: "Morning Run", planned: "30 mins", status: "✔️ Completed" },
    { task: "Drink 2L Water", planned: "2 Liters", status: "❌ Not Completed" }
  ]); // Mock data

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Uncomment the following lines to fetch real data
        // const response = await axios.get("https://your-backend-api.com/api/tasks");
        // setTasks(response.data); // Set fetched tasks data

      } catch (error) {
        console.error("Error fetching tasks data:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" style={{ padding: "10px" }}>
        Task List
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Task</TableCell>
            <TableCell>Planned</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.task}</TableCell>
              <TableCell>{item.planned}</TableCell>
              <TableCell>{item.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaskList;
