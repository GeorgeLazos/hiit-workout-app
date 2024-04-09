// Function to start the timer
function startTimer(actTime, difficulty) {
    const actualTime = time + (difficulty * 3);
    const restTime = 35 - (difficulty * 5);
    for (let i = 0; i < actualTime; i++) {
        setTimeout(() => {el.time.textContent = actualTime - i;}, 1000); 
    }
    for (let i = 0; i < restTime; i++) {
        setTimeout(() => {el.time.textContent = restTime - i;}, 1000); 
    }
}

//function to start the activity
function startActivity(activity, difficulty) {
    const time = activity.duration 
    const actualTime = startTimer(time, difficulty);
    console.log(`Starting ${activity.title} for ${actualTime} seconds`);
}

//function to select each activity in the workout list
function startWorkout() {
    const workout = el.workoutList.value;
    const difficulty = el.difficulty.value;
    for (const activity of workout) {
        //Shouldnt it wait for the activity to finish before starting the next one?
        startActivity(activity, difficulty);
    }
}

//function to add event listeners
function addEventListeners() {
    el.back.addEventListener('click', () => {window.location = '/';});
}

//function to prepare handles
function prepareHandles() {
    el.back = document.querySelector('#back');
    el.difficulty = document.querySelector('#difficulty');
    el.workoutList = document.querySelector('#workoutList');
    el.time = document.querySelector('#time');
    el.desc = document.querySelector('#description');
}

//function to initialize the page
function init() {
    prepareHandles();
    addEventListeners();
}

const el = {};
init();