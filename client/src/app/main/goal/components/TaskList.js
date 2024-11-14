// src/components/TaskList.js
import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from "@mui/material";
import axios from "axios";

const TaskList = () => {
  const [tasks, setTasks] = useState([
    { task: "Morning Run", planned: "30 mins", status: "✔️ Completed" },
    { task: "Drink 2L Water", planned: "2 Liters", status: "❌ Not Completed" }
  ]); // Mock data

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Uncomment and replace with actual API call for real data
        // const response = await axios.get("https://your-backend-api.com/api/tasks");
        // setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks data:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <TableContainer component={Paper} elevation={3} sx={{ mb: 2 }}>
      <Typography variant="h6" sx={{ padding: 2, fontWeight: "bold", color: "text.primary" }}>
        Task List
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Task</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Planned</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
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
