import Habit from "../models/habits.js";
import { calculateEndTime } from "../utils/calculateEndTime.js";

// @desc   Get all habits
// @route   GET /api/habits
// @access   Public
export const getHabits = async (req, res, next) => {
    const userId = req.user.uid;

    if (!userId) {
        console.error("No user ID found in request");
        return res.status(400).json({
            success: false,
            message: "User not authenticated, no user ID found",
        });
    }

    try {
        console.log("Fetching habits for user: ", userId);
        const habits = await Habit.find({ userId });
        res.status(200).json({
            success: true,
            results: habits.length,
            data: habits
        });
    } catch (err) {
        console.error("Error in getHabits: ", err)
        res.status(500).json({ 
            success: false, 
            message: 'Server error, please try again later.',
            error: err.message, 
         });
    }
}

// @desc   Get single habit
// @route   GET /api/habits/:id
// @access   Public
export const getHabit = async (req, res, next) => {
    const userId = req.user.uid;
    const id = req.params.id;

    try {
        const habit = await Habit.findOne({ _id: id, userId: userId });
        if (!habit) {
            return res.status(404).json({
                success: false,
                message: `Habit with id ${id} not found.`
            });
        }
        res.status(200).json({
            success: true,
            data: habit
        });
    } catch (err) {
        res.status(400).json({ success: false, message: 'Server error, please try again later.' });
    }
}

// @desc   Create habit
// @route   POST /api/habits/
// @access   Private
export const createHabit = async (req, res, next) => {
    const userId = req.user.uid;
    try {
        const { name, category, frequency, timeOfDay, duration, date } = req.body;
        if (!name || !category) {
            return res.status(400).json({ success: false, message: 'Name and category are required' });
        }

        const habit = new Habit({ name, category, frequency, timeOfDay, duration, date, userId });
        const savedHabit = await habit.save();

        const endTime = calculateEndTime(newHabit.timeOfDay, newHabit.duration);

        const startDateTime = new Date(`${newHabit.date}T${newHabit.timeOfDay}:00`);
        const endDateTime = new Date(`${newHabit.date}T${endTime}:00`);

        const event = {
            title: savedHabit.name,
            start: startDateTime.toISOString(),
            end: endDateTime.toISOString()
        }

        res.status(201).json({
            success: true,
            data: savedHabit,
            event: event,
        });
    } catch (err) {
        console.error("Error creating habit:", err);
        res.status(400).json({ success: false, message: 'Server error, please try again later.' });
    }
}

// @desc   Update habit
// @route   PUT /api/habits/:id
// @access   Private
export const updateHabit = async (req, res, next) => {
    const userId = req.user.uid; 
    const id = req.params.id; 

    try {
        const habit = await Habit.findOne({ _id: id, userId });

        if (!habit) {
            return res.status(404).json({
                success: false,
                message: `Habit with id ${id} not found or doesn't belong to the user.`,
            });
        }

        const updatedHabit = await Habit.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        res.status(200).json({
            success: true,
            data: updatedHabit,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: 'Server error, please try again later.',
        });
    }
};


// @desc   Delete habit
// @route   DELETE /api/habits/:id
// @access   Private
export const deleteHabit = async (req, res, next) => {
    const userId = req.user.uid;
    const id = req.params.id;

    try {
        const habit = await Habit.findOne({ _id: id, userId });

        if (!habit) {
            return res.status(404).json({
                success: false,
                message: `Habit with id ${id} not found or doesn't belong to the user.`,
            });
        }

        await Habit.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            data: {},
        });

    } catch (err) {
        res.status(400).json({
            success: false,
            message: 'Server error, please try again later.',
        });
    }
};
