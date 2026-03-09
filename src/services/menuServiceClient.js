const axios = require("axios");

const MENU_SERVICE_URL = "https://menu-service-production-048a.up.railway.app";

exports.validateItems = async (items) => {
  try {
    console.log("Calling Menu Service with items:", items);

    const response = await axios.post(
      `${MENU_SERVICE_URL}/menu/validate`,
      { items }
    );

    console.log("Menu Service Response:", response.data);

    return response.data;

  } catch (error) {
    console.error("Menu service validation error:", error.message);
    throw new Error("Menu validation failed");
  }
};