// app.js or server.js
const express = require('express');
const mongoose = require('mongoose');
const companyRoutes = require('./routes/companyRoutes'); // Import company routes
const authRoutes = require('./routes/authRoutes'); // Import auth routes
const quizRoutes = require('./routes/quizRoutes'); // Import quiz routes

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/companies', companyRoutes); // Company routes
app.use('/auth', authRoutes); // Authentication routes
app.use('/quiz', quizRoutes); // Quiz routes

// Connect to MongoDB
const mongoURI = 'YOUR_MONGODB_URI';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected successfully');
    // Start the server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
