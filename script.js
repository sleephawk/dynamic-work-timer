/*---------------------------------------*/
/*----------VARIABLES----------*/
/*---------------------------------------*/

let startTime = 0;
let elapsedTime = 0;
let intervalId;
let newLog;
let bigContainer = document.getElementById('big-container');
let stopwatch = document.getElementById('stopwatch');
let buttonBox = document.getElementById('button-box');
const reasonBar = document.getElementById('reason-bar');
const procrBar = document.querySelector('.procr-bar');
const tooMuch = document.querySelector('.too-much');
let buttons = document.querySelectorAll('button');
let breakButton = document.querySelector('.break-button');
let breakCountNum = 0;
let toiletButton = document.querySelector('.toilet-button');
let toiletCountNum = 0;
let foodButton = document.querySelector(".food-button");
let foodCountNum = 0;
let procrButton = document.querySelector('.procr-button');
let procrCountNum = 0;
let blankCountNum = 0;
let endingButton = document.querySelector('.ending-button');
let backButtons = document.querySelectorAll('.back-button');
let yesButton1 = document.querySelector('.yes-button-1');
let yesButton2 = document.querySelector('.yes-button-2');
let yesButton3 = document.querySelector('.yes-button-3');
let noButton1 = document.querySelector('.no-button-1');
let noButton2 = document.querySelector('.no-button-2');
let noButton3 = document.querySelector('.no-button-3');
let exportButton = document.querySelector('.export-excel');
let resetButton2 = document.querySelector('.reset-button-2');
let downloadExcel = document.querySelector('.download-excel');
let timeLogButton = document.querySelector('.time-log-button')
let running = false;
let duck = document.querySelector('.duck');
let giantButton = document.querySelector('.giant-button');
let returnButton =document.querySelector('.return-button');
let timeLogTable = document.getElementById('time-log-table');
let logInfo = document.getElementById('log-info');
let logTime;
let startCount = 0;
let stopCount = 0;
let duckCount = 0;
let arrTime = [];
let arrReason = [];
let arrLogs = [];
let timeLogs = [];
let message1 = document.querySelector('.message-1');
let message2 = document.querySelector('.message-2');
let message3 = document.querySelector('.message-3');
let message4 = document.querySelector('.message-4');
let exportMessage = document.getElementById('export-message');
let table = document.getElementById('table');
let tableHeadings = document.querySelectorAll('.table-heading');

/*---------------------------------------*/
/*----------FUNCTIONS----------*/
/*---------------------------------------*/

// updateTimer calculates elapsed time in relation to now and returns it formatted
function updateTimer() {
    if (!running) return;
    let now = Date.now();
    elapsedTime = now - startTime;
    
    let hours = Math.floor(elapsedTime / 3600000);
    let minutes = Math.floor((elapsedTime % 3600000) / 60000);
    let seconds = Math.floor((elapsedTime % 60000) / 1000);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);

    document.getElementById('hours').textContent = add0(hours);
    document.getElementById('minutes').textContent = add0(minutes);
    document.getElementById('seconds').textContent = add0(seconds);
    document.getElementById('milliseconds').textContent = add0(milliseconds);

};

//format time formats any input milliseconds into hours & minutes
function formatTime(ms) {
    let hours = Math.floor(ms / 3600000);
    let minutes = Math.floor((ms % 3600000) / 60000);
    return `${add0(hours)}:${add0(minutes)}`;
}

function add0(number) {
    return (number < 10 ? '0' : '') + number;
};

//buttons changes all buttons to orange on click
buttons.forEach(button => {
    const originalColor= getComputedStyle(button).backgroundColor;
    button.addEventListener("mousedown", () => {
        button.style.backgroundColor ="#edb329";
        ;
        });
    button.addEventListener("touchstart", () => {
        button.style.backgroundColor = "#edb329";
        ;
        });
    button.addEventListener("mouseup", () => {
        button.style.backgroundColor = originalColor;
        });
    button.addEventListener("mouseleave", () => {
        button.style.backgroundColor = originalColor;
        });
    });


//randomNum creates a random number
function randomNum() {
    return Math.floor(Math.random()*10)};

// revolveDuck changes the picture when the duck button is clicked
function revolveDuck () {
    let number = randomNum();
    switch (number) {
        case 0:
        duck.src = "powerranger.png";
        giantButton.style.backgroundColor = "red";
        break;
        case 1:
        duck.src = "shark.png";
        giantButton.style.backgroundColor = "blue";
        break;                case 2:
        duck.src = "house.png";
        giantButton.style.backgroundColor = "beige";
        break;
        case 3:
        duck.src = "guitar.png";
        giantButton.style.backgroundColor = "maroon";
        break;
        case 4:
        duck.src = "ghost.png";
        giantButton.style.backgroundColor = "black";
        break;
        case 5:
        duck.src = "bugsword.png";
        giantButton.style.backgroundColor = "purple";
        break;
        case 6:
        duck.src = "arcade.png";
        giantButton.style.backgroundColor = "gold";
        break;
        case 7:
        duck.src = "alien.png";
        giantButton.style.backgroundColor = "green";
        break;
        case 8:
        duck.src = "world.png";
        giantButton.style.backgroundColor = "aquamarine";
        break;
        case 9:
        duck.src = "games.png";
        giantButton.style.backgroundColor = "cyan";
        break;
        default:
        duck.src = "pixil-frame-0 (3).png";
        giantButton.style.backgroundColor = "#FFFEB0";
        break;
    };
};

//tooMuchFun breaks the page if the user hits 1000 clicks
function tooMuchFun() {
    if (duckCount > 1000) {
        hideReasonsandProcr();
        bigContainer.style.display= "none";
        tooMuch.style.display = "flex";
    };
}

/*---------------------------------------*/
/* showMessage, showMessage2, showMessage3 & showExportMessage all update displays for messages, usually with yes/no options within 
that message. yesButton numbers correspond to message numbers*/
/*---------------------------------------*/

//message 1 is "Are you sure you want to end your work session?" (HTML 108)
function showMessage1() {
    message1.style.display = "flex";
};

//message 2 is "You have already logged your current time friend :)..." (HTML 103)
function showMessage2() {
    message2.style.display = "flex";
};

// export message is "This will download a CSV file with the table" (HTML 48)
function showExportMessage() {
    exportMessage.style.display = "block";
};

// message 3 is "Are you sure you want to reset the timer? You will lose all your logged data" (HTML 55)
function showMessage3() {
    message3.style.display = "flex";
};

function showMessage4() {
    message4.style.display = "flex";
}

// exportCSV creates a CSV table and downloads it to the harddrive
function exportCSV(table) {
    let rows = table.querySelectorAll("tr");       // step 1 - identifies the rows within parameter 'table' by grabbing tr elements
    let csvContent = "";                           // step 2 - create an empty string to be appended later
    
    rows.forEach(row => {
        let cols = row.querySelectorAll("td, th"); // step 3 - select all data within rows and therefore columns.
        // This iterates through all td and th elements to label them as cols.
        let rowData = [];                          // step 4 - create an empty array for the data.                         
    
        cols.forEach(col => {
            let text = col.innerText.replace(/"/g, '""'); // step 5 - within rows.forEach, make a col.forEach
            //replace the defined text with "", targeted by the " being passed into //g and replacing with '""'
            rowData.push(`"${text}"`); // pushes the text of each item into double quotes
        });
    
        csvContent += rowData.join(",") + "\r\n"; // Join columns with commas and add a new line
        });
    
        let blob = new Blob([csvContent], { type: "text/csv" }); // Create a CSV file as a Blob
        let link = document.createElement("a"); // Create a hidden link element
        link.href = URL.createObjectURL(blob);  // Convert the Blob into a downloadable link
        let now = new Date;
        link.download = `Work_Log_${now.getDate() + "-" + (now.getMonth()+1) +"-" + now.getFullYear()}.csv`;         // Set the filename
        document.body.appendChild(link);        
        link.click();                            // Simulate a click to trigger the download
        document.body.removeChild(link);         // Remove the link after downloading
    };

//setInterval makes sure the timer continues running as long as running is true.
setInterval(() => {
    if (running) {
        updateTimer();
    }
}, 100);

// hideMainELements hides the clock and the reason buttons
function hideMainElements() {
    stopwatch.style.display = "none";
    reasonBar.style.display = "none";
    buttonBox.style.display = "none";
};

//showMainElements unhides the above
function showMainElements() {
    stopwatch.style.display = "flex";
    reasonBar.style.display = "grid";
    buttonBox.style.display = "flex";
};

//hideReasonsandProcr only hides the reason buttons and the big duck page, and ensures that if
function hideReasonsandProcr() {
    reasonBar.style.display = "none";
    procrBar.style.display = "none";
}

//setToZero sets all main counting elements and arrays back to 0, and deletes table entries
function setToZero() {
    elapsedTime = 0;
    startTime = 0;
    startCount = 0;
    stopCount = 0;
    arrTime.length = 0;
    arrReason.length = 0;
    arrLogs.length = 0;
    breakCountNum = 0;
    toiletCountNum = 0;
    foodCountNum = 0;
    procrCountNum = 0;
    blankCountNum = 0;
    document.getElementById('hours').textContent = '00';
    document.getElementById('minutes').textContent = '00';
    document.getElementById('seconds').textContent = '00';
    document.getElementById('milliseconds').textContent = '00';
    document.querySelectorAll('.newReasonLog').forEach(element => element.remove());
    document.querySelectorAll('.statistics').forEach(element => element.remove());
}

//resetDuck changes the big duck button back to its original design
function resetDuck() {
    duck.src = "pixil-frame-0 (3).png";
    giantButton.style.backgroundColor = "#FFFEB0";
}

function hideAllMessages() {
    message1.style.display = "none";
    message2.style.display = "none";
    message3.style.display = "none";
    message4.style.display = "none";
}

/*---------------------------------------*/
/*----------EVENTS----------*/
/*---------------------------------------*/

//start-button event
document.getElementById('start-button').addEventListener("click", () => {
    if (message1.style.display !== "none" || message2.style.display !== "none" || message3.style.display !== "none" || message4.style.display !== "none") {
        hideAllMessages();
    };
    if (!running) {
        startTime = Date.now() - elapsedTime; // Keep elapsed time consistent
        intervalId = setInterval(updateTimer, 10);
        running = true;
        hideReasonsandProcr();
        startCount++;}
    if (arrLogs.length !== arrTime.length) {
        let blankLog = document.createElement('tr');
        blankLog.classList.add('newReasonLog');
        let now = new Date;
        blankLog.innerHTML = `<td>${formatTime(logTime)}</td><td>No reason</td><td>${add0(now.getHours())}:${add0(now.getMinutes())}</td>`
        logInfo.appendChild(blankLog);
        arrLogs.push('No reason');
        arrReason.push('No reason');
        blankCountNum++;
        
    }
        
});
/*---------------------------------------*/
//stop-button event
/*---------------------------------------*/

document.getElementById('stop-button').addEventListener("click", () => {
    if (message1.style.display !== "none" || message2.style.display !== "none" || message3.style.display !== "none" || message4.style.display !== "none") {
        hideAllMessages();
    };
    stopCount++;
    if (running) {
        clearInterval(intervalId);
        running = false;
        logTime = elapsedTime;
        arrTime.push(logTime);
        reasonBar.style.display = "grid";
        procrBar.style.display = "none";
        tooMuch.style.display = "none";
        if (arrReason.length === 0) {
            arrReason.push(".");
        }; 
        }
    });

//reset-button event (which re-routes to the message which handles the real page change)
document.getElementById('reset-button').addEventListener("click", () => {
    showMessage3();
});

// Ensure stopwatch keeps counting accurately when switching tabs
document.addEventListener("visibilitychange", () => {
    if (!document.hidden && running) {
        startTime = Date.now() - elapsedTime; // Ensure accurate time tracking
        updateTimer(); // Immediately update time when coming back
    }
});


//time log event
timeLogButton.addEventListener("click", () => {
    if (message1.style.display !== "none" || message2.style.display !== "none" || message3.style.display !== "none" || message4.style.display !== "none" ) {
        hideAllMessages();
    };
    if(arrLogs.length === 0) {
        showMessage4();
        console.log(message4.style.display)
    } else {
    console.log(arrLogs);
    hideMainElements();
    timeLogTable.style.display="flex";
    returnButton.style.display="flex";
    }
});

//return button event
returnButton.addEventListener('click', () => {
    showMainElements();
    timeLogTable.style.display="none";
    returnButton.style.display="none";
});


//break button event
breakButton.addEventListener('click', () => {
    if (message1.style.display !== "none" || message2.style.display !== "none" || message3.style.display !== "none" || message4.style.display !== "none") {
        hideAllMessages();
    };
    if (arrReason.length === arrTime.length) {
        arrReason.push("Chilling")
        let breakLog = document.createElement('tr');
        breakLog.classList.add('newReasonLog');
        let now = new Date;
        breakLog.innerHTML = `<td class="time-log">${formatTime(logTime)}</td><td>Chilling</td><td>${add0(now.getHours())}:${add0(now.getMinutes())}</td>`
        logInfo.appendChild(breakLog);
        hideMainElements();
        timeLogTable.style.display="flex";
        returnButton.style.display="flex";
        arrLogs.push('Chilling');
        breakCountNum++;
    } else {
        showMessage2();
    };
});

//toilet button event
toiletButton.addEventListener('click', () => {
    if (message1.style.display !== "none" || message2.style.display !== "none" || message3.style.display !== "none" || message4.style.display !== "none" ) {
        hideAllMessages();
    };
    if (arrReason.length === arrTime.length) {
        arrReason.push("Toilet");
        let toiletLog = document.createElement('tr');
        toiletLog.classList.add('newReasonLog');
        let now = new Date;
        toiletLog.innerHTML = `<td class="time-log">${formatTime(logTime)}</td><td>Toilet</td><td>${add0(now.getHours())}:${add0(now.getMinutes())}</td>`
        logInfo.appendChild(toiletLog);
        hideMainElements();
        timeLogTable.style.display="flex";
        returnButton.style.display="flex";
        arrLogs.push('Toilet');
        toiletCountNum++;
    } else {
        showMessage2();
    };

});

//food button event
foodButton.addEventListener('click', () => {
    if (message1.style.display !== "none" || message2.style.display !== "none" || message3.style.display !== "none" || message4.style.display !== "none") {
        hideAllMessages();
    };
    if (arrReason.length === arrTime.length) {
        arrReason.push("Eating");
        let foodLog = document.createElement('tr');
        foodLog.classList.add('newReasonLog');
        let now = new Date;
        foodLog.innerHTML = `<td class="time-log">${formatTime(logTime)}</td><td>Eating</td><td>${add0(now.getHours())}:${add0(now.getMinutes())}</td>`
        logInfo.appendChild(foodLog);
        hideMainElements();
        timeLogTable.style.display="flex";
        returnButton.style.display="flex";
        arrLogs.push('Eating');
        foodCountNum++;
    } else {
       showMessage2();
    };
});

//procrastination button event (which creates a giant duck button)
procrButton.addEventListener('click', () => {
    if (message1.style.display !== "none" || message2.style.display !== "none" || message3.style.display !== "none" || message4.style.display !== "none") {
        hideAllMessages();
    };
    if (arrReason.length === arrTime.length) {
        arrReason.push("Procrastination");
        let procrLog = document.createElement('tr');
        procrLog.classList.add('newReasonLog');
        procrLog.classList.add('procrRewrite');
        let now = new Date;
        procrLog.innerHTML = `<td class="time-log">${formatTime(logTime)}</td><td>Procrastination</td><td>${add0(now.getHours())}:${add0(now.getMinutes())}</td>`
        logInfo.appendChild(procrLog);
        reasonBar.style.display = "none";
        procrBar.style.display = "flex";
        procrCountNum++;
        arrLogs.push('Procrastination');
    } else {
        showMessage2();
    };
});

//giant button event
giantButton.addEventListener('click', () => {
    revolveDuck();
    duckCount++;
    tooMuchFun();
});

//yes & no button 1 event (s) - for message "Are you sure you want to end your work session?" (HTML 108)
yesButton1.addEventListener('click', () =>{
    if (arrLogs.length !== arrTime.length) {
        let endingLog = document.createElement('tr');
        endingLog.classList.add('newReasonLog');
        let now = new Date;
        endingLog.innerHTML = `<td class="time-log">${formatTime(logTime)}</td><td>Ending work</td><td>${add0(now.getHours())}:${add0(now.getMinutes())}</td>`
        logInfo.appendChild(endingLog);
        arrLogs.push('Ending work');
        arrReason.push('Ending work');
        blankCountNum++;
    };
    hideMainElements();
    procrBar.style.display = "none";
    message1.style.display = "none";
    timeLogTable.style.display="flex";
    exportButton.style.display = "flex";
    resetButton2.style.display = "flex";
    //creates the heading row for logInfo
    let statisticsHeading = document.createElement('tr');
    statisticsHeading.classList.add('statistics');
    statisticsHeading.innerHTML = `<th class="table-heading">Longest stint of work</th><th class="table-heading">Break most taken</th><th class="table-heading">Clicks of the duck button</th>`
    logInfo.appendChild(statisticsHeading);
    //calculating the highest amount of minutes worked
        document.querySelectorAll('.time-log').forEach(element => {
        let text = element.innerText.trim(); // Extracts text from element - like the actual tags
        let parts = text.split(":"); // Splits 'hh:mm' format INTO AN ARRAY (I love arrays now)
        let minutes = parseInt(parts[0]) * 60 + parseInt(parts[1]); // Convert to total minutes
        timeLogs.push(minutes);
        })
        let longestTime = Math.max(...timeLogs); //gets the largest number from the logs
        if (longestTime < 0) { longestTime = 0};

    //calculates the heighest number of breaks 
    let breaksArr = [breakCountNum, toiletCountNum, foodCountNum, procrCountNum, blankCountNum];
    let breakNames = ["Chilling breaks", "Toilet breaks", "Food breaks", "Procrastination breaks", "Miscellanious breaks"]
    let maxBreaks = Math.max(...breaksArr); //calculates the highest break count
    let maxBreakIndex = breaksArr.indexOf(maxBreaks);
    let mostBreaksCombined = breakNames[maxBreakIndex];

    let statisticsRow = document.createElement('tr');
    statisticsRow.classList.add('statistics');
    statisticsRow.innerHTML = `<td class="table-blue">${longestTime} minutes</td><td>${mostBreaksCombined}</td><td>${duckCount}</td>`
    logInfo.appendChild(statisticsRow);
});

noButton1.addEventListener('click', () => {
    message1.style.display = "none";
});


//yes & no button 2 events - for message "You have already logged your current time friend :)..." (HTML 103)
yesButton2.addEventListener('click', ()=> {
    exportCSV(table);
    setToZero();
    hideReasonsandProcr();
    resetDuck();
    exportMessage.style.display = "none";
    clearInterval(intervalId);
    running = false;
    tooMuch.style.display = "none";
    timeLogTable.style.display= "none";
    exportButton.style.display = "none";
    bigContainer.style.display = "flex";
    stopwatch.style.display = "flex";
    buttonBox.style.display = "flex";
    resetButton2.style.display = "none";
});

noButton2.addEventListener('click', () => {
    hideMainElements();
    procrBar.style.display = "none";
    message1.style.display = "none";
    timeLogTable.style.display="flex";
    exportMessage.style.display = "none";
});


//yes & no button 3 events - for message "Are you sure you want to reset the timer? You will lose all your logged data" (HTML 55)
yesButton3.addEventListener('click', () => {
    clearInterval(intervalId);
    setToZero();
    hideReasonsandProcr();
    resetDuck();
    running = false;
    tooMuch.style.display = "none";
    timeLogTable.style.display= "none";
    message3.style.display = "none";
    resetButton2.style.display = "none";
    exportButton.style.display = "none";
    bigContainer.style.display = "flex";
    stopwatch.style.display = "flex";
    buttonBox.style.display = "flex";
});

noButton3.addEventListener('click', () => {
    message3.style.display = "none";
});


//back button event
backButtons.forEach(button => {
   button.addEventListener('click', () => {
    message2.style.display = "none";
    message4.style.display = "none";});
});

//ending button event
endingButton.addEventListener('click', () => {
    showMessage1();
});

//export button event
exportButton.addEventListener('click', () => {
    showExportMessage();
});


resetButton2.addEventListener('click', () => {
    showMessage3();
});

/*---------------------------------------*/
//Draggable/ Lazy
/*---------------------------------------*/

document.querySelectorAll('img').forEach(img => {
    img.draggable = false;
    img.setAttribute('loading', 'lazy');
})


/*---------------------------------------*/
//Favicon
/*---------------------------------------*/

  const headTag = document.querySelector('head');
  const favicon = document.createElement('link');
  favicon.setAttribute('rel', 'icon');
  favicon.setAttribute('href', 'favicon.svg');
  favicon.setAttribute('type', 'image/svg+xml');
  headTag.appendChild(favicon);
