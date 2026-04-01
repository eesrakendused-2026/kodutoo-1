/**
 * Lauakell (OOP). Promptid (ülesanne: viidata promptidele):
 * - "Implement DeskClock class with tick(), theme, and six user attributes."
 * - "Use addEventListener for sliders, buttons, and select; keep lines ~80 chars."
 * Laenatud: Date API — MDN https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
 */

const FONTS = {
    orbitron: '"Orbitron", system-ui, sans-serif',
    syne: '"Syne", system-ui, sans-serif',
    ibm: '"IBM Plex Sans", system-ui, sans-serif',
};

class DeskClock {
    constructor() {
        this.scalePercent = 100;
        this.bgHue = 232;
        this.accentHue = 168;
        this.fontKey = "orbitron";
        this.use24h = true;
        /** @type {'et'|'en'} */
        this.lang = "et";

        this.elHours = document.getElementById("hours");
        this.elMinutes = document.getElementById("minutes");
        this.elSeconds = document.getElementById("seconds");
        this.elAmpm = document.getElementById("ampm");
        this.elWeekday = document.getElementById("weekday");
        this.elDateLine = document.getElementById("dateLine");

        this.elScale = document.getElementById("scaleRange");
        this.elBgHue = document.getElementById("bgHue");
        this.elAccentHue = document.getElementById("accentHue");
        this.elFont = document.getElementById("fontSelect");
        this.elToggleHour = document.getElementById("toggleHour");
        this.elToggleLang = document.getElementById("toggleLang");

        this.bindUi();
        this.applyTheme();
        this.tick();
        setInterval(() => this.tick(), 1000);
    }

    pad(n) {
        return String(n).padStart(2, "0");
    }

    tick() {
        const now = new Date();
        let h = now.getHours();
        const m = now.getMinutes();
        const s = now.getSeconds();
        let ampm = "";

        if (!this.use24h) {
            ampm = h >= 12 ? "PM" : "AM";
            h = h % 12;
            if (h === 0) h = 12;
        }

        this.elHours.textContent = this.use24h ? this.pad(h) : String(h);
        this.elMinutes.textContent = this.pad(m);
        this.elSeconds.textContent = this.pad(s);

        if (this.use24h) {
            this.elAmpm.hidden = true;
        } else {
            this.elAmpm.hidden = false;
            this.elAmpm.textContent = ampm;
        }

        const locale = this.lang === "et" ? "et-EE" : "en-GB";
        const weekday = now.toLocaleDateString(locale, { weekday: "long" });
        this.elWeekday.textContent = weekday;

        const dateStr = now.toLocaleDateString(locale, {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
        this.elDateLine.textContent = dateStr;
    }

    applyTheme() {
        const root = document.documentElement;
        root.style.setProperty("--scale-num", String(this.scalePercent));
        root.style.setProperty("--bg-h", String(this.bgHue));
        root.style.setProperty("--accent-h", String(this.accentHue));
        root.style.setProperty("--font-stack", FONTS[this.fontKey]);

        this.elScale.value = String(this.scalePercent);
        this.elBgHue.value = String(this.bgHue);
        this.elAccentHue.value = String(this.accentHue);
        this.elFont.value = this.fontKey;

        this.elToggleHour.textContent = this.use24h
            ? "24 tundi"
            : "12 tundi (AM/PM)";
        this.elToggleLang.textContent =
            this.lang === "et" ? "Nädalapäev: ET" : "Nädalapäev: EN";
    }

    bindUi() {
        this.elScale.addEventListener("input", () => {
            this.scalePercent = Number(this.elScale.value);
            this.applyTheme();
        });
        this.elBgHue.addEventListener("input", () => {
            this.bgHue = Number(this.elBgHue.value);
            this.applyTheme();
        });
        this.elAccentHue.addEventListener("input", () => {
            this.accentHue = Number(this.elAccentHue.value);
            this.applyTheme();
        });
        this.elFont.addEventListener("change", () => {
            this.fontKey = this.elFont.value;
            this.applyTheme();
        });
        this.elToggleHour.addEventListener("click", () => {
            this.use24h = !this.use24h;
            this.tick();
            this.applyTheme();
        });
        this.elToggleLang.addEventListener("click", () => {
            this.lang = this.lang === "et" ? "en" : "et";
            this.tick();
            this.applyTheme();
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new DeskClock();
});
