import express from 'express';
import { getHabitCategoriesOptions, getHabitFrequencyOptions } from '../controllers/options.js';

const router = express.Router();

router
    .route("/categories")
    .get(getHabitCategoriesOptions);  

router
    .route("/frequencies")
    .get(getHabitFrequencyOptions);    

export default router;
