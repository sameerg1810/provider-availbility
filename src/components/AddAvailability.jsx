import React, { useState, useEffect } from "react";
import {
  getAvailability,
  updateDaySlot,
  toggleRecurring,
} from "../api/providerAPI";

const AddAvailability = ({ providerId, onCancel }) => {
  const [workingDays, setWorkingDays] = useState([]);
  const [recurring, setRecurring] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAvailability();
  }, []);

  const fetchAvailability = async () => {
    try {
      const data = await getAvailability(providerId);
      if (data) {
        setWorkingDays(data.workingDays || []);
        setRecurring(data.recurring || false);
      }
    } catch (error) {
      console.error("Error fetching provider availability:", error);
      alert("Failed to fetch provider availability.");
    } finally {
      setLoading(false);
    }
  };

  const toggleWorkingDay = (day) => {
    setWorkingDays((prev) =>
      prev.map((d) => (d.day === day ? { ...d, isWorking: !d.isWorking } : d)),
    );
  };

  const updateWorkingHours = (day, field, value) => {
    setWorkingDays((prev) =>
      prev.map((d) => (d.day === day ? { ...d, [field]: value } : d)),
    );
  };

  const handleSave = async () => {
    try {
      const sanitizedWorkingDays = workingDays.map(
        ({ day, isWorking, startTime, endTime }) => ({
          day,
          isWorking,
          startTime,
          endTime,
        }),
      );

      await updateDaySlot({
        providerId,
        workingDays: sanitizedWorkingDays,
        recurring,
      });
      alert("Working days updated successfully.");
      onCancel();
    } catch (error) {
      console.error("Error saving working days:", error);
      alert("Failed to save working days.");
    }
  };

  const handleToggleRecurring = async () => {
    const confirmToggle = window.confirm(
      `Are you sure you want to ${
        recurring ? "disable" : "enable"
      } recurring availability?`,
    );

    if (confirmToggle) {
      try {
        await toggleRecurring(providerId, !recurring);
        setRecurring(!recurring);
        alert(`Recurring availability ${!recurring ? "enabled" : "disabled"}.`);
      } catch (error) {
        console.error("Error toggling recurring availability:", error);
        alert("Failed to toggle recurring availability.");
      }
    }
  };

  const renderWorkingHoursDropdown = (day) => (
    <div className="working-hours-dropdown">
      <label>
        Start:
        <select
          value={day.startTime}
          onChange={(e) =>
            updateWorkingHours(day.day, "startTime", e.target.value)
          }
          disabled={!day.isWorking}
        >
          {Array.from({ length: 24 }, (_, i) => {
            const time = `${i.toString().padStart(2, "0")}:00`;
            return (
              <option key={time} value={time}>
                {time}
              </option>
            );
          })}
        </select>
      </label>
      <label>
        End:
        <select
          value={day.endTime}
          onChange={(e) =>
            updateWorkingHours(day.day, "endTime", e.target.value)
          }
          disabled={!day.isWorking}
        >
          {Array.from({ length: 24 }, (_, i) => {
            const time = `${i.toString().padStart(2, "0")}:00`;
            return (
              <option key={time} value={time}>
                {time}
              </option>
            );
          })}
        </select>
      </label>
    </div>
  );

  return (
    <div className="add-availability">
      <h3>Add or Update Availability</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className="weekday-selector">
            {workingDays.map((day) => (
              <div key={day.day} className="weekday">
                <label>
                  <input
                    type="checkbox"
                    checked={day.isWorking}
                    onChange={() => toggleWorkingDay(day.day)}
                  />
                  {
                    [
                      "Sunday",
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                    ][day.day]
                  }
                </label>
                {renderWorkingHoursDropdown(day)}
              </div>
            ))}
          </div>
          <button onClick={handleSave}>Save Changes</button>
          <button onClick={onCancel}>Cancel</button>
          <button onClick={handleToggleRecurring}>
            {recurring ? "Disable Recurring" : "Enable Recurring"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AddAvailability;
