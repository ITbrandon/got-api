const express = require('express');
const characters = require('./characters.json')
const houses = require('./houses.json')
const path = require('path');
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {
    res.send('Welcome to the Game of Thrones API!');
});

app.get('/api/characters', (req, res) => {
    res.json(characters)
})

app.get('/api/houses', (req, res) => {
    res.json(houses)
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});