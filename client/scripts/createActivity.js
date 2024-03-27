"use strict";

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

    const title = document.querySelector('#actTitle').value;
    const duration = document.querySelector('#actDuration').value;
    const desc = document.querySelector('#actDesc').value;

    createActivity(allActivities, title, duration, desc);
}

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

    const div = document.querySelector('#activityList');
    div.append(newActivity);
}

async function loadActivities() {  
    const response = await fetch('activities');
    let allActivities;
    if (response.ok) {
      allActivities = await response.json();
      return allActivities;
    } else {
      console.log('failed to load activities :-(');
}}

async function init() {
    let allActivities = await loadActivities();
    document.querySelector('#activitySubmit').addEventListener('click', createActivityFromInput(allActivities));
    document.querySelector('#back').addEventListener('click', () => { window.location.href = '/';});
}

init();