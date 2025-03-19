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
function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}
const recordButton = document.querySelector(".recordButton");
const container = document.querySelector(".container");
// button to choose from day, week and month
const timeline = document.querySelector(".timeline");
let moodLogs = [];
const timelineButtons = document.querySelectorAll(
  'input[name="value-radio-timeline"]',
);
recordButton.addEventListener("click", () => {
  // get data of mood and date
  if (!document.querySelector('input[name="value-radio"]:checked')) {
    alert("Please choose an emoji");
    return;
  }
  const clickedEmojiButton = document.querySelector(
    'input[name="value-radio"]:checked',
  );
  clickedEmojiButton.checked = false; // reset emoji selection
  const mood = clickedEmojiButton.value;
  const day = dayName(new Date().getDay());
  const date = new Date().getDate();
  const month = monthName(new Date().getMonth());
  const year = new Date().getFullYear();
  // store data in localStorage of user's browser
  if (localStorage.getItem("moodLogs")) {
    // if data exists in local storage, pass it to our variable "moodLogs" to avoid overriding pervious data due to reload
    moodLogs = JSON.parse(localStorage.getItem("moodLogs"));
    moodLogs.forEach((moodLog) => {
      if (
        moodLog.day != day &&
        moodLog.month != month &&
        moodLog.year != year
      ) {
        moodLogs.push({
          mood: mood,
          day: day,
          date: date,
          month: month,
          year: year,
        });
      } else {
        alert("Already recorded for today")
      }
    });
  } else {
    moodLogs.push({
      mood: mood,
      day: day,
      date: date,
      month: month,
      year: year,
    });
  }
  localStorage.setItem("moodLogs", JSON.stringify(moodLogs));
  document.querySelector(`input[name="value-radio-timeline"`).checked = false;
  document.querySelector("#day").checked = true;
  timeline.innerHTML = "";
  displayData();
});
// display data
let storedData = "";
function displayData(choosenTimeline = "day") {
  if (localStorage.getItem("moodLogs")) {
    storedData = JSON.parse(localStorage.getItem("moodLogs"));
    // logic to display in day, week or monthly timeline
    timeline.innerHTML = "";
    let countWeekDays = 0,
      countMonthDays = 0; // to count number of days for week and month
    let happy = 0,
      excited = 0,
      neutral = 0,
      angry = 0,
      sad = 0,
      sick = 0;
    let weekNumber = 1;
    let monthNumber = 1;
    storedData.forEach((moodLog) => {
      if (choosenTimeline == "day") {
        timeline.insertAdjacentHTML(
          "afterbegin",
          `<div class="card">
                            <div class="dateBox">
                                <div class="day">
                                    ${moodLog.day}
                                </div>
                                <div class="date">${moodLog.date}</div>
                            </div>
                            <div class="mood">${moodLog.mood}</div>
        </div>`,
        );
      } else if (choosenTimeline == "week") {
        if (countWeekDays < 7) {
          switch (moodLog.mood) {
            case "Happy":
              happy++;
              break;
            case "Excited":
              excited++;
              break;
            case "Neutral":
              neutral++;
              break;
            case "Angry":
              angry++;
              break;
            case "Sad":
              sad++;
              break;
            case "Sick":
              sick++;
              break;
          }
          countWeekDays++;
          timeline.innerHTML = `<div class="card">
                              <div class="dateBox">
                                  <div class="day">
                                      Week
                                  </div>
                                  <div class="date">${weekNumber}</div>
                              </div>
                              <div class="mood">☺️: ${happy} 😁: ${excited} 😐: ${neutral} 😤: ${angry} ☹️: ${sad} 🤒: ${sick}</div>
          </div>`;
        } else {
          countWeekDays = 0;
          weekNumber++;
          timeline.insertAdjacentHTML(
            "afterbegin",
            `<div class="card">
                              <div class="dateBox">
                                  <div class="day">
                                      Week
                                  </div>
                                  <div class="date">${weekNumber}</div>
                              </div>
                              <div class="mood">☺️: ${happy} 😁: ${excited} 😐: ${neutral} 😤: ${angry} ☹️: ${sad} 🤒: ${sick}</div>
          </div>`,
          );
        }
      } else {
        // month case
        const year = new Date().getFullYear();
        const month = new Date().getMonth() + 1;
        const numberOfMonths = daysInMonth(month, year);
        if (countMonthDays < numberOfMonths) {
          switch (moodLog.mood) {
            case "Happy":
              happy++;
              break;
            case "Excited":
              excited++;
              break;
            case "Neutral":
              neutral++;
              break;
            case "Angry":
              angry++;
              break;
            case "Sad":
              sad++;
              break;
            case "Sick":
              sick++;
              break;
          }
          countMonthDays++;
          timeline.innerHTML = `<div class="card">
                              <div class="dateBox">
                                  <div class="date">${moodLog.month}</div>
                              </div>
                              <div class="mood">☺️: ${happy} 😁: ${excited} 😐: ${neutral} 😤: ${angry} ☹️: ${sad} 🤒: ${sick}</div>
          </div>`;
        } else {
          timeline.insertAdjacentHTML(
            "beforeend",
            `<div class="card">
                              <div class="dateBox">
                                  <div class="date">${moodLog.month}</div>
                              </div>
                              <div class="mood">☺️: ${happy} 😁: ${excited} 😐: ${neutral} 😤: ${angry} ☹️: ${sad} 🤒: ${sick}</div>
          </div>`,
          );
          countMonthDays = 0;
        }
      }
    });
  }
}
displayData();
// window.addEventListener("storage", displayData);

// to check the timeline (day, week or month) clicked by the user, and send it to our display function
function timelineButtonCheck() {
  timelineButtons.forEach((timelineButton) => {
    timelineButton.addEventListener("click", () => {
      const timelineSelected = document.querySelector(
        'input[name="value-radio-timeline"]:checked',
      );
      displayData(timelineSelected.value);
    });
  });
}
timelineButtonCheck();
