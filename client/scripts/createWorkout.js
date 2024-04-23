import { loadActivities } from './createActivity.js';

function displayWorkouts(workout) {
    const workoutList = document.createElement('div');

    const title = document.createElement('p');
    title.textContent = workout.title;

    const desc = document.createElement('p');
    desc.textContent = workout.desc;
    
    workoutList.append(title, desc);
    const div = document.querySelector('#workoutList');
    div.append(workoutList);
}

async function sendWorkoutsToServer(workout) {
    el.allWorkouts.push(workout);
    const payload = workout;
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

function createWorkout(title, activities, desc) {
    const newWorkout  = {
        title: title,
        ativities: activities,
        desc: desc,
    };
    sendWorkoutsToServer(newWorkout);
    displayWorkouts(newWorkout);
    return newWorkout;
}

function createWorkoutFromInput() {
    const title = el.workoutTitle.value;
    const actList = el.selectedActivityList.value;
    const desc = el.workoutDesc.value;
    allWorkouts.push(createWorkout(title, actList, desc));
    console.log(allWorkouts);
}

function addEventListeners() {
    el.createActivity.addEventListener('click', () => {window.location= 'createActivity';});
    el.back.addEventListener('click', () => {window.location= '/';});
    el.submit.addEventListener('click', () => createWorkoutFromInput());
}

function prepareHandles() {
    el.submit = document.querySelector('#workoutSubmit');
    el.createActivity = document.querySelector('#createActivity');
    el.back = document.querySelector('#back');
    el.workoutTitle = document.querySelector('#workoutTitle');
    el.activityList = document.querySelector('#activityList');
    el.workoutDesc = document.querySelector('#workoutDesc');
}

async function loadWorkouts() {  
    const response = await fetch('workouts');
    if (response.ok) {
        const allWorkouts = await response.json();
        console.log('All Workouts', allWorkouts);
        return allWorkouts;
    } else {
        console.log('failed to load workouts');} 
}

async function init() {
    el.allActivities = await loadActivities();
    el.allWorkouts = await loadWorkouts();
    prepareHandles();
    addEventListeners();
}


const el = {};
init();
   