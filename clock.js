console.log("fail ühendatud");

class Clock {
    constructor() {
        this.fontSize = 40;
        this.is12HourFormat = false;
        this.isDateVisible = true;
        this.isGlowActive = false;

        this.textColors = ["#ffffff", "#66fcf1", "#f2a900", "#ff6b6b", "#c7f464"];
        this.colorIndex = 0;

        this.fonts = ["Arial, sans-serif", '"Courier New", Courier, monospace', "Georgia, serif", '"Times New Roman", Times, serif'];
        this.fontIndex = 0;

        this.bgColors = ["#0b0c10", "#1a1a2e", "#222831", "#121212"];
        this.bgIndex = 0;

        this.clockContainer = document.getElementById("clockContainer");
        this.dateContainer = document.getElementById("dateContainer");
        this.hoursElem = document.getElementById("hours");
        this.minutesElem = document.getElementById("minutes");
        this.secondsElem = document.getElementById("seconds");
        this.ampmElem = document.getElementById("ampm");
        this.dayElem = document.getElementById("day");
        this.monthElem = document.getElementById("month");
        this.yearElem = document.getElementById("year");

        this.clockContainer.style.fontSize = this.fontSize + "px";
        this.dateContainer.style.fontSize = (this.fontSize / 2) + "px";

        this.init();
    }

    init() {
        this.updateClock();
        this.updateDate();
        this.initParticles();
        this.updateGreeting();

        setInterval(() => this.updateClock(), 1000);
        setInterval(() => this.updateDate(), 60000);

        document.getElementById("bigger").addEventListener("click", () => this.changeFontSizeBigger());
        document.getElementById("smaller").addEventListener("click", () => this.changeFontSizeSmaller());

        document.getElementById("changeColorBtn").addEventListener("click", () => this.changeTextColor());
        document.getElementById("changeFontBtn").addEventListener("click", () => this.changeFont());
        document.getElementById("toggleFormatBtn").addEventListener("click", () => this.toggleTimeFormat());
        document.getElementById("toggleDateBtn").addEventListener("click", () => this.toggleDateVisibility());
        document.getElementById("changeBgBtn").addEventListener("click", () => this.changeBackground());
        document.getElementById("toggleGlowBtn").addEventListener("click", () => this.toggleGlow());
        window.addEventListener("keypress", (e) => this.checkKey(e));
    }

    changeFontSizeBigger() {
        this.fontSize += 5;
        if (this.fontSize > 200) {
            this.fontSize = 200;
            window.alert("Fondi suurus ei saa olla üle 200 piksli");
        }
        this.dateContainer.style.fontSize = this.fontSize + "px";
        this.clockContainer.style.fontSize = this.fontSize + "px";
    }

    changeFontSizeSmaller() {
        this.fontSize -= 5;
        if (this.fontSize < 10) {
            this.fontSize = 10;
            window.alert("Fondi suurus ei saa olla alla 10 piksli");
        }
        this.dateContainer.style.fontSize = this.fontSize + "px";
        this.clockContainer.style.fontSize = this.fontSize + "px";
    }

    changeTextColor() {
        this.colorIndex = (this.colorIndex + 1) % this.textColors.length;
        document.body.style.color = this.textColors[this.colorIndex];
    }

    changeFont() {
        this.fontIndex = (this.fontIndex + 1) % this.fonts.length;
        document.body.style.fontFamily = this.fonts[this.fontIndex];
    }
    
    toggleTimeFormat() {
        this.is12HourFormat = !this.is12HourFormat;
        if (!this.is12HourFormat) this.ampmElem.innerHTML = "";
        this.updateClock();
    }

    toggleDateVisibility() {
        this.isDateVisible = !this.isDateVisible;
        this.dateContainer.style.display = this.isDateVisible ? "flex" : "none";
    }

    changeBackground () {
        this.bgIndex = (this.bgIndex + 1) % this.bgColors.length;
        document.body.style.backgroundColor = this.bgColors[this.bgIndex];
    }

    updateClock() {
        const dateTime = new Date();

        let hours = dateTime.getHours();
        let minutes = dateTime.getMinutes();
        let seconds = dateTime.getSeconds();
        let ampm = "";

        if (this.is12HourFormat) {
            ampm = hours >= 12 ? "PM" : "AM";
            hours = hours % 12;
            hours = hours ? hours : 12;
            this.ampmElem.innerHTML = ampm;
        }

        if (hours < 10) hours = "0" + hours;
        if (minutes < 10) minutes = "0" + minutes;
        if (seconds < 10) seconds = "0" + seconds;

        this.hoursElem.innerHTML = hours + ":";
        this.minutesElem.innerHTML = minutes + ":";
        this.secondsElem.innerHTML = seconds;
    }

    updateDate() {
        const dateTime = new Date();
        let day = dateTime.getDate();
        let month = dateTime.getMonth() + 1;
        let year = dateTime.getFullYear();

        if (day < 10) day = "0" + day;
        if (month < 10) month = "0" + month;

        this.dayElem.innerHTML = day + ".";
        this.monthElem.innerHTML = month + ".";
        this.yearElem.innerHTML = year;
    }

    checkKey(e) {
        console.log(e.keyCode);
        if (e.keyCode == 43) {
            this.changeFontSizeBigger();
        }
        if (e.keyCode == 45) {
            this.changeFontSizeSmaller();
        }
    }

    updateGreeting() {
        const currentHour = new Date().getHours();
        let greetingText = "";

        if (currentHour >= 5 && currentHour < 12) {
            greetingText = "Tere hommikust!";
        } else if (currentHour >= 12 && currentHour < 18) {
            greetingText = "Tere päevast!";
        } else if (currentHour >= 18 && currentHour < 23) {
            greetingText = "Tere õhtust!";
        } else {
            greetingText = "Head ööd!";
        }

        document.getElementById("greeting").innerHTML = greetingText;
    }

    toggleGlow() {
        this.isGlowActive = !this.isGlowActive;

        if (this.isGlowActive) {
            this.clockContainer.classList.add("glow");
            this.dateContainer.classList.add("glow");
            document.getElementById("greeting").classList.add("glow");
        } else {
            this.clockContainer.classList.remove("glow");
            this.dateContainer.classList.remove("glow");
            document.getElementById("greeting").classList.remove("glow");
        }
    }

    initParticles() {
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#ffffff" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.5, "random": false },
                "size": { "value": 3, "random": true },
                "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1 },
                "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
            },
            "interactivity": {
                "detect_on": "window",
                "events": {
                    "onhover": { "enable": true, "mode": "grab" },
                    "onclick": { "enable": true, "mode": "push" },
                    "resize": true
                },
                "modes": {
                    "grab": { "distance": 140, "line_linked": { "opacity": 1 } },
                    "push": { "particles_nb": 8 }
                }
            },
            "retina_detect": true
        });
    }
}

window.onload = function() {
    const minukell = new Clock();
};