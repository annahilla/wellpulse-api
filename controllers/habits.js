// @desc   Get all habits
// @route   GET /api/habits
// @access   Public
export const getHabits = (req, res, next) => {
    res.status(200).json({ success: true, message: 'Show all habits' });
}

// @desc   Get single habit
// @route   GET /api/habits/:id
// @access   Public
export const getHabit = (req, res, next) => {
    const id = req.params.id;
    res.status(200).json({ success: true, message: `Show habit ${id}` });
}

// @desc   Create habit
// @route   POST /api/habits/
// @access   Private
export const createHabit = (req, res, next) => {
    res.status(200).json({ success: true, message: 'Create new habit' });
}

// @desc   Update habit
// @route   PUT /api/habits/:id
// @access   Private
export const updateHabit = (req, res, next) => {
    const id = req.params.id;
    res.status(200).json({ success: true, message: `Update habit ${id}` });
}

// @desc   Delete habit
// @route   DELETE /api/habits/:id
// @access   Private
export const deleteHabit = (req, res, next) => {
    const id = req.params.id;
    res.status(200).json({ success: true, message: `Delete habit ${id}` });
}