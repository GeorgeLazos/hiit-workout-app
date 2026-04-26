'use strict';

// Global variables
const gl = {};

// Handle the timer functionality of the workout
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to pause the timer
function pause() {
  gl.pauseFlag = !gl.pauseFlag;
  console.log('pause flag', gl.pauseFlag);
  if (gl.pauseFlag) {
    gl.pauseButton.value = 'Resume';
    gl.desc.textContent = 'Paused';
    console.log('paused');
  } else {
    gl.desc.textContent = `${gl.actTitle}`;
    gl.pauseButton.value = 'Pause';
    gl.time.textContent = gl.actualTime;
    console.log('resumed');
  }
}

// Function to run the Timer
function myCounter() {
  if (gl.actualTime <= 0) {
    gl.activityFlag = false;
    gl.i = gl.i + 1;
    console.log('Activity done');
    clearInterval(gl.counter);
    if (gl.i === gl.leght) {
      gl.desc.textContent = 'Workout Done';
      gl.pauseButton.style.display = 'none';
      gl.time.textContent = '';
      console.log('Workout Done for good');
    }
  } else if (!gl.pauseFlag) {
    gl.time.textContent = gl.actualTime;
    gl.actualTime--;
  }
  gl.time.textContent = gl.actualTime;
}

// Function to start the timer
function startTimer(activity, difficulty) {
  console.log('loaded activity', activity.title);
  gl.actTitle = activity.title;
  const actTime = activity.duration;
  // const actdesc = activity.desc;

  gl.actualTime = actTime + (difficulty * 30);
  gl.time.textContent = gl.actualTime;
  gl.desc.textContent = (`${gl.actTitle}`);

  gl.pauseButton.addEventListener('click', pause);
  gl.counter = setInterval(myCounter, 1000);
}

// Function to start and run the workout
async function initialiseActivity() {
  gl.desc.textContent = 'Get ready to start your Workout!!!';
  gl.time.textContent = '5';
  for (let i = 0; i <= 5; i++) {
    gl.time.textContent = `${5 - i}`;
    await delay(1000);
    if (i === 4) {
      gl.desc.textContent = 'Start';
    }
  }

  gl.i = 0;
  gl.leght = gl.workout.activities.length;
  gl.pauseButton.style.display = 'inline-block';
  gl.activityFlag = false;
  for (const activity of gl.workout.activities) {
    while (gl.activityFlag) { await delay(1000); }
    gl.activityFlag = true;
    await startTimer(activity, gl.difficulty);
  }
}

// Function to addEventListeners
function addEventListeners() {
  gl.back.addEventListener('click', () => {
    if (confirm('Are you sure you want to stop this workout?')) {
      window.location.href = '/';
    }
  });
}

// Function to load selected workout from server
async function loadSelecedWorkout() {
  const response = await fetch('/selectedWorkout');
  if (response.ok) {
    const allWorkouts = await response.json();
    console.log('Selected Workout recieved', allWorkouts);
    return allWorkouts;
  } else {
    console.log('failed to load workout');
  }
}

// Function to prepare handles
async function prepareHandles() {
  gl.selectedWorkout = await loadSelecedWorkout();
  gl.pauseFlag = false;
  gl.workout = gl.selectedWorkout.workout;
  gl.difficulty = gl.selectedWorkout.difficulty;
  console.log('workout', gl.selectedWorkout.workout);
  gl.time = document.querySelector('#time');
  gl.pauseButton = document.querySelector('#pause');
  gl.desc = document.querySelector('#desc');
  gl.back = document.querySelector('#back');
}

// Function to initialize the page
async function init() {
  // debugger;
  await prepareHandles();
  await addEventListeners();
  gl.pauseButton.style.display = 'none';
  initialiseActivity();
}

init();
