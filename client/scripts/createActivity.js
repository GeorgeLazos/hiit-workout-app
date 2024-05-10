'use strict';

// Global variables and elements
const gl = {};

// function to display an activity
function displayActivity(activity) {
  const newActivity = document.createElement('div');
  newActivity.className = 'showActivity';

  const title = document.createElement('h3');
  title.className = 'showTitle';
  title.textContent = activity.title;

  const duration = document.createElement('p');
  duration.textContent = `Duration : ${activity.duration}`;
  duration.className = 'showDuration';

  const desc = document.createElement('p');
  desc.className = 'showDesc';
  desc.textContent = `Notes : ${activity.desc}`;

  const deleteButton = document.createElement('button');
  deleteButton.className = 'deleteButton';
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    if (confirm('Are you sure you want to delete this workout?')) {
      deleteActivity(activity);
      newActivity.remove();
    }
  });

  newActivity.append(title, duration, desc, deleteButton);
  gl.activityList.append(newActivity);
}

// function to add an activity to allActivities
function addActivity(activity) {
  gl.allActivities.push(activity);
  saveAllActivitiesToLocalStorage(gl.allActivities);
  console.log('Activity added', activity);
}

// function to delete an activity from allActivities
function deleteActivity(activity) {
  gl.allActivities = gl.allActivities.filter(act => act !== activity);
  saveAllActivitiesToLocalStorage(gl.allActivities);
  gl.error.style.color = 'red';
  gl.error.textContent = 'Activity deleted successfully';
  console.log('Activity deleted', activity);
}

// function to create an activity
function createActivity(title, duration, desc) {
  if (checkError(title, duration)) {
    console.log('Error: Activity not created');
    return;
  }
  const newActivity = {
    title,
    duration,
    desc,
  };
  addActivity(newActivity);
  displayActivity(newActivity);
}

// Check if activity has any input errors
function checkError(title, duration) {
  gl.error.style.color = 'red';

  if (title === '') {
    gl.error.textContent = 'Error: Activity does not have a title';
    return true;
  }
  if (duration === '') {
    gl.error.textContent = 'Error: Activity does not have a duration';
    return true;
  }
  if (isNaN(duration) || duration <= 0) {
    gl.error.textContent = 'Error: Duration must be a positive number';
    return true;
  }
  if (gl.allActivities.some(activity => activity.title === title)) {
    gl.error.textContent = 'Error: Activity already exists';
    return true;
  }
  gl.error.textContent = '';
  return false;
}

// function to create an activity from input of user
function createActivityFromInput() {
  gl.error.textContent = '';
  const title = gl.actTitle.value;
  const duration = gl.actDuration.value;
  const desc = gl.actDesc.value;
  if (!checkError(title, duration, desc)) {
    createActivity(title, duration, desc);
    gl.error.style.color = 'green';
    gl.actTitle.value = '';
    gl.actDuration.value = '';
    gl.actDesc.value = '';
    gl.error.textContent = 'Activity created successfully';
  }
}

// function to add event listeners
function addEventListeners() {
  gl.submit.addEventListener('click', () => createActivityFromInput());
  gl.back.addEventListener('click', () => { window.location.href = '/'; });
  gl.createWorkout.addEventListener('click', () => { window.location = '/createWorkout'; });
}

// function to display allactivities
function displayAllActivities() {
  gl.allActivities.forEach(activity => displayActivity(activity));
}

// function to load allactivities
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

// Save allActivities to local storage
function saveAllActivitiesToLocalStorage(allActivities) {
  localStorage.setItem('allActivities', JSON.stringify(allActivities));
  console.log('All activities saved to local storage', allActivities);
}

// Get allActivities from local storage
async function getActivityFromLocalStorage() {
  gl.allActivities = JSON.parse(localStorage.getItem('allActivities'));
  if (gl.allActivities === null) {
    gl.allActivities = await loadActivities();
  } else {
    console.log('All activities recieved from local storage', gl.allActivities);
  }
}

// function to prepare handles
async function prepareHandles() {
  await getActivityFromLocalStorage();
  gl.submit = document.querySelector('#activitySubmit');
  gl.back = document.querySelector('#back');
  gl.error = document.querySelector('#error');
  gl.actTitle = document.querySelector('#actTitle');
  gl.actDuration = document.querySelector('#actDuration');
  gl.actDesc = document.querySelector('#actDesc');
  gl.createWorkout = document.querySelector('#createWorkout');
  gl.activityList = document.querySelector('#activityList');
}

// function to initialize the page
async function init() {
  await prepareHandles();
  displayAllActivities();
  addEventListeners();
}

init();

//* allActivities : An array of all activities
