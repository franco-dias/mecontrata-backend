import mongoose, { Schema } from 'mongoose';

const messageSchema = new Schema({
  sender: Number,
  recipient: Number,
  ad: Number,
  messageId: String,
  text: String,
  createdAt: String,
  seen: Boolean,
});

export default mongoose.model('Message', messageSchema);
