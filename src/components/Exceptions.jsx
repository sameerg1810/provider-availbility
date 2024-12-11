import React, { useState } from "react";
import { addException, removeException } from "../api/providerAPI";
import { Button, TextField, Box } from "@mui/material";

const Exceptions = ({ providerId }) => {
  const [exceptionDate, setExceptionDate] = useState("");

  const handleAddException = async () => {
    await addException(providerId, exceptionDate);
    alert("Exception added successfully");
  };

  const handleRemoveException = async () => {
    await removeException(providerId, exceptionDate);
    alert("Exception removed successfully");
  };

  return (
    <Box>
      <TextField
        label="Exception Date"
        type="date"
        value={exceptionDate}
        onChange={(e) => setExceptionDate(e.target.value)}
        fullWidth
      />
      <Button onClick={handleAddException} variant="contained">
        Add Exception
      </Button>
      <Button onClick={handleRemoveException} variant="outlined">
        Remove Exception
      </Button>
    </Box>
  );
};

export default Exceptions;
