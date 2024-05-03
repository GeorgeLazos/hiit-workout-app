"use strict";

async function sendSelectedWorkoutToServer(workout, difficulty) {
    const payload = {workout : workout, difficulty : difficulty};
    console.log('Payload', payload);

    const response = await fetch('/selectedWorkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    if (!response.ok) {
        console.log('Failed to send selected workout to server');
    }
}

//function to check for errors when starting a workout
function checkError() {
    el.error.textContent = '';
    if (el.workout.value === '') {
        el.error.textContent = 'Error: No workout selected';
        return true;
    } else if (el.difficulty.value === '') {
        el.error.textContent = 'Error: No difficulty selected';
        return true;
    } else {
    return false;
    }
}

//function to select each activity in the workout list
async function startWorkout() {
    if (checkError) {
        const workout = el.workout;
        const difficulty = el.difficulty.value;
        await sendSelectedWorkoutToServer(workout, difficulty);
        window.location.href = '/timer';
    }};

//function to display the selected workout
function displaySelectedWorkout() {
    el.workout = el.allWorkouts.find(workout => workout.title === el.workoutList.value);
    console.log('Selected workout', el.workout);
    
    const div = document.createElement('div');

    const title = document.createElement('h3');
    title.textContent = el.workout.title;

    const desc = document.createElement('p');
    desc.textContent = el.workout.desc

    const activities = document.createElement('ol');
    el.workout.activities.forEach(activity => {
        const act = document.createElement('li');
        act.textContent = activity.title;
        activities.append(act);
    });
    el.workoutList.addEventListener('change', () => div.remove());
    div.append(title, desc, activities);
    el.workoutinfo.append(div);
}

//function to display all workout options
function displayWorkoutOptions() {
    el.allWorkouts.forEach(workout => {
        const newWorkout = document.createElement('option');
        newWorkout.textContent = workout.title;
        el.workoutList.appendChild(newWorkout);
    });
}

//function to add event listeners
function addEventListeners() {
    el.start.addEventListener('click', () => startWorkout());
    el.workoutList.addEventListener('change', () => displaySelectedWorkout());
    el.back.addEventListener('click', () => {window.location = '/';});
    el.start.addEventListener('click',() => {window.location = '/timer';});
    document.querySelector('#createWorkout').addEventListener('click', () => {window.location = 'createWorkout';});
    document.querySelector('#createActivity').addEventListener('click', () => {window.location = 'createActivity';});
}

//Function to load activities from server
async function loadWorkouts() {  
    const response = await fetch('workouts');
    if (response.ok) {
        const allWorkouts = await response.json();
        console.log('All Workouts recieved', allWorkouts);
        return allWorkouts;
    } else {
        console.log('failed to load workouts');} 
}

//function to load all existing activities
async function loadActivities() {  
    const response = await fetch('activities');
    if (response.ok) {
        const allActivities = await response.json();
        console.log('All activities recieved', allActivities);
        return allActivities;
    } else {
        console.log('failed to load activities');} 
}

//function to prepare handles
async function prepareHandles() {
    el.allActivities = await loadActivities();
    el.allWorkouts = await loadWorkouts();
    el.workoutinfo = document.querySelector('#workoutInfo');
    el.error = document.querySelector('#error');
    el.back = document.querySelector('#back');
    el.difficulty = document.querySelector('.difficulty:checked');
    el.workoutList = document.querySelector('#workoutList');
    el.start = document.querySelector('#start');
}

//function to initialize the page
async function init() {
        await prepareHandles();
        await displayWorkoutOptions();
        addEventListeners();
}

const el = {};
init();