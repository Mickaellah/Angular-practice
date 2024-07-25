const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3001; // Change this to an available port

app.use(cors());

let locations = [];

// Read JSON file and store data in locations variable
fs.readFile(path.join(__dirname, 'db.json'), 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading db.json:', err);
    return;
  }
  try {
    locations = JSON.parse(data);
    console.log(locations);
    if (!Array.isArray(locations)) {
      throw new Error('Invalid JSON format: not an array');
    }
  } catch (e) {
    console.error('Error parsing JSON data:', e);
  }
});

app.get('/locations', (req, res) => {
  res.json(locations);
});

app.get('/locations/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const location = locations.find(loc => loc.id === id);
  if (location) {
    res.json(location);
  } else {
    res.status(404).send('Location not found');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
