const fs = require('fs');
const path = require('path');

const fileUpload = (req, res) => {
  console.log("filename ", req.file);
  const uniqueCode = req.file.filename.split('-')[0]; // Extract the generated code from the file name
  console.log('uniqueCode ', uniqueCode);

  try {
    const fileData = fs.readFileSync(req.file.path); // Read the file data synchronously

    fs.writeFileSync(`uploads/${req.file.filename}`, fileData); // Write the file to the destination

    res.json({ code: uniqueCode, filename: req.file.filename });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const getFile = (req, res) => {
    const directoryPath = path.join(__dirname, '..', 'uploads');
  
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        console.log('filedss ',files)
        res.json({ files });
      }
    });
  }


  const deleteFile = async (req, res) => {
    try {
      const { card } = req.body;
      const filePath = path.join(__dirname, '../uploads', card);

    //   const filePath = `../uploads/${card}`; // Update the file path with the correct directory
  
      fs.unlink(filePath, (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({ error: 'Failed to delete file' });
        } else {
          res.sendStatus(200);
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  const downloadFile = (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, '..', 'uploads', filename);
  
    // Set the appropriate headers for the file download
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
  
    // Stream the file to the response
    res.sendFile(filePath);
  };
  

module.exports = {
  fileUpload,
  getFile,
  deleteFile,
  downloadFile
};
