import React, { useEffect, useState } from "react";
import WorkingDaysManager from "../components/WorkingDaysManager";
import ExceptionsManager from "../components/ExceptionsManager";
import { getAvailability } from "../api/providerAPI";
import "./Dashboard.css";

const Dashboard = () => {
  const providerId = "6735ae9b63c3af5f28a71903"; // Replace with the actual providerId
  const [exceptions, setExceptions] = useState([]); // Exception dates

  // Fetch availability on component mount
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const data = await getAvailability(providerId);
        if (data?.exceptions) {
          setExceptions(data.exceptions);
        }
      } catch (error) {
        console.error("Error fetching provider availability:", error);
        alert("Failed to fetch provider availability.");
      }
    };

    fetchAvailability();
  }, [providerId]);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Provider Dashboard</h1>
      <WorkingDaysManager providerId={providerId} />
      <ExceptionsManager
        providerId={providerId}
        exceptions={exceptions}
        setExceptions={setExceptions}
      />
    </div>
  );
};

export default Dashboard;
