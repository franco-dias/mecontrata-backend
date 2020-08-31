import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017', {
  dbName: 'mecontrata-chat',
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('open', () => {
  console.log('mongo connection ok!');
});

db.on('error', () => {
  console.log('mongo connection failed.');
});
