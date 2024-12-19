import mongoose from "mongoose";

const habitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add the name of the habit'],
    },
    category: {
        type: String,
        required: [true, 'Please select at least one category'],
        enum: [
            'Sports',
            'Nutrition',
            'Mental health',
            'Learning',
            'Art',
        ],
        message: 'Please select a valid category'
    },
    frequency: {
        type: String,
        required: [true, 'Please select the frequency of the habit'],
        enum: [
            'Daily',
            'Weekly'
        ],
        message: 'Please select a valid frequency'
    },
    timeOfDay: {
        type: String,
        required: [true, 'Please specify a time of day']
    },
    duration: {
        type: Number,
        required: [true, 'Please select the duration of the habit'],
        min: [1, 'Duration must be at least 1 minute'],
        max: [1440, 'Duration must not exceed 1440 minutes (24 hours)'],
        message: 'Please provide a valid duration'
    },
    date: {
        type: String,
        required: [true, 'Please select a date']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    completedDays: {
        type: [String]
    },
    userId: {
        type: String,
        ref: 'User'
    }
}, { timestamps: true });

const Habit = new mongoose.model('Habit', habitSchema);

export default Habit;