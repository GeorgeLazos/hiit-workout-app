import createActivity from './activities.js';
"use strict";


function main() {
    console.log(generateActivities());
}

///function to create a workout (doesnt work yet)
function createWorkout(){
    let workout = [];
    let activities = JSON.parse(localStorage.getItem('activities'));
    
}  

//function to generate predefined activities
function generateActivities() {
    createActivity('Running',  30, 'Running on the spot');
    createActivity('Push-ups', 10, 'Push-ups');
    createActivity('Sit-ups',  10, 'Sit-ups');
 }

main();