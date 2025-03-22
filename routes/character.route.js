import express from 'express';
import { getCharacters, getCharacter } from '../controllers/characters.controller.js';

const router = express.Router();

router.get("/", getCharacters)
router.get("/:id", getCharacter)

export default router