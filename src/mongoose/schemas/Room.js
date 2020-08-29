import mongoose, { Schema } from 'mongoose';

const roomSchema = new Schema({
  userList: Array,
  chatId: String,
  updatedAt: Date,
});

export default mongoose.model('Chat', roomSchema);
