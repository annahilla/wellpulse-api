import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: {
        type: String,
        required: true,
        enum: [
            "Parks",
            "Cafes",
            "Gyms",
            "Civic Centers",
            "Healthy Restaurants",
            "Relax Zones",
            "Coworking",
            "Outdoor Sports",
            "Libraries",
            "Hiking Routes",
            "Craft Workshops"
        ],
    },
    direction: { type: String, required: true },
    website: { type: String, required: true },
    position: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
    },
});

const Location = new mongoose.model('Location', locationSchema);

export default Location;