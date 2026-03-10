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
 *       This endpoint creates a new order.
 *       
 *       **Inter-service communication occurs here:**
 *       1. The Order Service calls the **User Service** to validate that the user exists.
 *          GET https://user-identity-service.onrender.com/api/users/{id}
 *       
 *       2. The Order Service calls the **Menu Service** to validate menu items.
 *          POST /menu/validate
 *       
 *       Only if both validations succeed will the order be stored in the Order Service database.
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
 *                 example: "user123"
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
 *         description: Validation failed (User or Menu)
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
