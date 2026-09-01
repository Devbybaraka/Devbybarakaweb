import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoMemoryServer;

export const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;

  try {
    if (mongoUri) {
      try {
        const conn = await mongoose.connect(mongoUri, {
          serverSelectionTimeoutMS: 5000,
        });

        console.log(`MongoDB connected: ${conn.connection.host}`);
        return;
      } catch (error) {
        console.warn('MongoDB connection failed. Falling back to in-memory MongoDB for local testing.');
      }
    } else {
      console.warn('No MongoDB URI found in environment variables. Falling back to in-memory MongoDB for local testing.');
    }

    if (!mongoMemoryServer) {
      mongoMemoryServer = await MongoMemoryServer.create();
    }

    const fallbackUri = mongoMemoryServer.getUri();
    const conn = await mongoose.connect(fallbackUri);
    console.log(`MongoDB connected via in-memory server: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    throw error;
  }
};
