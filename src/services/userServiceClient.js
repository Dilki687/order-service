const axios = require("axios");

const USER_SERVICE_URL = process.env.USER_SERVICE_URL;

exports.validateUser = async (userId) => {
  try {
    const response = await axios.get(`${USER_SERVICE_URL}/api/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("User service validation error:", error.message);

    if (error.response && error.response.status === 404) {
      throw new Error("User not found");
    }

    throw new Error("User validation failed");
  }
};
