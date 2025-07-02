import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000/api";

export const fetchEvents = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/events`);
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

export const logEvent = async (eventData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/log_event`, eventData);
    return response.data;
  } catch (error) {
    console.error("Error logging event:", error);
    throw error;
  }
}; 