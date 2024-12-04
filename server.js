import express from 'express';
import habits from './routes/habits.js'

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV;

const app = express();

app.use("/api/habits", habits)

app.listen(PORT, (req, res) => {
    console.log(`Server runnging in ${NODE_ENV} mode on port ${PORT}`);
});