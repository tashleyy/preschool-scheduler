/* global MonthAndYear */
function displayTimePeriods() {
  $.ajax({
    url: '/timeperiod/find',
    type: 'get',
    success(data) {
      const stuid = $('#student-id')[0].innerHTML;
      const today = new Date();
      const todayMAY = new MonthAndYear(today.getFullYear(), today.getMonth());
      for (let i = 0; i < data.length; i++) {
        const tp = data[i];
        if (tp.student && tp.student.id === stuid) {
          const rowHtml = `<tr><td>${tp.rateSchedule.name}</td><td>`
            + `${tp.startDate}</td><td>`
            + `${tp.endDate}</td><td>`
            + `<a href="#" onclick="showPeriodEditModal('${tp.id}')">`
            + '<span class="glyphicon glyphicon-pencil"/></a></td><td>'
            + `<a href="#" onclick="showPeriodDeleteModal('${tp.id}')">`
            + '<span class="glyphicon glyphicon-trash"/></a></td></tr>';
          const tpEnd = MonthAndYear.makeFromString(tp.endDate);
          const tpStart = MonthAndYear.makeFromString(tp.startDate);
          if (MonthAndYear.lessThan(tpEnd, todayMAY)) {
            $('#past-time-period-table tbody').append(rowHtml);
          } else if (MonthAndYear.lessThan(todayMAY, tpStart)) {
            $('#future-time-period-table tbody').append(rowHtml);
          } else {
            $('#time-period-table tbody').append(rowHtml);
          }
        }
      }
    },
    error(xhr, status, error) {
      console.log(`error: ${error}`);
    },
  });
}

// eslint-disable-next-line no-unused-vars
function showPeriodEditModal(id) {
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
      $('#edit-period-rate-schedules').val(data.rateSchedule.id);
      $('#edit-period-asas').multiselect('deselectAll', false);
      $('#edit-period-asas').multiselect('select', asas);
      $('#period-edit-modal').attr('periodId', id);
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

$(document).ready(() => {
  displayTimePeriods();
  $('#edit-period-asas').multiselect();
  $('#period-edit-modal').modal({ show: false });
  $('#period-delete-modal').modal({ show: false });
});
