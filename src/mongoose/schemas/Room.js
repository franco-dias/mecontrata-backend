import mongoose, { Schema } from 'mongoose';

const roomSchema = new Schema({
  userList: [{
    id: Number,
    name: String,
    phoneNumber: String,
    email: String,
    avatar: {
      url: String,
    },
  }],
  title: String,
  roomId: String,
  updatedAt: Date,
  announcementId: Number,
  lastMessageId: String,
});

export default mongoose.model('Room', roomSchema);
