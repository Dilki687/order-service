const express = require("express");
const router = express.Router();
const controller = require("../controllers/orderController");

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order (validates items with Menu Service)
 *     tags:
 *       - Orders
 *     description: |
 *       This endpoint creates a new order.
 *       Before creating the order, the Order Service calls the **Menu Service**
 *       `/menu/validate` endpoint to verify that the requested menu items exist
 *       and are available.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - items
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               product:
 *                 type: string
 *                 example: "Chicken Burger"
 *               quantity:
 *                 type: integer
 *                 example: 2
 *               price:
 *                 type: number
 *                 example: 1200
 *               status:
 *                 type: string
 *                 example: "pending"
 *               items:
 *                 type: array
 *                 description: Items validated by Menu Service
 *                 items:
 *                   type: object
 *                   properties:
 *                     menuItemId:
 *                       type: integer
 *                       example: 1
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *     responses:
 *       200:
 *         description: Order created successfully
 *       400:
 *         description: Menu items not available
 */
router.post("/", controller.createOrder);

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     tags:
 *       - Orders
 *     responses:
 *       200:
 *         description: List of all orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   userId:
 *                     type: integer
 *                     example: 1
 *                   product:
 *                     type: string
 *                     example: "Pizza"
 *                   quantity:
 *                     type: integer
 *                     example: 2
 *                   price:
 *                     type: number
 *                     example: 19.99
 *                   status:
 *                     type: string
 *                     example: "pending"
 */
router.get("/", controller.getOrders);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get a single order by ID
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The order ID
 *     responses:
 *       200:
 *         description: Order details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 userId:
 *                   type: integer
 *                   example: 1
 *                 product:
 *                   type: string
 *                   example: "Pizza"
 *                 quantity:
 *                   type: integer
 *                   example: 2
 *                 price:
 *                   type: number
 *                   example: 19.99
 *                 status:
 *                   type: string
 *                   example: "pending"
 *       404:
 *         description: Order not found
 */
router.get("/:id", controller.getOrder);

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete an order by ID
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The order ID
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Order deleted"
 *       404:
 *         description: Order not found
 */
router.delete("/:id", controller.deleteOrder);

module.exports = router;
