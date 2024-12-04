import express from 'express';
import { createHabit, deleteHabit, getHabit, getHabits, updateHabit } from '../controllers/habits.js';

const router = express.Router();

router
    .route("/")
    .get(getHabits)
    .post(createHabit)

router
    .route("/:id")
    .get(getHabit)
    .put(updateHabit)
    .delete(deleteHabit)

export default router;