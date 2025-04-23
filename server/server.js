const http = require('http');
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./route/routes');
const { initGFS } = require('./utils/gridfs');
const imageRouter = require('./route/imageRouter');


// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('✅ MongoDB connected');

    // 🔥 Initialize GridFS once Mongo connection is open
    initGFS();
})
.catch(err => console.error('❌ MongoDB connection error:', err));

// Image route to serve GridFS files
app.use('/', imageRouter);

// Main API routes
app.use('/api', router);

// Create HTTP server
const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
