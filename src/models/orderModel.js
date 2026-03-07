const db = require("./db");

exports.createOrder = (order, callback) => {
  const { userId, product, quantity, price, status } = order;

  db.run(
    `INSERT INTO orders (userId, product, quantity, price, status)
     VALUES (?, ?, ?, ?, ?)`,
    [userId, product, quantity, price, status],
    function (err) {
      callback(err, { id: this.lastID });
    }
  );
};

exports.getOrders = (callback) => {
  db.all("SELECT * FROM orders", callback);
};

exports.getOrderById = (id, callback) => {
  db.get("SELECT * FROM orders WHERE id=?", [id], callback);
};

exports.deleteOrder = (id, callback) => {
  db.run("DELETE FROM orders WHERE id=?", [id], callback);
};