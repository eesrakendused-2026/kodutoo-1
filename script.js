class DigitalClock {
  constructor() {
    this.timeEl = document.getElementById("time");
    this.dateEl = document.getElementById("date");
    this.weekdayEl = document.getElementById("weekday");
    this.yearEl = document.getElementById("year");

    this.language = "et";
    this.timeFormat = 24;

    this.start();
  }

  start() {
    this.update();
    setInterval(() => this.update(), 1000);
  }

  update() {
    const now = new Date();
    this.updateTime(now);
    this.updateDate(now);
  }

  updateTime(now) {
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    let suffix = "";
    if (this.timeFormat === 12) {
      suffix = hours >= 12 ? " PM" : " AM";
      hours = hours % 12 || 12;
    }

    this.timeEl.textContent =
      `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}${suffix}`;
  }

  updateDate(now) {
    const weekdays = {
      et: ["Pühapäev","Esmaspäev","Teisipäev","Kolmapäev","Neljapäev","Reede","Laupäev"],
      en: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    };

    this.dateEl.textContent =
      this.language === "et"
        ? now.toLocaleDateString("et-EE")
        : now.toLocaleDateString("en-GB");

    this.weekdayEl.textContent = weekdays[this.language][now.getDay()];
    this.yearEl.textContent = now.getFullYear();
  }

  pad(n) {
    return n < 10 ? "0" + n : n;
  }

  setLanguage(lang) {
    this.language = lang;
    this.update();
  }

  setFormat(format) {
    this.timeFormat = format;
    this.update();
  }
}

class ClockUI {
  constructor(clock) {
    this.clock = clock;

    this.bgColor = document.getElementById("bgColor");
    this.clockColor = document.getElementById("clockColor");
    this.fontSize = document.getElementById("fontSize");
    this.fontFamily = document.getElementById("fontFamily");
    this.timeFormat = document.getElementById("timeFormat");
    this.language = document.getElementById("language");

    this.bindEvents();
  }

  bindEvents() {
    this.bgColor.addEventListener("input", e => {
      document.documentElement.style.setProperty("--bg-color", e.target.value);
    });

    this.clockColor.addEventListener("input", e => {
      document.documentElement.style.setProperty("--clock-color", e.target.value);
    });

    this.fontSize.addEventListener("input", e => {
      document.documentElement.style.setProperty("--font-size-vw", e.target.value + "vw");
    });

    this.fontFamily.addEventListener("change", e => {
      document.documentElement.style.setProperty("--font-family", e.target.value);
    });

    this.timeFormat.addEventListener("change", e => {
      this.clock.setFormat(Number(e.target.value));
    });

    this.language.addEventListener("change", e => {
      this.clock.setLanguage(e.target.value);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const clock = new DigitalClock();
  new ClockUI(clock);
});
