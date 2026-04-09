const bgSelect = document.getElementById('bgSelect');
const seriousSound = new Audio('breaking.mp3');
const formatTick = document.getElementById('formatTick');

/* Gemini aitas koostada background muutuse */
bgSelect.addEventListener('change', function() {
    const valik = this.value;

    seriousSound.pause();
    seriousSound.currentTime = 0;

    if (valik === 'blue') {
        document.body.style.backgroundImage = "linear-gradient(68deg, rgba(106, 142, 163, 1) 0%, rgba(201, 191, 159, 1) 100%)";   
        document.body.style.backgroundSize = "cover";
    } 
    else if (valik === 'black') {
        document.body.style.backgroundImage = "none";
        document.body.style.backgroundColor = "black";
    } 
    else if (valik === 'serious') {
        document.body.style.backgroundImage = "url('jim.gif')"; 
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundAttachment = "fixed";

        seriousSound.play();
    }
});

const fontSelect = document.getElementById('fontSelect');
const colorPicker = document.getElementById('colourPicker');
const clockElement = document.getElementById('clock');

fontSelect.addEventListener('change', function() {
    clockElement.style.fontFamily = this.value;
});

colorPicker.addEventListener('input', function() {
    clockElement.style.color = this.value;
});