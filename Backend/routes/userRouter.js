const express = require('express');
const router = express.Router();
const { signup, login } = require('../controller/userController');
const { fileUpload ,getFile,deleteFile,downloadFile} = require('../controller/fileContoller');
const multer = require('multer');
const shortid = require('shortid');

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const uniqueCode = Math.floor(Math.random() * 900000) + 100000; // Generate a 6-digit random number
    const extension = file.originalname.substring(file.originalname.lastIndexOf('.') + 1); // Get the file extension
    const fileName = `${uniqueCode}.${extension}`; // Use the unique code and file extension in the filename
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.post('/signup', signup);
router.post('/login', login);
router.post('/upload', upload.single('file'), fileUpload);
router.get('/getdata',getFile)
router.delete('/delete',deleteFile)
router.get('/download/:filename',downloadFile)

module.exports = router;
