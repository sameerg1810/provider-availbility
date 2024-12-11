import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL; // Base URL for the 2Factor API
const API_KEY = import.meta.env.VITE_2FACTOR_API_KEY; // Load API key from .env file

/**
 * Generates an OTP for a given phone number.
 * @param {string} phoneNumber - Recipient's phone number with country code (e.g., +919999999999).
 * @param {string} templateName - DLT-approved template name (default: "AUTOGEN2").
 * @returns {Promise<Object>} - API response with OTP transaction details.
 */
export const generateOTP = async (phoneNumber, templateName = "AUTOGEN2") => {
  try {
    const response = await axios.get(
      `${BASE_URL}/${API_KEY}/SMS/${phoneNumber}/${templateName}`,
    );
    return response.data; // Return the API response data
  } catch (error) {
    console.error(
      "Error generating OTP:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

/**
 * Verifies the OTP for a given phone number.
 * @param {string} phoneNumber - Recipient's phone number with country code (e.g., 919999999999).
 * @param {string} otp - The OTP to verify.
 * @returns {Promise<Object>} - API response with verification status.
 */
export const verifyOTP = async (phoneNumber, otp) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/${API_KEY}/SMS/VERIFY3/${phoneNumber}/${otp}`,
    );
    return response.data; // Return the API response data
  } catch (error) {
    console.error(
      "Error verifying OTP:",
      error.response?.data || error.message,
    );
    throw error;
  }
};
