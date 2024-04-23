function init() {
    document.querySelector('#startWorkout').addEventListener('click', () => {window.location = 'startWorkout';});
    document.querySelector('#createWorkout').addEventListener('click', () => {window.location = 'createWorkout';});
    document.querySelector('#createActivity').addEventListener('click', () => {window.location = 'createActivity';});
}

init();