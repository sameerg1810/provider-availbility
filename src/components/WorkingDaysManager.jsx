import React, { useState, useEffect } from "react";
import ShowAvailability from "./ShowAvailability";
import AddAvailability from "./AddAvailability";

const WorkingDaysManager = ({ providerId }) => {
  const [currentView, setCurrentView] = useState("show"); // 'show' or 'add'

  return (
    <div className="working-days-manager">
      <h2>Working Days Manager</h2>
      {currentView === "show" ? (
        <ShowAvailability
          providerId={providerId}
          onAdd={() => setCurrentView("add")}
        />
      ) : (
        <AddAvailability
          providerId={providerId}
          onCancel={() => setCurrentView("show")}
        />
      )}
    </div>
  );
};

export default WorkingDaysManager;
