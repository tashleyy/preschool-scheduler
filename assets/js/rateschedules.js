function showRateScheduleEditModal(id) {
    $.ajax({
        url: '/rateschedule/findone',
        type: 'get',
        data: {
            id: id
        },
        success: function(data) {
            // Reset radio buttons
            $('input[name="edit-rs-options-monday"]').filter('[value=none]').prop('checked', true);
            $('input[name="edit-rs-options-tuesday"]').filter('[value=none]').prop('checked', true);
            $('input[name="edit-rs-options-wednesday"]').filter('[value=none]').prop('checked', true);
            $('input[name="edit-rs-options-thursday"]').filter('[value=none]').prop('checked', true);
            $('input[name="edit-rs-options-friday"]').filter('[value=none]').prop('checked', true);

            $('#edit-rs-name').val(data.name);
            $('#edit-rs-cost').val(data.cost);
            $('input[name="edit-rs-options-monday"]').filter('[value=' + data.monday + ']').prop('checked', true);
            $('input[name="edit-rs-options-tuesday"]').filter('[value=' + data.tuesday + ']').prop('checked', true);
            $('input[name="edit-rs-options-wednesday"]').filter('[value=' + data.wednesday + ']').prop('checked', true);
            $('input[name="edit-rs-options-thursday"]').filter('[value=' + data.thursday + ']').prop('checked', true);
            $('input[name="edit-rs-options-friday"]').filter('[value=' + data.friday + ']').prop('checked', true);
            $('#edit-rs-start-month').val(data.startMonth);
            $('#edit-rs-end-month').val(data.endMonth);
            $('#rs-edit-modal').attr('rsId', id);
            $('#rs-edit-modal').modal('show');
        },
        error: function(xhr, status, error) {
            console.log('error: ' + error);
        }
    });
    return false;
}

function showRateScheduleDeleteModal(id) {
    $('#rs-delete-modal').attr('rsId', id);
    $('#rs-delete-modal').modal('show');
    return false;
}

function editRateSchedule() {
    var id = $('#rs-edit-modal').attr('rsId');
    var name = $('#edit-rs-name').val();
    var cost = $('#edit-rs-cost').val();
    var monday =  $('input[name="edit-rs-options-monday"]:checked').val();
    var tuesday =  $('input[name="edit-rs-options-tuesday"]:checked').val();
    var wednesday =  $('input[name="edit-rs-options-wednesday"]:checked').val();
    var thursday =  $('input[name="edit-rs-options-thursday"]:checked').val();
    var friday =  $('input[name="edit-rs-options-friday"]:checked').val();
    var startMonth = $('#edit-rs-start-month').val();
    var endMonth = $('#edit-rs-end-month').val();
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
            $('#rs-edit-modal').modal('hide');
            location.reload();
        },
        error: function(xhr, status, error) {
            console.log('error: ' + error);
        }
    });
}

function deleteRateSchedule() {
    var id = $('#rs-delete-modal').attr('rsId');
    $.ajax({
        url: '/rateschedule/destroy',
        type: 'delete',
        data: {
            id: id
        },
        success: function(data) {
            $('#rs-delete-modal').modal('hide');
            location.reload();
        },
        error: function(xhr, status, error) {
            console.log('error: ' + error);
        }
    });
}

$(document).ready(function() {
    $('#rs-edit-modal').modal({show: false});
    $('#rs-delete-modal').modal({show: false});
});