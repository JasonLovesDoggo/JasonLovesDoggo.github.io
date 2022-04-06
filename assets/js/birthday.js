const countdown = document.getElementById("countdown");
//const year = document.getElementById("year");


const currentYear = new Date().getFullYear();
const birthdayTime = new Date(`April 19 ${currentYear} 00:00:00`);
//year.innerText = `April 19 ${currentYear}`;

// update countdown
function updateCountdown() {
  const currentTime = new Date();
  const diff = birthdayTime - currentTime;
  const d = Math.floor(diff / 1000 / 60 / 60 / 24);
  const h = Math.floor(diff / 1000 / 60 / 60) % 24;
  const m = Math.floor(diff / 1000 / 60) % 60;
  const s = Math.floor(diff / 1000) % 60;
  //add values to DOM
  countdown.innerHTML = `Birthday in: <span style="color: rgb(64,123,164)">${d} days </span> <span style="color: rgb(64,123,164)">${h} hours </span> <span style="color: rgb(64,123,164)">${m} minutes</span> <span style="color: rgb(64,123,164)">${s} seconds</span>`
}

//run every second
setInterval(updateCountdown, 1000);
