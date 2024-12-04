import express from 'express';
import mongoose  from 'mongoose';
import cors from 'cors';
import habits from './routes/habits.js';
import admin from 'firebase-admin'

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV;
const dbURI = process.env.MONGODB_URI;
const serviceAccountKey = process.env.SERVICE_ACCOUNT_KEY;

admin.initializeApp({
  credential: firebaseAdmin.credential.cert(require(`./${serviceAccountKey}.json`))
});

const app = express();
app.use(cors());
app.use("/api/habits", habits);

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

 
  


