import Location from "../models/locations.js";

// @desc   Get all locations
// @route   GET /api/locations
// @access   Public
export const getLocations = async (req, res, next) => {
    try {
        const locations = await Location.find();
        res.status(200).json({
            success: true,
            results: locations.length,
            data: locations
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error, please try again later.',
            error: err.message,
        });
    }
}