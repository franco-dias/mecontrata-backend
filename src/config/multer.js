import { resolve } from 'path';
import multer from 'multer';
import { v4 } from 'uuid';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, resolve(__dirname, '..', '..', 'tmp', 'uploads'));
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    const newName = v4() + originalname;
    cb(null, newName);
  },
});

const uploader = multer({ storage });

export default uploader;
