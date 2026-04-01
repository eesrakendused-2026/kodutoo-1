const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const clock = document.getElementById("clock");

const langBtn = document.getElementById("lang");
let currentLang = "et-EE";

function updateLangButton() {
    langBtn.textContent = currentLang === "et-EE" ? "🇪🇪" : "🇬🇧";
}

langBtn.addEventListener("click", () => {
    currentLang = currentLang === "et-EE" ? "en-US" : "et-EE";
    updateClock();
    updateLangButton();
});

updateLangButton();

let size = 10;
timeEl.style.fontSize = size + "vw";

const colors = [
    "#ffd6e7",
    "#a0c4ff",
    "#caffbf",
    "#ffc6ff",
    "#fff1a8"
];

function updateClock() {
    const now = new Date();

    const time = now.toLocaleTimeString(currentLang);
    const date = now.toLocaleDateString(currentLang, {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    timeEl.textContent = time;
    dateEl.textContent = date;
}

document.getElementById("plus").addEventListener("click", () => {
    size += 1;
    timeEl.style.fontSize = size + "vw";
});

document.getElementById("minus").addEventListener("click", () => {
    size -= 1;
    timeEl.style.fontSize = size + "vw";
});

let posX = 0;
let posY = 0;



document.addEventListener("keydown", (e) => {

    if (e.code === "Space") {
        document.body.style.background =
            colors[Math.floor(Math.random() * colors.length)];
    }

    if (e.key === "ArrowUp") posY -= 5;
    if (e.key === "ArrowDown") posY += 5;
    if (e.key === "ArrowLeft") posX -= 5;
    if (e.key === "ArrowRight") posX += 5;

    clock.style.transform = `translate(${posX}%, ${posY}%)`;
});

setInterval(updateClock, 1000);
updateClock();



const button = document.getElementById("surprise");
const container = document.getElementById("videoContainer");


const message = document.getElementById("message"); 
button.addEventListener("click", () => { if (!container.innerHTML) { const iframe = document.createElement("iframe"); 
    iframe.width = '100%'; iframe.height = '100%'; 
    iframe.src = "https://www.youtube.com/embed/DLzxrzFCyOs?hl=en_US&version=3&rel=0&autoplay=1"; 
    iframe.allow = "autoplay; fullscreen"; container.appendChild(iframe);
        button.style.display = "none";
    }
});



const strawhat = document.getElementById("strawhat");
const popup = document.getElementById("luffyPopup");
const audio = document.getElementById("laughAudio");

strawhat.addEventListener("click", () => {

    popup.style.display = "block";

    audio.currentTime = 0;
    audio.play();
});

audio.addEventListener("ended", () => {

    popup.style.display = "none";

    const newX = Math.random() * 85;
    const newY = Math.random() * 85;

    strawhat.style.left = newX + "vw";
    strawhat.style.top = newY + "vh";

    strawhat.style.bottom = "auto";
});

const fontSelect = document.getElementById("fontSelect");
const colorSelect = document.getElementById("colorSelect");

fontSelect.addEventListener("change", () => {
    timeEl.style.fontFamily = fontSelect.value;
    dateEl.style.fontFamily = fontSelect.value;
});

colorSelect.addEventListener("change", () => {
    timeEl.style.color = colorSelect.value;
    dateEl.style.color = colorSelect.value;
});