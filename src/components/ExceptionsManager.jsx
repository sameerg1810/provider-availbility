import React, { useState } from "react";
import { addException, removeException } from "../api/providerAPI";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ExceptionsManager = ({ providerId, exceptions, setExceptions }) => {
  const [exceptionDate, setExceptionDate] = useState(null); // Use Date object for the calendar
  const [loading, setLoading] = useState(false); // Manage loading state for buttons

  // Add an exception date
  const handleAddException = async () => {
    try {
      if (!exceptionDate) {
        alert("Please select a valid exception date.");
        return;
      }

      const formattedDate = exceptionDate.toISOString().split("T")[0]; // Format to YYYY-MM-DD

      setLoading(true);
      await addException(providerId, formattedDate);
      setExceptions((prev) => [...new Set([...prev, formattedDate])]); // Ensure no duplicates
      setExceptionDate(null); // Clear the input field
      alert("Exception added successfully.");
    } catch (error) {
      console.error("Error adding exception:", error);
      alert("Failed to add exception. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Remove an exception date
  const handleRemoveException = async () => {
    try {
      if (!exceptionDate) {
        alert("Please select a valid exception date.");
        return;
      }

      const formattedDate = exceptionDate.toISOString().split("T")[0];

      if (!exceptions.includes(formattedDate)) {
        alert("This date is not in the exceptions list.");
        return;
      }

      setLoading(true);
      await removeException(providerId, formattedDate);
      setExceptions((prev) => prev.filter((date) => date !== formattedDate)); // Remove the date
      setExceptionDate(null); // Clear the input field
      alert("Exception removed successfully.");
    } catch (error) {
      console.error("Error removing exception:", error);
      alert("Failed to remove exception. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="exceptions-manager">
      <h2>Manage Exceptions</h2>
      <div className="exception-input">
        <label htmlFor="exception-date">Select a Date:</label>
        <DatePicker
          id="exception-date"
          selected={exceptionDate}
          onChange={(date) => setExceptionDate(date)}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select a date"
        />
        <button
          onClick={handleAddException}
          disabled={loading || !exceptionDate}
        >
          {loading ? "Adding..." : "Add Exception"}
        </button>
        <button
          onClick={handleRemoveException}
          disabled={loading || !exceptionDate}
        >
          {loading ? "Removing..." : "Remove Exception"}
        </button>
      </div>
      <div className="exceptions-list">
        <h3>Existing Exceptions</h3>
        {exceptions.length > 0 ? (
          <ul>
            {exceptions.map((date) => (
              <li key={date}>{new Date(date).toLocaleDateString()}</li>
            ))}
          </ul>
        ) : (
          <p>No exceptions added yet.</p>
        )}
      </div>
    </div>
  );
};

export default ExceptionsManager;
