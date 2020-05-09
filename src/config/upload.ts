import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const tempFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  tempFolder,
  uploadsFolder: path.resolve(tempFolder, 'uploads'),
  storage: multer.diskStorage({
    destination: tempFolder,
    filename(request, file, callbak) {
      const fileHash = crypto.randomBytes(10).toString('HEX');
      const fileName = `${fileHash}-${file.originalname}`;

      return callbak(null, fileName);
    },
  }),
};
