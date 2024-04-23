const express = require('express');
const path = require('path');
const { title } = require('process');

import * as database from './database.js';

const app = express();
const port = 8080;

let allActivities = [
                     {title: 'Push-Ups', duration: 30, desc: 'Trains chest,shoulders, and triceps'},
                     {title: 'Crunches', duration: 60, desc: 'Trains abs'},
                     {title: 'Plank', duration: 60, desc: 'Trains core'},
                     {title: 'Jumping-Jacks', duration: 30, desc: 'Warm-up exercise'},
                     {title: 'Squats', duration: 30, desc: 'Trains legs'},
                     {title: 'Lunges', duration: 30, desc: 'Trains legs'}
];

let allWorkouts = [];

// Serve static files from the 'client' folder
app.use(express.static(path.join(__dirname, '..', 'client')));



//Routes for the workouts
app.get('/workouts', getWorkouts);
function getWorkouts(req, res) {
  res.json(allWorkouts);
}

app.post('/workouts',express.json(), addWorkout);
function addWorkout(req, res) {
  allWorkouts.push(req.body);
  res.send('Workout added');
}



//Routes for the activities
app.get('/activities', getActivities);
function getActivities(req, res) {
  res.json(allActivities);
}

app.post('/activities',express.json(), addActivity);
function addActivity(req, res) {
  let activity = req.body;  
  allActivities.push(activity);
  res.send('Activity added');
}



// Start the server, announcing the port number
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// Routes to the different pages
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