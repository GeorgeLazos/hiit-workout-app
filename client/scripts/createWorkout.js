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

function createWorkout(title, activities, desc) {
    const newWorkout  = {
        title: title,
        ativities: activities,
        desc: desc,
    };
    displayWorkouts(newWorkout);
    return newWorkout;
}

function createWorkoutFromInput() {
    const title = el.workoutTitle.value;
    const actList = el.activityList.value;
    const desc = el.workoutDesc.value;
    allWorkouts.push(createWorkout(title, actList, desc));
    console.log(allWorkouts);
}

function prepareHandles() {
    el.createActivity = document.querySelector('#createActivity');
    el.back = document.querySelector('#back');
    el.workoutTitle = document.querySelector('#workoutTitle');
    el.activityList = document.querySelector('#activityList');
    el.workoutDesc = document.querySelector('#workoutDesc');
}

function init() {
    prepareHandles();
    el.createActivity.addEventListener('click', () => {window.location= 'createActivity';});
    el.back.addEventListener('click', () => {window.location= '/';});
}

const allWorkouts = [];
const el = {};
init();
   