import express from 'express';
import { getHouses, gethouse } from '../controllers/houses.controller.js';
import { authenticateUser } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get("/", authenticateUser, getHouses)
router.get("/:id", authenticateUser, gethouse)

export default router