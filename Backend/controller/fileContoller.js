const fs = require("fs");
const path = require("path");
const User = require("../model/userModel");

const fileUpload = async (req, res) => {
  console.log("filename ", req.body.userId);
  const uniqueCode = req.file.filename.split("-")[0];
  console.log("uniqueCode ", uniqueCode);

  try {
    const fileData = fs.readFileSync(req.file.path);

    fs.writeFileSync(`uploads/${req.file.filename}`, fileData); // Write the file to the destination

    const loggedInUserId = req.body.userId;

    // Push the unique code to the uploadedFiles array of the logged-in user
    const user = await User.findOneAndUpdate(
      { _id: loggedInUserId },
      { $push: { uploadedFiles: uniqueCode } },
      { new: true }
    );

    res.json({ code: uniqueCode, filename: req.file.filename });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};



const getFile = async (req, res) => {
  const { userId } = req.query;
  console.log("req body ", userId);
  try {
    if (!userId) {
      return res.status(400).json({ error: "Invalid userId" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const filteredFiles = user.uploadedFiles; // Get the uploadedFiles array from the user object

    console.log("filtered files ", filteredFiles);
    res.json({ files: filteredFiles });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};



const deleteFile = async (req, res) => {
  try {
    const { card, userId } = req.body;
    console.log("user id in delete", userId);
    const filePath = path.join(__dirname, "../uploads", card);

    // Delete file from the filesystem
    fs.unlink(filePath, async (error) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to delete file" });
      }

      try {
        // Delete file reference from the user's uploadedFiles array in the database
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }

        const fileIndex = user.uploadedFiles.indexOf(card);
        if (fileIndex !== -1) {
          user.uploadedFiles.splice(fileIndex, 1);
          await user.save();
        }

        res.sendStatus(200);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};



const downloadFile = (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, "..", "uploads", filename);

  res.setHeader("Content-Disposition", `attachment; filename=${filename}`);

  // Stream the file to the response
  res.sendFile(filePath);
};

module.exports = {
  fileUpload,
  getFile,
  deleteFile,
  downloadFile,
};
