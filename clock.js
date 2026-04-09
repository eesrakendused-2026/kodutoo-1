console.log("fail ühendatud");

let hours, minutes, seconds, day, month, year, dateTime, ampm;
let fontSize = 25;

function upDateClock() {
    dateTime = new Date();

    hours = dateTime.getHours();
    minutes = dateTime.getMinutes();
    seconds = dateTime.getSeconds();
    ampm = "";

    const timeTick = document.getElementById('timeTick');

    if (timeTick && timeTick.checked) {
        ampm = hours >= 12 ? ' PM' : ' AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
    }

    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    document.getElementById('hours').innerHTML = hours + ":";
    document.getElementById('minutes').innerHTML = minutes + ":";
    document.getElementById('seconds').innerHTML = seconds  + ampm;
}

function changeFontSizeBigger() {
    fontSize = fontSize + 5;
    if (fontSize > 200) {
        fontSize = 200;
        window.alert("! Fondi suurus ei saa olla üle 200px !")
    }
    document.getElementById('dateContainer').style.fontSize = fontSize + "px";
    document.getElementById('clockContainer').style.fontSize = fontSize + "px";
    console.log()
}

/* Show lobsterElements oli loodud mitme promptiga ja googeldamisega */
function showLobsterElements() {
    const imgContainer = document.getElementById('imageDisplay');
    const leftContainer = document.getElementById('gifContainerLeft');
    const rightContainer = document.getElementById('gifContainerRight');

    imgContainer.innerHTML = '';
    leftContainer.innerHTML = '';
    rightContainer.innerHTML = '';

    const img = document.createElement('img');
    img.src = 'lobster.jpg';
    img.classList.add('fade-element'); 
    imgContainer.appendChild(img);

    const gifLeft = document.createElement('img');
    gifLeft.src = 'anim.gif';
    gifLeft.classList.add('fade-element');
    leftContainer.appendChild(gifLeft);

    const gifRight = document.createElement('img');
    gifRight.src = 'anim.gif';
    gifRight.classList.add('fade-element');
    rightContainer.appendChild(gifRight);

    img.offsetHeight; 

    setTimeout(() => {
        img.classList.add('fade-in');
        gifLeft.classList.add('visible');
        gifRight.classList.add('visible');
    }, 50);

    setTimeout(() => {
        img.classList.remove('fade-in');
        gifLeft.classList.remove('visible');
        gifRight.classList.remove('visible');
    }, 5000);

    setTimeout(() => {
        img.remove();
        gifLeft.remove();
        gifRight.remove();
    }, 6000);

    new Audio('heli.mp3').play();
}

function changeFontSizeSmaller() {
    fontSize = fontSize - 5;
    if (fontSize < 10) {
        fontSize = 10;
        window.alert("! Fondi suurus ei saa olla alla 10px !")
    }
    document.getElementById('dateContainer').style.fontSize = fontSize + "px";
    document.getElementById('clockContainer').style.fontSize = fontSize + "px";
    console.log()
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

    document.getElementById('day').innerHTML = day + ".";
    document.getElementById('month').innerHTML = month + ".";
    document.getElementById('year').innerHTML = year;
}

function checkKey(e) {
    console.log(e.keyCode)
    if (e.keyCode == 43) {
        changeFontSizeBigger();
    }
    if (e.keyCode == 45) {
        changeFontSizeSmaller();
    }
}

upDateClock();
updateDate();

setInterval(upDateClock, 1000);
setInterval(updateDate, 60000);
document.getElementById('bigger').addEventListener('click', changeFontSizeBigger);
document.getElementById('smaller').addEventListener('click', changeFontSizeSmaller);
document.getElementById('lobsterButton').addEventListener('click', showLobsterElements);
window.addEventListener('keypress', checkKey);