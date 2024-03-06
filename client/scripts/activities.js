"use strict";

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
    let title = document.querySelector('#title').value;
    let duration = document.querySelector('#duration').value;
    let desc = document.querySelector('#desc').value;
    return createActivity(title, duration, desc);
}






 
    //Need to fix it to work on express
//     if (localStorage.getItem('activities')) {                        // Check if there is an existing activities list
//         activities = JSON.parse(localStorage.getItem('activities')); // Retrieve the existing activities list
//     } else {
//         activities = [];                                             // If there is no existing activities list, create a new one
//     }
//     activities.push(newActivity);                                   // Add newActivity to the activities list
//     localStorage.setItem('activities', JSON.stringify(activities)); // Save the updated activities list
// }