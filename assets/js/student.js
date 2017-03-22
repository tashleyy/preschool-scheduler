function displayTimePeriods() {
    $.ajax({
        url: '/timeperiod/find',
        type: 'get',
        success: function(data) {
            var stuid = $('#student-id')[0].innerHTML;
            var today = new Date();
            var todayMAY = new MonthAndYear(today.getFullYear(), today.getMonth());
            for (var i = 0; i < data.length; i++) {
                var tp = data[i];
                if (tp.student && tp.student.id === stuid) {
                    var rowHtml = '<tr><td>' + tp.rateSchedule.name + '</td><td>'
                        + tp.startDate + '</td><td>'
                        + tp.endDate + '</td><td>'
                        + '<a href="#" onclick="showPeriodEditModal(\'' + tp.id + '\')">'
						+ '<span class="glyphicon glyphicon-pencil"/></a></td><td>'
                        + '<a href="#" onclick="showPeriodDeleteModal(\'' + tp.id + '\')">'
						+ '<span class="glyphicon glyphicon-trash"/></a></td></tr>';
                    var tp_end = MonthAndYear.makeFromString(tp.endDate);
                    var tp_start = MonthAndYear.makeFromString(tp.startDate);
                    if (MonthAndYear.lessThan(tp_end, todayMAY)) {
                        $('#past-time-period-table tbody').append(rowHtml);
                    } else if (MonthAndYear.lessThan(todayMAY, tp_start)) {
                        $('#future-time-period-table tbody').append(rowHtml);
                    } else {
                        $('#time-period-table tbody').append(rowHtml);
                    }
                }
            }
        },
        error: function(xhr, status, error) {
            console.log('error: ' + error);
        }
    });
}

function showPeriodEditModal(id) {
    $.ajax({
        url: '/timeperiod/findone',
        type: 'get',
        data: {
            id: id
        },
        success: function(data) {
            var asas = [];
            for (var i = 0; i < data.afterSchoolActivities.length; i++) {
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
        error: function(xhr, status, error) {
            console.log('error: ' + error);
        }
    });
    return false;
}

function showPeriodDeleteModal(id) {
    $('#period-delete-modal').attr('periodId', id);
    $('#period-delete-modal').modal('show');
    return false;
}

function editTimePeriod() {
    var id = $('#period-edit-modal').attr('periodId');
    var startDate = $('#edit-period-start-date').val();
    var endDate = $('#edit-period-end-date').val();
    var rs = $('#edit-period-rate-schedules').val();
    var asas = $('#edit-period-asas').val();
    $.ajax({
        url: '/timeperiod/update',
        type: 'put',
        data: {
            id: id,
            startDate: startDate,
            endDate: endDate,
            rateSchedule: rs,
            afterSchoolActivities: asas
        },
        success: function(data) {
            $('#period-edit-modal').modal('hide');
            location.reload();
        },
        error: function(xhr, status, error) {
            console.log('error: ' + error);
        }
    });
}

function deleteTimePeriod() {
    var id = $('#period-delete-modal').attr('periodId');
    $.ajax({
        url: '/timeperiod/destroy',
        type: 'delete',
        data: {
            id: id
        },
        success: function(data) {
            $('#period-delete-modal').modal('hide');
            location.reload();
        },
        error: function(xhr, status, error) {
            console.log('error: ' + error);
        }
    });
}

$(document).ready(function() {
    displayTimePeriods();
    $('#edit-period-asas').multiselect();
    $('#period-edit-modal').modal({show: false});
    $('#period-delete-modal').modal({show: false});
});
