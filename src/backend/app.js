// Load environment variables from .env file
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

// Middleware to parse JSON bodies
app.use(express.json());

// Auth routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello World from Calendario de Reservas Backend!');
});

app.listen(port, () => {
  console.log(`Backend server listening on port ${port}`);
});
