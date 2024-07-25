const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3001;

app.use(cors());

let locations = [];

fs.readFile(path.join(__dirname, 'db.json'), 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading db.json:', err);
    return;
  }
  locations = JSON.parse(data);
});

app.get('/', (req, res) => {
  res.json(locations);
});

app.get('/:id', (req, res) => {
  const location = locations.find(l => l.id === parseInt(req.params.id, 10));
  if (location) {
    res.json(location);
  } else {
    res.status(404).send('Location not found');
  }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
