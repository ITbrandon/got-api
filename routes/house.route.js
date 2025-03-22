import express from 'express';
import { getHouses, gethouse } from '../controllers/houses.controller.js';

const router = express.Router();

router.get("/", getHouses)
router.get("/:id", gethouse)

export default router