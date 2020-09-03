const express = require('express');
const connectDB = require('./config/db');

const app = express();

// connect DB
connectDB();

// Init middleware
app.use(express.json());

// Set routes
app.use('/api/v1/auth', require('./api/auth')); 
app.use('/api/v1/flats', require('./api/flats'));
app.use('/api/v1/users', require('./api/users'));

// Default get
app.get('/', (req, res) => {
  res.json({ msg: "Hello FlatSaver API" });
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))