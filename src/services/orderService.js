const orderModel = require("../models/orderModel");
const menuService = require("./menuServiceClient");
const userService = require("./userServiceClient");
const paymentService = require("./paymentServiceClient");

exports.createOrder = async (order, cb) => {
  try {
    // STEP 1️⃣ Validate USER with User Service
    const user = await userService.validateUser(order.userId);

    if (!user) {
      return cb({ message: "User does not exist" });
    }

    console.log("User validated:", user);

    // STEP 2️⃣ Validate menu items
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

    // STEP 3️⃣ Create Order
    // STEP 3️⃣ Create Order
    orderModel.createOrder(order, async (err, result) => {
      if (err) {
        return cb(err);
      }

      const orderId = result.id;

      console.log("Order created with ID:", orderId);

      try {
        // STEP 4️⃣ Call Payment Service
        const payment = await paymentService.createPaymentForOrder(
          orderId,
          order.userId,
        );

        console.log("Payment created:", payment);

        cb(null, {
          orderId,
          message: "Order created and payment initiated",
          payment,
        });
      } catch (paymentError) {
        console.error("Payment creation failed:", paymentError.message);

        cb(null, {
          orderId,
          message: "Order created but payment failed",
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
