import mongoose, { Schema } from 'mongoose';

const connectionSchema = new Schema({
  userId: Number,
  socketId: Number,
});

export default mongoose.model('Connection', connectionSchema);
