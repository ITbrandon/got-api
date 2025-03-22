import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import characterRoute from './routes/character.route.js'
import houseRoute from './routes/house.route.js'

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors({
  origin: '',
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: "Content-Type"
}));

const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use('/api/characters', characterRoute)

app.use('/api/houses', houseRoute)

app.get('/', (req, res) => {
    res.send('Welcome to the Game of Thrones API!');
});

mongoose
  .connect(
    "mongodb+srv://brandoniticka:Pokeball1@cluster0.dcdqhem.mongodb.net/Got-Api?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected!");
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
    
  })
  .catch(() => {
    console.log("Failed to Connect to Server");
  });