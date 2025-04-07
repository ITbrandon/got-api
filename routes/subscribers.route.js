import express from 'express';
import { subscribeToNewsLetter } from '../controllers/subscribers.controller.js';

const router = express.Router();

router.get("/", subscribeToNewsLetter)

export default router