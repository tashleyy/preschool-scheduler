/* global showErrorOnElement */
// eslint-disable-next-line no-unused-vars
function addTimePeriod(student, noRateSchedules) {
  const startDate = $('#add-period-start-date').val();
  const endDate = $('#add-period-end-date').val();
  const rs = $('#add-period-rate-schedules').val();
  const asas = $('#add-period-asas').val();

  if (noRateSchedules) {
    showErrorOnElement('add-period-rate-schedules');
    return;
  }

  $('#add-period-rate-schedules-message').hide();


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
      if (data === 'misordered') {
        $('#add-period-start-date-message-overlap').hide();
        showErrorOnElement('add-period-start-date',
          '#add-period-start-date-message-misordered');
        $('#add-period-end-date-message-overlap').hide();
        showErrorOnElement('add-period-end-date',
          '#add-period-end-date-message-misordered');
      } else if (data === 'overlap') {
        $('#add-period-start-date-message-misordered').hide();
        showErrorOnElement('add-period-start-date',
          '#add-period-start-date-message-overlap');
        $('#add-period-end-date-message-misordered').hide();
        showErrorOnElement('add-period-end-date',
          '#add-period-end-date-message-overlap');
      } else {
        document.location.href = `/students/${student}`;
        console.log(`data: ${data}`);
      }
    },
    error(xhr, status, error) {
      console.log(`error: ${error}`);
    },
  });
}

$(document).ready(() => {
  $('#add-period-asas').multiselect();
});
