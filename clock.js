console.log("fail ühendatud");
const pi = 3.14;
let hours, minutes, seconds, day, month, year, dateTime;
let fontSize = 100;
let pressSpace = false

function changeFontSizeBigger() {
    fontSize = fontSize + 5;
    if (fontSize > 200) {
        fontSize = 200;
        window.alert("Fondi suurus ei saa olla üle 200 piksli");
    }
    document.getElementById('dateContainer').style.fontSize = fontSize + "px";
    document.getElementById('clockContainer').style.fontSize = fontSize + "px";
}

function changeFontSizeSmaller() {
    fontSize = fontSize - 5;
    if (fontSize < 10) {
        fontSize = 10;
        window.alert("Fondi suurus ei saa olla alla 10 piksli");
    }
    document.getElementById('dateContainer').style.fontSize = fontSize + "px";
    document.getElementById('clockContainer').style.fontSize = fontSize + "px";
}

function randomizeBackgroundColor() {
    min = 0;
    max = 255;
    // random valemi leidsin googeldades Math.random()
    r = Math.floor(Math.random() * (max - min + 1)) + min;
    g = Math.floor(Math.random() * (max - min + 1)) + min;
    b = Math.floor(Math.random() * (max - min + 1)) + min;

    document.getElementById('clockBody').style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
}

function changeClockOrder() {
    order = document.getElementById('container').style.flexDirection;
    if (order == "column") {
        document.getElementById('container').style.flexDirection = "column-reverse";
        console.log("reverse")
    } else {
        document.getElementById('container').style.flexDirection = "column";
        console.log("column")
    }
}

function moveClock() {
    direction = this.id;
    if (direction == "moveLeft") {
        console.log("left");
        document.getElementById('container').style.alignItems = "flex-start";
    } else if (direction == "moveRight") {
        console.log("right");
        document.getElementById('container').style.alignItems = "flex-end";
    } else {
        console.log("center");
        document.getElementById('container').style.alignItems = "center";
    }
}

function upDateClock() {
    dateTime = new Date();

    hours = dateTime.getHours();
    minutes = dateTime.getMinutes();
    seconds = dateTime.getSeconds();

    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    if (pressSpace == false) {
        document.getElementById('hours').innerHTML = hours + ":";
        document.getElementById('minutes').innerHTML = minutes + ":";
        document.getElementById('seconds').innerHTML = seconds;
    } else {}
    

}

function updateDate() {
    dateTime = new Date();
    day = dateTime.getDate();
    month = dateTime.getMonth() + 1;
    year = dateTime.getFullYear();

    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }

    if (pressSpace == false) {
        document.getElementById('day').innerHTML = day + ".";
        document.getElementById('month').innerHTML = month + ".";
        document.getElementById('year').innerHTML = year;
    } else {}
}

function checkKey(e) {
    console.log(e.keyCode);
    if (e.keyCode == 43) {
        changeFontSizeBigger();
    }
    if (e.keyCode == 45) {
        changeFontSizeSmaller();
    }
    if (e.keyCode == 32) {
        if (pressSpace == false){
            pressSpace = true;
            document.getElementById('paused').innerHTML = "PAUSED";
        } else {
            pressSpace = false;
            document.getElementById('paused').innerHTML = "";
        }
        
    }
}

function rainbowClock() {

    if (document.getElementById('clockContainer').style.animationName == "none") {
        document.getElementById('clockContainer').style.animationName = "rainbowText";
        document.getElementById('dateContainer').style.animationName = "rainbowText";

    } else {
        document.getElementById('clockContainer').style.animationName = "none";
        document.getElementById('dateContainer').style.animationName = "none";
    }
}



upDateClock();
updateDate();
setInterval(upDateClock, 1000);
setInterval(updateDate, 60000);
document.getElementById('bigger').addEventListener('click', changeFontSizeBigger);
document.getElementById('smaller').addEventListener('click', changeFontSizeSmaller);

document.getElementById('randomColor').addEventListener('click', randomizeBackgroundColor);

window.addEventListener('keypress', checkKey);

document.getElementById('changeClockOrder').addEventListener('click', changeClockOrder);

document.getElementById('moveLeft').addEventListener('click', moveClock);
document.getElementById('moveCenter').addEventListener('click', moveClock);
document.getElementById('moveRight').addEventListener('click', moveClock);

document.getElementById('rainbowText').addEventListener('click', rainbowClock);