import Habit from "../models/habits.js";

// @desc   Get all habits
// @route   GET /api/habits
// @access   Private
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
        const habits = await Habit.find({ userId }).populate("location");
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
// @access   Private
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
        const { name, category, frequency, timeOfDay, duration, location, date } = req.body;

        if (!name || !category) {
            return res.status(400).json({ success: false, message: 'Name and category are required' });
        }

        let locationData = null;

        if (location) {
            locationData = {
                _id: location._id,
                name: location.name,
                category: location.category,
                position: location.position,
                direction: location.direction,
                website: location.website
            };
        }

        const habit = new Habit({
            name,
            category,
            frequency,
            timeOfDay,
            duration,
            date,
            location: locationData,
            userId,
        });

        const savedHabit = await habit.save();

        res.status(201).json({
            success: true,
            habit: savedHabit
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
    let updateData = { ...req.body }

    try {
        const habit = await Habit.findOne({ _id: id, userId });

        if (!habit) {
            return res.status(404).json({
                success: false,
                message: `Habit with id ${id} not found or doesn't belong to the user.`,
            });
        }

        if (req.body.location) {
            const { _id, name, category, position, direction, website } = req.body.location;

            if (!_id || !name) {
                return res.status(400).json({ success: false, message: "Invalid location data" });
            }

            updateData.location = { _id, name, category, position, direction, website };
        }

        const updatedHabit = await Habit.findByIdAndUpdate(
            id,
            updateData,
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
