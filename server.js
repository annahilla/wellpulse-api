import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import habits from './routes/habits.js';
import options from './routes/options.js';
import locations from './routes/locations.js'
import auth from './routes/auth.js'
import admin from 'firebase-admin';
import path from "path";

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV;
const dbURI = process.env.MONGODB_URI;
const serviceAccountPath = path.resolve(`./config/${process.env.SERVICE_ACCOUNT_KEY}.json`);

const serviceAccount = JSON.parse(
  Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT, 'base64').toString('utf8')
);

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log("Firebase Admin SDK initialized successfully.");
} catch (error) {
  console.error("Error initializing Firebase Admin SDK:", error);
}

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173", "https://wellpulse-api.vercel.app"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/habits", habits);
app.use("/api/options", options);
app.use("/api/auth", auth);
app.use("/api/locations", locations);

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

export default app;



