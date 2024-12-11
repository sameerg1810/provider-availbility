import React, { useState } from "react";
import { verifyOTP } from "../api/otpService";

const VerifyOTP = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOTP] = useState("");
  const [response, setResponse] = useState(null);

  const handleVerifyOTP = async () => {
    try {
      const result = await verifyOTP(`91${phoneNumber}`, otp);
      setResponse(result);
    } catch (error) {
      setResponse({ error: "Failed to verify OTP" });
    }
  };

  return (
    <div>
      <h2>Verify OTP</h2>
      <input
        type="text"
        placeholder="Enter Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOTP(e.target.value)}
      />
      <button onClick={handleVerifyOTP}>Verify OTP</button>
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
    </div>
  );
};

export default VerifyOTP;
