var timer;
var work = 1;
var rest = 1;
var remaining = 500;
var pid = 0;

function init() {
    timer = document.getElementById('minutes');
    while (true) {
        work = prompt("Work period (min.):");
        if (isNaN(Number(work))) {
            work = prompt("Please enter a number.\nWork period (min.):");
        } else {
            break;
        }
    }
    while (true) {
        rest = prompt("Rest period (min.):");
        if (isNaN(Number(work))) {
            rest = prompt("Please enter a number.\nRest period (min.):");
        } else {
            break;
        }
    }
    remaining = work * 60;
    refreshDisplay();
}

function refreshDisplay() {
    if (Math.ceil(remaining / 60) != timer.innerHTML) {
        timer.innerHTML = Math.ceil(remaining / 60);
    }
}

function addOne() {
    remaining = remaining + 60;
    refreshDisplay();
}

function toggleWork() {
    var body = document.getElementById('body');
    if (body.className == "light") { // Light = resting, change to work
        body.className = "dark";
        document.getElementById('state-icon').className = "material-icons";
        setTimeout(function () {
            document.getElementById('state-icon').innerHTML = "beach_access";
            remaining = work * 60;
            refreshDisplay();
        }, 150);
    } else { // Dark = working, change to rest
        body.className = "light";
        document.getElementById('state-icon').className = "material-icons transition-spin";
        setTimeout(function () {
            document.getElementById('state-icon').innerHTML = "laptop";
            remaining = rest * 60;
            refreshDisplay();
        }, 150);
    }
}

function toggleTimer() {
    if (timer.className == "paused") { // Paused, so resume
        timer.className = "";
        document.getElementById('play-icon').className = "material-icons transition-spin";
        setTimeout(function () {
            document.getElementById('play-icon').innerHTML = "pause";
            refreshDisplay();
        }, 150);
        pid = setInterval(function () {
            remaining = remaining - 1;
            refreshDisplay();
            if (remaining == 0) {
                toggleWork();
            }
        }, 1000);
    } else { // Not paused, so pause
        timer.className = "paused";
        document.getElementById('play-icon').className = "material-icons";
        setTimeout(function () {
            document.getElementById('play-icon').innerHTML = "play_arrow";
            refreshDisplay();
        }, 150);
        clearInterval(pid);
    }
}

window.onload = init;