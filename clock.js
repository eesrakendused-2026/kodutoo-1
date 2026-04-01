console.log("fail ühendatud");
let hours, minutes, seconds, day, month, year, dateTime;
let fontSize = 25;
let isEstonian = true; 

function changeFontSizeBigger() {
  fontSize = fontSize + 5;
  if (fontSize > 200) {
    fontSize = 200;
    window.alert("Fondi suurus ei saa olla üle 200 piksli");
  }
  document.getElementById("dateContainer").style.fontSize = fontSize + "px";
  document.getElementById("clockContainer").style.fontSize = fontSize + "px";
}

function changeFontSizeSmaller() {
  fontSize = fontSize - 5;
  if (fontSize < 10) {
    fontSize = 10;
    window.alert("Fondi suurus ei saa olla alla 10 piksli");
  }
  document.getElementById("dateContainer").style.fontSize = fontSize + "px";
  document.getElementById("clockContainer").style.fontSize = fontSize + "px";
}

function upDateClock() {
  dateTime = new Date();
  hours = dateTime.getHours();
  minutes = dateTime.getMinutes();
  seconds = dateTime.getSeconds();

  if (hours < 10) hours = "0" + hours;
  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;

  document.getElementById("hours").innerHTML = hours + ":";
  document.getElementById("minutes").innerHTML = minutes + ":";
  document.getElementById("seconds").innerHTML = seconds;
}

function updateDate() {
  dateTime = new Date();
  day = dateTime.getDate();
  month = dateTime.getMonth() + 1;
  year = dateTime.getFullYear();

  if (day < 10) day = "0" + day;
  if (month < 10) month = "0" + month;

  document.getElementById("day").innerHTML = day + ".";
  document.getElementById("month").innerHTML = month + ".";
  document.getElementById("year").innerHTML = year;

  const lang = isEstonian ? 'et-EE' : 'en-US';
  document.getElementById("weekday").innerHTML = dateTime.toLocaleDateString(lang, { weekday: 'long' });
}

let colorList = ["black", "darkblue", "darkgreen", "purple"];
let colorIndex = 0;

function changeBackgroundColor() {
    colorIndex = (colorIndex + 1) % colorList.length;
    document.body.style.backgroundColor = colorList[colorIndex];
}
const textColors = ["white", "yellow", "cyan", "lime"];
function changeClockColor(){
    colorIndex = (colorIndex + 1) % colorList.length;
    document.getElementById("container").style.color = textColors[colorIndex];
}

// 3. Fondi tüübi muutmine
function changeFontFace() {
    const fonts = ["Arial", "Courier New", "Georgia", "Impact"];
    document.body.style.fontFamily = fonts[Math.floor(Math.random() * fonts.length)];
}

// 4. Glow efekti lülitamine
let hasGlow = false;
function toggleGlow() {
    hasGlow = !hasGlow;
    document.getElementById("clockContainer").style.textShadow = hasGlow ? "0 0 20px white" : "none";
}

// 5. Keele vahetus (Eesti/Inglise)
function toggleLanguage() {
    isEstonian = !isEstonian;
    updateDate();
}

// 6. Fondi suurus

function checkKey(e) {
  if (e.key == "+") changeFontSizeBigger();
  if (e.key == "-") changeFontSizeSmaller();
  if (e.key == "b" || e.key == "B") changeBackgroundColor();
  if (e.key == "c" || e.key == "C") changeClockColor();
  if (e.key == "f" || e.key == "F") changeFontFace();
  if (e.key == "g" || e.key == "G") toggleGlow();
  if (e.key == "l" || e.key == "L") toggleLanguage();
}

upDateClock();
updateDate();
setInterval(upDateClock, 1000);
setInterval(updateDate, 60000);

document.getElementById("bigger").addEventListener("click", changeFontSizeBigger);
document.getElementById("smaller").addEventListener("click", changeFontSizeSmaller);
window.addEventListener("keydown", checkKey);