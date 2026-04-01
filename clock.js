console.log("fail ühendatud");
const pi = 3.14;
let hours, minutes, seconds, day, month, year, dateTime;
let fontSize = 100;
let bgState = 0;

function changeFontSizeBigger(){
    fontSize = fontSize + 5;
    if(fontSize > 300){
        fontSize = 300;
        window.alert("Fondi suurus ei saa olla üle 300 piksli");
    }
    document.getElementById('dateContainer').style.fontSize =  fontSize + "px";
    document.getElementById('clockContainer').style.fontSize =  fontSize + "px";
}

function changeFontSizeSmaller(){
    fontSize = fontSize - 5;
    if(fontSize < 10){
        fontSize = 10;
        window.alert("Fondi suurus ei saa olla alla 10 piksli");
    }
    document.getElementById('dateContainer').style.fontSize =  fontSize + "px";
    document.getElementById('clockContainer').style.fontSize =  fontSize + "px";
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

    if(day < 10){
        day = "0" + day;
    }
    if(month < 10){
        month = "0" + month;
    }

    document.getElementById('day').innerHTML = day + ".";
    document.getElementById('month').innerHTML = month + ":";
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
    if(e.keyCode == 32){
        changeBackground();
    }
    if(e.keyCode == 97 || e.keyCode == 100 || e.keyCode == 119 || e.keyCode == 115){
        changeLocation(e.keyCode);
    }
}


function changeBackground() {
    if(bgState === 0){
        document.body.style.background = "black";
        document.body.style.backgroundImage = "none";
        bgState = 1;
    } 
    else if(bgState === 1){
        document.body.style.backgroundImage = "url('img/batman-joonistus.png')";
        bgState = 2;
    } 
    else {
        document.body.style.backgroundImage = "url('img/spiderman-joonistus.png')";
        bgState = 0;
    }
}

let movementHorizontal = 0;
let movementVertical = 0;
function changeLocation(key){
    if(key == 97){
        movementHorizontal = movementHorizontal - 5
        document.getElementById('container').style.left =  movementHorizontal + "px";
    }
    if(key == 100){
        movementHorizontal = movementHorizontal + 5
        document.getElementById('container').style.left =  movementHorizontal + "px";
    }
    if(key == 119){
        movementVertical = movementVertical - 5
        document.getElementById('container').style.top =  movementVertical + "px";
    }
    if(key == 115){
        movementVertical = movementVertical + 5
        document.getElementById('container').style.top =  movementVertical + "px";
    }
}

function changeFontCursive(){document.getElementById('container').style.fontFamily = "cursive";}
function changeFontFantasy(){document.getElementById('container').style.fontFamily = "fantasy";}

function clickColor(color){
    document.getElementById("container").style.color = color;
}

upDateClock();
updateDate();
setInterval(upDateClock, 1000);
setInterval(updateDate, 60000);
//document.getElementById('bigger').addEventListener('click', changeFontSizeBigger);
//document.getElementById('smaller').addEventListener('click', changeFontSizeSmaller);
window.addEventListener('keypress', checkKey);