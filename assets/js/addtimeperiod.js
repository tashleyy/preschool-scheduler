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

$(document).ready(() => {
  $('#add-period-asas').multiselect();
});
