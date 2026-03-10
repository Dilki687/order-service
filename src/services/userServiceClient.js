const axios = require("axios");

const USER_SERVICE_URL = "https://user-identity-service.onrender.com";

exports.validateUser = async (userId) => {
  try {
    console.log("Calling User Service with ID:", userId);

    const response = await axios.get(
      `${USER_SERVICE_URL}/api/users/${userId}`
    );

    console.log("User Service Response:", response.data);

    return response.data;

  } catch (error) {
    console.error("User service validation error:", error.message);

    if (error.response && error.response.status === 404) {
      throw new Error("User not found");
    }

    throw new Error("User validation failed");
  }
};