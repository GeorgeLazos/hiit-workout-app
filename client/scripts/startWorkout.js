'use strict';

// Global variables
const gl = {};

// function to send selected workout to server
async function sendSelectedWorkoutToServer(workout, difficulty) {
  const payload = { workout, difficulty };
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

// function to add started workouts to workoutLog and saved to local storage
function addToWorkoutLog(workout) {
  const workoutLog = JSON.parse(localStorage.getItem('workoutLog')) || [];
  workoutLog.push(workout);
  localStorage.setItem('workoutLog', JSON.stringify(workoutLog));
}

// function to check for errors when starting a workout
function checkError() {
  gl.error.textContent = '';
  console.log(gl.workoutList.value);
  if (gl.workoutList.value === 'def') {
    gl.error.textContent = 'Error: No workout selected';
    return false;
  } else if (gl.difficulty.value === '') {
    gl.error.textContent = 'Error: No difficulty selected';
    return false;
  } else {
    return true;
  }
}

// function to select each activity in the workout list
async function startWorkout() {
  if (checkError()) {
    const workout = gl.workout;
    const difficulty = gl.difficulty.value;
    addToWorkoutLog(gl.workout);
    await sendSelectedWorkoutToServer(workout, difficulty);
    window.location.href = '/timer';
  }
}

// function to display the selected workout
function displaySelectedWorkout() {
  gl.error.textContent = '';
  if (gl.workoutList.value === 'def') {
    gl.workoutInfo.style.display = 'none';
    console.log('No workout selected');
    gl.workoutInfo.innerHTML = '';
    return;
  } else {
    gl.workoutInfo.style.display = 'inline-block';
  }
  gl.workout = gl.allWorkouts.find(workout => workout.title === gl.workoutList.value);
  console.log('Selected workout', gl.workout);

  const title = document.createElement('h3');
  title.textContent = gl.workout.title;

  const desc = document.createElement('p');
  desc.textContent = gl.workout.desc;

  const activities = document.createElement('ol');
  gl.workout.activities.forEach(activity => {
    const act = document.createElement('li');
    act.textContent = activity.title;
    activities.append(act);
  });
  gl.workoutInfo.innerHTML = '';
  gl.workoutInfo.append(title, desc, activities);
}

// function to display all workout options
function displayWorkoutOptions() {
  gl.allWorkouts.forEach(workout => {
    const newWorkout = document.createElement('option');
    newWorkout.textContent = workout.title;
    gl.workoutList.appendChild(newWorkout);
  });
}

// function to add event listeners
function addEventListeners() {
  gl.start.addEventListener('click', () => startWorkout());
  gl.workoutList.addEventListener('change', () => displaySelectedWorkout());
  gl.createWorkout.addEventListener('click', () => { window.location = 'createWorkout'; });
  gl.createActivity.addEventListener('click', () => { window.location = 'createActivity'; });
  gl.pastWorkouts.addEventListener('click', () => { window.location = 'workoutLog'; });
}

// Function to load activities from server
async function loadWorkouts() {
  const response = await fetch('workouts');
  if (response.ok) {
    const allWorkouts = await response.json();
    saveAllWorkoutsToLocalStorage(allWorkouts);
    console.log('All Workouts recieved from server', allWorkouts);
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
    saveAllActivitiesToLocalStorage(allActivities);
    console.log('All activities recieved from server', allActivities);
    return allActivities;
  } else {
    console.log('failed to load activities');
  }
}

// Save allWorkouts to local storage
function saveAllWorkoutsToLocalStorage(allWorkouts) {
  localStorage.setItem('allWorkouts', JSON.stringify(allWorkouts));
  console.log('All workouts saved to local storage', allWorkouts);
}

// Save allActivities to local storage
function saveAllActivitiesToLocalStorage(allActivities) {
  localStorage.setItem('allActivities', JSON.stringify(allActivities));
  console.log('All activities saved to local storage', allActivities);
}

// Get allWorkouts from local storage
async function getAllWorkoutsFromLocalStorage() {
  gl.allWorkouts = JSON.parse(localStorage.getItem('allWorkouts'));
  if (gl.allWorkouts === null || gl.allWorkouts.length === 0) {
    gl.allWorkouts = await loadWorkouts();
  } else {
    console.log('All workouts recieved from local storage', gl.allWorkouts);
  }
}

// Get allActivities from local storage
async function getAllActivitiesFromLocalStorage() {
  gl.allActivities = JSON.parse(localStorage.getItem('allActivities'));
  console.log(gl.allActivities);
  if (gl.allActivities === null || gl.allActivities.length === 0) {
    gl.allActivities = await loadActivities();
  } else {
    console.log('All activities recieved from local storage', gl.allActivities);
  }
}

// function to prepare handles
async function prepareHandles() {
  await getAllActivitiesFromLocalStorage();
  await getAllWorkoutsFromLocalStorage();
  gl.pastWorkouts = document.querySelector('#pastWorkouts');
  gl.workoutInfo = document.querySelector('#workoutInfo');
  gl.workoutInfo.style.display = 'none';
  gl.error = document.querySelector('#error');
  gl.difficulty = document.querySelector('.difficulty:checked');
  gl.workoutList = document.querySelector('#workoutList');
  gl.start = document.querySelector('#start');
  gl.createWorkout = document.querySelector('#createWorkout');
  gl.createActivity = document.querySelector('#createActivity');
}

// function to initialize the page
async function init() {
  await prepareHandles();
  displayWorkoutOptions();
  addEventListeners();
}


init();
