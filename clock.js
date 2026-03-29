console.log("fail ühendatud");
/* 'Seleta mulle lahti kuidas oma kood class-ide peale ule viia, ma ei taha et sa seda minu eest teed, vaid tahan seletust ja naiteid kuidas seda tegema peaks!' */
class Clock {
    constructor() {
        this.fontSize = 80;
        this.is24Hour = true;
        
        this.textColors = ['white', 'yellow', 'cyan', 'lime', 'pink'];
        this.colorIndex = 0;
        
        this.bgColors = ['black', '#1a1a2e', '#4a00e0', '#8e0000', '#004d00'];
        this.bgIndex = 0;
        
        this.fonts = ['sans-serif', 'monospace', 'serif', 'cursive', 'fantasy'];
        this.fontIndex = 0;
        
        this.alignments = ['center', 'flex-start', 'flex-end'];
        this.alignIndex = 0;

        this.updateClock();
        this.updateDate();
        this.updateWeekday();

        setInterval(() => this.updateClock(), 1000);
        setInterval(() => this.updateDate(), 60000);

        this.addEventListeners();
    }

    addEventListeners() {
        document.getElementById('bigger').addEventListener('click', () => this.changeFontSizeBigger());
        document.getElementById('smaller').addEventListener('click', () => this.changeFontSizeSmaller());
        
        document.getElementById('colorBtn').addEventListener('click', () => this.changeTextColor());
        document.getElementById('bgBtn').addEventListener('click', () => this.changeBgColor());
        document.getElementById('fontBtn').addEventListener('click', () => this.changeFont());
        document.getElementById('formatBtn').addEventListener('click', () => this.toggleFormat());
        document.getElementById('alignBtn').addEventListener('click', () => this.changeAlignment());
        
        window.addEventListener('keypress', (e) => this.checkKey(e));
    }

    changeFontSizeBigger() {
        this.fontSize = this.fontSize + 5;
        if(this.fontSize > 200) { this.fontSize = 200; }
        this.updateFontSize();
    }

    changeFontSizeSmaller() {
        this.fontSize = this.fontSize - 5;
        if(this.fontSize < 10) { this.fontSize = 10; }
        this.updateFontSize();
    }

    updateFontSize() {
        document.getElementById('dateContainer').style.fontSize =  this.fontSize + "px";
        document.getElementById('clockContainer').style.fontSize =  this.fontSize + "px";
        document.getElementById('weekdayContainer').style.fontSize = this.fontSize + "px";
    }

    /* 'Kuidas saan teha nii, et nuppu vajutades muutuks kogu teksti varv?' */
    changeTextColor() {
        this.colorIndex++;
        if(this.colorIndex >= this.textColors.length) { this.colorIndex = 0; }
        document.body.style.color = this.textColors[this.colorIndex];
    }

    changeBgColor() {
        this.bgIndex++;
        if(this.bgIndex >= this.bgColors.length) { this.bgIndex = 0; }
        document.body.style.backgroundColor = this.bgColors[this.bgIndex];
    }

    changeFont() {
        this.fontIndex++;
        if(this.fontIndex >= this.fonts.length) { this.fontIndex = 0; }
        document.body.style.fontFamily = this.fonts[this.fontIndex];
    }

    /* 'Kuidas saan nii, et nuppu vajutades muutub kell 12h formaadi peale ja vastupidi?' */
    toggleFormat() {
        this.is24Hour = !this.is24Hour;
        this.updateClock();
    }

    changeAlignment() {
        this.alignIndex++;
        if(this.alignIndex >= this.alignments.length) { this.alignIndex = 0; }
        document.getElementById('container').style.alignItems = this.alignments[this.alignIndex];
    }

    updateClock() {
        let dateTime = new Date();
        let hours = dateTime.getHours();
        let minutes = dateTime.getMinutes();
        let seconds = dateTime.getSeconds();
        let ampm = "";

        if (!this.is24Hour) {
            ampm = hours >= 12 ? " PM" : " AM";
            hours = hours % 12;
            hours = hours ? hours : 12; 
        }

        if(hours < 10){ hours = "0" + hours; }
        if(minutes < 10){ minutes = "0" + minutes; }
        if(seconds < 10){ seconds = "0" + seconds; }

        document.getElementById('hours').innerHTML = hours + ":";
        document.getElementById('minutes').innerHTML = minutes + ":";
        document.getElementById('seconds').innerHTML = seconds + ampm;
    }

    updateDate() {
        let dateTime = new Date();
        let day = dateTime.getDate();
        let month = dateTime.getMonth() + 1;
        let year = dateTime.getFullYear();

        if(day < 10){ day = "0" + day; }
        if(month < 10){ month = "0" + month; }

        document.getElementById('day').innerHTML = day + ".";
        document.getElementById('month').innerHTML = month + ".";
        document.getElementById('year').innerHTML = year;
    }

    updateWeekday() {
        let dateTime = new Date();
        let weekday = dateTime.getDay();
        let weekdayNames = ["Pühapäev", "Esmaspäev", "Teisipäev", "Kolmapäev", "Neljapäev", "Reede", "Laupäev"];
        document.getElementById('weekday').innerHTML = weekdayNames[weekday];
    }

    checkKey(e) {
        if(e.keyCode == 43){ this.changeFontSizeBigger(); }
        if(e.keyCode == 45){ this.changeFontSizeSmaller(); }
    }
}

const myClock = new Clock();