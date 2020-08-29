import mongoose, { Schema } from 'mongoose';

const messageSchema = new Schema({
  userId: Number,
  chatId: Number,
  text: String,
  createdAt: String,
});

export default mongoose.model('Message', messageSchema);
