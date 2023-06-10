const express = require('express');
const router = express.Router();
const fs = require('fs');
const { signup, login } = require('../controller/userController');
const multer = require('multer');
const shortid = require('shortid');

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const uniqueCode = shortid.generate(); // Generate a unique code using shortid
    const fileName = `${uniqueCode}-${file.originalname}`;
    cb(null, fileName);
  },
});


const upload = multer({ storage: storage });

router.post('/signup', signup);
router.post('/login', login);
router.post('/upload', upload.single('file'), (req, res) => {
  console.log("filename ",req.file)
  const uniqueCode = req.file.filename.split('-')[0]; // Extract the generated code from the file name
console.log('usnidiode ',uniqueCode)
  fs.writeFile(`uploads/${req.file.filename}`, req.file.buffer, (err) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.json({ code: uniqueCode, filename: req.file.filename });
    }
  });
});

module.exports = router;
