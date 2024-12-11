import axios from "axios";

const BASE_URL = "http://localhost:3000/v1.0/providers/provider-date";

/**
 * Fetch provider availability.
 * @param {string} providerId - The provider's unique ID.
 * @returns {Promise<Object>} - The availability data.
 */
export const getAvailability = async (providerId) => {
  try {
    console.log(`Fetching availability for provider: ${providerId}`);
    const response = await axios.get(`${BASE_URL}/${providerId}`);
    console.log("Availability Response:", response.data);
    return response.data;
  } catch (error) {
    handleAxiosError(error, "Error fetching availability");
    throw error;
  }
};

/**
 * Save provider availability.
 * @param {Object} availabilityData - Data to save availability.
 * @returns {Promise<Object>} - The saved availability response.
 */
export const saveAvailability = async (availabilityData) => {
  try {
    console.log("Saving availability data:", availabilityData);
    const response = await axios.post(`${BASE_URL}`, availabilityData);
    console.log("Save Availability Response:", response.data);
    return response.data;
  } catch (error) {
    handleAxiosError(error, "Error saving availability");
    throw error;
  }
};

/**
 * Update working day slots for a provider.
 * @param {Object} daySlotData - Data to update the day slot.
 * @returns {Promise<Object>} - The updated day slot response.
 */
export const updateDaySlot = async (daySlotData) => {
  console.log("Payload sent to updateDaySlot API:", daySlotData);
  try {
    const response = await axios.patch(`${BASE_URL}/day-slot`, daySlotData);
    console.log("Update Day Slot Response:", response.data);
    return response.data;
  } catch (error) {
    handleAxiosError(error, "Error updating day slot");
    throw error;
  }
};

/**
 * Add an exception for a provider.
 * @param {string} providerId - The provider's unique ID.
 * @param {string} exceptionDate - The date to add as an exception.
 * @returns {Promise<Object>} - The updated exceptions list.
 */
export const addException = async (providerId, exceptionDate) => {
  try {
    console.log(
      `Adding exception for provider ${providerId}: ${exceptionDate}`,
    );
    const response = await axios.post(`${BASE_URL}/${providerId}/exception`, {
      exceptionDate,
    });
    console.log("Add Exception Response:", response.data);
    return response.data;
  } catch (error) {
    handleAxiosError(error, "Error adding exception");
    throw error;
  }
};

/**
 * Remove an exception for a provider.
 * @param {string} providerId - The provider's unique ID.
 * @param {string} exceptionDate - The date to remove from exceptions.
 * @returns {Promise<Object>} - The updated exceptions list.
 */
export const removeException = async (providerId, exceptionDate) => {
  try {
    console.log(
      `Removing exception for provider ${providerId}: ${exceptionDate}`,
    );
    const response = await axios.delete(`${BASE_URL}/${providerId}/exception`, {
      data: { exceptionDate },
    });
    console.log("Remove Exception Response:", response.data);
    return response.data;
  } catch (error) {
    handleAxiosError(error, "Error removing exception");
    throw error;
  }
};

/**
 * Toggle the recurring setting for a provider.
 * @param {string} providerId - The provider's unique ID.
 * @param {boolean} recurring - Whether recurring is enabled.
 * @returns {Promise<Object>} - The updated recurring setting.
 */
export const toggleRecurring = async (providerId, recurring) => {
  try {
    console.log(
      `Toggling recurring for provider: ${providerId}, Recurring: ${recurring}`,
    );
    const response = await axios.patch(`${BASE_URL}/${providerId}/recurring`, {
      recurring,
    });
    console.log("Toggle Recurring Response:", response.data);
    return response.data;
  } catch (error) {
    handleAxiosError(error, "Error toggling recurring availability");
    throw error;
  }
};

/**
 * Generic error handler for Axios requests.
 * @param {Object} error - The error object from Axios.
 * @param {string} message - The custom error message.
 */
const handleAxiosError = (error, message) => {
  if (error.response) {
    console.error(`${message} - Response Error:`, error.response.data);
    console.error("Status:", error.response.status);
    console.error("Headers:", error.response.headers);
  } else if (error.request) {
    console.error(`${message} - No Response:`, error.request);
  } else {
    console.error(`${message} - Request Setup Error:`, error.message);
  }
};
