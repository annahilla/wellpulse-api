import Habit from "../models/habits.js";

// @desc   Get all habits
// @route   GET /api/habits
// @access   Public
export const getHabits = async (req, res, next) => {
    try {
        const habits = await Habit.find();
        res.status(200).json({ 
            success: true, 
            message: 'Show all habits', 
            data: habits
        });
    } catch (err) {
        console.log(err);
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error, please try again later.' });
    }
}

// @desc   Get single habit
// @route   GET /api/habits/:id
// @access   Public
export const getHabit = async (req, res, next) => {
    const id = req.params.id;

    try {
        const habit = await Habit.findById(id);
        if (!habit) {
            return res.status(404).json({ success: false, message: `Habit with id ${id} not found.` });
        }
        res.status(200).json({ 
            success: true, 
            message: `Show habit ${id}`,
            data: habit
        });
    } catch (err) {
        console.log(err);
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error, please try again later.' });
    }
}

// @desc   Create habit
// @route   POST /api/habits/
// @access   Private
export const createHabit = async (req, res, next) => {
    try {
        const { name, category } = req.body;
        if (!name || !category) {
            return res.status(400).json({ success: false, message: 'Name and category are required' });
        }

        const habit = new Habit({ name, category });
        const savedHabit = await habit.save();
        res.status(201).json({
            success: true,
            message: 'New habit created successfully',
            data: savedHabit,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error, please try again later.' });
    }
}

// @desc   Update habit
// @route   PUT /api/habits/:id
// @access   Private
export const updateHabit = async (req, res, next) => {
    const id = req.params.id;

    try {
        const habit = await Habit.findById(id);
        if (!habit) {
            return res.status(404).json({ success: false, message: `Habit with id ${id} not found.` });
        }

        const { name, category } = req.body;
        if (name) habit.name = name;
        if (category) habit.category = category;

        const updatedHabit = await habit.save();
        res.status(200).json({
            success: true,
            message: `Habit with id ${id} updated successfully`,
            data: updatedHabit,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error, please try again later.' });
    }
}

// @desc   Delete habit
// @route   DELETE /api/habits/:id
// @access   Private
export const deleteHabit = async (req, res, next) => {
    const id = req.params.id;
    try {
        const habit = await Habit.findById(id);
        if (!habit) {
            return res.status(404).json({ success: false, message: `Habit with id ${id} not found.` });
        }

        await habit.remove();
        res.status(200).json({
            success: true,
            message: `Habit with id ${id} deleted successfully`,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error, please try again later.' });
    }
}