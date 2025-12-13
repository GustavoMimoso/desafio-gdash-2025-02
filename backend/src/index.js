// src/index.js
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const catalogRoutes = require('./routes/catalogs');
const productRoutes = require('./routes/products');

const app = express();

// Middleware
app.use(express.json());

// Database
mongoose.connect('mongodb://mongo:27017/gdash');

// Routes
app.use('/auth', authRoutes);
app.use('/catalogs', catalogRoutes);
app.use('/products', productRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.listen(3000, () => {
  console.log('API running on port 3000');
});
