const express = require('express');
const path = require('path');

const app = express();
const port = 8080;

// Serve static files from the 'client' folder
app.use(express.static(path.join(__dirname, '..', 'client')));



// Define a route to get all activities
let allActivities = [];

function getActivities(req, res) {
  res.json(allActivities);
}

function postActivities(req, res) {
  allActivities.append(req.body.msg);
  res.json(allActivities);
}

//app.get('/activities', getActivities);



// Start the server, announcing the port number
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'pages', 'index.html'));
});

//app.post('/activities', postActivities);

// custom routes
app.get('/startWorkout', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'pages', 'startWorkout.html'));
});

app.get('/createWorkout', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'pages', 'createWorkout.html'));
});

app.get('/createActivity', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'pages', 'createActivity.html'));
});