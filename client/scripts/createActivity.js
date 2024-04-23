"use strict";

//function to display an activity
function displayActivity(activity) {
    const newActivity = document.createElement('div');

    const title = document.createElement('p');
    title.textContent = activity.title;

    const duration = document.createElement('p');
    duration.textContent = activity.duration;

    const desc = document.createElement('p');
    desc.textContent = activity.desc;

    newActivity.append(title, duration, desc);

    const div = document.querySelector('#activityList');;
    div.append(newActivity);
}

//Check if activity has any input errors
function checkError(title, duration) {

    if (title === '') {
        el.error.textContent = 'Error: Activity does not have a title';
        return true;
    }
    if (duration === '') {
        el.error.textContent = 'Error: Activity does not have a duration';
        return true;
    }
    if (isNaN(duration) || duration < 0) {
        el.error.textContent = 'Error: Duration must be a non-negative number';
        return true;
    }
    if (el.allActivities.some(activity => activity.title === title)) {
        el.error.textContent = 'Error: Activity already exists';
        return true;
    }
    el.error.textContent = '';
    return false;
}

//funtion to sendActivities
async function sendActivitiesToServer(activity) {
    el.allActivities.push(activity);
    const payload = activity;
    console.log('Payload', payload);

    const response = await fetch('activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
    if (!response.ok) {
        console.log('Failed to send workout to server');
    }
}

//function to create an activity
function createActivity(title, duration, desc){
    if(checkError(title, duration)) {
        console.log('Error: Activity not created');
        return;
    }
    const newActivity  = {
        title: title,
        duration: duration,
        desc: desc,
    };
    sendActivitiesToServer(newActivity);
    displayActivity(newActivity);
    el.allActivities.push(newActivity);
}

//function to create an activity from input of user
function createActivityFromInput() {
    const title = el.actTitle.value;
    const duration = el.actDuration.value;
    const desc = el.actDesc.value;
    if (!checkError(title, duration, desc)) {
        createActivity(title, duration, desc);
    }
}

//function to add event listeners
function addEventListeners() {
    el.submit.addEventListener('click', () => createActivityFromInput());
    el.back.addEventListener('click', () => { window.location.href = '/';});
    el.createWorkout.addEventListener('click', () => { window.location = '/createWorkout';});
}

//function to display all activities
function displayAllActivities() {
    el.allActivities.forEach(activity => displayActivity(activity));
}

//function to prepare handles
function prepareHandles() {
    el.submit = document.querySelector('#activitySubmit');
    el.back = document.querySelector('#back');
    el.error = document.querySelector('#error');
    el.actTitle = document.querySelector('#actTitle');
    el.actDuration = document.querySelector('#actDuration');
    el.actDesc = document.querySelector('#actDesc');
    el.createWorkout = document.querySelector('#createWorkout');
}

//function to load all existing activities
async function loadActivities() {  
    const response = await fetch('activities');
    if (response.ok) {
        const allActivities = await response.json();
        console.log('All activities', allActivities);
        return allActivities;
    } else {
        console.log('failed to load activities');} 
}

//function to initialize the page
async function init() {
    el.allActivities = await loadActivities();
    prepareHandles();
    displayAllActivities();
    addEventListeners();
}

const el = {};
init();