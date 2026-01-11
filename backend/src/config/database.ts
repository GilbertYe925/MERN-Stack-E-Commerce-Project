import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI;
        
        if (!mongoURI) {
            console.error('MONGODB_URI is not set in environment variables!');
            throw new Error('MONGODB_URI environment variable is required');
        }

        console.log('Attempting to connect to MongoDB...');
        
        await mongoose.connect(mongoURI, {
            serverSelectionTimeoutMS: 10000, // 10 seconds timeout
            socketTimeoutMS: 45000,
        });
        
        console.log('✅ Connected to MongoDB successfully');
        
        // Handle connection events
        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });
        
        mongoose.connection.on('disconnected', () => {
            console.warn('MongoDB disconnected');
        });
        
    } catch (error) {
        console.error('❌ Error connecting to MongoDB:', error);
        console.error('Please check:');
        console.error('1. MONGODB_URI environment variable is set correctly');
        console.error('2. MongoDB server is accessible from your backend');
        console.error('3. If using MongoDB Atlas, your IP is whitelisted');
        console.error('4. Connection string format is correct');
        process.exit(1);
    }
}

export default connectDB;