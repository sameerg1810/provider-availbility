import React, { useState } from "react";
import { generateOTP } from "../api/otpService";

const GenerateOTP = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [response, setResponse] = useState(null);

  const handleGenerateOTP = async () => {
    try {
      const result = await generateOTP(`+91${phoneNumber}`);
      setResponse(result);
    } catch (error) {
      setResponse({ error: "Failed to send OTP" });
    }
  };

  return (
    <div>
      <h2>Generate OTP</h2>
      <input
        type="text"
        placeholder="Enter Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button onClick={handleGenerateOTP}>Generate OTP</button>
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
    </div>
  );
};

export default GenerateOTP;
