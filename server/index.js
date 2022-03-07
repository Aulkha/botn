// Imports
import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';

// Setup
dotenv.config();
mongoose.connect(process.env.DB_CONNECT).then(console.log('Connected to Database'));
const app = express();

// Middlewares
app.use(express.json());
app.use((req, res, next) => {
    console.log(`A ${req.method} request was sent to ${req.url}`);
    next();
});

// Import Routes
import territory from './routes/territory.js';
import nation from './routes/nation.js';

// Use Routes
app.use('/api/territory', territory);
app.use('/api/nation', nation);

// Start Server
app.listen(process.env.PORT || 8000, () => console.log(`Listening on ${process.env.PORT || 8000}`));