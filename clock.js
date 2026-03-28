console.log("fail ühendatud");
const pi = 3.14;
let fontSize = 115;
let currentFontIndex = 0;
const fonts = ["Arial", "Verdana", "Roboto", "Times New Roman"];
const textColorPicker = document.getElementById('textColor');
const bgColorPicker = document.getElementById('bgColor');

function changeFontSizeBigger() {
    fontSize = fontSize + 5;
    if (fontSize > 225) {
        fontSize = 225;
        window.alert("Fondi suurus ei saa olla üle 225 piksli");
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

function updateClock() {
    let dateTime = new Date();

    let hours = dateTime.getHours();
    let minutes = dateTime.getMinutes();
    let seconds = dateTime.getSeconds();

    let format = document.getElementById("format").value;

    if (format === "12") {
        // 12-hour format
        let ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12;

        document.getElementById('seconds').innerHTML = seconds < 10 ? "0" + seconds + " " + ampm : seconds + " " + ampm;
        document.getElementById('minutes').innerHTML = (minutes < 10 ? "0" + minutes : minutes) + ":";
        document.getElementById('hours').innerHTML = (hours < 10 ? "0" + hours : hours) + ":";
    } else {
        // 24-hour format
        if (hours < 10) hours = "0" + hours;
        if (minutes < 10) minutes = "0" + minutes;
        if (seconds < 10) seconds = "0" + seconds;

        document.getElementById('hours').innerHTML = hours + ":";
        document.getElementById('minutes').innerHTML = minutes + ":";
        document.getElementById('seconds').innerHTML = seconds;
    }
}

function updateDate() {
    dateTime = new Date();
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    day = dateTime.getDate();
    month = dateTime.getMonth() + 1;
    year = dateTime.getFullYear();

    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }

    let weekday = weekdays[dateTime.getDay()];


    document.getElementById('day').innerHTML = day + ".";
    document.getElementById('month').innerHTML = month + ".";
    document.getElementById('year').innerHTML = year;
    document.getElementById('weekday').innerHTML = weekday;
}

function changeFont() {
    currentFontIndex = (currentFontIndex + 1) % fonts.length;
    document.body.style.fontFamily = fonts[currentFontIndex];
}

function checkKey(e) {
    console.log(e.keyCode);
    // Vajutades "+" nuppu läheb tekst suuremaks
    if (e.keyCode == 43) {
        changeFontSizeBigger();
    }
    // Vajutades "-" nuppu läheb tekst väiksemaks
    if (e.keyCode == 45) {
        changeFontSizeSmaller();
    }
    // Vajutades tühikuklahvi(spacebar) muutub teksti font
    if (e.keyCode == 32) {
        changeFont();
    }
}

textColorPicker.addEventListener('input', (event) => {
    const color = event.target.value;
    document.body.style.color = color;
});

bgColorPicker.addEventListener('input', (event) => {
    const color = event.target.value;
    document.body.style.backgroundColor = color;
});

updateClock();
updateDate();
setInterval(updateClock, 500);
setInterval(updateDate, 60000);
document.getElementById('bigger').addEventListener('click', changeFontSizeBigger);
document.getElementById('smaller').addEventListener('click', changeFontSizeSmaller);
document.getElementById('changeFont').addEventListener('click', changeFont);
window.addEventListener('keypress', checkKey);