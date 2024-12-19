import express from 'express';
import { setToken } from '../controllers/auth.js';

const router = express.Router();

router
    .route("/set-token")
    .post(setToken);  

export default router;
