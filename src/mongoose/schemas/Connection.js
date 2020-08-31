import mongoose, { Schema } from 'mongoose';

const connectionSchema = new Schema({
  userId: Number,
  socketId: String,
});

export default mongoose.model('Connection', connectionSchema);
