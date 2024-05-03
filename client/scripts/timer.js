"use strict";

// Handle the timer functionality of the workout
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to pause the timer
function pause() {
    el.pauseFlag = !el.pauseFlag;
    console.log('pause flag', el.pauseFlag);
    if (el.pauseFlag) {
        el.pauseButton.value = 'Resume';
        el.desc.textContent = 'Paused';
        console.log('paused');
    } else {
        el.desc.textContent = `${el.actTitle}`;
        el.pauseButton.value = 'Pause';
        el.time.textContent = el.actualTime;
        console.log('resumed');
    }
}

// Function to run the Timer
function myCounter() {
    if (el.actualTime <= 0) {
        el.activityFlag = false;
        console.log('Activity done');
        clearInterval(el.counter);
    } else if (!el.pauseFlag) {
        el.time.textContent = el.actualTime;
        el.actualTime--;
    }
    el.time.textContent = el.actualTime;
}

// Function to start the timer
async function startTimer(activity, difficulty) {
    console.log('loaded activity', activity.title);
    el.actTitle = activity.title;
    const actTime = activity.duration;
    const actdesc = activity.desc;

    el.actualTime = actTime + (difficulty * 30);
    el.time.textContent = el.actualTime;
    el.desc.textContent = (`${el.actTitle}`);

    el.pauseButton.addEventListener('click', pause);
    el.counter = setInterval(myCounter, 1000);
}

// Function to start and run the workout
async function initialiseActivity() {
    el.desc.textContent = 'Get ready to start your Workout!!!';
    el.time.textContent = '5';
    for (let i = 0; i <= 5; i++) {
        el.time.textContent = `${5-i}`
        await delay(1000);
        if (i === 4) {
            el.desc.textContent = 'Start';
        }
    }

    el.pauseButton.style.display = 'block';
    el.activityFlag = false;
     for (const activity of el.workout.activities) {
        while (el.activityFlag) {await delay(1000);}
        el.activityFlag = true;
        await startTimer(activity, el.difficulty);
        }
}

//Function to addEventListeners
function addEventListeners() {
    el.back.addEventListener('click', () => { window.location.href = '/startWorkout';});
}

//Function to load selected workout from server
async function loadSelecedWorkout() {
    const response = await fetch('/selectedWorkout');
    if (response.ok) {
        const allWorkouts = await response.json();
        console.log('Selected Workout recieved', allWorkouts);
        return allWorkouts;
    } else {
        console.log('failed to load workout');} 
}

//Function to prepare handles
async function prepareHandles() {
    el.selectedWorkout = await loadSelecedWorkout();
    el.pauseFlag = false;
    el.workout = el.selectedWorkout.workout;
    el.difficulty = el.selectedWorkout.difficulty;
    console.log('workout', el.selectedWorkout.workout);
    el.time = document.querySelector('#time');
    el.pauseButton = document.querySelector('#pause');
    el.desc = document.querySelector('#desc');
    el.back = document.querySelector('#back');
}

//Function to initialize the page
async function init() {
    //debugger;
    await prepareHandles();
    await addEventListeners();
    el.pauseButton.style.display = 'none';
    initialiseActivity();
}

const el = {};
init();