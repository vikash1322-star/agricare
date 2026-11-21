import mongoose from 'mongoose';
const serviceRequestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  serviceType: { type: String, required: true }, crop: { type: String, required: true }, details: String,
  status: { type: String, enum: ['Pending','Approved','Rejected'], default: 'Pending' }, adminNote: String
}, { timestamps: true });
export default mongoose.model('ServiceRequest', serviceRequestSchema);
