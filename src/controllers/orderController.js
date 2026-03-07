const orderService = require("../services/orderService");

exports.createOrder = (req, res) => {
  orderService.createOrder(req.body, (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
};

exports.getOrders = (req, res) => {
  orderService.getOrders((err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
};

exports.getOrder = (req, res) => {
  orderService.getOrderById(req.params.id, (err, row) => {
    if (err) return res.status(500).json(err);
    res.json(row);
  });
};

exports.deleteOrder = (req, res) => {
  orderService.deleteOrder(req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Order deleted" });
  });
};