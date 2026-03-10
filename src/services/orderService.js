const orderModel = require("../models/orderModel");
const menuService = require("./menuServiceClient");
const userService = require("./userServiceClient");

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
      (item) => item.isAvailable === false
    );

    if (unavailableItem) {
      return cb({ message: "Some menu items are unavailable" });
    }

    // STEP 3️⃣ Calculate total price
    const totalAmount = validation.data.reduce(
      (sum, item) => sum + item.currentPrice * item.quantity,
      0
    );

    order.price = totalAmount;

    // STEP 4️⃣ Save Order
    orderModel.createOrder(order, (err, result) => {
      if (err) {
        return cb(err);
      }

      const orderId = result.id;

      console.log("Order created with ID:", orderId);

      cb(null, {
        orderId,
        message: "Order created successfully",
      });
    });

  } catch (err) {
    cb({ message: err.message });
  }
};

exports.getOrders = (cb) => {
  orderModel.getOrders(cb);
};

exports.getOrderById = (id, cb) => {

  orderModel.getOrderById(id, (err, row) => {

    if (err) return cb(err);
    if (!row) return cb({ message: "Order not found" });

    const formattedOrder = {
      id: row.id,
      userId: row.userId,
      product: row.product,
      quantity: row.quantity,
      price: row.price,
      status: row.status,
    };

    cb(null, formattedOrder);
  });
};

exports.deleteOrder = (id, cb) => {
  orderModel.deleteOrder(id, cb);
};