console.log("fail ühendatud");
const PIXABAY_API_KEY = '55039479-2501ec1bb912cdbce7b203876';
const pi = 3.14;
let hours, minutes, seconds, day, month, year, dateTime;
let fontSize = 25;
let clockPosX = 0;
let clockPosY = 0;
const moveStep = 10;

function upDateClock() {

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

    if (document.getElementById('format').value === '12') {
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        document.getElementById('ampm').textContent = ampm;
    }

    document.getElementById('hours').textContent = hours + ":";
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = ":" + seconds;
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

    document.getElementById('day').textContent = day + ".";
    document.getElementById('month').textContent = month + ".";
    document.getElementById('year').textContent = year;
}

function toggleSettings() {
    //console.log("nupp töötab");
    const settings = document.getElementById('settings');
    if (settings.style.display === 'none' || settings.style.display === '') {
        settings.style.display = 'block';
    } else {
        settings.style.display = 'none';
    }
}

function saveSettings() {

    function ClockSizeChange() {
        const newFontSize = document.getElementById('fontSize').value;



        if (newFontSize) {
            document.getElementById('clockContainer').style.fontSize = newFontSize + 'px';
        }
    }

    function fontFamilyChange() {
        const newFontFamily = document.getElementById('fontFamily').value;

        if (newFontFamily) {
            document.getElementById('clockContainer').style.fontFamily = newFontFamily;
            document.getElementById('dateContainer').style.fontFamily = newFontFamily;
            document.getElementById('weekday').style.fontFamily = newFontFamily;
        }
    }

    function fontColorChange() {
        const newFontColor = document.getElementById('fontColor').value;

        if (newFontColor) {
            document.getElementById('clockContainer').style.color = newFontColor;
            document.getElementById('dateContainer').style.color = newFontColor;
            document.getElementById('weekday').style.color = newFontColor;
        }
    }

    function changeFormat() {
        const format = document.getElementById('format').value;
        console.log(format);
        if (format === '12') {
            let hours = dateTime.getHours();
            const minutes = dateTime.getMinutes();
            const seconds = dateTime.getSeconds();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours || 12;
            document.getElementById('hours').textContent = hours + ":";
            document.getElementById('minutes').textContent = minutes < 10 ? '0' + minutes : minutes;
            document.getElementById('seconds').textContent = seconds < 10 ? '0' + seconds : ":" + seconds;
            document.getElementById('ampm').textContent = ampm;
        }
    }

    function imageBackgroundChange() {
        const fileInput = document.getElementById('backgroundImage');
        const file = fileInput.files && fileInput.files[0];
        if (!file) {
            return;
        } else {
            const imageUrl = URL.createObjectURL(file);
            const main = document.querySelector('main');

            const bgVideo = document.getElementById('bgVideo');
            bgVideo.pause();
            bgVideo.style.display = 'none';

            main.style.backgroundImage = `url(${imageUrl})`;
            main.style.backgroundSize = 'cover';
            main.style.backgroundPosition = 'center';
        }
    }

    function toggleSeconds() {
        const showSeconds = document.getElementById('showSeconds').checked;
        document.getElementById('seconds').style.display = showSeconds ? 'inline' : 'none';
    }

    function dateSizeChange() {
        const newDateSize = document.getElementById('dateSize').value;

        if (newDateSize) {
            document.getElementById('dateContainer').style.fontSize = newDateSize + 'px';
        }
    }

    function daySizeChange() {
        const newDaySize = document.getElementById('daySize').value;
        console.log(newDaySize);

        if (newDaySize) {
            document.getElementById('dateDayContainer').style.fontSize = newDaySize + 'px';
        }
    }


    toggleSettings();
    ClockSizeChange();
    fontFamilyChange();
    fontColorChange();
    changeFormat();
    imageBackgroundChange();
    toggleSeconds();
    dateSizeChange();
    daySizeChange();

}

function resetSettings() {
    document.getElementById('clockContainer').style.fontSize = '';
    document.getElementById('dateContainer').style.fontSize = '';
    document.getElementById('clockContainer').style.fontFamily = '';
    document.getElementById('dateContainer').style.fontFamily = '';
    document.getElementById('clockContainer').style.color = '';
    document.getElementById('dateContainer').style.color = '';
    document.querySelector('main').style.backgroundImage = '';
    document.getElementById('format').value = '24';
    document.getElementById('showSeconds').checked = true;
    document.getElementById('seconds').style.display = 'inline';
    document.getElementById('dateDayContainer').style.fontSize = '';
    document.getElementById('weekday').style.color = '';
    document.getElementById('ampm').textContent = '';
    document.getElementById('bgVideo').style.display = 'block';
    document.getElementById('bgVideo').play();
    document.getElementById('container').style.transform = 'translate(0px, 0px)';
    clockPosX = 0;
    clockPosY = 0;
}

function fullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

function loadRandomBackground() {
    const randomPage = Math.floor(Math.random() * 10) + 1;

    fetch(`https://pixabay.com/api/videos/?key=${PIXABAY_API_KEY}&per_page=3&page=${randomPage}`)
        .then(response => response.json())
        .then(data => {
            const videos = data.hits;
            console.log(videos);
            if (!videos.length) return;

            const randomVideo = videos[Math.floor(Math.random() * videos.length)];
            const videoUrl = randomVideo.videos.large.url;

            const bgVideo = document.getElementById('bgVideo');
            bgVideo.src = videoUrl;
            bgVideo.play();
        })
        .catch(err => console.error('Error fetching background video:', err));
}

function getDayOfWeek() {
    const daysOfWeek = ['Pühapäev', 'Esmaspäev', 'Teisipäev', 'Kolmapäev', 'Neljapäev', 'Reede', 'Laupäev'];
    const currentDay = new Date().getDay();
    document.getElementById('weekday').textContent = daysOfWeek[currentDay];
}

function moveClock(event) {
    const container = document.getElementById('container');

    if (event.key === 'ArrowUp') {
        clockPosY -= moveStep;
    } else if (event.key === 'ArrowDown') {
        clockPosY += moveStep;
    } else if (event.key === 'ArrowLeft') {
        clockPosX -= moveStep;
    } else if (event.key === 'ArrowRight') {
        clockPosX += moveStep;
    } else {
        return;
    }

    event.preventDefault();
    container.style.transform = `translate(${clockPosX}px, ${clockPosY}px)`;
}

document.getElementById('settings').style.display = 'none';
loadRandomBackground();
upDateClock();
updateDate();
getDayOfWeek();
setInterval(upDateClock, 500);
setInterval(updateDate, 60000);

document.getElementById('toggleSettings').addEventListener('click', toggleSettings);
document.getElementById('saveSettings').addEventListener('click', saveSettings);
document.getElementById('resetSettings').addEventListener('click', resetSettings);
document.getElementById('fullscreen').addEventListener('click', fullScreen);
document.addEventListener('keydown', moveClock);