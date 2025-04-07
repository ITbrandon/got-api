import express from 'express';
import { subscribeToNewsLetter } from '../controllers/subscribers.controller.js';

const router = express.Router();

router.post("/", subscribeToNewsLetter)

export default router