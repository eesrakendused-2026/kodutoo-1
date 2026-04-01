// KRISTO KUKK
console.log("fail ühendatud");
let hours, minutes, seconds, day, month, year, dateTime;
let fontSize = 25;
let colorMode = "white";
let is24Hour = true;
const allElements = document.querySelectorAll("*");
let showSeconds = true;

const weekdays = ["Pühapäev", "Esmaspäev", "Teisipäev", "Kolmapäev", "Neljapäev", "Reede", "Laupäev"];
document.getElementById("weekday").textContent = "(" + weekdays[new Date().getDay()] + ")";

// Fonti suuruse muutjate funktsioonid
function changeFontSizeBigger() {
    fontSize = fontSize + 5;
    if (fontSize > 200) {
        fontSize = 200;
        window.alert("Fondi suurus ei saa olla üle 200 piksli");
    }
    document.getElementById('dateContainer').style.fontSize = fontSize + "px";
    document.getElementById('clockContainer').style.fontSize = fontSize + "px";
    document.getElementById('weekday').style.fontSize = fontSize + "px";
}

function changeFontSizeSmaller() {
    fontSize = fontSize - 5;
    if (fontSize < 10) {
        fontSize = 10;
        window.alert("Fondi suurus ei saa olla alla 10 piksli");
    }
    document.getElementById('dateContainer').style.fontSize = fontSize + "px";
    document.getElementById('clockContainer').style.fontSize = fontSize + "px";
    document.getElementById('weekday').style.fontSize = fontSize + "px";
}

// Kuupäeva uuendaja
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

    document.getElementById('day').innerHTML = day + "/";
    document.getElementById('month').innerHTML = month + "/";
    document.getElementById('year').innerHTML = year;
}

// Sekundite peitmine/näitamine
function toggleSeconds() {
    showSeconds = !showSeconds;
    document.getElementById("secondsButton").innerHTML = showSeconds ? "Sekundid: ON" : "Sekundid: OFF";
}

// Kellaaja uuendaja (PM/AM ja 24H formaat)
function updateTime() {
    dateTime = new Date();
    hours = dateTime.getHours();
    minutes = dateTime.getMinutes();
    seconds = dateTime.getSeconds();

    let ampm = "";

    if (!is24Hour) {
        ampm = hours >= 12 ? " PM" : " AM";
        hours = hours % 12;
        if (hours === 0) {
            hours = 12;
        }
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    document.getElementById('hours').innerHTML = hours + ":";
    if (showSeconds) {
        document.getElementById('minutes').innerHTML = minutes + ":";
        document.getElementById('seconds').innerHTML = seconds + ampm;
    } else {
        document.getElementById('minutes').innerHTML = minutes;
        document.getElementById('seconds').innerHTML = "";
    }
}

// Siin tegelikult tasuks kasutada muutujaid ja forEach loopi, et vältida kordusi.
// DARK MODE / LIGHT MODE
function changeColorMode() {
    if (colorMode === "white") {
        document.getElementById('body').style.background = "linear-gradient(137deg,rgba(102, 102, 102, 1) 0%, rgba(23, 23, 23, 1) 100%)";
        document.getElementById("bigger").style.backgroundColor = "rgba(102, 102, 102, 1)";
        document.getElementById("smaller").style.backgroundColor = "rgba(102, 102, 102, 1)";
        // source: https://www.reddit.com/r/learnjavascript/comments/9j1ygc/get_all_textcontaining_elements_eachs_path_and/
        allElements.forEach(el => {
            el.style.color = "white";
        });
        document.getElementById("darkModeButton").style.backgroundColor = "rgba(212, 212, 212, 1)";
        document.getElementById("formatButton").style.backgroundColor = "rgba(212, 212, 212, 1)";
        document.getElementById("secondsButton").style.backgroundColor = "rgba(212, 212, 212, 1)";
        document.getElementById("musicButton").style.backgroundColor = "rgba(212, 212, 212, 1)";
        document.getElementById("darkModeButton").style.color = "rgba(102, 102, 102, 1)";
        document.getElementById("formatButton").style.color = "rgba(102, 102, 102, 1)";
        document.getElementById("secondsButton").style.color = "rgba(102, 102, 102, 1)";
        document.getElementById("musicButton").style.color = "rgba(102, 102, 102, 1)";
        document.getElementById("darkModeButton").innerText = "HELE";
        colorMode = "dark";
    } else {
        document.getElementById('body').style.background = "linear-gradient(137deg,rgba(227, 227, 227, 1) 0%, rgba(212, 212, 212, 1) 26%, rgba(181, 181, 181, 1) 100%)";
        document.getElementById("bigger").style.backgroundColor = "rgba(212, 212, 212, 1)";
        document.getElementById("smaller").style.backgroundColor = "rgba(212, 212, 212, 1)";
        allElements.forEach(el => {
            el.style.color = "rgb(69, 69, 69)";
        });
        document.getElementById("darkModeButton").style.backgroundColor = "rgba(102, 102, 102, 1)";
        document.getElementById("formatButton").style.backgroundColor = "rgba(102, 102, 102, 1)";
        document.getElementById("musicButton").style.backgroundColor = "rgba(102, 102, 102, 1)";
        document.getElementById("secondsButton").style.backgroundColor = "rgba(102, 102, 102, 1)";
        document.getElementById("formatButton").style.color = "rgba(212, 212, 212, 1)";
        document.getElementById("secondsButton").style.color = "rgba(212, 212, 212, 1)";
        document.getElementById("musicButton").style.color = "rgba(212, 212, 212, 1)";
        document.getElementById("darkModeButton").style.color = "white";
        document.getElementById("darkModeButton").innerText = "TUME";
        colorMode = "white";
    }
}

function changeFormat() {
    is24Hour = !is24Hour;
    this.innerHTML = is24Hour ? "24H" : "12H";
}


// source: https://stackoverflow.com/questions/65034729/making-a-button-that-turns-on-off-background-music-in-js
let audioSwitch = document.querySelector('.musicOn');
let backgroundAudio = document.querySelector('.musicOn audio');
let audioOn = false;
audioSwitch.onclick = function () {
    backgroundAudio.paused ? backgroundAudio.play() : backgroundAudio.pause();
    if (!audioOn) {
        document.getElementById("musicButton").innerText = "Muusika: ON";
        audioOn = true
    } else {
        document.getElementById("musicButton").innerText = "Muusika: OFF";
        audioOn = false
    }
}

function checkKey(e) {
    console.log(e.keyCode);
    if (e.keyCode == 43) {
        changeFontSizeBigger();
    }
    if (e.keyCode == 45) {
        changeFontSizeSmaller();
    }
}

function upDateClock() {
    updateTime();
    updateDate();
}

upDateClock();
setInterval(upDateClock, 1000);
document.getElementById('bigger').addEventListener('click', changeFontSizeBigger);
document.getElementById('smaller').addEventListener('click', changeFontSizeSmaller);
document.getElementById('darkModeButton').addEventListener('click', changeColorMode);
document.getElementById('formatButton').addEventListener('click', changeFormat);
document.getElementById('secondsButton').addEventListener('click', toggleSeconds);
window.addEventListener('keypress', checkKey);