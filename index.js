const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1/mydatabase', {
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Swagger definition
const swaggerOptions = {
  swaggerDefinition: {
      openapi: '3.0.0',
      info: {
          title: 'My API',
          version: '1.0.0',
          description: 'API documentation using Swagger',
      },
      servers: [
          {
              url: `http://localhost:${PORT}`,
          },
      ],
 components: {
   securitySchemes: {
       bearerAuth: {
           type: 'http',
           scheme: 'bearer',
           bearerFormat: 'JWT', 
       },
   },
},
  },
  apis: ['./routes/*.js'], // Path to your API docs
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

app.get("/:universalURL", (req, res) => {
  res.send("404 URL NOT FOUND");
});

const customerRoutes = require('./routes/customers');
app.use('/api', customerRoutes);

const ordersRoutes = require('./routes/orders');
app.use('/api', ordersRoutes);

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  delay(5000);
});