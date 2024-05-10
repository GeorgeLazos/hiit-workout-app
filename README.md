# HIIT up2106696

# Installation
1. Unzip the up2106696.zip folder

2. Open in editor

3. Open terminal 

3. Install the npm dependencies in the terminal:

   `npm install` and if needed `npm run setup`

4. Start the application in the terminal:

    `npm start`

5. Open your browser and go to:

    `http://localhost:8080`


## Key features  

### Create Activity
- Create an Activity :  You can create your own Activity from scratch by clicking on the "Create Activity" button. There you can create new activities that can be used in workouts  by inputing a name, duration  and optionally notes for the activity. In the same page you will find below a list of all activities that exist and the ability to delete them at will. Error Handling to ensure correct data are inputted by the user.

### Create a Workout3
- Create a Workout :  You can create your own Workouts from scratch by clicking on the "Create Workout" button. There you can create new workouts by inputing a name, choosing some activities  and optionally notes for the workout. In the same page you will find below a list of all activities that exist and the ability to delete them at will. The user selects whitch activities he wants on his new Workout by clicking any activity button in the Activities section to add it to the workout, similarly he can click on any activity button displayied in the New Workout Section to remove it , i choose this design choice as it is simple and easy to use thus providing a better experiance for the user.
Error Handling to ensure correct data are inputted by the user.

### Start a Workout
- Start a Workouot : In the landing page is the Start a workout section there the user can select a workout and its difficulty(from 3 levels) and Press Start to begin the selected workout this will start the timer and take him to a seperate "timer page" where the user does the workout selected there he has the ability to pause or leave the workout whenever he wants. I decided to add the start Workout in the landing page as its the main feature of the application and i wanted to make access to it easy.Error Handling to ensure correct data are inputted by the user.

### Past Workouts
- Past Workouts : If the user clicks on the Past Workouts button in the main page he will be taken to another page where he will see a counter tracking the amount of workouts he has done and below a list of all Workouts done in order.I decided to add this feature as i think it motivates the user and enchances their experiance it is also a stepping stone and makes it easy to add rewards like medas for amount of workouts done

## AI
In js I used AI for debugging mainly around the way the timer works with the setInterval() and the delay() fucntion in timer.js, i also used ai to further understand how to code in js with github copilots explain feature as this is my first attempt coding in js

In css I used AI to understand how to Highlight buttons when the cursor is above them.

### Prompts for timer
A sequence of prompts helped me develop this feature:

>  How does setInterval() work

    The setInterval() function is a method in JavaScript that calls a function or evaluates an expression at specified intervals (in milliseconds). It will continue calling the function until clearInterval() is called or the window is closed.
    Here's a basic usage of setInterval():

    let intervalID = setInterval(myFunction, 3000);

    function myFunction() {
    // This code will run every 3 seconds
    console.log("Hello, World!");
    }

    In this example, myFunction is the function to be executed, and 3000 is the time interval between each execution in milliseconds (so 3 seconds in this case). The setInterval() function returns an interval ID, which can be used later with clearInterval(intervalID) to stop the function from executing.


>  How does the setTimeout() work

    The setTimeout() function in JavaScript is used to schedule a function or a specific block of code to be executed after a specified time. The time is in milliseconds.

    Here's a basic example:

    setTimeout(function() {
    console.log("This message will be logged after 2 seconds");
    }, 2000);

    In this example, the first argument to setTimeout is a function. This function will be executed after the delay specified by the second argument (2000 milliseconds, or 2 seconds).

    It's important to note that setTimeout doesn't pause the execution of the rest of the code. It simply schedules the function to run later. The rest of your code will continue to execute while the timer is counting down.

### Prompts for css

>  How can i amke a button highlighted when i hover over it

    You can use the :hover pseudo-class in CSS to change the style of a button when you hover over it. Here's an example:

    input[type="button"]:hover {
    background-color: #007BFF; 
    color: #ffffff;
    }

    In this example, when you hover over a button, the background color will change to #007BFF (a shade of blue) and the text color will change to white.



# Future Ideas

>   Add More depth and complexity to the difficulty system with more    levels 

>   Add a Database to properly store data

>   Add a feature to track calories

>   Add online features like leaderboards and group workouts

>   Make the create activity page into a smaller window that can found by clicking a button in the create workout page with the aim to   
    simplify the process of cration

> Medals rewarded to the user based on workouts done

# Known Bugs

>   When selected High difficulty rest times are longer making it easier instead of harder (and vise versa)