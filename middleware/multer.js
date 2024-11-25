const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Common storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the destination based on the file type
    let uploadPath;
    if (file.fieldname === 'applicantPhoto') {
      uploadPath = 'uploads/applicantPhoto';
    } else if (file.fieldname === 'applicantSign') {
      uploadPath = 'uploads/applicantSign';
    } else if (file.fieldname === 'sponsorSign') {
      uploadPath = 'uploads/sponsorSign';
    } else if (file.fieldname === 'productImage') {
      uploadPath = 'uploads/product';
    }

    // Check if directory exists, if not, create it
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${file.fieldname}_${uniqueSuffix}${ext}`);
  },
});

// Multer upload configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },  
  fileFilter: function (req, file, cb) {
    const fileTypes = /jpeg|jpg|png/;  
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (mimeType && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only .png, .jpg, and .jpeg formats are allowed!"));
    }
  }
});

module.exports = { upload };
