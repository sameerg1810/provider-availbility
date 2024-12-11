import React, { useState } from "react";
import { updateDaySlot } from "../api/providerAPI";
import { Button, TextField, Box } from "@mui/material";

const DaySlotEditor = ({ providerId }) => {
  const [day, setDay] = useState("");
  const [isWorking, setIsWorking] = useState(true);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleUpdate = async () => {
    const data = {
      providerId,
      day: parseInt(day),
      isWorking,
      startTime,
      endTime,
    };
    await updateDaySlot(data);
    alert("Day slot updated successfully");
  };

  return (
    <Box>
      <TextField
        label="Day (0 = Sunday)"
        value={day}
        onChange={(e) => setDay(e.target.value)}
        fullWidth
      />
      <TextField
        label="Start Time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        fullWidth
      />
      <TextField
        label="End Time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        fullWidth
      />
      <Button onClick={handleUpdate} variant="contained">
        Update Slot
      </Button>
    </Box>
  );
};

export default DaySlotEditor;
