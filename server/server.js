const express = require('express');
const path = require('path');

const app = express();
const port = 8080;

// Serve static files from the 'client' folder
app.use(express.static(path.join(__dirname, '..', 'client')));

// Route for the index.html page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'pages', 'index.html'));
});

app.get('/startWorkout', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'pages', 'startWorkout.html'));
});

app.get('/createWorkout', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'pages', 'createWorkout.html'));
});

app.get('/createActivity', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'pages', 'createActivity.html'));
});

let allActivities = [];

function getActivities(req, res) {
  res.json(allActivities);
}

app.get('/activities', getActivities);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});