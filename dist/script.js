/* CALENDAR */
//Calendar render
const currDate = document.querySelector(".current-date");
const dayTag = document.querySelector(".days");
const prevNextIcon = document.querySelectorAll(".chevron");

const toggleCalendar = document.getElementById("toggleCalendar");
const calendarCont = document.getElementById("calendarCont");

//Hide or show Calendar
toggleCalendar.addEventListener("click", () => {
  calendarCont.classList.toggle("hidden");
});

let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth(),
  currDay = date.getDay();

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const calendar = (currMonth, currYear) => {
  let firstDayMonth = new Date(currYear, currMonth, 1).getDay();
  let lastDateMonth = new Date(currYear, currMonth, 0).getDate();
  let lastDayMonth = new Date(currYear, currMonth, lastDateMonth).getDay();
  let lastDateLastMonth = new Date(currYear, currMonth, 0).getDate();
  let li = "";

  for (let i = firstDayMonth; i > 0; i--) {
    li += `<li class="day inactive">${lastDateLastMonth - i + 1}</li>`;
  }

  for (let i = 1; i <= lastDateMonth; i++) {
    li += `<li class="day">${i}</li>`;
  }

  for (let i = lastDayMonth; i < 6; i++) {
    li += `<li class="day inactive">${i - lastDayMonth + 1}</li>`;
  }

  currDate.innerText = `${months[currMonth]} ${currYear}`;
  dayTag.innerHTML = li;

  return { currMonth, currYear };
};

calendar(currMonth, currYear);

//Clicking of specific day
const dayElement = document.querySelector(".days");
let chosenDay = "";

dayElement.addEventListener("click", (e) => {
  if (e.target.classList.contains("day")) {
    const days = document.querySelectorAll(".day");

    days.forEach((day) => {
        day.classList.remove("active");
      });
    e.target.classList.add("active");
    if (e.target.classList.contains("active")) {
      const dayValue = parseInt(e.target.textContent);

      chosenDay = dayValue;
    }
  }
  displayDate(currMonth, currYear, chosenDay);
});

//Clicking of previous and next chevron or icon
var days = document.querySelectorAll(".day");

const today = new Date();

prevNextIcon.forEach((icon) => {
  icon.addEventListener("click", () => {
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
    if (currMonth < 0 || currMonth > 11) {
      currYear = icon.id === "prev" ? currYear - 1 : currYear + 1;
      currMonth = (currMonth + 12) % 12;
    }

    calendar(currMonth, currYear);
    days.forEach((day) => {        
      const dayNumber = parseInt(day.textContent, 8);
      if (
        dayNumber !== today.getDate() &&
        chosenDay !== "" &&
        dayNumber === selectedDay &&
        currMonth === selectedMonth &&
        currYear === selectedYear
      ) {
        console.log(
          "This should be set to active, but unfortunately it doesnt"
        );
        console.log("Selected Day was", selectedDay);
        console.log("On Month", months[selectedMonth]);
        day.classList.add("active");
        
      }
    });
  });
});

/* TIME */
//Time render
const timeListTag = document.querySelector(".timeList");

const displayTimeInterval = () => {
  let currentDate = new Date();
  currentDate.setHours(9, 0, 0, 0);
  let timeString = "";

  while (
    currentDate.getHours() < 17 ||
    (currentDate.getHours() === 17 && currentDate.getMinutes() === 0)
  ) {
    let minutes = ("0" + currentDate.getMinutes()).slice(-2);
    let ampm = currentDate.getHours() < 12 ? "AM" : "PM";

    let hoursFormat = currentDate.getHours();
    if (hoursFormat === 0) hoursFormat = 12;
    else if (hoursFormat > 12) hoursFormat -= 12;
    let hours = ("0" + hoursFormat).slice(-2);

    timeString += `<li class="time">${hours}:${minutes} ${ampm}</li>`;

    currentDate.setMinutes(currentDate.getMinutes() + 30);
  }

  timeListTag.innerHTML = timeString;
};

displayTimeInterval();

//Hide or show Time
const toggleTime = document.getElementById("toggleTime");
const timeCont = document.getElementById("timeCont");

toggleTime.addEventListener("click", () => {
  timeCont.classList.toggle("hidden");
});
document.addEventListener("click", function (e) {
  if (!toggleTime.contains(e.target)) {
    timeCont.classList.add("hidden");
  }
});

//Clicking of specific time
const time = document.querySelectorAll(".time");
const chosenTimeTag = document.getElementById("chosenTime");
let clickedTime = "";

time.forEach((time) => {
  time.addEventListener("click", (e) => {
    clickedTime = e.target.textContent;

    displayDate(currMonth, currYear, chosenDay);

    chosenTimeTag.innerHTML = clickedTime;
  });
});

/* TIME ZONE */
//Time Zone render
const timeZoneListTag = document.querySelector(".timeZoneList");
const timezoneArr = ["EST", "UST"];

const displayTimeZone = () => {
  let timeZoneString = "";
  for (let i = 0; i < timezoneArr.length; i++) {
    timeZoneString += `<li class="timezone">${timezoneArr[i]}</li>`;
  }
  timeZoneListTag.innerHTML = timeZoneString;
};

displayTimeZone();

//Hide or show Time Zone
const toggleTimeZone = document.getElementById("toggleTimeZone");
const timeZoneCont = document.getElementById("timeZoneCont");

toggleTimeZone.addEventListener("click", () => {
  timeZoneCont.classList.toggle("hidden");
});
document.addEventListener("click", function (e) {
  if (!toggleTimeZone.contains(e.target)) {
    timeZoneCont.classList.add("hidden");
  }
});

//Clicking of specific timezone
const timezone = document.querySelectorAll(".timezone");
const chosenTimeZoneTag = document.getElementById("chosenTimeZone");
let clickedTimeZone = "";

timezone.forEach((timezone) => {
  timezone.addEventListener("click", (e) => {
    clickedTimeZone = e.target.textContent;

    displayDate(currMonth, currYear, chosenDay);

    chosenTimeZoneTag.innerHTML = clickedTimeZone;
  });
});

/* CHOSEN DATE */
//Overall Data of chosen date, time, timezone
const chosenDefaultTime = document.getElementById("chosenTime");
const defaultTime = chosenDefaultTime.textContent.trim();
const chosenDefaultTimeZone = document.getElementById("chosenTimeZone");
const defaultTimeZone = chosenDefaultTimeZone.textContent.trim();
const dispDate = document.getElementById("renderDate");

days.forEach((day) => {
  if (day.classList.contains("active")) {
    const dayValue = parseInt(day.textContent);

    chosenDay = dayValue;
  }
  if (parseInt(day.textContent) === today.getDate() && chosenDay === "") {
    day.classList.add("active");
  }
});

let renderDate = "";
let selectedMonth = "";
let selectedDay = "";
let selectedYear = "";

const displayDate = (currMonth, currYear, chosenDay) => {
  if (!calendarCont.classList.contains("hidden")) {
    selectedDay = chosenDay;
    selectedMonth = currMonth;
    selectedYear = currYear;
    customDay = `${chosenDay < 10 ? "0" + chosenDay : chosenDay}`
    let currentDay = today.getDate();

    renderDate = `${customDay < 1 ? '0' + currentDay : customDay}/${
      currMonth + 1 < 10 ? "0" + (currMonth + 1) : currMonth + 1
    }/${currYear} ${clickedTime !== "" ? clickedTime : defaultTime} ${
      clickedTimeZone !== ""
        ? "(" + clickedTimeZone + ")"
        : "(" + defaultTimeZone + ")"
    }`;

    dispDate.innerHTML = renderDate;
  }
};

displayDate(currMonth, currYear, chosenDay);
