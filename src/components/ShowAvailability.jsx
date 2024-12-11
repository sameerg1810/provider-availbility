import React, { useState, useEffect } from "react";
import { getAvailability, saveAvailability } from "../api/providerAPI";

const ShowAvailability = ({ providerId, onAdd }) => {
  const [workingDays, setWorkingDays] = useState([]);
  const [recurring, setRecurring] = useState(false);
  const [loading, setLoading] = useState(true);
  const [creatingCalendar, setCreatingCalendar] = useState(false);

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
      if (error.response?.status === 404) {
        setCreatingCalendar(true);
        const defaultWorkingDays = Array.from({ length: 7 }, (_, i) => ({
          day: i,
          isWorking: true,
          startTime: "09:00",
          endTime: "17:00",
        }));
        await createDefaultAvailability(defaultWorkingDays);
        setWorkingDays(defaultWorkingDays);
        setRecurring(false);
      } else {
        console.error("Error fetching provider availability:", error);
        alert("Failed to fetch provider availability.");
      }
    } finally {
      setLoading(false);
      setCreatingCalendar(false);
    }
  };

  const createDefaultAvailability = async (defaultWorkingDays) => {
    try {
      await saveAvailability({
        providerId,
        service: "General Service",
        workingDays: defaultWorkingDays,
        exceptions: [],
        recurring: false,
      });
      console.log("Default availability created successfully.");
    } catch (error) {
      console.error("Error creating default availability:", error);
    }
  };

  return (
    <div className="show-availability">
      <h3>Current Availability</h3>
      {loading ? (
        <p>
          {creatingCalendar ? "Creating your work calendar..." : "Loading..."}
        </p>
      ) : (
        <div>
          <p>
            <strong>Recurring:</strong> {recurring ? "Enabled" : "Disabled"}
          </p>
          <ul>
            {workingDays.map((day) => (
              <li key={day.day}>
                <strong>
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
                </strong>{" "}
                -{" "}
                {day.isWorking
                  ? `${day.startTime} to ${day.endTime}`
                  : "Not Working"}
              </li>
            ))}
          </ul>
        </div>
      )}
      <button onClick={onAdd}>Add or Update Availability</button>
      <style>
        {`
          .calendar-grid {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 10px;
            margin-top: 20px;
          }
          .calendar-day {
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            text-align: center;
          }
          .calendar-day.faded {
            opacity: 0.5;
            pointer-events: none;
          }
        `}
      </style>
    </div>
  );
};

export default ShowAvailability;
