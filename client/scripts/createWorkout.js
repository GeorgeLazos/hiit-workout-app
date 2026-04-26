'use strict';

// Global variables
const gl = {};

// Funtion to display a workout
function displayWorkouts(newWorkout) {
  const workoutDiv = document.createElement('div');
  workoutDiv.id = 'showWorkout';

  const title = document.createElement('h3');
  title.textContent = newWorkout.title;

  const desc = document.createElement('p');
  desc.textContent = newWorkout.desc;

  const activities = document.createElement('ol');
  newWorkout.activities.forEach(activity => {
    const act = document.createElement('li');
    act.className = 'showActivity';
    act.textContent = activity.title;
    activities.append(act);
  });

  const deleteButton = document.createElement('button');
  deleteButton.className = 'deleteButton';
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    if (confirm('Are you sure you want to delete this workout?')) {
      deletefromAllWorkouts(newWorkout);
      workoutDiv.remove();
    }
  });
  workoutDiv.append(title, desc, activities, deleteButton);
  gl.allWorkoutsDiv.append(workoutDiv);
}

// Function to delete a workout from allWorkouts
function deletefromAllWorkouts(workout) {
  gl.allWorkouts = gl.allWorkouts.filter(work => work !== workout);
  saveAllWorkoutsToLocalStorage(gl.allWorkouts);
}

// Function to add a workout to allWorkouts
function addToAllWorkouts(workout) {
  gl.allWorkouts.push(workout);
  saveAllWorkoutsToLocalStorage(gl.allWorkouts);
  console.log('Workout added', workout);
}

// Function to create a workout
function createWorkout(title, activities, desc) {
  const newWorkout = {
    title,
    activities,
    desc,
  };
  addToAllWorkouts(newWorkout);
  displayWorkouts(newWorkout);
  console.log('Workout created', newWorkout);
}

// Function to check for errors in workout input
function checkError(title, actList) {
  gl.error.style.color = 'red';
  if (title === '') {
    gl.error.textContent = 'Error: Activity does not have a title';
    return true;
  } else if (actList.length === 0) {
    gl.error.textContent = 'Error: Activity does not have any activities';
    return true;
  } else if (gl.allWorkouts.some(workout => workout.title === title)) {
    gl.error.textContent = 'Error: Activity already exists';
    return true;
  } else {
    return false;
  }
}

// Function to create a workout from input
function createWorkoutFromInput() {
  gl.error.textContent = '';
  const title = gl.workoutTitle.value;
  const actList = gl.newWorkoutActivities;
  const desc = gl.workoutDesc.value;
  if (!checkError(title, actList)) {
    createWorkout(title, actList, desc);
    gl.error.style.color = 'green';
    gl.error.textContent = 'Workout created successfully';
    gl.selectedActivityList.innerHTML = '';
    gl.newWorkoutActivities = [];
    gl.workoutTitle.value = '';
    gl.workoutDesc.value = '';
  }
}

// Function to add event listeners
function addEventListeners() {
  gl.createActivity.addEventListener('click', () => { window.location = 'createActivity'; });
  gl.back.addEventListener('click', () => { window.location = '/'; });
  gl.submit.addEventListener('click', () => createWorkoutFromInput());
}

// Function to remove an activity from the newWorkout list
function removeActivityFromList(button, activity) {
  gl.newWorkoutActivities = gl.newWorkoutActivities.filter(act => act !== activity);
  button.remove();
}

// Function to add an activity to the newWorkout list
function addActivityToList(activity) {
  gl.newWorkoutActivities.push(activity);
  const button = document.createElement('button');
  button.className = 'activityButton';
  button.textContent = activity.title;
  button.addEventListener('click', () => removeActivityFromList(button, activity));
  gl.selectedActivityList.append(button);
}

// Function to display all available activity buttons
function displayActivityButtons() {
  gl.allActivities.forEach(activity => {
    const button = document.createElement('button');
    button.className = 'activityButton';
    button.textContent = activity.title;
    button.addEventListener('click', () => addActivityToList(activity));
    gl.activityList.append(button);
  });
}

// Function to load activities from server
async function loadWorkouts() {
  const response = await fetch('workouts');
  if (response.ok) {
    const allWorkouts = await response.json();
    console.log('All Workouts recieved', allWorkouts);
    return allWorkouts;
  } else {
    console.log('failed to load workouts');
  }
}

// function to load all existing activities
async function loadActivities() {
  const response = await fetch('activities');
  if (response.ok) {
    const allActivities = await response.json();
    console.log('All activities recieved', allActivities);
    return allActivities;
  } else {
    console.log('failed to load activities');
  }
}

function displayallWorkouts() {
  gl.allWorkouts.forEach(workout => {
    displayWorkouts(workout);
  });
}

// Save allWorkouts to local storage
function saveAllWorkoutsToLocalStorage(allWorkouts) {
  localStorage.setItem('allWorkouts', JSON.stringify(allWorkouts));
  console.log('All workouts saved to local storage', allWorkouts);
}

// Get allWorkouts from local storage
async function getAllWorkoutsFromLocalStorage() {
  gl.allWorkouts = JSON.parse(localStorage.getItem('allWorkouts'));
  if (gl.allWorkouts === null) {
    gl.allWorkouts = await loadWorkouts();
  } else {
    console.log('All workouts recieved from local storage', gl.allWorkouts);
  }
}

// Get allActivities from local storage
async function getAllActivitiesFromLocalStorage() {
  gl.allActivities = JSON.parse(localStorage.getItem('allActivities'));
  if (gl.allActivities === null) {
    gl.allActivities = await loadActivities();
  } else {
    console.log('All activities recieved from local storage', gl.allActivities);
  }
}

// Function to prepare handles
async function prepareHandles() {
  gl.newWorkoutActivities = [];
  await getAllWorkoutsFromLocalStorage();
  await getAllActivitiesFromLocalStorage();
  gl.error = document.querySelector('#error');
  gl.allWorkoutsDiv = document.querySelector('#allWorkoutList');
  gl.submit = document.querySelector('#workoutSubmit');
  gl.createActivity = document.querySelector('#createActivity');
  gl.back = document.querySelector('#back');
  gl.workoutTitle = document.querySelector('#workoutTitle');
  gl.activityList = document.querySelector('#activityList');
  gl.workoutDesc = document.querySelector('#workoutNote');
  gl.selectedActivityList = document.querySelector('#selectedActivityList');
}

// Function to initialize the page
async function init() {
  await prepareHandles();
  await displayallWorkouts();
  displayActivityButtons();
  addEventListeners();
}


init();
