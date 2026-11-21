import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true }, email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: { type: String, required: true }, password: { type: String, required: true }, role: { type: String, enum: ['customer','admin'], default: 'customer' },
  address: String, village: String, district: String, state: String, landSize: String, crops: String
}, { timestamps: true });
export default mongoose.model('User', userSchema);
