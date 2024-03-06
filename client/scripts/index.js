"use strict";
//import doesnt work why?
//const createActivity = require('./activities');
const allActivities = [];

function main() {
    console.log(allActivities);
}

//function to create an activity
function createActivity(title, duration, desc){
    let newActivity  = {
        title: title,
        duration: duration,
        desc: desc,
    };
    return newActivity;
}

//function to create an activity from input of user
function createActivityFromInput() {
    let title = document.querySelector('#actTitle').value;
    let duration = document.querySelector('#actDuration').value;
    let desc = document.querySelector('#actDesc').value;
    allActivities.push(createActivity(title, duration, desc));
    console.log(allActivities);
}

//function to generate predefined activities
function generateActivities() {
    const list=[];
    list.push(createActivity('Running',  30, 'Running on the spot'));
    list.push(createActivity('Push-ups', 10, 'Push-ups'));
    list.push(createActivity('Sit-ups',  10, 'Sit-ups'));
    return list;
}

main();