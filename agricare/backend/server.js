import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import authRoutes from './routes/auth.js';
import requestRoutes from './routes/requests.js';
import adminRoutes from './routes/admin.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ ok: true, name: 'AgriCare API' });
});

app.use('/api/auth', authRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/admin', adminRoutes);

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');
    mongoose.connection.on('disconnected', () => {
  console.log('MongoDB Disconnected!');
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB Connected!');
});

mongoose.connection.on('error', (err) => {
  console.log('MongoDB Error:', err.message);
});
    // Create Admin automatically if not exists
    if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
      const email = process.env.ADMIN_EMAIL.toLowerCase();

      let admin = await User.findOne({ email });

      if (!admin) {
        const hashedPassword = await bcrypt.hash(
          process.env.ADMIN_PASSWORD,
          10
        );

        admin = await User.create({
          name: 'AgriCare Admin',
          email,
          phone: '0000000000',
          password: hashedPassword,
          role: 'admin'
        });

        console.log('Admin account created successfully');
      } else if (admin.role !== 'admin') {
        admin.role = 'admin';
        await admin.save();
        console.log('Existing account promoted to admin');
      } else if (process.env.RESET_ADMIN_PASSWORD === 'true') {
      const newPassword = process.env.ADMIN_PASSWORD;

      if (!newPassword || newPassword.length < 12) {
        throw new Error('Set ADMIN_PASSWORD to at least 12 characters before reset.');
      }

      admin.password = await bcrypt.hash(newPassword, 10);
      await admin.save();
      console.log('Admin password reset successfully');
    }
    }

    const port = process.env.PORT || 5000;
    app.get('/', (req, res) => {
  res.send('AgriCare Backend is running successfully!');
});
    app.listen(port, () => {
      console.log('API running at http://localhost:${port}');
    });
  } catch (err) {
    console.error('Startup error:', err.message);
    process.exit(1);
  }
}
start();