console.log("fail ühendatud");

let hours, minutes, seconds, day, month, year, dateTime;
let fontSize = 100;
let is24h = true;
let showSeconds = true;
let dateFormat = true;

//Värvivalik
function colorPicker(){
    const color = document.getElementById("color");
    const colorContainer = document.getElementById("colorContainer");
    const colorButtons = document.querySelectorAll(".color");
    const lightColors = ["#FFFFFF", "#808080", "#FFFFE0", "#ADD8E6"]; 
    
    const colors = {
        black: "#000000",
        white: "#FFFFFF",
        gray: "#808080",
        green: "#90EE90",
        pink: "#FFB6C1",
        purple: "#DDA0DD",
        blue: "#ADD8E6",
        yellow: "#FFFFE0",
        red: "#FF6B6B"
    };
    //avamine
    color.addEventListener("click", () => {
        if (colorContainer.style.display === "none" 
        || colorContainer.style.display === '') {
        colorContainer.style.display = "flex";
        } else {
            colorContainer.style.display="none";
        }
    });
    //taustavärvi muutmine, pildi eemaldamine, vastavalt teksti värvi muutus
    colorButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const selectedColor = colors[e.target.id];
            document.body.style.backgroundColor = selectedColor;
            document.body.style.backgroundImage = 'none'; // 
            
            if (lightColors.includes(selectedColor)) {
                document.body.style.color = "black";

                colorButtons.forEach(button => {
                    button.style.color = "black";
                    button.style.borderColor = "black";
                });

                //mõlema imagebutton konstandiga taustapildi nuppude värvimuutmine vastavalt
                const imageButtons = document.querySelectorAll(".image");

                imageButtons.forEach(button => {
                    button.style.color = "black";
                    button.style.borderColor = "black";
                });

                document.getElementById('imageContainer').style.color = "black";
            } else {
                document.body.style.color = "white";
                colorButtons.forEach(button => {
                    button.style.color = "white";
                    button.style.borderColor = "white";
                });

                const imageButtons = document.querySelectorAll(".image");

                imageButtons.forEach(button => {
                    button.style.color = "white";
                    button.style.borderColor = "white";
                });

                document.getElementById('imageContainer').style.color = "white";
            }
        });
    });
}

//Taustapildi valimine
function imagePicker(){
    const image = document.getElementById("image");
    const imageContainer = document.getElementById("imageContainer");
    const imageButtons = document.querySelectorAll(".image");
    const images = {
        photo1: "files/photos/image1.jpg",
        photo2: "files/photos/image2.jpg",
        photo3: "files/photos/image3.jpg",
        photo4: "files/photos/image4.jpg"
    };

    //avamine
    image.addEventListener("click", () => {
        if (imageContainer.style.display === "none" 
        || imageContainer.style.display === '') {
        imageContainer.style.display = "flex";
        } else {
            imageContainer.style.display="none";
        }
    });
    
    //pildi valimine, pilt katab ekraani, värvi eemaldamine
    imageButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const selectedImage = images[e.target.id];
            document.body.style.backgroundImage = "url('" + selectedImage + "')";
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundPosition = "center";
            document.body.style.backgroundColor = 'none';
            document.body.style.color = "white";

            imageButtons.forEach(imageButton => {
                imageButton.style.color = "white";
                imageButton.style.borderColor = "white";
            });
        });
    });
}


function changeFontSizeBigger(){
    fontSize = fontSize + 5;
    if(fontSize > 200){
        fontSize = 200;
        window.alert("Fondi suurus ei saa olla üle 200 piksli");
    }
    document.getElementById('dateContainer').style.fontSize =  fontSize + "px";
    document.getElementById('clockContainer').style.fontSize =  fontSize + "px";
}

function changeFontSizeSmaller(){
    fontSize = fontSize - 5;
    if(fontSize < 10){
        fontSize = 10;
        window.alert("Fondi suurus ei saa olla alla 10 piksli");
    }
    document.getElementById('dateContainer').style.fontSize =  fontSize + "px";
    document.getElementById('clockContainer').style.fontSize =  fontSize + "px";
}

// upDateClock on muudetud TI-ga. Lisatud kellaajaformaat
//Prompt: "This is my current code: (kopeeritud-kleebitud kood)
//use the id= format and id=timeFormat.
//Add a 24h/12h button to change the time format of the clock. The button should be named 24h/12h. 
//Write as little code as necessary. Tell me the code I need to now add into the files and explain what you've done."
function upDateClock() {
    dateTime = new Date();

    let hours = dateTime.getHours();
    minutes = dateTime.getMinutes();
    seconds = dateTime.getSeconds();

    let displayHours = hours;
    let ampm = ""; 

    if (!is24h) {
        ampm = hours >= 12 ? " PM" : " AM";
        displayHours = hours % 12 || 12; 
    }

    if(displayHours < 10){
        displayHours = "0" + displayHours;
    }
    if(minutes < 10){
        minutes = "0" + minutes;
    }
    if(seconds < 10){
        seconds = "0" + seconds;
    }

    document.getElementById('hours').innerHTML = displayHours + ":";
    document.getElementById('minutes').innerHTML = minutes;
    document.getElementById('seconds').innerHTML = ":"  + seconds;

    if (showSeconds) {
        document.getElementById('seconds').style.display = 'inline';
    } else {
        document.getElementById('seconds').style.display = 'none';
    }

    //TI prompti innerHTML
    document.getElementById('format').innerHTML = ampm; 
}

function updateDate(){
    dateTime = new Date();
    day = dateTime.getDate();
    month = dateTime.getMonth() + 1;
    year = dateTime.getFullYear();
    const weekdays = ['Pühapäev','Esmaspäev','Teisipäev','Kolmapäev','Neljapäev', 'Reede', 'Laupäev'];
    const weekday = weekdays[dateTime.getDay()];

    if(day < 10){
        day = "0" + day;
    }
    if(month < 10){
        month = "0" + month;
    }

    if (dateFormat) {
        document.getElementById('day').innerHTML = day + ".";
        document.getElementById('month').innerHTML = month + ".";
        document.getElementById('day').style.order = "1";
        document.getElementById('month').style.order = "2";
    } else {
        document.getElementById('month').innerHTML = month + ".";
        document.getElementById('day').innerHTML = day + ".";
        document.getElementById('month').style.order = "1";
        document.getElementById('day').style.order = "2";
    }

    document.getElementById('year').innerHTML = year;
    document.getElementById('year').style.order = "3"; 
    document.getElementById('weekday').innerHTML = weekday;
}

function checkKey(e){
    console.log(e.keyCode);
    if(e.keyCode == 43){
        changeFontSizeBigger();
    }
    if(e.keyCode == 45){
        changeFontSizeSmaller();
    }
}

colorPicker();
imagePicker();
upDateClock();
updateDate();
setInterval(upDateClock, 1000);
setInterval(updateDate, 60000);
document.getElementById('bigger').addEventListener('click', changeFontSizeBigger);
document.getElementById('smaller').addEventListener('click', changeFontSizeSmaller);
document.getElementById('github').addEventListener('click', () => {
    window.location.href = 'https://github.com/karmen02/Esimene-kodutoo';
});
//Järgnev eventListener on antud sama prompti poolt, millega on tehtud upDateClock
document.getElementById('timeFormat').addEventListener('click', () => {
    is24h = !is24h; 
    upDateClock();  
});

document.getElementById('secondDisplay').addEventListener('click', () => {
    showSeconds = !showSeconds;

    if (showSeconds) {
        document.getElementById('secondDisplay').textContent = 'Peida sekundeid';
    } else {
        document.getElementById('secondDisplay').textContent = 'Näita sekundeid';
    }
    
    upDateClock();
});

document.getElementById('dateFormat').addEventListener('click', () => {
    dateFormat = !dateFormat;
    
    if (dateFormat) {
        document.getElementById('dateFormat').textContent = 'Kuupäev: PP.KK';
    } else {
        document.getElementById('dateFormat').textContent = 'Kuupäev: KK.PP';
    }
    
    updateDate();
});

window.addEventListener('keypress', checkKey);