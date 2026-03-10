const axios = require("axios");

const PAYMENT_SERVICE_URL =
  "https://food-order-payment-service-production.up.railway.app";

exports.createPaymentForOrder = async (orderId, userId) => {
  try {
    console.log(
      `Calling Payment Service for Order ${orderId} and User ${userId}`
    );

    const response = await axios.post(
      `${PAYMENT_SERVICE_URL}/api/payments/order/${orderId}/user/${userId}`
    );

    console.log("Payment Service Response:", response.data);

    return response.data;
  } catch (error) {
    console.error("Payment service error:", error.message);

    throw new Error("Payment creation failed");
  }
};