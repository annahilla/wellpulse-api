import mongoose from "mongoose";

const habitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add the name of the habit'],
    },
    category: {
        type: [String],
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
        ]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

const Habit = new mongoose.model('Habit', habitSchema);

export default Habit;