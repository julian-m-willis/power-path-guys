"use client";

import React, { useEffect } from "react";
import dayjs from "dayjs";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import axios from "axios";

function ServerDay(props) {
  const {
    completedDays = [],
    missedDays = [],
    plannedDays = [],
    day,
    outsideCurrentMonth,
    ...other
  } = props;

  const isCompleted =
    !outsideCurrentMonth && completedDays.includes(day.date());
  const isMissed = !outsideCurrentMonth && missedDays.includes(day.date());
  const isPlanned = !outsideCurrentMonth && plannedDays.includes(day.date());

  let badgeColor = "default";
  let badgeContent = "";
  let tooltipText = "";

  if (isCompleted) {
    badgeColor = "success";
    badgeContent = "✓";
    tooltipText = "Completed";
  } else if (isMissed) {
    badgeColor = "error";
    badgeContent = "✕";
    tooltipText = "Missed";
  } else if (isPlanned) {
    badgeContent = "•";
    tooltipText = "Planned";
  }

  return (
    <Tooltip title={tooltipText} arrow>
      <Badge
        key={day.toString()}
        overlap="circular"
        badgeContent={badgeContent}
        color={badgeColor}
      >
        <PickersDay
          {...other}
          outsideCurrentMonth={outsideCurrentMonth}
          day={day}
          sx={{
            backgroundColor: isCompleted
              ? "rgba(76, 175, 80, 0.3)"
              : "transparent", // Green for completed
            border: isMissed
              ? "2px solid red"
              : isPlanned
              ? "2px solid #1976d2"
              : "none", // Red outline for missed, blue for planned
            borderRadius: "50%",
          }}
        />
      </Badge>
    </Tooltip>
  );
}

export default function WorkoutCalendar() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [completedDays, setCompletedDays] = React.useState([]);
  const [missedDays, setMissedDays] = React.useState([]);
  const [plannedDays, setPlannedDays] = React.useState([]);

  const fetchDataForMonth = async (month) => {
    try {
      setIsLoading(true);
      const userId = localStorage.getItem("user_id") || 2;
      const response = await axios.get(
        `http://13.54.17.246:5006/goal/monthly-summary/${userId}?month=${month}`
      );
      const { completed, missed, planned } = response.data;

      setCompletedDays(completed);
      setMissedDays(missed);
      setPlannedDays(planned);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching workout data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch for the current month
    const date = dayjs();
    const formattedMonth = dayjs(date).format("YYYY-MM");

    // Call the function with the formatted month
    fetchDataForMonth(formattedMonth);
  }, []);

  const handleMonthChange = (date) => {
    // Convert the date to 'YYYY-MM' format
    const formattedMonth = dayjs(date).format("YYYY-MM");

    // Call the function with the formatted month
    fetchDataForMonth(formattedMonth);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        defaultValue={dayjs()}
        loading={isLoading}
        onMonthChange={handleMonthChange}
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{
          day: ServerDay,
        }}
        slotProps={{
          day: {
            completedDays,
            missedDays,
            plannedDays,
          },
        }}
      />
      {/* Legend for the calendar */}
      <div
        style={{
          marginTop: "1rem",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Badge color="success" badgeContent="✓" />
          <span style={{ marginLeft: "15px" }}>Completed</span>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Badge color="primary" badgeContent="•" />
          <span style={{ marginLeft: "15px" }}>Planned</span>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Badge color="error" badgeContent="✕" />
          <span style={{ marginLeft: "15px" }}>Missed</span>
        </div>
      </div>
    </LocalizationProvider>
  );
}
