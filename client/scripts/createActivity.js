"use strict";

//function to display an activity
function displayActivity(activity) {
    const newActivity = document.createElement('div');

    const title = document.createElement('h3');
    title.textContent = activity.title;

    const duration = document.createElement('p');
    duration.textContent = activity.duration;

    const desc = document.createElement('p');
    desc.textContent = activity.desc;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        deleteActivity(activity);
        newActivity.remove();
    });

    newActivity.append(title, duration, desc, deleteButton);
    el.activityList.append(newActivity);
}

//funtion to sendActivities
async function sendActivitiesToServer() {
    const payload = el.allActivities;
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

//function to add an activity to allActivities
function addActivity(activity) {
    el.allActivities.push(activity);
    sendActivitiesToServer();
    console.log('Activity added', activity);

}

//function to delete an activity from allActivities
function deleteActivity(activity) {
    el.allActivities = el.allActivities.filter(act => act !== activity);
    sendActivitiesToServer();
    console.log('Activity deleted', activity);
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
    addActivity(newActivity);
    displayActivity(newActivity);
}

//Check if activity has any input errors
function checkError(title, duration) {
    el.error.style.color = 'red';

    if (title === '') {
        el.error.textContent = 'Error: Activity does not have a title';
        return true;
    }
    if (duration === '') {
        el.error.textContent = 'Error: Activity does not have a duration';
        return true;
    }
    if (isNaN(duration) || duration <= 0) {
        el.error.textContent = 'Error: Duration must be a positive number';
        return true;
    }
    if (el.allActivities.some(activity => activity.title === title)) {
        el.error.textContent = 'Error: Activity already exists';
        return true;
    }
    el.error.textContent = '';
    return false;
}

//function to create an activity from input of user
function createActivityFromInput() {
    el.error.textContent = '';
    const title = el.actTitle.value;
    const duration = el.actDuration.value;
    const desc = el.actDesc.value;
    if (!checkError(title, duration, desc)) {
        createActivity(title, duration, desc);
        el.error.style.color = 'green';
        el.actTitle.value = '';
        el.actDuration.value = '';
        el.actDesc.value = '';
        el.error.textContent = 'Activity created successfully';
    }
}

//function to add event listeners
function addEventListeners() {
    el.submit.addEventListener('click', () => createActivityFromInput());
    el.back.addEventListener('click', () => { window.location.href = '/';});
    el.createWorkout.addEventListener('click', () => { window.location = '/createWorkout';});
}

//function to display allactivities
function displayAllActivities() {
    el.allActivities.forEach(activity => displayActivity(activity));
}

//function to load allactivities
async function loadActivities() {  
    const response = await fetch('activities');
    if (response.ok) {
        const allActivities = await response.json();
        console.log('All activities recieved', allActivities);
        return allActivities;
    } else {
        console.log('failed to load activities');} 
}

//function to prepare handles
async function prepareHandles() {
    el.allActivities = await loadActivities();
    el.submit = document.querySelector('#activitySubmit');
    el.back = document.querySelector('#back');
    el.error = document.querySelector('#error');
    el.actTitle = document.querySelector('#actTitle');
    el.actDuration = document.querySelector('#actDuration');
    el.actDesc = document.querySelector('#actDesc');
    el.createWorkout = document.querySelector('#createWorkout');
    el.activityList = document.querySelector('#activityList');
}

//function to initialize the page
async function init() {
    await prepareHandles();
    displayAllActivities();
    addEventListeners();
}

const el = {};
init();

//*allActivities : An array of all activities