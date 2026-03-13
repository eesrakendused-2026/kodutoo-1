console.log("fail ühendatud");
const pi = Math.PI;
let hours, minutes, seconds, day, month, year, dateTime;
let fontSize = 25;

const music = document.getElementById("music")
const musicBtn = document.getElementById("musicBtn")
let isPlaying = false
let format = "eu"
let container = document.getElementById("container")


musicBtn.addEventListener("click", () => {
    if (!isPlaying) {
        music.play()
        isPlaying = true
    }
    else {
        music.pause()
        isPlaying = false
    }
})

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

function upDateClock() {

    if (format == "eu") {
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

        document.getElementById('hours').innerHTML = hours + ":";
        document.getElementById('minutes').innerHTML = minutes + ":";
        document.getElementById('seconds').innerHTML = seconds;
    }
    else if (format == "us") {
        dateTime = new Date();

        hours = dateTime.getHours() - 12;
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

        document.getElementById('hours').innerHTML = hours + ":";
        document.getElementById('minutes').innerHTML = minutes + ":";
        document.getElementById('seconds').innerHTML = seconds;
    }

}


function changeFormat(newFormat) {
    format = newFormat
}




function updateDate() {

    if (format == "eu") {
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
        document.getElementById('month').innerHTML = month + ":";
        document.getElementById('year').innerHTML = year;
    }
    else if (format == "us") {
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

        document.getElementById('day').innerHTML = month + ".";
        document.getElementById('month').innerHTML = day + ":";
        document.getElementById('year').innerHTML = year;
    }

}

let posHor = document.getElementById("container").offsetLeft
let posVer = document.getElementById("container").offsetTop
function checkKey(e) {
    console.log(posVer);
    if (e.keyCode == 43) {
        changeFontSizeBigger();
    }
    if (e.keyCode == 45) {
        changeFontSizeSmaller();
    }
    if (e.keyCode == 52) {
        posHor -= 15
        document.getElementById("container").style.left = `${posHor}px`
    }
    if (e.keyCode == 54) {
        posHor += 15
        document.getElementById("container").style.left = `${posHor}px`
    }
    if (e.keyCode == 56) {
        posVer -= 15
        document.getElementById("container").style.top = `${posVer}px`
    }
    if (e.keyCode == 50) {
        posVer += 15
        document.getElementById("container").style.top = `${posVer}px`
    }

}

function changeWallpaper(path) {
    const body = document.getElementsByTagName("body")
    body[0].style.backgroundImage = `url(../public/${path})`
}




upDateClock();
updateDate();
setInterval(upDateClock, 1000);
setInterval(updateDate, 1000);
document.getElementById('bigger').addEventListener('click', changeFontSizeBigger);
document.getElementById('smaller').addEventListener('click', changeFontSizeSmaller);
window.addEventListener('keypress', checkKey);