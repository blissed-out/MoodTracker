// get data - done
// store data - done
// display data - done
function dayName(day) {
  switch (day) {
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    case 7:
      return "Sunday";
  }
}
function monthName(month) {
  switch (month) {
    case 0:
      return "January";
    case 1:
      return "Februrary";
    case 2:
      return "March";
    case 3:
      return "April";
    case 4:
      return "May";
    case 5:
      return "June";
    case 6:
      return "July";
    case 7:
      return "August";
    case 8:
      return "September";
    case 9:
      return "October";
    case 10:
      return "November";
    case 11:
      return "December";
  }
}

// function to get seperate moods and date data, to easily display to user
const yesButton = document.querySelector(".yesButton");
const container = document.querySelector(".container");
const timeline = document.querySelector(".timeline");
let moodLogs = [];
yesButton.addEventListener("click", () => {
  // get data of mood and date
  const mood = document.querySelector('input[name="value-radio"]:checked').value;
  const day = dayName(new Date().getDay());
  const date = new Date().getDate();
  const month = monthName(new Date().getMonth());
  const year = new Date().getFullYear();
  // store data in localStorage of user's browser
  if (localStorage.getItem("moodLogs")) {
    // if data exists in local storage, pass it to our variable "moodLogs" to avoid overriding pervious data due to reload
    moodLogs = JSON.parse(localStorage.getItem("moodLogs"));
  }
  moodLogs.push({
    mood: mood,
    day: day,
    date: date,
    month: month,
    year: year,
  });
  localStorage.setItem("moodLogs", JSON.stringify(moodLogs));
  timeline.innerHTML = "";
  dispatchEvent(new Event("storage"));
});

// display data
function displayData() {
  if (localStorage.getItem("moodLogs")) {
    const storedData = JSON.parse(localStorage.getItem("moodLogs"));
    storedData.forEach((moodLog) => {
      // timeline.innerHTML += `<div> your mod ${moodLog.mood} on ${moodLog.day}, ${moodLog.date} of month ${moodLog.month} and year ${moodLog.year} </div>`;
      const displayingData = `<div class="card">
                    <div class="dateBox">
                        <div class="day">
                            ${moodLog.day}
                        </div>
                        <div class="date">${moodLog.date}</div>
                    </div>
                    <div class="mood">${moodLog.mood}</div>`;

      timeline.insertAdjacentHTML("afterbegin", displayingData);
    });
  }
}
displayData();
window.addEventListener("storage", displayData);
