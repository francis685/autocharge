import mongoose from 'mongoose';

const InstallCenterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
    // We add 'index: true' to make searching by city much faster
    index: true,
  },
  phone: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default mongoose.model('InstallCenter', InstallCenterSchema);