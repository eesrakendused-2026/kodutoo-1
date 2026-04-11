console.log("fail ühendatud");
const pi= 3.14;
let hours, minutes, seconds, day, month, year, dateTime;
let fontSize = 25;
let currentScale = 1.0;

function changeFontSizeBigger(){
    if(fontSize < 200){
        fontSize += 5;
    }
    document.getElementById('clockContainer').style.fontSize = fontSize + "px";
    document.getElementById('dateContainer').style.fontSize = fontSize + "px";
}

function changeFontSizeSmaller(){
    if(fontSize > 10){
        fontSize -= 5;
    }
    document.getElementById('clockContainer').style.fontSize = fontSize + "px";
    document.getElementById('dateContainer').style.fontSize = fontSize + "px";
}

function upDateClock(){ 
    dateTime = new Date();

    hours = dateTime.getHours();
    minutes = dateTime.getMinutes();
    seconds = dateTime.getSeconds();

    if(hours < 10) hours = "0" + hours;
    if(minutes < 10) minutes = "0" + minutes;
    if(seconds < 10) seconds = "0" + seconds;

    document.getElementById('hours').innerHTML = hours + " :";
    document.getElementById('minutes').innerHTML = minutes + " :";
    document.getElementById('seconds').innerHTML = seconds;
}

function updateDate(){
    dateTime = new Date(); 

    day = dateTime.getDate();
    month = dateTime.getMonth() + 1;
    year = dateTime.getFullYear();

    if(day < 10) day = "0" + day;
    if(month < 10) month = "0" + month;

    document.getElementById('day').innerHTML = day + ".";
    document.getElementById('month').innerHTML = month + ".";
    document.getElementById('year').innerHTML = year;
}


const viewElement = document.getElementById('view'); 
const discoWrapper = document.getElementById("discoWrapper");
const discoText = document.getElementById("discoTextOverlay");
const discoMusic = document.getElementById("discoMusic");
const modeToggle = document.getElementById("modeToggle");
let discoActive = false;


discoWrapper.addEventListener("click", () => {
    discoActive = !discoActive;

    if (discoActive) {
        document.body.classList.add("discomode");
        discoText.innerHTML = "dance no more";
        discoMusic.play().catch(err => console.log("Heli vajab esmast klikki"));
    } else {
        document.body.classList.remove("discomode");
        discoText.innerHTML = "disco occasionally";
        discoMusic.pause();
        discoMusic.currentTime = 0; 
    }
});

document.getElementById('zoomIn').addEventListener('click', () => {
    if (currentScale < 1.8) {
        currentScale += 0.1;
        viewElement.style.transform = `scale(${currentScale})`;
    }
});

document.getElementById('zoomOut').addEventListener('click', () => {
    if (currentScale > 0.5) { 
        currentScale -= 0.1;
        viewElement.style.transform = `scale(${currentScale})`;
    }
});


// Source - https://stackoverflow.com/a/50251296
// Posted by MstrQKN
modeToggle.addEventListener("click", (e) => {
    if (discoActive) {
        discoActive = false;
        document.body.classList.remove("discomode");
        discoText.innerHTML = "disco occasionally";
        discoMusic.pause();
    }

    document.body.style.setProperty('--x', e.clientX + 'px');
    document.body.style.setProperty('--y', e.clientY + 'px');
    document.body.classList.toggle("light-mode");
    modeToggle.innerHTML = document.body.classList.contains("light-mode") ? "Dark Mode" : "Light Mode";
});


document.getElementById("playBtn").addEventListener("click", () => discoMusic.play());
document.getElementById("pauseBtn").addEventListener("click", () => discoMusic.pause());
document.getElementById("volumeSlider").addEventListener("input", (e) => {
    discoMusic.volume = e.target.value;
});

upDateClock();
updateDate();

setInterval(upDateClock, 1000);
setInterval(updateDate, 60000);

document.getElementById('bigger').addEventListener('click', changeFontSizeBigger);
document.getElementById('smaller').addEventListener('click', changeFontSizeSmaller);
