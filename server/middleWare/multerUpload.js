const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
require('dotenv').config();

const storage = new GridFsStorage({
    url: process.env.MONGODB_URI,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const filename = file.originalname;
            const fileInfo = {
                filename: filename,
                bucketName: 'uploads'
            };
            resolve(fileInfo);
        });
    }
});

const multerUpload = multer({ storage });
module.exports = multerUpload;