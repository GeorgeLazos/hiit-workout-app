"use strict";

//Funtion to display a workout
function displayWorkouts(newWorkout) {
    
    const workoutDiv = document.createElement('div');
    workoutDiv.classList.add('workout');

    const title = document.createElement('h3');
    title.textContent = newWorkout.title;

    const desc = document.createElement('p');
    desc.textContent = newWorkout.desc;

    const activities = document.createElement('ol');
    newWorkout.activities.forEach(activity => {
        const act = document.createElement('li');
        act.textContent = activity.title;
        activities.append(act);
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        deletefromAllWorkouts(newWorkout);
        workoutDiv.remove();
    });
    workoutDiv.append(title, desc, activities, deleteButton);
    el.allWorkoutsDiv.append(workoutDiv);
}

//Function to send workouts to the server
async function sendWorkoutsToServer() {
    const payload = el.allWorkouts;
    console.log('Payload', payload);

    const response = await fetch('workouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    if (!response.ok) {
        console.log('Failed to send workout to server');
    }
}

//Function to delete a workout from allWorkouts
function deletefromAllWorkouts(workout) {
    el.allWorkouts = el.allWorkouts.filter(work => work !== workout);
    sendWorkoutsToServer();
}

//Function to add a workout to allWorkouts
function addToAllWorkouts(workout) {
    el.allWorkouts.push(workout);
    sendWorkoutsToServer();
}

//Function to create a workout
function createWorkout(title, activities, desc) {
    const newWorkout  = {
        title: title,
        activities: activities,
        desc: desc,
    };
    addToAllWorkouts(newWorkout);
    displayWorkouts(newWorkout);
    console.log('Workout created', newWorkout);
}

//Function to check for errors in workout input
function checkError(title, actList) {
    el.error.style.color = 'red';
    if (title === '') {
        el.error.textContent = 'Error: Activity does not have a title';
        return true;
    }else if (actList.length === 0) {
        el.error.textContent = 'Error: Activity does not have any activities';
        return true;
} else if (el.allWorkouts.some(workout => workout.title === title)) {
        el.error.textContent = 'Error: Activity already exists';
        return true;
    } else {
        return false;
    }
}

//Function to create a workout from input
function createWorkoutFromInput() {
    el.error.textContent = '';
    const title = el.workoutTitle.value;
    const actList = el.newWorkoutActivities;
    const desc = el.workoutDesc.value;
    if (!checkError(title, actList)) {
        createWorkout(title, actList, desc);
        el.error.style.color = 'green';
        el.error.textContent = 'Workout created successfully';
        el.selectedActivityList.innerHTML = '';
        el.newWorkoutActivities = [];
        el.workoutTitle.value = '';
        el.workoutDesc.value = '';
    }
}

//Function to add event listeners
function addEventListeners() {
    el.createActivity.addEventListener('click', () => {window.location= 'createActivity';});
    el.back.addEventListener('click', () => {window.location= '/';});
    el.submit.addEventListener('click', () => createWorkoutFromInput());
}

//Function to remove an activity from the newWorkout list
function removeActivityFromList(button, activity) {
    el.newWorkoutActivities = el.newWorkoutActivities.filter(act => act !== activity);
    button.remove();
}

//Function to add an activity to the newWorkout list
function addActivityToList(activity) {
    el.newWorkoutActivities.push(activity);
    const button = document.createElement('button');
    button.textContent = activity.title;
    button.addEventListener('click', () => removeActivityFromList(button, activity));
    el.selectedActivityList.append(button);
}

//Function to display all available activity buttons
function displayActivityButtons() {
    el.allActivities.forEach(activity => {
            const button = document.createElement('button');
            button.textContent = activity.title;
            button.addEventListener('click', () => addActivityToList(activity));
            el.activityList.append(button);
        });
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

function displayallWorkouts() {
    el.allWorkouts.forEach(workout => {
        displayWorkouts(workout);
    });
}

//Function to prepare handles
async function prepareHandles() {
    el.newWorkoutActivities = [];
    el.allActivities = await loadActivities();
    el.allWorkouts = await loadWorkouts();
    el.error = document.querySelector('#error');
    el.allWorkoutsDiv = document.querySelector('#allWorkoutList');
    el.submit = document.querySelector('#workoutSubmit');
    el.createActivity = document.querySelector('#createActivity');
    el.back = document.querySelector('#back');
    el.workoutTitle = document.querySelector('#workoutTitle');
    el.activityList = document.querySelector('#activityList');
    el.workoutDesc = document.querySelector('#workoutNote');
    el.selectedActivityList = document.querySelector('#selectedActivityList');
}

//Function to initialize the page
async function init() {
    await prepareHandles();
    await displayallWorkouts();
    displayActivityButtons();
    addEventListeners();
}

const el = {};
init();