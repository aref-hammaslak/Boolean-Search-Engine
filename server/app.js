import mongoose from 'mongoose';
import express from 'express';
import { router } from './route.js';
import cors from 'cors';


const app = express();
app.use(cors());
// Middleware
app.use(express.json());

// MongoDB connection
const dbURI = process.env.MONGO_URI || 'mongodb://localhost:27017/digikala-comments';
await mongoose.connect(dbURI);
    



// Routes
app.get('/', (req, res) => {
    res.send('Hello, Express and MongoDB!');
});
app.use('/api', router);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});