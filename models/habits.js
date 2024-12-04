import mongoose from "mongoose";

const habitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

const Habit = new mongoose.model('Habit', habitSchema);

export default Habit;