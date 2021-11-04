var timer;
var work = 1;
var rest = 1;
var remaining = 500;
var pid = 0;

function init() {
    timer = document.getElementById('minutes');
    while (true) {
        work = prompt("Welcome!\nHow long do you want to work for (in minutes)?\n(Recommended: 30)");
        if (isNaN(Number(work))) {
            work = prompt("Please enter a number.\nWork length (min.):");
        } else {
            break;
        }
    }
    while (true) {
        rest = prompt("...and how long do you want your breaks to be after working for " + work + "min (in minutes)?\n(Recommended: 10):");
        if (isNaN(Number(work))) {
            rest = prompt("Please enter a number.\nRest length (min.):");
        } else {
            break;
        }
    }
    remaining = work * 60;
    refreshDisplay();
    alert("Done! You'll work for " + work + "min and rest for " + rest + "min.\n\nTo start, press the Play button at the bottom.\n- When the screen is BLACK, do work.\n- When it turns WHITE, take a break.\n- The number is how many minutes are left in this chunk.\n- Press +1 to add a minute.\n- Press the laptop/umbrella image to switch to work or break immediately.\n\nEnjoy!");
}

function refreshDisplay(force) {
    var body = document.getElementById('body');
    if ((Math.ceil(remaining / 60) != timer.innerHTML) || force) {
        timer.innerHTML = Math.ceil(remaining / 60);
        if (timer.className == "paused") {
            if (body.className == "light") {
                document.title = ("Paused Break - " + Math.ceil(remaining / 60) + "m - Pomodoro Timer");
            } else if (body.className == "dark") {
                document.title = ("Paused Work - " + Math.ceil(remaining / 60) + "m - Pomodoro Timer");
            }
        } else if (timer.className == "") {
            if (body.className == "light") {
                document.title = ("Break - " + Math.ceil(remaining / 60) + "m - Pomodoro Timer");
            } else if (body.className == "dark") {
                document.title = ("Working - " + Math.ceil(remaining / 60) + "m - Pomodoro Timer");
            }
        }
    }
}

function addOne() {
    remaining = remaining + 60;
    refreshDisplay(true);
}

function toggleWork() {
    var body = document.getElementById('body');
    if (body.className == "light") { // Light = resting, change to work
        body.className = "dark";
        document.getElementById('state-icon').className = "material-icons";
        setTimeout(function () {
            document.getElementById('state-icon').innerHTML = "beach_access";
            remaining = work * 60;
            refreshDisplay(true);
        }, 150);
    } else { // Dark = working, change to rest
        body.className = "light";
        document.getElementById('state-icon').className = "material-icons transition-spin";
        setTimeout(function () {
            document.getElementById('state-icon').innerHTML = "laptop";
            remaining = rest * 60;
            refreshDisplay(true);
        }, 150);
    }
}

function toggleTimer() {
    if (timer.className == "paused") { // Paused, so resume
        timer.className = "";
        document.getElementById('play-icon').className = "material-icons transition-spin";
        setTimeout(function () {
            document.getElementById('play-icon').innerHTML = "pause";
            refreshDisplay(true);
        }, 150);
        pid = setInterval(function () {
            remaining = remaining - 1;
            refreshDisplay();
            if (remaining <= 0) {
                toggleWork();
            }
        }, 1000);
    } else { // Not paused, so pause
        timer.className = "paused";
        document.getElementById('play-icon').className = "material-icons";
        setTimeout(function () {
            document.getElementById('play-icon').innerHTML = "play_arrow";
            refreshDisplay(true);
        }, 150);
        clearInterval(pid);
    }
}

window.onload = init;