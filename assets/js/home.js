/* global MonthAndYear */
function appendRemainingTable(populatedArray) {
  const months = ['September', 'October', 'November', 'December', 'January',
    'February', 'March', 'April', 'May', 'June', 'July', 'August'];

  let add = '';
  for (let i = 0; i < 12; i++) {
    add += `<tr><td>${months[i]}</td>`;
    for (let j = 0; j < 5; j++) {
      for (let k = 0; k < 3; k++) {
        const numStudents = populatedArray[i][j][k];
        if (numStudents > 12) {
          add += '<td bgcolor="#F95E76">';
        } else {
          add += '<td>';
        }
        add += populatedArray[i][j][k].toString();
        add += '</td>';
      }
    }
    add += '</tr>';
  }

  add += '</tbody>';
  $('#monthCalendar').append(add);
}

function makeSmallArray(dayString) {
  const returnArray = [0, 0];

  if (dayString === 'full') {
    returnArray[0] = 1;
    returnArray[1] = 1;
  } else if (dayString === 'am') {
    returnArray[0] = 1;
  } else if (dayString === 'pm') {
    returnArray[1] = 1;
  }
  return returnArray;
}

function populateAfterSchoolActivities(afterSchoolActivities) {
  const returnArray = [0, 0, 0, 0, 0];
  for (let i = 0; i < afterSchoolActivities.length; i++) {
    const afterSchoolActivity = afterSchoolActivities[i];
    if (afterSchoolActivity.monday) {
      returnArray[0] = 1;
    }
    if (afterSchoolActivity.tuesday) {
      returnArray[1] = 1;
    }
    if (afterSchoolActivity.wednesday) {
      returnArray[2] = 1;
    }
    if (afterSchoolActivity.thursday) {
      returnArray[3] = 1;
    }
    if (afterSchoolActivity.friday) {
      returnArray[4] = 1;
    }
  }
  return returnArray;
}

// iterates through an array of students and fills in the attendance
// numbers for the schoolyear
function populateWithSuccessfulRateSchedule(timePeriods, year) {
  // This maps a certain month to the index that it will be on our table.
  // For example, October corresponds to 10, but because this is a school
  // year calendar, we are going to put it in row 1.  That is why
  // monthToIndex[10]=1
  const monthToIndex = [3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2];

  // creates the array that will contain student attendance.  Everything
  // initialized to 0.
  const months = new Array(12);
  for (let i = 0; i < months.length; i++) {
    months[i] = new Array(5);
    for (let j = 0; j < 5; j++) {
      months[i][j] = new Array(3);
      for (let k = 0; k < 3; k++) {
        months[i][j][k] = 0;
      }
    }
  }
  // Earliest month on the calendar is September, latest is August
  const earliestApplicableDate = new MonthAndYear(year, 8);
  const latestApplicableDate = new MonthAndYear(year + 1, 7);

  // Iterates through students and adds their rate schedule to the calendar
  for (let i = 0; i < timePeriods.length; i++) {
    const timePeriod = timePeriods[i];
    const rateSchedule = timePeriod.rateSchedule;
    const afterSchoolActivities = timePeriod.afterSchoolActivities;

    const startDate = MonthAndYear.makeFromString(timePeriod.startDate);
    const endDate = MonthAndYear.makeFromString(timePeriod.endDate);

    // check to make sure rateSchedule !== undefined as in the case when a rateSchedule is deleted
    if (rateSchedule) {
      if (!(MonthAndYear.lessThan(endDate, earliestApplicableDate))
        && !MonthAndYear.lessThan(latestApplicableDate, startDate)) {
        const actualStart = MonthAndYear.getCopyOfLargest(startDate, earliestApplicableDate);
        const actualEnd = MonthAndYear.getCopyOfSmallest(latestApplicableDate, endDate);
        const currDate = actualStart;

        while (!MonthAndYear.lessThan(actualEnd, currDate)) {
          let monthArray = makeSmallArray(rateSchedule.monday);
          months[monthToIndex[currDate.month]][0][0] += monthArray[0];
          months[monthToIndex[currDate.month]][0][1] += monthArray[1];

          monthArray = makeSmallArray(rateSchedule.tuesday);
          months[monthToIndex[currDate.month]][1][0] += monthArray[0];
          months[monthToIndex[currDate.month]][1][1] += monthArray[1];

          monthArray = makeSmallArray(rateSchedule.wednesday);
          months[monthToIndex[currDate.month]][2][0] += monthArray[0];
          months[monthToIndex[currDate.month]][2][1] += monthArray[1];

          monthArray = makeSmallArray(rateSchedule.thursday);
          months[monthToIndex[currDate.month]][3][0] += monthArray[0];
          months[monthToIndex[currDate.month]][3][1] += monthArray[1];

          monthArray = makeSmallArray(rateSchedule.friday);
          months[monthToIndex[currDate.month]][4][0] += monthArray[0];
          months[monthToIndex[currDate.month]][4][1] += monthArray[1];

          const asaArray = populateAfterSchoolActivities(afterSchoolActivities);
          for (let j = 0; j < 5; j++) {
            months[monthToIndex[currDate.month]][j][2] += asaArray[j];
          }

          currDate.incrementMonth();
        }
      }
    }
  }
  return months;
}

// makes a get request for all students in the calendar
function populateArrayForYear(year) {
  $.ajax({
    url: '/timeperiod/find',
    type: 'get',
    success(data) {
      const returnArray = populateWithSuccessfulRateSchedule(data, year);
      appendRemainingTable(returnArray);
    },
    error(xhr, status, error) {
      console.log(`error: ${error}`);
    },
  });
}

// builds titles on the calendar
function buildCalendarHeader() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  let add = '<thead>';

  add += '<tr>';
  add += '<th>Month</th>';

  for (let i = 0; i < days.length; i++) {
    add += '<th colspan="3">';
    add += days[i];
    add += '</th>';
  }

  add += '</tr>';
  add += '</thead>';

  $('#monthCalendar').append(add);
}

function displayStudentsOnCalendar(year) {
  buildCalendarHeader(); // adds static titles to the calendar
  let add = '<tbody align="left">';

  // adds AM/PM to the top of each column
  add += '<tr>';
  add += '<td></td>';
  for (let i = 0; i < 5; i++) {
    add += '<th>AM</th>';
    add += '<th>PM</th>';
    add += '<th>Eve</th>';
  }
  add += '</tr>';

  $('#monthCalendar').append(add);

  // fills in the numbers for the calendar school year
  populateArrayForYear(year);
}

function getCorrectYear() {
  const today = new Date();
  let year = today.getFullYear();
  const month = today.getMonth();

  if (month < 8) {
    let yearInt = parseInt(year, 10);
    yearInt--;
    year = yearInt.toString();
  }

  return year;
}

function getParameterByName(pName, pUrl) {
  let url = pUrl;
  const name = pName.replace(/[\[\]]/g, '\\$&');
  if (!pUrl) {
    url = window.location.href;
  }
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function setUpHomePage() {
  let year = getParameterByName('year'); // looks in URL to get correct year
  // If there is no argument in the url, it gets the current year
  if (year == null) {
    year = getCorrectYear();
  }
  const yearInt = parseInt(year, 10);
  const yearNext = yearInt + 1;
  const yearPrev = yearInt - 1;
  const yearTwoNext = yearNext + 1;

  // creates page header with appropriate years
  $('#yearHeader').append(`${year}/${yearNext.toString()}`);

  // creates navigation buttons at the bottom of the window
  $('#previousYearButton').append(
        `<a href="?year=${
         yearPrev.toString()}">`
        + `<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>${
         yearPrev.toString()}/${year
         }</a>`);

  $('#nextYearButton').append(
        `<a href="?year=${
         yearNext}">${yearNext.toString()
         }/${yearTwoNext.toString()
        }<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>`
        + '</a>');

  // goes through database and fills in calendar
  displayStudentsOnCalendar(yearInt);
}

$(document).ready(setUpHomePage);
