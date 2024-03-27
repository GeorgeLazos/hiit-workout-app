function createWorkout() {
    const newWorkout  = {
        title: title,
        ativities: activities,
        desc: desc,
    };
    displayWorkouts(newWorkout);
    return newWorkout;
}

function createWorkoutFromInput() {
    let allWorkouts = [];
    const title = document.querySelector('#workoutTitle').value;
    const actList = document.querySelector('#activityList').value;
    const desc = document.querySelector('#workoutDesc').value;
    allWorkouts.push(createWorkout(title, actList, desc));
    console.log(allWorkouts);
}

function displayActivities(activityList) {
    //create a template for the list of activities
}

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

function init() {
    document.querySelector('#createActivity').addEventListener('click', () => {window.location= 'createActivity';});
    document.querySelector('#back').addEventListener('click', () => {window.location= '/';});
}

init();
   