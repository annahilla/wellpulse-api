import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: {
        type: String,
        required: true,
        enum: [
            "parks",
            "cafes",
            "gyms",
            "civicCenters",
            "healthyRestaurants",
            "relaxZones",
            "coworking",
            "outdoorSports",
            "libraries",
            "hikingRoutes",
            "craftWorkshops",
        ],
    },
    position: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
    },
});

const Location = new mongoose.model('Location', locationSchema);

export default Location;