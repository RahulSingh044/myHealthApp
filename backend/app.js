const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config();

// Database connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
// Allow Next.js frontend
app.use(cors({
  origin: process.env.FRONTEND_URL, // your frontend URL
  credentials: true, // allow cookies to be sent
}));

// Routes
const authRoutes = require('./router/auth');
const profileRoutes = require('./router/profile');
const recordsRoutes = require('./router/records');
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/records', recordsRoutes);

// Set port and start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});