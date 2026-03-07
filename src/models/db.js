const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./orders.db", (err) => {
  if (err) {
    console.error("Database error:", err);
  } else {
    console.log("Connected to SQLite database");
  }
});

db.run(`
CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER,
  product TEXT,
  quantity INTEGER,
  price REAL,
  status TEXT
)
`);

module.exports = db;