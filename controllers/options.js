import Habit from "../models/habits.js";

// @desc   Get habits categories options
// @route   GET /api/habits/categories
// @access   Public
export const getHabitCategoriesOptions = (req, res) => {
    try {
        const categoryOptions = Habit.schema.path('category').enumValues;

        if (categoryOptions.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No categories found in the schema.',
            });
        }

        res.status(200).json({
            success: true,
            results: categoryOptions.length,
            categories: categoryOptions,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: 'Server error while fetching categories.'
        });
    }
};

// @desc   Get habits frequency options
// @route   GET /api/habits/frequencies
// @access   Public
export const getHabitFrequencyOptions = (req, res) => {
    try {
        const frequencyOptions = Habit.schema.path('frequency').enumValues;
        
        if (frequencyOptions.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No frequency options found in the schema.',
            });
        }
        res.status(200).json({
            success: true,
            results: frequencyOptions.length,
            frequencies: frequencyOptions,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: 'Server error while fetching frequency options.',
        });
    }
};