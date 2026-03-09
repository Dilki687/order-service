const axios = require("axios");

const PAYMENT_SERVICE_URL =
  "https://food-order-payment-service-production.up.railway.app";

exports.createPayment = async (orderId, userId) => {
  try {
    const response = await axios.post(
      `${PAYMENT_SERVICE_URL}/api/payments/order/${orderId}/user/${userId}`
    );

    return response.data;
  } catch (error) {
    console.error(
      "Payment Service Error:",
      error.response?.data || error.message
    );
    throw new Error("Payment creation failed");
  }
};