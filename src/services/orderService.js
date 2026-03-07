const orderModel = require("../models/orderModel");

exports.createOrder = (order, cb) => {
  orderModel.createOrder(order, cb);
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