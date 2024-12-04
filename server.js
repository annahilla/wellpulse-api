import express from 'express';
import mongoose  from 'mongoose';
import cors from 'cors';
import habits from './routes/habits.js';

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV;
const dbURI = process.env.MONGODB_URI;

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
  


