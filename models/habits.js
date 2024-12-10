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
            'Sleep',
            'Learning',
            'Work',
            'Finances',
            'Music',
            'Art',
            'Sustainability',
            'Personal growth'
        ],
        message: 'Please select a valid category'
    },
    frequency: {
        type: String,
        required: [true, 'Please select the frequency of the habit'],
        enum: [
            'Daily',
            'Weekly',
            'Monthly'
        ],
        message: 'Please select a valid frequency'
    },
    timeOfDay: {
        type: String,
        required: [true, 'Please specify a time of day'],
        match: [/^(?:[01]\d|2[0-3]):([0-5]\d)$/, 'Please enter a valid time in HH:mm format']
    },
    duration: {
        type: Number,
        required: [true, 'Please select the duration of the habit'],
        min: [1, 'Duration must be at least 1 minute'],
        max: [1440, 'Duration must not exceed 1440 minutes (24 hours)'],
        message: 'Please provide a valid duration'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }
}, { timestamps: true });

const Habit = new mongoose.model('Habit', habitSchema);

export default Habit;