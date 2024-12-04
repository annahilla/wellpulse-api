import mongoose from "mongoose";

const habitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Habit = new mongoose.model('Habit', habitSchema);

export default Habit;