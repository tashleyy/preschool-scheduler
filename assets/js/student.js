// eslint-disable-next-line no-unused-vars
function showPeriodEditModal(id, noRateSchedules) {
  $.ajax({
    url: '/timeperiod/findone',
    type: 'get',
    data: {
      id,
    },
    success(data) {
      const asas = [];
      for (let i = 0; i < data.afterSchoolActivities.length; i++) {
        asas.push(data.afterSchoolActivities[i].id);
      }
      $('#edit-period-start-date').val(data.startDate);
      $('#edit-period-end-date').val(data.endDate);
      if (data.rateSchedule !== undefined) {
        $('#edit-period-rate-schedules').val(data.rateSchedule.id);
      }
      $('#edit-period-asas').multiselect('deselectAll', false);
      $('#edit-period-asas').multiselect('select', asas);
      $('#period-edit-modal').attr('periodId', id);

      if (noRateSchedules) {
        console.log('Want to disable button...');
        $('#edit-period-submit').prop('disabled', true);
      }

      $('#period-edit-modal').modal('show');
    },
    error(xhr, status, error) {
      console.log(`error: ${error}`);
    },
  });
  return false;
}

// eslint-disable-next-line no-unused-vars
function showPeriodDeleteModal(id) {
  $('#period-delete-modal').attr('periodId', id);
  $('#period-delete-modal').modal('show');
  return false;
}

// eslint-disable-next-line no-unused-vars
function editTimePeriod() {
  const id = $('#period-edit-modal').attr('periodId');
  const startDate = $('#edit-period-start-date').val();
  const endDate = $('#edit-period-end-date').val();
  const rs = $('#edit-period-rate-schedules').val();
  const asas = $('#edit-period-asas').val();
  $.ajax({
    url: '/timeperiod/update',
    type: 'put',
    data: {
      id,
      startDate,
      endDate,
      rateSchedule: rs,
      afterSchoolActivities: asas,
    },
    success() {
      $('#period-edit-modal').modal('hide');
      location.reload();
    },
    error(xhr, status, error) {
      console.log(`error: ${error}`);
    },
  });
}

// eslint-disable-next-line no-unused-vars
function deleteTimePeriod() {
  const id = $('#period-delete-modal').attr('periodId');
  $.ajax({
    url: '/timeperiod/destroy',
    type: 'delete',
    data: {
      id,
    },
    success() {
      $('#period-delete-modal').modal('hide');
      location.reload();
    },
    error(xhr, status, error) {
      console.log(`error: ${error}`);
    },
  });
}

// eslint-disable-next-line no-unused-vars
function toggleExpandButton(buttonName) {
  $(`#${buttonName}-plus-picture`).toggle();
  $(`#${buttonName}-minus-picture`).toggle();
}

$(document).ready(() => {
  $('#edit-period-asas').multiselect();
  $('#period-edit-modal').modal({ show: false });
  $('#period-delete-modal').modal({ show: false });
});
