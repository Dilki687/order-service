const orderService = require("../services/orderService");

exports.createOrder = (req, res) => {
  const { userId, items, status } = req.body;

  if (!userId || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "userId and items are required" });
  }

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
    if (!row) return res.status(404).json({ message: "Order not found" });

    res.json(row);
  });
};

exports.deleteOrder = (req, res) => {
  orderService.deleteOrder(req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Order deleted" });
  });
};
