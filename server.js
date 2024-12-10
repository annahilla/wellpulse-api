import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import habits from './routes/habits.js';
import options from './routes/options.js'
import admin from 'firebase-admin';
import path from "path";

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV;
const dbURI = process.env.MONGODB_URI;
const serviceAccountPath = path.resolve(`./config/${process.env.SERVICE_ACCOUNT_KEY}.json`);

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountPath),
  });
  console.log("Firebase Admin SDK initialized successfully.");
} catch (error) {
  console.error("Error initializing Firebase Admin SDK:", error);
}

const app = express();

app.use(cors());

app.use("/api/habits", habits);
app.use("/api/options", options);

if (!dbURI) {
  console.error("Error: MONGODB_URI isn't defined");
  process.exit(1);
}

mongoose.connect(dbURI)
  .then((result) => {
    app.listen(PORT, (req, res) => {
      console.log(`Server runnging in ${NODE_ENV} mode on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });





