const express = require('express');
const router = express.Router();
const Order = require('../models/order');

//Create tag for order operations
/**
    * @swagger
    * tags:
    *   name: Orders
    *   description: Order management operations
    */

//Create schema for order operations
/**
    * @swagger
    * components:
    *   schemas:
    *     Order:
    *       type: object
    *       properties:
    *         ordername:
    *           type: string
    *           description: The order's name
    *         description:
    *           type: string
    *           description: The order description
    */

// Create a new order
/**
    * @swagger
    * /orders:
    *   post:
    *     tags: [Orders]
    *     summary: Create a new order
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/Order'
    *     responses:
    *       201:
    *         description: Order created
    *       400:
    *          description: Order creation failed
    */
router.post('/', async (req, res) => {
    const order = new Order({ordername: req.body.ordername});
  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all orders
/**
    * @swagger
    * /orders:
    *   get:
    *     tags: [Orders]
    *     summary: Retrieve a list of orders
    *     responses:
    *       200:
    *         description: List of orders generated
    *       500:
    *         description: List of orders failed to generate
    */
router.get('/', async (req, res) => {
  try {
    const orders = await Item.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update an order
 /**
    * @swagger
    * /orders:
    *   patch:
    *     tags: [Orders]
    *     summary: Update an order
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/Order'
    *     responses:
    *       200:
    *         description: Order updated
    *       400:
    *         description: Order update failed
    */
 router.patch('/:id', async (req, res) => {
    try {
      const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedCustomer);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

// Delete an order
 /**
    * @swagger
    * /orders:
    *   delete:
    *     tags: [Orders]
    *     summary: Delete an order
    *     responses:
    *       200:
    *         description: Order deleted
    *       400:
    *         description: Order failed to delete
    */
router.delete('/:id', async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;