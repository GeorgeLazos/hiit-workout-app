// Global Variables
const gl = {};

function displayLog() {
  gl.workoutCounter.textContent = ` ${gl.workoutLog.length} Workouts Completed`;
  gl.workoutLog.forEach(workout => {
    const workoutDiv = document.createElement('div');
    workoutDiv.className = 'workoutDiv';

    const title = document.createElement('h3');
    title.textContent = workout.title;

    const desc = document.createElement('p');
    desc.textContent = workout.desc;

    const activities = document.createElement('ol');
    console.log(workout);
    workout.activities.forEach(activity => {
      const act = document.createElement('li');
      act.textContent = activity.title;
      activities.append(act);
    });
    workoutDiv.append(title, desc, activities);
    gl.workoutHistory.append(workoutDiv);
  });
}

function getWorkoutLog() {
  gl.workoutLog = JSON.parse(localStorage.getItem('workoutLog'));
}

function prepareHandles() {
  gl.workoutCounter = document.querySelector('#workoutCounter');
  gl.workoutHistory = document.querySelector('#workoutHistory');
  gl.back = document.querySelector('#back');
}

function init() {
  prepareHandles();
  getWorkoutLog();
  gl.back.addEventListener('click', () => { window.location.href = '/'; });
  displayLog();
}

init();
