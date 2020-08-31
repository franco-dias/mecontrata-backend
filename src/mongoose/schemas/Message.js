import mongoose, { Schema } from 'mongoose';

const messageSchema = new Schema({
  userId: Number,
  roomId: String,
  messageId: String,
  text: String,
  createdAt: String,
  seen: Boolean,
});

export default mongoose.model('Message', messageSchema);
