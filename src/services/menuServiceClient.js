const axios = require("axios");

const MENU_SERVICE_URL = process.env.MENU_SERVICE_URL;

exports.validateItems = async (items) => {
  try {
    const response = await axios.post(`${MENU_SERVICE_URL}/menu/validate`, {
      items,
    });
    return response.data;
  } catch (error) {
    console.error("Menu service validation error:", error.message);
    throw new Error("Menu validation failed");
  }
};
