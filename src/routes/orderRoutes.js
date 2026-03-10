const express = require("express");
const router = express.Router();
const controller = require("../controllers/orderController");

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags:
 *       - Orders
 *     description: |
 *       This endpoint creates a new order and triggers inter-service communication:
 *
 *       **User Identity Service**
 *       - Validates the user exists
 *       - GET https://user-identity-service.onrender.com/api/users/{userId}
 *
 *       **Menu Service**
 *       - Validates requested menu items
 *       - Returns price and availability
 *       - POST /menu/validate
 *
 *
 *
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
 *                 type: string
 *                 example: "u2"
 *               product:
 *                 type: string
 *                 example: "burger"
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
 *         content:
 *           application/json:
 *             example:
 *               orderId: 2
 *               message: "Order created successfully"
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
 *                     type: string
 *                     example: "user123"
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
 *                 _id:
 *                   type: string
 *                   example: "2"
 *                 userId:
 *                   type: string
 *                   example: "u2"
 *                 status:
 *                   type: string
 *                   example: "pending"
 *                 totalAmount:
 *                   type: number
 *                   example: 2400
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       menuItemId:
 *                         type: integer
 *                         example: 1
 *                       quantity:
 *                         type: integer
 *                         example: 2
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
