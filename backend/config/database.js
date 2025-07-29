const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
    if (isConnected) {
        return;
    }
    
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI);
        isConnected = true;
        console.log(`mongodb connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        throw error; // Don't exit in serverless environment
    }
};

module.exports = connectDB;