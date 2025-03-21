import multer, { diskStorage } from "multer";
import { extname } from "path";

const generateFileName = (file) => {
  const timestamp = Date.now();
  const ext = extname(file.originalname);
  return `${timestamp}${ext}`;
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const fileName = generateFileName(file);
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

export default upload;
