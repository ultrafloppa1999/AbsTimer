let timerInterval;
let startTime;
let endTime;
let earningsPerSecond = 0;
let hourlyRateInput = document.getElementById("hourlyRateInput");
let earningsValue = document.getElementById("earningsValue");
let startTimeElement = document.getElementById("startTime");
let endTimeElement = document.getElementById("endTime");
let startBtn = document.getElementById("startBtn");
let stopBtn = document.getElementById("stopBtn");
let resetBtn = document.getElementById("resetBtn");

function startTimer() {
  if (!startTime) {
    startTime = new Date();
    startTimeElement.innerText = formatTime(startTime);
  }
  if (!timerInterval) {
    timerInterval = setInterval(updateTime, 1000);
  }
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  endTime = new Date();
  endTimeElement.innerText = formatTime(endTime);
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  startTime = null;
  endTime = null;
  earningsPerSecond = 0;
  earningsValue.innerText = "0";
  startTimeElement.innerText = "-";
  endTimeElement.innerText = "work still ongoing";
  document.getElementById("hours").innerText = "00";
  document.getElementById("minutes").innerText = "00";
  document.getElementById("seconds").innerText = "00";
}


function updateTime() {
  const now = new Date();
  const elapsedTime = (now - startTime) / 1000;
  const hours = Math.floor(elapsedTime / 3600);
  const minutes = Math.floor((elapsedTime % 3600) / 60);
  const seconds = Math.floor(elapsedTime % 60);

  document.getElementById("hours").innerText = pad(hours);
  document.getElementById("minutes").innerText = pad(minutes);
  document.getElementById("seconds").innerText = pad(seconds);

  const hourlyRate = hourlyRateInput.value;
  earningsPerSecond = hourlyRate / 3600;
  earningsValue.innerText = (elapsedTime * earningsPerSecond).toFixed(2);
}

function pad(number) {
  if (number < 10) {
    return "0" + number;
  }
  return number;
}

function formatTime(date) {
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  return `${hours}:${minutes}:${seconds}`;
}

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);
hourlyRateInput.addEventListener("input", updateTime);
