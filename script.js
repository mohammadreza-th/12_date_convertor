// بسم الله الرحمن الرحیم

const updateDom = function (a, b) {
  return (document.getElementById(a).innerHTML = b);
};
let time = new Date();
let today = [time.getFullYear(), time.getMonth() + 1, time.getDate()];
updateDom("AD-year", today[0]);
updateDom("AD-month", today[1]);
updateDom("AD-day", today[2]);
const monthsLengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const daySum = function (year, month, day) {
  let allDays = day;
  for (let i = 0; i < month - 1; i++) {
    allDays += monthsLengths[i];
  }
  //leap year calculating
  if (year % 4 === 0 && allDays >= 60) {
    if (year % 400 === 0 || year % 100 !== 0) {
      allDays++;
    }
  }

  return allDays;
};
const dateToSolar = function (y, m, d) {
  let solarYear = y - 622;
  let solarMonth;
  let solarDay;
  let days;
  if (daySum(y, m, d) > 79) {
    days = daySum(y, m, d) - 79;
    solarYear++;
  } else {
    days = 365 - 79 + daySum(y, m, d);
  }
  if (days > 6 * 31) {
    solarMonth = 6 + Math.ceil((days - 186) / 30);
    solarDay = (days - 6 * 31) % 30;
  } else {
    solarMonth = Math.ceil(days / 31);
    solarDay = days % 31;
  }

  let solarDate = [solarYear, solarMonth, solarDay];
  return solarDate;
};
solarToday = dateToSolar(...today);
updateDom("solar-year", solarToday[0]);
updateDom("solar-month", solarToday[1]);
updateDom("solar-day", solarToday[2]);

document.getElementById("convert").addEventListener("click", () => {
  let data = {};
  data.yearType = document.querySelector(
    "input[id=solar-type]:checked, input[id=AD-type]:checked"
    ).id;
    
    data.year = document.getElementById("yaer-input").value;
    data.month = document.getElementById("month-input").value;
    data.day = document.getElementById("day-input").value;
    let convertedDate;
    if (data.yearType === "AD-type") {
      convertedDate = dateToSolar(data.year, data.month, data.day);
      console.log(data.month)
  }
  let viewInDOM = `<div class="monitor" >
  converted date is: ${convertedDate}
  </div>
  `;
  updateDom("converted", viewInDOM);
});
