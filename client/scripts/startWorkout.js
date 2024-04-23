import * as activities from 'createActivity.js'

// Function to start the timer
function startTimer(activity, difficulty) {
    const actTitle = activity.title;
    const actTime = activity.duration;
    const actdesc = activity.desc;

    const actualTime = actTime + (difficulty * 3);
    const restTime = 35 - (difficulty * 5);
    el.desc.textContent = (`Well done!, Next ${actTitle}`);
    for (let i = 0; i < restTime; i++) {
        setTimeout(() => {el.time.textContent = restTime - i;}, 1000); 
    }
    el.desc.textContent = (`${actTitle}`);
    for (let i = 0; i < actualTime; i++) {
        setTimeout(() => {el.time.textContent = actualTime - i;}, 1000); 
    }
}
    
//function to select each activity in the workout list
function startWorkout() {
    const workout = el.workout.value;
    const difficulty = el.difficulty.value;
    for (const activity of workout) {
        //Shouldnt it wait for the activity to finish before starting the next one?
        startTimer(activity, difficulty);
    }
}

//function to add event listeners
function addEventListeners() {
    el.back.addEventListener('click', () => {window.location = '/';});
    el.start.addEventListener('click',() => startWorkout());
}

//function to prepare handles
function prepareHandles() {
    el.back = document.querySelector('#back');
    el.difficulty = document.querySelector('.difficulty');
    el.workout = document.querySelector('#workoutList');
    el.time = document.querySelector('#time');
    el.desc = document.querySelector('#description');
    el.start = document.querySelector('#start');
}

//function to initialize the page
function init() {
    activities.loadDefaultActivities();
    prepareHandles();
    addEventListeners();
}

const el = {};
init();