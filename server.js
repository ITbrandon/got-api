import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import characterRoute from './routes/character.route.js'
import houseRoute from './routes/house.route.js'
import authRoutes from './routes/auth.route.js'

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use('/api/characters', characterRoute)

app.use('/api/houses', houseRoute)

app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
    res.send('Welcome to the Game of Thrones API!');
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected!");
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch(() => {
    console.log("Failed to Connect to Server");
  });