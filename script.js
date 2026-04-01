let d = new Date();
let day = d.getDay();
let month = d.getMonth();
let year = d.getFullYear();
let date = d.getDate();

let dateinfo = document.getElementById('dateinfo');
let dayContainer = document.querySelector('#weekday');
let time = document.querySelector('#time');
let yearContainer = document.querySelector('#year');
let monthContainer = document.querySelector('#month');
let dateContainer = document.querySelector('#date');
let days = ['Pühapäev', 'Esmaspäev', 'Teisipäev', 'Kolmapäev', 'Neljapäev', 'Reede', 'Laupäev'];
let months = ['jaanuar', 'veebruar', 'märts', 'aprill', 'mai', 'juuni', 'juuli', 'august', 'september', 'oktoober', 'november', 'detsember'];

yearContainer.innerHTML = year;
monthContainer.innerHTML = months[month];
dayContainer.innerHTML = days[day];
dateContainer.innerHTML = date;
updateClock();

window.setInterval(updateClock, 1000);

function updateClock(){
    d = new Date();
    let seconds = d.getSeconds();
    let minutes = d.getMinutes();
    let hours = d.getHours();

    if(seconds < 10){
        seconds = "0" + seconds;
    }
    if(minutes < 10){
        minutes = "0" + minutes;
    }
    if(hours < 10){
        hours = "0" + hours;
    }
    time.innerHTML = hours + ':' + minutes + ':' + seconds;
    dateinfo.innerHTML = days[day] + ", " + date + ". " + months[month] + " " + year;
}

document.getElementById('backgroundColor').addEventListener('change', function(){
    document.body.style.backgroundColor = this.value;
});

document.getElementById('timeBackground').addEventListener('change', function(){
    document.getElementById('time').style.backgroundColor = this.value;
});

document.getElementById("fontStyle").addEventListener("change", function(){
    document.body.style.fontFamily = this.value;
});

let randomBackgroundColor = document.getElementById('timeBackground')
document.getElementById('time').addEventListener('click', function(){
    let options = randomBackgroundColor.options;
    let randomInt = Math.floor(Math.random() * (options.length)) + 1;
    let randomColor = options[randomInt].value;
    document.getElementById('time').style.backgroundColor = randomColor;
});

document.getElementById("wallpaper").addEventListener("change", function(){
    document.body.style.backgroundImage = this.value;
})

//Siit edasi on kasutatud tehisintellekti abi
let fullscreenBtn = document.getElementById('fullscreenBtn');

fullscreenBtn.addEventListener('click', function() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            alert(`Viga täisekraanile minekul: ${err.message}`);
        });
        fullscreenBtn.textContent = "Välju täisekraanilt";
    } else {
        document.exitFullscreen();
        fullscreenBtn.textContent = "Ava täisekraanil";
    }
});

document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        fullscreenBtn.textContent = "Ava täisekraanil";
    }
});

let choicesPanel = document.getElementById('choices');
let hideBtn = document.getElementById('hideChoices');
let showBtn = document.getElementById('showChoices');

hideBtn.addEventListener('click', function() {
    choicesPanel.style.display = 'none';
    showBtn.style.display = 'block';
});

showBtn.addEventListener('click', function() {
    choicesPanel.style.display = 'flex';
    showBtn.style.display = 'none';
});










