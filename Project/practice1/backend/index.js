const express = require("express");
const cors = require('cors');
const multer = require('multer');
const bcrypt=require('bcryptjs')
require("./db"); // Import the database connection
const Collection = require("./collectionSchema"); // Import the collection schema

const app = express();

// helps to parse req data
app.use(express.json());
app.use(cors());

function isValidEmail(email) {
  // Regular expression for a simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

// Multer upload configuration
const upload = multer({ storage });

app.post("/addUser", upload.single('file'), async (req, resp) => {
  const { name, email, imageName } = req.body;
  try {
    if (name.trim() !== '' && email.trim() !== '') {
      if (isValidEmail(email)) {
        const oldUser = await Collection.findOne({ email }); // Use await here
        if (oldUser) {
          return resp.send({ status: "User already exists" });
        }

        const collection = new Collection({ name, email, imageName });
        await collection.save();
        resp.send({ status: "User added successfully" });
      } else {
        resp.send({ status: "Invalid email address" });
      }
    } else {
      resp.send({ status: "Empty field" });
    }
  } catch (error) {
    resp.send({ status: error });
  }
});

app.listen(5000, () => {
  console.log(`Server is running at http://localhost:5000`);
});
