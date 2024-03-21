"use strict";

//function to create an activity
function createActivity(title, duration, desc){

    const newActivity  = {
        title: title,
        duration: duration,
        desc: desc,
    };

    displayActivity(newActivity);
    allActivities.push(newActivity);
    return newActivity;
}

//function to create an activity from input of user
function createActivityFromInput() {

    const title = document.querySelector('#actTitle').value;
    const duration = document.querySelector('#actDuration').value;
    const desc = document.querySelector('#actDesc').value;

    allActivities.push(createActivity(title, duration, desc));
    console.log(allActivities);
}

//function to display an activity
function displayActivity(activity) {
    const activityList = document.createElement('div');

    const title = document.createElement('p');
    title.textContent = activity.title;

    const duration = document.createElement('p');
    duration.textContent = activity.duration;

    const desc = document.createElement('p');
    desc.textContent = activity.desc;

    activityList.append(title, duration, desc);

    const div = document.querySelector('#activityList');
    div.append(activityList);
}

async function loadActivities() {  
    const response = await fetch('activities');
    let allActivities;
    if (response.ok) {
      allActivities = await response.json();
      //return allActivities;
    } else {
      console.log('failed to load activities :-(');
    }}

async function init() {
    await loadActivities();
    document.querySelector('#activitySubmit').addEventListener('click', createActivityFromInput);
}


init();