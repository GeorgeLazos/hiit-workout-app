"use strict";

function main() {}

function setActivity(){
    let title = document.querySelector('').value;
    let duration = document.querySelector('').value;
    let desc = document.querySelector('').value;
    let newActivity  = {
        title: title,
        duration: duration,
        desc: desc
    };
    localStorage.setItem(newActivity.title, JSON.stringify(newActivity));
}
