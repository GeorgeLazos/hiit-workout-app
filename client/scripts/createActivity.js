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
    el.error.textContent = '';
    return false;
}

//function to create an activity
function createActivity(allActivities, title, duration, desc){
    const newActivity  = {
        title: title,
        duration: duration,
        desc: desc,
    };
    displayActivity(newActivity);
    allActivities.push(newActivity);
}

//function to create an activity from input of user
function createActivityFromInput(allActivities) {
    const title = el.actTitle.value;
    const duration = el.actDuration.value;
    const desc = el.actDesc.value;
    if (!checkError(title, duration, desc)) {
        createActivity(allActivities, title, duration, desc);
    }
}

//function to load default activities
function loadDefaultActivities(allActivities) {
    createActivity(allActivities, 'Push-Ups', '30', 'Trains chest, shoulders, and triceps');
    createActivity(allActivities, 'Crunches', '30', 'Trains abs');
    createActivity(allActivities, 'Plank', '60', 'Trains core muscles');
    createActivity(allActivities, 'Jumping-Jacks', '30', 'Warm-up exercise');
    createActivity(allActivities, 'Squats', '30', 'Trains legs');
    createActivity(allActivities, 'Lunges', '30', 'Trains legs');
}

//function to add event listeners
function addEventListeners(allActivities) {
    el.submit.addEventListener('click', () => createActivityFromInput(allActivities));
    el.back.addEventListener('click', () => { window.location.href = '/';});
}

//function to prepare handles
function prepareHandles() {
    el.submit = document.querySelector('#activitySubmit');
    el.back = document.querySelector('#back');
    el.error = document.querySelector('#error');
    el.actTitle = document.querySelector('#actTitle');
    el.actDuration = document.querySelector('#actDuration');
    el.actDesc = document.querySelector('#actDesc');
}

//function to initialize the page
async function init() {
    const allActivities = [];
    loadDefaultActivities(allActivities);
    prepareHandles();
    addEventListeners(allActivities);
}

const el = {};
init();

//Not being used (for now)

//function to load all existing activities
async function loadActivities() {  
    const response = await fetch('activities');
    let allActivities;
    if (response.ok) {
        allActivities = await response.json();
        return allActivities;
    } else {
        console.log('failed to load activities');} 
}

//funtion to sendActivities
async function sendActivities(activities) {
    const payload = activities;
    console.log('Payload', payload);

    const response = await fetch('activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
}
