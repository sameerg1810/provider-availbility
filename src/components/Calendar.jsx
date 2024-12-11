import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Default styling for react-calendar
import { Box, Typography } from "@mui/material";
import { getAvailability } from "../api/providerAPI"; // API function to fetch provider data
import "./Calendar.css";
/**
 * Calendar Component
 * Displays a calendar for the provider, highlighting working days and exceptions.
 *
 * @param {string} providerId - The unique ID of the provider whose availability is displayed.
 */
const ProviderCalendar = ({ providerId }) => {
  // State to store provider's working days and exceptions
  const [availability, setAvailability] = useState([]);
  const [exceptions, setExceptions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date()); // State to manage selected date

  /**
   * Fetch provider availability and exceptions when the component loads or providerId changes.
   */
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const data = await getAvailability(providerId);
        setAvailability(data.workingDays || []);
        setExceptions(data.exceptions || []);
      } catch (error) {
        console.error("Error fetching provider availability:", error);
      }
    };

    fetchAvailability();
  }, [providerId]);

  /**
   * Determines whether the given date is a working day.
   *
   * @param {Date} date - The date to check.
   * @returns {boolean} - True if the date is a working day; false otherwise.
   */
  const isWorkingDay = (date) => {
    const day = date.getDay(); // Numeric day (0 = Sunday, ..., 6 = Saturday)
    return availability.some((d) => d.day === day && d.isWorking);
  };

  /**
   * Determines whether the given date is an exception.
   *
   * @param {Date} date - The date to check.
   * @returns {boolean} - True if the date is an exception; false otherwise.
   */
  const isException = (date) => {
    const dateString = date.toISOString().split("T")[0];
    return exceptions.includes(dateString);
  };

  /**
   * Custom tile class for react-calendar based on day type.
   *
   * @param {Object} args - The tile arguments from react-calendar.
   * @returns {string} - CSS class for the calendar tile.
   */
  const tileClassName = ({ date }) => {
    if (isException(date)) {
      return "exception-tile"; // Add custom class for exceptions
    }
    if (isWorkingDay(date)) {
      return "working-day-tile"; // Add custom class for working days
    }
    return "non-working-day-tile"; // Add custom class for non-working days
  };

  return (
    <Box>
      {/* Calendar Title */}
      <Typography variant="h6">Provider Calendar</Typography>

      {/* React Calendar */}
      <Calendar
        value={selectedDate}
        onChange={setSelectedDate}
        tileClassName={tileClassName} // Custom styles based on day type
      />
    </Box>
  );
};

export default ProviderCalendar;
