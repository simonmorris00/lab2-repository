const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');

//Create tag for customer operations
/**
    * @swagger
    * tags:
    *   name: Customers
    *   description: Customer management operations
    */

//Create schema for customer operations
/**
 * @swagger
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: The customer's name
 */

//Create new customer
/**
 * @swagger
 * /customers:
 *   post:
 *     tags: [Customers]
 *     summary: Create a new customer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       201:
 *         description: Customer created
 *       400:
 *         description: Customer creation failed
 */
router.post('/', async (req, res) => {
    const customer = new Customer({ name: req.body.name });
  try {
    const newCustomer = await customer.save();
    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all customers
/**
    * @swagger
    * /customers:
    *   get:
    *     tags: [Customers]
    *     summary: Retrieve a list of customers
    *     responses:
    *       201:
    *         description: List of customers generated
    *       500:
    *         description: List of customers failed to generate
    */
router.get('/', async (req, res) => {
  try {
    const customers = await Item.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a customer
 /**
    * @swagger
    * /customers:
    *   patch:
    *     tags: [Customers]
    *     summary: Update a customer
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/Customer'
    *     responses:
    *       200:
    *         description: Customer updated
    *       400:
    *         description: Customer update failed
    */
router.patch('/:id', async (req, res) => {
    try {
      const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedCustomer);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

// Delete a customer
 /**node
    * @swagger
    * /customers:
    *   delete:
    *     tags: [Customers]
    *     summary: Delete a customer
    *     responses:
    *       200:
    *         description: Customer deleted
    *       400:
    *         description: Customer failed to delete
    */
router.delete('/:id', async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;