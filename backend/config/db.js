import express from 'express';

import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';


dotenv.config();

console.log(process.env.MONGO_URI);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    } catch (error) {
    console.error("========== MONGOOSE ERROR ==========");
    console.error("name:", error.name);
    console.error("message:", error.message);
    console.error("code:", error.code);
    console.error("cause:", error.cause);
    console.error("reason:", error.reason);
    console.error("stack:\n", error.stack);

    if (error.cause) {
      console.error("CAUSE DETAILS:");
      console.dir(error.cause, { depth: null });
    }

    console.dir(error, { depth: null });

    process.exit(1);
  }
};

export default connectDB;