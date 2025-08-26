/*----------Query Selectors----------*/
const bigContainer = document.getElementById("big-container");
const stopwatch = document.getElementById("stopwatch");
const buttonBox = document.getElementById("button-box");
const reasonBar = document.getElementById("reason-bar");
const procrBar = document.querySelector(".procr-bar");
const tooMuch = document.querySelector(".too-much");

const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");
const resetButton = document.getElementById("reset-button");

const buttons = document.querySelectorAll("button");

const reasonButtonsArray = [
  (breakButton = document.querySelector(".break-button")),
  (toiletButton = document.querySelector(".toilet-button")),
  (foodButton = document.querySelector(".food-button")),
  (procrButton = document.querySelector(".procr-button")),
  (endingButton = document.querySelector(".ending-button")),
  (backButtons = document.querySelectorAll(".back-button")),
];

const yesButton1 = document.querySelector(".yes-button-1");
const yesButton2 = document.querySelector(".yes-button-2");
const yesButton3 = document.querySelector(".yes-button-3");

const noButton1 = document.querySelector(".no-button-1");
const noButton2 = document.querySelector(".no-button-2");
const noButton3 = document.querySelector(".no-button-3");

const exportButton = document.querySelector(".export-excel");
const exportMessage = document.getElementById("export-message");
const resetButton2 = document.querySelector(".reset-button-2");
const downloadExcel = document.querySelector(".download-excel");
const timeLogButton = document.querySelector(".time-log-button");
const duck = document.querySelector(".duck");
const giantButton = document.querySelector(".giant-button");
const returnButton = document.querySelector(".return-button");
const timeLogTable = document.getElementById("time-log-table");
const logInfo = document.getElementById("log-info");

const standardMessages = [
  (message1 = document.querySelector(".message-1")),
  (message2 = document.querySelector(".message-2")),
  (message3 = document.querySelector(".message-3")),
  (message4 = document.querySelector(".message-4")),
];

const table = document.getElementById("table");
const tableHeadings = document.querySelectorAll(".table-heading");

const counter = {
  startTime: 0,
  elapsedTime: 0,
  break: 0,
  toilet: 0,
  food: 0,
  procr: 0,
  blank: 0,
  start: 0,
  stop: 0,
  duck: 0,
};

let intervalId;
let newLog;
let logTime;
let arrTime = [];
let arrReason = [];
let arrLogs = [];
let timeLogs = [];
let running = false;

/*----------BUSINESS----------*/

const updateTimer = () => {
  if (!running) return;
  let now = Date.now();
  counter.elapsedTime = now - counter.startTime;

  let hours = Math.floor(counter.elapsedTime / 3600000);
  let minutes = Math.floor((counter.elapsedTime % 3600000) / 60000);
  let seconds = Math.floor((counter.elapsedTime % 60000) / 1000);
  let milliseconds = Math.floor((counter.elapsedTime % 1000) / 10);

  document.getElementById("hours").textContent = add0(hours);
  document.getElementById("minutes").textContent = add0(minutes);
  document.getElementById("seconds").textContent = add0(seconds);
  document.getElementById("milliseconds").textContent = add0(milliseconds);
};

const runTimer = () => {
  setInterval(() => {
    if (running) {
      updateTimer();
    }
  }, 100);
};

//format time formats any input milliseconds into hours & minutes
function formatTime(ms) {
  let hours = Math.floor(ms / 3600000);
  let minutes = Math.floor((ms % 3600000) / 60000);
  return `${add0(hours)}:${add0(minutes)}`;
}

function add0(number) {
  return (number < 10 ? "0" : "") + number;
}

const randomNum = () => {
  return Math.floor(Math.random() * 10);
};

const duckRevolveUtil = (source, color) => {
  duck.src = source;
  giantButton.style.backgroundColor = color;
};

const showMessage = (domEl) => {
  domEl.style.display = "flex";
};

const revolveDuck = () => {
  const number = randomNum();
  switch (number) {
    case 0:
      duckRevolveUtil("powerranger.png", "red");
      break;
    case 1:
      duckRevolveUtil("shark.png", "blue");
      break;
    case 2:
      duckRevolveUtil("house.png", "beige");
      break;
    case 3:
      duckRevolveUtil("guitar.png", "maroon");
      break;
    case 4:
      duckRevolveUtil("ghost.png", "black");
      break;
    case 5:
      duckRevolveUtil("bugsword.png", "purple");
      break;
    case 6:
      duckRevolveUtil("arcade.png", "gold");
      break;
    case 7:
      duckRevolveUtil("alien.png", "green");
      break;
    case 8:
      duckRevolveUtil("world.png", "aquamarine");
      break;
    case 9:
      duckRevolveUtil("games.png", "cyan");
      break;
    default:
      duckRevolveUtil("duck.png", "#FFFEB0");
      break;
  }
};

const tooMuchFun = () => {
  if (counter.duck > 1000) {
    States.hideReasonsandProcr();
    bigContainer.style.display = "none";
    tooMuch.style.display = "flex";
  }
};

// export message is "This will download a CSV file with the table" (HTML 48)

// exportCSV creates a CSV table and downloads it to the harddrive
function exportCSV(table) {
  let rows = table.querySelectorAll("tr"); // step 1 - identifies the rows within parameter 'table' by grabbing tr elements
  let csvContent = ""; // step 2 - create an empty string to be appended later

  rows.forEach((row) => {
    let cols = row.querySelectorAll("td, th"); // step 3 - select all data within rows and therefore columns.
    // This iterates through all td and th elements to label them as cols.
    let rowData = []; // step 4 - create an empty array for the data.

    cols.forEach((col) => {
      let text = col.innerText.replace(/"/g, '""'); // step 5 - within rows.forEach, make a col.forEach
      //replace the defined text with "", targeted by the " being passed into //g and replacing with '""'
      rowData.push(`"${text}"`); // pushes the text of each item into double quotes
    });

    csvContent += rowData.join(",") + "\r\n"; // Join columns with commas and add a new line
  });

  let blob = new Blob([csvContent], { type: "text/csv" }); // Create a CSV file as a Blob
  let link = document.createElement("a"); // Create a hidden link element
  link.href = URL.createObjectURL(blob); // Convert the Blob into a downloadable link
  let now = new Date();
  link.download = `Work_Log_${
    now.getDate() + "-" + (now.getMonth() + 1) + "-" + now.getFullYear()
  }.csv`; // Set the filename
  document.body.appendChild(link);
  link.click(); // Simulate a click to trigger the download
  document.body.removeChild(link); // Remove the link after downloading
}

const States = {
  changeDisplay(display, ...els) {
    els.forEach((el) => {
      el.style.display = display;
    });
  },
  hideMainElements() {
    this.changeDisplay("none", stopwatch, reasonBar, buttonBox);
  },
  showMainElements() {
    this.changeDisplay("flex", stopwatch, buttonBox);
    this.changeDisplay("grid", reasonBar);
  },
  hideReasonsandProcr() {
    this.changeDisplay("none", reasonBar, procrBar);
  },
  hideAllMessages() {
    if (standardMessages.filter((m) => m.style.display !== "none"))
      this.changeDisplay("none", message1, message2, message3, message4);
  },
};

const setToZero = () => {
  const zeroUtil = (obj, ...props) => {
    props.forEach((p) => (obj[p] = 0));
  };
  zeroUtil(
    counter,
    "elapsedTime",
    "startTime",
    "start",
    "stop",
    "break",
    "toilet",
    "food",
    "procr",
    "blank"
  );
  arrTime.length = 0;
  arrReason.length = 0;
  arrLogs.length = 0;

  document.getElementById("hours").textContent = "00";
  document.getElementById("minutes").textContent = "00";
  document.getElementById("seconds").textContent = "00";
  document.getElementById("milliseconds").textContent = "00";
  document
    .querySelectorAll(".newReasonLog")
    .forEach((element) => element.remove()); //clears reason data
  document
    .querySelectorAll(".statistics")
    .forEach((element) => element.remove()); //clears reason data
};

const resetDuck = () => {
  duckRevolveUtil("duck.png", "#FFFEB0");
};

/*---------------------------------------*/
/*----------EVENTS----------*/
/*---------------------------------------*/

//start-button event
startButton.addEventListener("click", () => {
  States.hideAllMessages();
  if (!running) {
    counter.startTime = Date.now() - counter.elapsedTime; // Keep elapsed time consistent
    intervalId = setInterval(updateTimer, 10);
    running = true;
    runTimer();
    States.hideReasonsandProcr();
    counter.start++;
  }
  if (arrLogs.length !== arrTime.length) {
    let blankLog = document.createElement("tr");
    blankLog.classList.add("newReasonLog");
    let now = new Date();
    blankLog.innerHTML = `<td>${formatTime(
      logTime
    )}</td><td>No reason</td><td>${add0(now.getHours())}:${add0(
      now.getMinutes()
    )}</td>`;
    logInfo.appendChild(blankLog);
    arrLogs.push("No reason");
    arrReason.push("No reason");
    counter.blank++;
  }
});
/*---------------------------------------*/
//stop-button event
/*---------------------------------------*/

stopButton.addEventListener("click", () => {
  States.hideAllMessages();
  counter.stop++;
  if (running) {
    console.log("ive reached this block");
    clearInterval(intervalId);
    running = false;
    logTime = counter.elapsedTime;
    arrTime.push(logTime);
    States.changeDisplay("none", procrBar, tooMuch);
    States.changeDisplay("grid", reasonBar);
    if (arrReason.length === 0) {
      arrReason.push("no reason");
    }
  }
});

resetButton.addEventListener("click", () => {
  showMessage(message3);
});

// Ensure stopwatch keeps counting accurately when switching tabs
document.addEventListener("visibilitychange", () => {
  if (!document.hidden && running) {
    counter.startTime = Date.now() - elapsedTime; // Ensure accurate time tracking
    updateTimer(); // Immediately update time when coming back
  }
});

//time log event
timeLogButton.addEventListener("click", () => {
  States.hideAllMessages();
  if (arrLogs.length === 0) {
    showMessage(message4);
  } else {
    States.hideMainElements();
    States.changeDisplay("flex", timeLogTable, returnButton);
  }
});

//return button event
returnButton.addEventListener("click", () => {
  States.hideMainElements();
  States.changeDisplay("none", timeLogTable, returnButton);
  States.changeDisplay("flex", stopwatch, buttonBox);
});

//break button event
breakButton.addEventListener("click", () => {
  States.hideAllMessages();
  if (arrReason.length === arrTime.length) {
    arrReason.push("Chilling");
    let breakLog = document.createElement("tr");
    breakLog.classList.add("newReasonLog");
    let now = new Date();
    breakLog.innerHTML = `<td class="time-log">${formatTime(
      logTime
    )}</td><td>Chilling</td><td>${add0(now.getHours())}:${add0(
      now.getMinutes()
    )}</td>`;
    logInfo.appendChild(breakLog);
    States.hideMainElements();
    timeLogTable.style.display = "flex";
    returnButton.style.display = "flex";
    arrLogs.push("Chilling");
    counter.break++;
  } else {
    showMessage(message2);
  }
});

//toilet button event
toiletButton.addEventListener("click", () => {
  States.hideAllMessages();
  if (arrReason.length === arrTime.length) {
    arrReason.push("Toilet");
    let toiletLog = document.createElement("tr");
    toiletLog.classList.add("newReasonLog");
    let now = new Date();
    toiletLog.innerHTML = `<td class="time-log">${formatTime(
      logTime
    )}</td><td>Toilet</td><td>${add0(now.getHours())}:${add0(
      now.getMinutes()
    )}</td>`;
    logInfo.appendChild(toiletLog);
    States.hideMainElements();
    timeLogTable.style.display = "flex";
    returnButton.style.display = "flex";
    arrLogs.push("Toilet");
    counter.toilet++;
  } else {
    showMessage(message2);
  }
});

//food button event
foodButton.addEventListener("click", () => {
  States.hideAllMessages();
  if (arrReason.length === arrTime.length) {
    arrReason.push("Eating");
    let foodLog = document.createElement("tr");
    foodLog.classList.add("newReasonLog");
    let now = new Date();
    foodLog.innerHTML = `<td class="time-log">${formatTime(
      logTime
    )}</td><td>Eating</td><td>${add0(now.getHours())}:${add0(
      now.getMinutes()
    )}</td>`;
    logInfo.appendChild(foodLog);
    States.hideMainElements();
    timeLogTable.style.display = "flex";
    returnButton.style.display = "flex";
    arrLogs.push("Eating");
    counter.food++;
  } else {
    showMessage(message2);
  }
});

//procrastination button event (which creates a giant duck button)
procrButton.addEventListener("click", () => {
  States.hideAllMessages();
  if (arrReason.length === arrTime.length) {
    arrReason.push("Procrastination");
    let procrLog = document.createElement("tr");
    procrLog.classList.add("newReasonLog");
    procrLog.classList.add("procrRewrite");
    let now = new Date();
    procrLog.innerHTML = `<td class="time-log">${formatTime(
      logTime
    )}</td><td>Procrastination</td><td>${add0(now.getHours())}:${add0(
      now.getMinutes()
    )}</td>`;
    logInfo.appendChild(procrLog);
    reasonBar.style.display = "none";
    procrBar.style.display = "flex";
    counter.procr++;
    arrLogs.push("Procrastination");
  } else {
    showMessage(message2);
  }
});

//giant button event
giantButton.addEventListener("click", () => {
  revolveDuck();
  counter.duck++;
  tooMuchFun();
});

//yes & no button 1 event (s) - for message "Are you sure you want to end your work session?" (HTML 108)
yesButton1.addEventListener("click", () => {
  if (arrLogs.length !== arrTime.length) {
    let endingLog = document.createElement("tr");
    endingLog.classList.add("newReasonLog");
    let now = new Date();
    endingLog.innerHTML = `<td class="time-log">${formatTime(
      logTime
    )}</td><td>Ending work</td><td>${add0(now.getHours())}:${add0(
      now.getMinutes()
    )}</td>`;
    logInfo.appendChild(endingLog);
    arrLogs.push("Ending work");
    arrReason.push("Ending work");
    counter.blank++;
  }
  States.hideMainElements();
  procrBar.style.display = "none";
  message1.style.display = "none";
  timeLogTable.style.display = "flex";
  exportButton.style.display = "flex";
  resetButton2.style.display = "flex";
  //creates the heading row for logInfo
  let statisticsHeading = document.createElement("tr");
  statisticsHeading.classList.add("statistics");
  statisticsHeading.innerHTML = `<th class="table-heading">Longest stint of work</th><th class="table-heading">Break most taken</th><th class="table-heading">Clicks of the duck button</th>`;
  logInfo.appendChild(statisticsHeading);
  //calculating the highest amount of minutes worked
  document.querySelectorAll(".time-log").forEach((element) => {
    let text = element.innerText.trim(); // Extracts text from element - like the actual tags
    let parts = text.split(":"); // Splits 'hh:mm' format INTO AN ARRAY (I love arrays now)
    let minutes = parseInt(parts[0]) * 60 + parseInt(parts[1]); // Convert to total minutes
    timeLogs.push(minutes);
  });
  let longestTime = Math.max(...timeLogs); //gets the largest number from the logs
  if (longestTime < 0) {
    longestTime = 0;
  }

  //calculates the heighest number of breaks
  const breaksArr = [
    counter.break,
    counter.toilet,
    counter.food,
    counter.procr,
    counter.blank,
  ];
  const breakNames = [
    "Chilling breaks",
    "Toilet breaks",
    "Food breaks",
    "Procrastination breaks",
    "Miscellanious breaks",
  ];
  const maxBreaks = Math.max(...breaksArr); //calculates the highest break count
  const maxBreakIndex = breaksArr.indexOf(maxBreaks);
  const mostBreaksCombined = breakNames[maxBreakIndex];

  const statisticsRow = document.createElement("tr");
  statisticsRow.classList.add("statistics");
  statisticsRow.innerHTML = `<td class="table-blue">${longestTime} minutes</td><td>${mostBreaksCombined}</td><td>${counter.duck}</td>`;
  logInfo.appendChild(statisticsRow);
});

noButton1.addEventListener("click", () => {
  message1.style.display = "none";
});

//yes & no button 2 events - for message "You have already logged your current time friend :)..." (HTML 103)
yesButton2.addEventListener("click", () => {
  exportCSV(table);
  setToZero();

  States.hideReasonsandProcr();
  resetDuck();
  exportMessage.style.display = "none";
  clearInterval(intervalId);
  running = false;
  tooMuch.style.display = "none";
  timeLogTable.style.display = "none";
  exportButton.style.display = "none";
  bigContainer.style.display = "flex";
  stopwatch.style.display = "flex";
  buttonBox.style.display = "flex";
  resetButton2.style.display = "none";
});

noButton2.addEventListener("click", () => {
  States.hideMainElements();
  procrBar.style.display = "none";
  message1.style.display = "none";
  timeLogTable.style.display = "flex";
  exportMessage.style.display = "none";
});

//yes & no button 3 events - for message "Are you sure you want to reset the timer? You will lose all your logged data" (HTML 55)
yesButton3.addEventListener("click", () => {
  clearInterval(intervalId);
  setToZero();
  console.log(counter);
  States.hideReasonsandProcr();
  resetDuck();
  running = false;
  tooMuch.style.display = "none";
  timeLogTable.style.display = "none";
  message3.style.display = "none";
  resetButton2.style.display = "none";
  exportButton.style.display = "none";
  bigContainer.style.display = "flex";
  stopwatch.style.display = "flex";
  buttonBox.style.display = "flex";
});

noButton3.addEventListener("click", () => {
  message3.style.display = "none";
});

//back button event
backButtons.forEach((button) => {
  button.addEventListener("click", () => {
    message2.style.display = "none";
    message4.style.display = "none";
  });
});

//ending button event
endingButton.addEventListener("click", () => {
  showMessage(message1);
});

//export button event
exportButton.addEventListener("click", () => {
  showMessage(exportMessage);
});

resetButton2.addEventListener("click", () => {
  showMessage(message3);
});

/*---------------------------------------*/
//Draggable/ Lazy
/*---------------------------------------*/

document.querySelectorAll("img").forEach((img) => {
  img.draggable = false;
  img.setAttribute("loading", "lazy");
});
