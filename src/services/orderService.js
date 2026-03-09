const orderModel = require("../models/orderModel");
const menuService = require("./menuServiceClient");

exports.createOrder = async (order, cb) => {
  try {
    // Step 1: Validate menu items with Menu Service
    const validation = await menuService.validateItems(order.items);

    console.log("Menu Service Response:", validation);

    // If validation failed
    if (!validation.success) {
      return cb({ message: "Menu validation failed" });
    }

    // If no items returned → item doesn't exist
    if (!validation.data || validation.data.length === 0) {
      return cb({ message: "Menu item does not exist" });
    }

    // Check if any item unavailable
    const unavailableItem = validation.data.find(
      (item) => item.isAvailable === false,
    );

    if (unavailableItem) {
      return cb({ message: "Some menu items are unavailable" });
    }

    // Step 2: Create order
    orderModel.createOrder(order, cb);
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
