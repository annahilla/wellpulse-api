import { Schema, Model } from "mongoose";

const habitSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Habit = new Model('Habit', habitSchema);

export default Habit;