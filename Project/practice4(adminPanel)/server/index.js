require('dotenv').config();
const express = require("express");
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");
const connectDb = require("./utils/db");
const errorMiddleware=require('./middlewares/error-middleware');
const cors=require('cors')

const app = express();

// Middleware should be placed before routes
app.use(cors())
app.use(express.json());
app.use("/api/auth", authRoute);
app.use('/api/form',contactRoute); 
app.use('/api/data',serviceRoute);
app.use('/api/admin',adminRoute)
app.use(errorMiddleware)

const startServer = async () => {
  try {
    await connectDb();
    app.listen(5000, () => {
      console.log("Server is running at port: 5000");
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();
