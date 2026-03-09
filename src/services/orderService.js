const orderModel = require("../models/orderModel");
const menuService = require("./menuServiceClient");
const paymentService = require("./paymentServiceClient");

exports.createOrder = async (order, cb) => {
  try {
    // Step 1: Validate menu items
    const validation = await menuService.validateItems(order.items);

    console.log("Menu Service Response:", validation);

    if (!validation.success) {
      return cb({ message: "Menu validation failed" });
    }

    if (!validation.data || validation.data.length === 0) {
      return cb({ message: "Menu item does not exist" });
    }

    const unavailableItem = validation.data.find(
      (item) => item.isAvailable === false,
    );

    if (unavailableItem) {
      return cb({ message: "Some menu items are unavailable" });
    }

    // Step 2: Save order in DB
    orderModel.createOrder(order, async (err, result) => {
      if (err) return cb(err);

      const orderId = result.id;

      try {
        // Step 3: Create payment
        const payment = await paymentService.createPayment(
          orderId,
          order.userId,
        );

        cb(null, {
          message: "Order created and payment initiated",
          orderId: orderId,
          payment: payment,
        });
      } catch (paymentError) {
        cb({
          message: "Order created but payment failed",
          orderId: orderId,
        });
      }
    });
  } catch (err) {
    cb({ message: err.message });
  }
};

exports.getOrders = (cb) => {
  orderModel.getOrders(cb);
};

exports.getOrderById = (id, cb) => {
  orderModel.getOrderById(id, cb);
};

exports.deleteOrder = (id, cb) => {
  orderModel.deleteOrder(id, cb);
};
