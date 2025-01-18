import express from 'express';
import { getLocations } from '../controllers/locations.js';

const router = express.Router();

router
    .route("/")
    .get(getLocations);

export default router;