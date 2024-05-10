'use strict';

const express = require('express');
const path = require('path');

const app = express();
const port = 8080;

// Default activities and workouts
let allActivities = [
  { title: 'Push-Ups', duration: 30, desc: 'Trains chest,shoulders, and triceps' },
  { title: 'Crunches', duration: 60, desc: 'Trains abs' },
  { title: 'Plank', duration: 60, desc: 'Trains core' },
  { title: 'Jumping-Jacks', duration: 60, desc: 'Warm-up exercise' },
  { title: 'Squats', duration: 60, desc: 'Trains legs' },
  { title: 'Lunges', duration: 60, desc: 'Trains legs' },
  { title: 'Burpees', duration: 60, desc: 'Cardio' },
  { title: 'High Knees', duration: 60, desc: 'Cardio' },
  { title: 'Wall-sits', duration: 60, desc: 'Trains legs' },
  { title: 'Stretch', duration: 60, desc: 'Warm-Up and Cool-down exercise' },
  { title: 'Sprints', duration: 60, desc: 'Cardio' },
  { title: 'Leg raises', duration: 60, desc: 'Trains legs' },
  { title: 'Rest', duration: 30, desc: 'Rest' },
];

const absWorout = [
  { title: 'Stretch', duration: 15, desc: 'Warm-Up and Cool-down exercise' },
  { title: 'Jumping-Jacks', duration: 30, desc: 'Warm-up exercise' },
  { title: 'Crunches', duration: 30, desc: 'Trains abs' },
  { title: 'Rest', duration: 30, desc: 'Rest' },
  { title: 'Plank', duration: 30, desc: 'Trains core' },
  { title: 'Push Ups', duration: '1', desc: '2' },
  { title: 'Rest', duration: 30, desc: 'Rest' },
  { title: 'Plank', duration: 60, desc: 'Trains core' },
  { title: 'Crunches', duration: 30, desc: 'Trains abs' },
  { title: 'Rest', duration: 30, desc: 'Rest' },
  { title: 'Push Ups', duration: '1', desc: '2' },
  { title: 'Stretch', duration: 15, desc: 'Warm-Up and Cool-down exercise' },
];

const legsWorkout = [
  { title: 'Stretch', duration: 15, desc: 'Warm-Up and Cool-down exercise' },
  { title: 'Sprints', duration: 60, desc: 'Cardio' },
  { title: 'Leg raises', duration: 60, desc: 'Trains legs' },
  { title: 'Squats', duration: 60, desc: 'Trains legs' },
  { title: 'Wall-sits', duration: 60, desc: 'Trains legs' },
  { title: 'Lunges', duration: 60, desc: 'Trains legs' },
  { title: 'High Knees', duration: 60, desc: 'Cardio' },
  { title: 'Stretch', duration: 15, desc: 'Warm-Up and Cool-down exercise' },
];

const pushUpWorkout = [
  { title: 'Stretch', duration: 15, desc: 'Warm-Up and Cool-down exercise' },
  { title: 'Push-Ups', duration: 30, desc: 'Trains chest,shoulders, and triceps' },
  { title: 'Plank', duration: 60, desc: 'Trains core' },
  { title: 'Rest', duration: 30, desc: 'Rest' },
  { title: 'Push-Ups', duration: 30, desc: 'Trains chest,shoulders, and triceps' },
  { title: 'Plank', duration: 60, desc: 'Trains core' },
  { title: 'Rest', duration: 30, desc: 'Rest' },
  { title: 'Push-Ups', duration: 30, desc: 'Trains chest,shoulders, and triceps' },
  { title: 'Push-Ups', duration: 20, desc: 'Trains chest,shoulders, and triceps' },
];

const cardioWorkout = [
  { title: 'Stretch', duration: 15, desc: 'Warm-Up and Cool-down exercise' },
  { title: 'Sprints', duration: 60, desc: 'Cardio' },
  { title: 'Rest', duration: 30, desc: 'Rest' },
  { title: 'Jumping-Jacks', duration: 60, desc: 'Warm-up exercise' },
  { title: 'Burpees', duration: 60, desc: 'Cardio' },
  { title: 'Rest', duration: 30, desc: 'Rest' },
  { title: 'High Knees', duration: 60, desc: 'Cardio' },
  { title: 'sprints', duration: 60, desc: 'Cardio' },
  { title: 'Stretch', duration: 15, desc: 'Warm-Up and Cool-down exercise' },
];

let allWorkouts = [
  { title: 'Abs Workout', activities: absWorout, desc: 'A workout that focuses on your abs, core and chest no equipment needed' },
  { title: 'Legs Workout', activities: legsWorkout, desc: 'A workout that focuses on your legs and core no equipment needed' },
  { title: 'Cardio Workout', activities: cardioWorkout, desc: 'A workout that focuses on cardio and endurance no equipment needed' },
  { title: 'Push-Up Workout', activities: pushUpWorkout, desc: 'A workout that focuses on your chest, shoulders and triceps no equipment needed' },
];

let selectedWorkout = {};

// Serve static files from the 'client' folder
app.use(express.static(path.join(__dirname, '..', 'client')));


// Routes for the workouts
app.get('/workouts', getWorkouts);
function getWorkouts(req, res) {
  res.json(allWorkouts);
}

app.post('/workouts', express.json(), addWorkout);
function addWorkout(req, res) {
  allWorkouts = req.body;
  res.send('Workout added');
}


// Routes for the activities
app.get('/activities', getActivities);
function getActivities(req, res) {
  res.json(allActivities);
}

app.post('/activities', express.json(), addActivity);
function addActivity(req, res) {
  allActivities = req.body;
  res.send('Activity saved');
}


// Routes for selected workout
app.get('/selectedWorkout', getSelectedWorkout);
function getSelectedWorkout(req, res) {
  res.json(selectedWorkout);
}

app.post('/selectedWorkout', express.json(), addSelectedWorkout);
function addSelectedWorkout(req, res) {
  selectedWorkout = req.body;
  res.send('Selected workout saved');
}


// Start the server, announcing the port number
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// Routes to the different pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'pages', 'index.html'));
});

app.get('/workoutLog', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'pages', 'workoutLog.html'));
});

app.get('/createWorkout', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'pages', 'createWorkout.html'));
});

app.get('/createActivity', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'pages', 'createActivity.html'));
});

app.get('/timer', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'pages', 'timer.html'));
});
