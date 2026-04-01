console.log("Fail ühendatud");

const WEEKDAYS = [
    "Pühapäev", "Esmaspäev", "Teisipäev",
    "Kolmapäev", "Neljapäev", "Reede", "Laupäev"
];

// seaded ja väärtused
class Clock {
    constructor() {
        this.defaultFontSize   = 25;
        this.defaultClockColor = "#ff0000";
        this.defaultBgColor    = "#000000";

        this.fontSize    = this.defaultFontSize;
        this.clockColor  = this.defaultClockColor;
        this.bgColor     = this.defaultBgColor;
        this.is12Hour    = false;
        this.dateVisible = true;
        this.isScrambled = false;
        this.isJapan     = false;
    }
}

const clock = new Clock();

// Tagatsab praeguse aja valitud ajavööndis
function getDateTime() {
    const timezone = clock.isJapan ? "Asia/Tokyo" : "Europe/Tallinn";
    const str = new Date().toLocaleString("sv-SE", { timeZone: timezone });
    return new Date(str);
}

// "Minu fondisuuruse kood lubas suurendada üle 200px enne
// kui piirang rakendus, how seda parandada?"
function fontSizeBigger() {
    const newSize = clock.fontSize + 5;
    if (newSize > 200) return;
    clock.fontSize = newSize;
    document.getElementById("clockContainer").style.fontSize = clock.fontSize + "px";
    document.getElementById("weekdayContainer").style.fontSize = clock.fontSize + "px";
    document.getElementById("dateContainer").style.fontSize = clock.fontSize + "px";
}

function fontSizeSmaller() {
    const newSize = clock.fontSize - 5;
    if (newSize < 10) return;
    clock.fontSize = newSize;
    document.getElementById("clockContainer").style.fontSize = clock.fontSize + "px";
    document.getElementById("weekdayContainer").style.fontSize = clock.fontSize + "px";
    document.getElementById("dateContainer").style.fontSize = clock.fontSize + "px";
}

function openClockColorPicker() {
    document.getElementById("clockColorInput").click();
}

function setClockColor() {
    clock.clockColor = document.getElementById("clockColorInput").value;
    document.getElementById("clockContainer").style.color = clock.clockColor;
    document.getElementById("weekdayContainer").style.color = clock.clockColor;
    document.getElementById("dateContainer").style.color = clock.clockColor;
}

function toggleFormat() {
    clock.is12Hour = !clock.is12Hour;
    document.getElementById("formatBtn").textContent =
        clock.is12Hour ? "24h" : "12h";
    updateClock();
}

// Ma olen pime, kus mul siin viga on, või ütle, mis on puudu, aga ära tee minu eest ära
function toggleDate() {
    clock.dateVisible = !clock.dateVisible;
    const show = clock.dateVisible ? "flex" : "none";
    document.getElementById("weekdayContainer").style.display = show;
    document.getElementById("dateContainer").style.display = show;
    document.getElementById("dateToggleBtn").textContent =
        clock.dateVisible ? "Peida kp" : "Näita kp";
}

function openBgColorPicker() {
    document.getElementById("bgColorInput").click();
}

function setBgColor() {
    clock.bgColor = document.getElementById("bgColorInput").value;
    document.body.style.backgroundColor = clock.bgColor;
}

// "Kuidas liigutada HTML elemente ekraanil erinevatesse
// juhuslikesse kohtadesse JavaScripti abil, ja hiljem tagasi?"
function toggleScramble() {
    clock.isScrambled = !clock.isScrambled;

    const clockEl   = document.getElementById("clockContainer");
    const weekdayEl = document.getElementById("weekdayContainer");
    const dateEl    = document.getElementById("dateContainer");

    if (clock.isScrambled) {
        clockEl.style.position = "absolute";
        clockEl.style.top  = Math.floor(Math.random() * 65) + "%";
        clockEl.style.left = Math.floor(Math.random() * 60) + "%";

        weekdayEl.style.position = "absolute";
        weekdayEl.style.top  = Math.floor(Math.random() * 65) + "%";
        weekdayEl.style.left = Math.floor(Math.random() * 60) + "%";

        dateEl.style.position = "absolute";
        dateEl.style.top  = Math.floor(Math.random() * 65) + "%";
        dateEl.style.left = Math.floor(Math.random() * 60) + "%";
    } else {
        clockEl.style.position   = "";
        clockEl.style.top        = "";
        clockEl.style.left       = "";
        weekdayEl.style.position = "";
        weekdayEl.style.top      = "";
        weekdayEl.style.left     = "";
        dateEl.style.position    = "";
        dateEl.style.top         = "";
        dateEl.style.left        = "";
    }
}

function toggleTimezone() {
    clock.isJapan = !clock.isJapan;
    document.getElementById("timezoneBtn").textContent =
        clock.isJapan ? "Eesti" : "Jaapan";
    updateClock();
    updateDate();
}

function reset() {
    if (clock.isScrambled) toggleScramble();
    clock.fontSize    = clock.defaultFontSize;
    clock.clockColor  = clock.defaultClockColor;
    clock.bgColor     = clock.defaultBgColor;
    clock.is12Hour    = false;
    clock.dateVisible = true;
    clock.isJapan     = false;
    applySettings();
    updateClock();
}

function applySettings() {
    const px = clock.fontSize + "px";
    document.getElementById("clockContainer").style.fontSize = px;
    document.getElementById("weekdayContainer").style.fontSize = px;
    document.getElementById("dateContainer").style.fontSize = px;
    document.getElementById("clockContainer").style.color = clock.clockColor;
    document.getElementById("weekdayContainer").style.color = clock.clockColor;
    document.getElementById("dateContainer").style.color = clock.clockColor;
    document.body.style.backgroundColor = clock.bgColor;
    document.getElementById("clockColorInput").value = clock.clockColor;
    document.getElementById("bgColorInput").value    = clock.bgColor;
    document.getElementById("weekdayContainer").style.display = "flex";
    document.getElementById("dateContainer").style.display    = "flex";
    document.getElementById("formatBtn").textContent     = "12h";
    document.getElementById("dateToggleBtn").textContent = "Peida kp";
    document.getElementById("timezoneBtn").textContent   = "Jaapan";
}

function updateClock() {
    const dt  = getDateTime();
    let h     = dt.getHours();
    const m   = dt.getMinutes();
    const s   = dt.getSeconds();
    let ampm  = "";

    if (clock.is12Hour) {
        ampm = h >= 12 ? " PM" : " AM";
        h    = h % 12 || 12;
    }

    document.getElementById("hours").textContent   = String(h).padStart(2, "0");
    document.getElementById("minutes").textContent = String(m).padStart(2, "0");
    document.getElementById("seconds").textContent = String(s).padStart(2, "0");
    document.getElementById("ampm").textContent    = ampm;
}

function updateDate() {
    const dt      = getDateTime();
    const day     = String(dt.getDate()).padStart(2, "0");
    const month   = String(dt.getMonth() + 1).padStart(2, "0");
    const year    = dt.getFullYear();
    const weekday = WEEKDAYS[dt.getDay()];

    document.getElementById("day").textContent     = day + ".";
    document.getElementById("month").textContent   = month + ".";
    document.getElementById("year").textContent    = year;
    document.getElementById("weekday").textContent = weekday;
}

function checkKey(e) {
    if (e.key === "+") fontSizeBigger();
    if (e.key === "-") fontSizeSmaller();
}

applySettings();
updateClock();
updateDate();
setInterval(updateClock, 1000);
setInterval(updateDate, 60000);
document.getElementById("bigger").addEventListener("click", fontSizeBigger);
document.getElementById("smaller").addEventListener("click", fontSizeSmaller);
document.getElementById("colorBtn").addEventListener("click", openClockColorPicker);
document.getElementById("clockColorInput").addEventListener("input", setClockColor);
document.getElementById("formatBtn").addEventListener("click", toggleFormat);
document.getElementById("dateToggleBtn").addEventListener("click", toggleDate);
document.getElementById("bgColorBtn").addEventListener("click", openBgColorPicker);
document.getElementById("bgColorInput").addEventListener("input", setBgColor);
document.getElementById("scrambleBtn").addEventListener("click", toggleScramble);
document.getElementById("resetBtn").addEventListener("click", reset);
document.getElementById("timezoneBtn").addEventListener("click", toggleTimezone);
window.addEventListener("keypress", checkKey);