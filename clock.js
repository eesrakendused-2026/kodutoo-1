console.log("fail ühendatud");
const pi = 3.14;
let hours, minutes, seconds, day, month, year, dateTime;
let fontSize = 25;
let weekdaySize = 20;
let hoursSize = 25;
let minutesSize = 25;
let secondsSize = 25;

function changeFontSizeBigger(){
    fontSize = fontSize + 5;
    if(fontSize > 200){
        fontSize = 200;
        window.alert("Fondi suurus ei saa olla üle 200 piksli");
    }
    document.getElementById('dateContainer').style.fontSize =  fontSize + "px";
    document.getElementById('clockContainer').style.fontSize =  fontSize + "px";

    hoursSize = fontSize;
    minutesSize = fontSize;
    secondsSize = fontSize;
    document.getElementById('hours').style.fontSize =  hoursSize + "px";
    document.getElementById('minutes').style.fontSize =  minutesSize + "px";
    document.getElementById('seconds').style.fontSize =  secondsSize + "px";
}

function changeFontSizeSmaller(){
    fontSize = fontSize - 5;
    if(fontSize < 10){
        fontSize = 10;
        window.alert("Fondi suurus ei saa olla alla 10 piksli");
    }
    document.getElementById('dateContainer').style.fontSize =  fontSize + "px";
    document.getElementById('clockContainer').style.fontSize =  fontSize + "px";

    hoursSize = fontSize;
    minutesSize = fontSize;
    secondsSize = fontSize;
    document.getElementById('hours').style.fontSize =  hoursSize + "px";
    document.getElementById('minutes').style.fontSize =  minutesSize + "px";
    document.getElementById('seconds').style.fontSize =  secondsSize + "px";
}

//Tunnid
function biggerHours() {
    hoursSize = hoursSize + 5;
    if (hoursSize > 200) {
        hoursSize = 200;
        window.alert("Tundide suurus ei saa olla üle 200 piksli");
    }
    document.getElementById('hours').style.fontSize = hoursSize + "px";
}

function smallerHours() {
    hoursSize = hoursSize - 5;
    if (hoursSize < 10) {
        hoursSize = 10;
        window.alert("Tundide suurus ei saa olla alla 10 piksli");
    }
    document.getElementById('hours').style.fontSize = hoursSize + "px";
}

//Minutid
function biggerMinutes() {
    minutesSize = minutesSize + 5;
    if (minutesSize > 200) {
        minutesSize = 200;
        window.alert("Minutite suurus ei saa olla üle 200 piksli");
    }
    document.getElementById('minutes').style.fontSize = minutesSize + "px";
}

function smallerMinutes() {
    minutesSize = minutesSize - 5;
    if (minutesSize < 10) {
        minutesSize = 10;
        window.alert("Minutite suurus ei saa olla alla 10 piksli");
    }
    document.getElementById('minutes').style.fontSize = minutesSize + "px";
}

//Sekundid
function biggerSeconds() {
    secondsSize = secondsSize + 5;
    if (secondsSize > 200) {
        secondsSize = 200;
        window.alert("Sekundite suurus ei saa olla üle 200 piksli");
    }
    document.getElementById('seconds').style.fontSize = secondsSize + "px";
}

function smallerSeconds() {
    secondsSize = secondsSize - 5;
    if (secondsSize < 10) {
        secondsSize = 10;
        window.alert("Sekundite suurus ei saa olla alla 10 piksli");
    }
    document.getElementById('seconds').style.fontSize = secondsSize + "px";
}

//Nädalapäevad
function biggerWeekday() {
    weekdaySize = weekdaySize + 5;
    if (weekdaySize > 200) {
        weekdaySize = 200;
        window.alert("Nädalapäeva suurus ei saa olla üle 200 piksli");
    }
    document.getElementById('weekdayContainer').style.fontSize = weekdaySize + "px";
}

function smallerWeekday() {
    weekdaySize = weekdaySize - 5;
    if (weekdaySize < 10) {
        weekdaySize = 10;
        window.alert("Nädalapäeva suurus ei saa olla alla 10 piksli");
    }
    document.getElementById('weekdayContainer').style.fontSize = weekdaySize + "px";
}

function upDateClock() {
    dateTime = new Date();

    hours = dateTime.getHours();
    minutes = dateTime.getMinutes();
    seconds = dateTime.getSeconds();

    if(hours < 10){
        hours = "0" + hours;
    }
    if(minutes < 10){
        minutes = "0" + minutes;
    }
    if(seconds < 10){
        seconds = "0" + seconds;
    }

    document.getElementById('hours').innerHTML = hours + ":";
    document.getElementById('minutes').innerHTML = minutes + ":";
    document.getElementById('seconds').innerHTML = seconds;
}

function updateDate(){
    dateTime = new Date();
    day = dateTime.getDate();
    month = dateTime.getMonth() + 1;
    year = dateTime.getFullYear();

    let weekdays = ["Pühapäev", "Esmaspäev", "Teisipäev", "Kolmapäev", 
                    "Neljapäev", "Reede", "Laupäev"];
    let weekday = weekdays[dateTime.getDay()];

    if(day < 10){
        day = "0" + day;
    }
    if(month < 10){
        month = "0" + month;
    }

    document.getElementById('day').innerHTML = day + ".";
    document.getElementById('month').innerHTML = month + ":";
    document.getElementById('year').innerHTML = year;
    document.getElementById('weekday').innerHTML = weekday;
}

upDateClock();
updateDate();
setInterval(upDateClock, 1000);
setInterval(updateDate, 60000);

document.getElementById('bigger').addEventListener('click', changeFontSizeBigger);
document.getElementById('smaller').addEventListener('click', changeFontSizeSmaller);
document.getElementById('biggerHours').addEventListener('click', biggerHours);
document.getElementById('smallerHours').addEventListener('click', smallerHours);
document.getElementById('biggerMinutes').addEventListener('click', biggerMinutes);
document.getElementById('smallerMinutes').addEventListener('click', smallerMinutes);
document.getElementById('biggerSeconds').addEventListener('click', biggerSeconds);
document.getElementById('smallerSeconds').addEventListener('click', smallerSeconds);
document.getElementById('biggerWeekday').addEventListener('click', biggerWeekday);
document.getElementById('smallerWeekday').addEventListener('click', smallerWeekday);

document.getElementById('repoLink').addEventListener('click', function(e) {
    e.preventDefault();
    alert("Repositoorium: https://github.com/Kregor06/kodutoo-1");
});

document.getElementById('hours').style.fontSize = fontSize + "px";
document.getElementById('minutes').style.fontSize = fontSize + "px";
document.getElementById('seconds').style.fontSize = fontSize + "px";
document.getElementById('weekdayContainer').style.fontSize = weekdaySize + "px";