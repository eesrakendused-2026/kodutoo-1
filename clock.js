console.log("fail ühendatud");

let hours, minutes, seconds, day, month, year, dateTime, weekday;
let fontSize = 150;
const dayNames = ["Esmaspäev", "Teisipäev", "Kolmapäev", "Neljapäev", "Reede", "Laupäev", "Pühapäev"];

let posX = 0;
let posY = 0;
const moveStep = 20;

function changeFontSizeBigger(){
    fontSize = fontSize + 10;
    if(fontSize > 200){
        fontSize = 200;
        window.alert("Fondi suurus ei saa olla üle 200 piksli");
    }
    document.getElementById('dateContainer').style.fontSize =  fontSize + "px";
    document.getElementById('clockContainer').style.fontSize =  fontSize + "px";
}

function changeFontSizeSmaller(){
    fontSize = fontSize - 10;
    if(fontSize < 10){
        fontSize = 10;
        window.alert("Fondi suurus ei saa olla alla 10 piksli");
    }
    document.getElementById('dateContainer').style.fontSize =  fontSize + "px";
    document.getElementById('clockContainer').style.fontSize =  fontSize + "px";
}

function getRandomColor(){
    return "#" + Math.floor(Math.random()*16777215).toString(16);
}

function changeClockColor(e){
    e.stopPropagation();
    document.getElementById('clockContainer').style.color = getRandomColor();
}

function changeDateColor(e){
    e.stopPropagation();
    document.getElementById('dateContainer').style.color = getRandomColor();
}

function changeBgColor(){
    document.body.style.backgroundColor = getRandomColor();
}

const fonts = ['sans-serif', 'impact', 'monospace', 'cursive', 'fantasy', 'arial', 'georgia', 'courier new', 'serif', 'times new roman', 'comic sans ms']
let clockFontIndex = 0;
let dateFontIndex = 0;

function changeClockFont() {
    clockFontIndex = (clockFontIndex + 1) % fonts.length;
    document.getElementById('clockContainer').style.fontFamily = fonts[clockFontIndex];
}

function changeDateFont(){
    dateFontIndex = (dateFontIndex + 1) % fonts.length;
    document.getElementById('dateContainer').style.fontFamily = fonts[dateFontIndex];
}

function moveClock(direction) {
    if (direction === "up") posY -= moveStep;
    if (direction === "down") posY += moveStep;
    if (direction === "left") posX -= moveStep;
    if (direction === "right") posX += moveStep;

    const transformValue = `translate(${posX}px, ${posY}px)`;
    document.getElementById('clockContainer').style.transform = transformValue;
    document.getElementById('dateContainer').style.transform = transformValue;
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
    weekday = dayNames[dateTime.getDay() - 1];
    day = dateTime.getDate();
    month = dateTime.getMonth() + 1;
    year = dateTime.getFullYear();

    if(day < 10){
        day = "0" + day;
    }
    if(month < 10){
        month = "0" + month;
    }

    document.getElementById('weekday').innerHTML = weekday + ",&nbsp;";
    document.getElementById('day').innerHTML = day + ".";
    document.getElementById('month').innerHTML = month + ".";
    document.getElementById('year').innerHTML = year;
}

function checkKey(e){
    console.log(e.keyCode);
    if(e.keyCode == 43){
        changeFontSizeBigger();
    }
    if(e.keyCode == 45){
        changeFontSizeSmaller();
    }
    if(e.key == "1"){
        changeClockFont();
    }
    if(e.key == "2"){
        changeDateFont();
    }
    if(e.key === "ArrowUp"){
        moveClock("up");
    }
    if(e.key === "ArrowDown"){
        moveClock("down");
    }
    if(e.key === "ArrowLeft"){
        moveClock("left");
    }
    if(e.key === "ArrowRight"){
        moveClock("right");
    }
}

upDateClock();
updateDate();
setInterval(upDateClock, 1000);
setInterval(updateDate, 60000);
document.getElementById('bigger').addEventListener('click', changeFontSizeBigger);
document.getElementById('smaller').addEventListener('click', changeFontSizeSmaller);
document.getElementById('clockContainer').addEventListener('click', changeClockColor);
document.getElementById('dateContainer').addEventListener('click', changeDateColor);
document.getElementById('container').addEventListener('click', changeBgColor);
window.addEventListener("keydown", checkKey);