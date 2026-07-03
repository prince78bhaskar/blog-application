import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './model/User.js';

dotenv.config({ path: './.env' });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/digiquest';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || process.env.ADMIN_PASS || 'Admin@12345';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@digiquest.com';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_NAME = process.env.ADMIN_NAME || 'Admin';
const ADMIN_MOBILE = process.env.ADMIN_MOBILE || '9999999999';

async function createAdmin() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 });
    console.log('Connected to MongoDB.');

    const existing = await User.findOne({ username: ADMIN_USERNAME });
    if (existing) {
      console.log('Admin already exists in database:');
      console.log(`  username: ${existing.username}`);
      console.log(`  email: ${existing.email}`);
      return;
    }

    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);

    const adminUser = await User.create({
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      username: ADMIN_USERNAME,
      password: passwordHash,
      mobile: ADMIN_MOBILE,
      role: 'admin'
    });

    console.log('Created admin user successfully:');
    console.log(`  username: ${adminUser.username}`);
    console.log(`  email: ${adminUser.email}`);
    console.log(`  password: ${ADMIN_PASSWORD}`);
  } catch (error) {
    console.error('Failed to create admin user:');
    console.error(error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

createAdmin();
