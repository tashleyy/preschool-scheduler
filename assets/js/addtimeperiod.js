// eslint-disable-next-line no-unused-vars
function addTimePeriod(student) {
  const startDate = $('#add-period-start-date').val();
  const endDate = $('#add-period-end-date').val();
  const rs = $('#add-period-rate-schedules').val();
  const asas = $('#add-period-asas').val();

  $.ajax({
    url: '/timeperiod/create',
    type: 'post',
    data: {
      startDate,
      endDate,
      rateSchedule: rs,
      afterSchoolActivities: asas,
      student,
    },
    success(data) {
      document.location.href = `/students/${student}`;
      console.log(`data: ${data}`);
    },
    error(xhr, status, error) {
      console.log(`error: ${error}`);
    },
  });
}

function validateTPForm(id) {
  let submitForm = true;
  const startMonthString = $('#add-period-start-date').val();
  const endMonthString = $('#add-period-end-date').val();
  const startMonth = MonthAndYear.makeFromString(startMonthString);
  const endMonth = MonthAndYear.makeFromString(endMonthString);

  var monthsOk = true;
  if (MonthAndYear.lessThan(endMonth, startMonth)) {
    showErrorOnElement('add-period-start-date', 'Start date must be before end date.');
    showErrorOnElement('add-period-end-date', 'End date must be before start date');
    submitForm = false;
    monthsOk = false;
  } 

  $.ajax({
    url: '/student/findone',
    type: 'get',
    data: {
      id,
    },
    success(data) {
      var student = data;
     
    },
    error(xhr, status, error) {
      console.log(`error: ${error}`);
    },
  });
  
  var noOverlap = true;
  if ((student != null) && (student.timePeriods != null))
  {
    var newPeriodStartDate = new Date(startMonthString);
    var newPeriodEndDate = new Date(endMonthString);
    for (var i = 0; i < student.timePeriods.length; i++)
    {
      console.log("I'm on iteration" + i.toString());
      var timePeriod = student.timePeriods[i];
      var oldPeriodStartDate = new Date(timePeriod.startDate);
      var oldPeriodEndDate = new Date(timePeriod.endDate);
      var endsBefore = (oldPeriodEndDate < newPeriodStartDate);
      var beginsAfter = (oldPeriodStartDate > newPeriodEndDate);
      noOverlap = noOverlap && (endsBefore || beginsAfter);
    }
  }

  if (!noOverlap)
  {
    monthsOk = false;
    submitForm = false;
    showErrorOnElement('add-period-start-date', 
      'This time period overlaps with a period this student is already signed up for.');
    showErrorOnElement('add-period-end-date', 
      'This time period overlaps with a period this student is already signed up for.');
  }

  if (monthsOk)
  {
    removeErrorFromElement('add-rs-start-month');
    removeErrorFromElement('add-rs-end-month');
  }

  //return submitForm;
  return false;
}

$(document).ready(() => {
  $('#add-period-asas').multiselect();
});
