import express from 'express';
import { createHabit, deleteHabit, getHabit, getHabits, updateHabit } from '../controllers/habits.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router
    .route("/")
    .get(verifyToken, getHabits)
    .post(verifyToken, createHabit)

router
    .route("/:id")
    .get(verifyToken, getHabit)
    .put(verifyToken, updateHabit)
    .delete(verifyToken, deleteHabit)

export default router;