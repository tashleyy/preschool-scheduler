function displayRateSchedules() {
    $.ajax({
        url: '/rateschedule/find',
        type: 'get',
        success: function(data) {
            // Add table rows here
            for (var i = 0; i < data.length; i++) {
                var rs = data[i];
                // Construct HTML string of table row
                var rowHtml = '<tr><td>' + rs.name + '</td><td>'
                    + formatDay(rs.monday) + '</td><td>'
                    + formatDay(rs.tuesday) + '</td><td>'
                    + formatDay(rs.wednesday) + '</td><td>'
                    + formatDay(rs.thursday) + '</td><td>'
                    + formatDay(rs.friday) + '</td><td>'
                    + formatCost(rs.cost) + '</td><td>'
                    + rs.startMonth + '</td><td>'
                    + rs.endMonth + '</td><td>'
                    + '<a href="#" onclick="showRateScheduleEditModal(\'' + rs.id + '\')"><span class="glyphicon glyphicon-pencil"/></a></td><td>'
                    + '<a href="#" onclick="showRateScheduleDeleteModal(\'' + rs.id + '\')"><span class="glyphicon glyphicon-trash"/></a></td></tr>';
                // Use jQuery to add it to table body
                $('#rate-schedule-table tbody').append(rowHtml);
            }
        },
        error: function(xhr, status, error) {
            console.log('error: ' + error);
        }
    });
}

function showRateScheduleEditModal(id) {
    $.ajax({
        url: '/rateschedule/findone',
        type: 'get',
        data: {
            id: id
        },
        success: function(data) {
            // Reset radio buttons
            $('input[name="edit-options-monday"]').filter('[value=none]').prop('checked', true);
            $('input[name="edit-options-tuesday"]').filter('[value=none]').prop('checked', true);
            $('input[name="edit-options-wednesday"]').filter('[value=none]').prop('checked', true);
            $('input[name="edit-options-thursday"]').filter('[value=none]').prop('checked', true);
            $('input[name="edit-options-friday"]').filter('[value=none]').prop('checked', true);

            $('#edit-rate-schedule-name').val(data.name);
            $('#edit-rate-schedule-cost').val(data.cost);
            $('input[name="edit-options-monday"]').filter('[value=' + data.monday + ']').prop('checked', true);
            $('input[name="edit-options-tuesday"]').filter('[value=' + data.tuesday + ']').prop('checked', true);
            $('input[name="edit-options-wednesday"]').filter('[value=' + data.wednesday + ']').prop('checked', true);
            $('input[name="edit-options-thursday"]').filter('[value=' + data.thursday + ']').prop('checked', true);
            $('input[name="edit-options-friday"]').filter('[value=' + data.friday + ']').prop('checked', true);
            $('#edit-rate-schedule-start-month').val(data.startMonth);
            $('#edit-rate-schedule-end-month').val(data.endMonth);
            $('#rate-schedule-edit-modal').attr('rsId', id);
            $('#rate-schedule-edit-modal').modal('show');
        },
        error: function(xhr, status, error) {
            console.log('error: ' + error);
        }
    });
    return false;
}

function showRateScheduleDeleteModal(id) {
    $('#rate-schedule-delete-modal').attr('rsId', id);
    $('#rate-schedule-delete-modal').modal('show');
    return false;
}

function editRateSchedule() {
    var id = $('#rate-schedule-edit-modal').attr('rsId');
    var name = $('#edit-rate-schedule-name').val();
    var cost = $('#edit-rate-schedule-cost').val();
    var monday =  $('input[name="edit-options-monday"]:checked').val();
    var tuesday =  $('input[name="edit-options-tuesday"]:checked').val();
    var wednesday =  $('input[name="edit-options-wednesday"]:checked').val();
    var thursday =  $('input[name="edit-options-thursday"]:checked').val();
    var friday =  $('input[name="edit-options-friday"]:checked').val();
    var startMonth = $('#edit-rate-schedule-start-month').val();
    var endMonth = $('#edit-rate-schedule-end-month').val();
    $.ajax({
        url: '/rateschedule/update',
        type: 'put',
        data: {
            id: id,
            name: name,
            cost: cost,
            monday: monday,
            tuesday: tuesday,
            wednesday: wednesday,
            thursday: thursday,
            friday: friday,
            startMonth: startMonth,
            endMonth: endMonth
        },
        success: function(data) {
            $('#rate-schedule-table tbody').html('');
            displayRateSchedules();
            $('#rate-schedule-edit-modal').modal('hide');            
        },
        error: function(xhr, status, error) {
            console.log('error: ' + error);
        }
    });
}

function deleteRateSchedule() {
    var id = $('#rate-schedule-delete-modal').attr('rsId');
    $.ajax({
        url: '/rateschedule/destroy',
        type: 'delete',
        data: {
            id: id
        },
        success: function(data) {
            $('#rate-schedule-table tbody').html('');
            displayRateSchedules();
            $('#rate-schedule-delete-modal').modal('hide');
        },
        error: function(xhr, status, error) {
            console.log('error: ' + error);
        }
    });
}

$('#rate-schedule-edit-modal').modal({show: false});
$('#rate-schedule-delete-modal').modal({show: false});
$(document).ready(displayRateSchedules);