import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../model/User.js';

dotenv.config({ path: '../.env' });

const DEFAULT_MONGO = 'mongodb://localhost:27017/digiquest';

export default async function createAdmin(options = {}) {
  const mongoUri = options.mongoUri || process.env.MONGO_URI || DEFAULT_MONGO;
  const password = options.password || process.env.ADMIN_PASSWORD || process.env.ADMIN_PASS || 'Admin@12345';

  // connect with short timeout so script fails fast when DB isn't running
  await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });

  const existing = await User.findOne({ username: 'admin' });
  if (existing) {
    console.log('Admin user already exists:', existing.username);
    return existing;
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({
    name: 'Admin',
    email: 'admin@digiquest.com',
    username: 'admin',
    password: hash,
    mobile: '9999999999',
    role: 'admin'
  });

  console.log('Created admin:', user.username);
  console.log('Password:', password);
  return user;
}
