function showAfterSchoolActivityEditModal(id) {
    $.ajax({
        url: '/afterschoolactivity/findone',
        type: 'get',
        data: {
            id: id
        },
        success: function(data) {
            // Reset checkboxes
            $('input[name="edit-asa-options-monday"]').prop('checked', false);
            $('input[name="edit-asa-options-tuesday"]').prop('checked', false);
            $('input[name="edit-asa-options-wednesday"]').prop('checked', false);
            $('input[name="edit-asa-options-thursday"]').prop('checked', false);
            $('input[name="edit-asa-options-friday"]').prop('checked', false);
            
            $('#edit-asa-name').val(data.name);
            $('#edit-asa-cost').val(data.cost);
            $('input[name="edit-asa-options-monday"]').prop('checked', data.monday);
            $('input[name="edit-asa-options-tuesday"]').prop('checked', data.tuesday);
            $('input[name="edit-asa-options-wednesday"]').prop('checked', data.wednesday);
            $('input[name="edit-asa-options-thursday"]').prop('checked', data.thursday);
            $('input[name="edit-asa-options-friday"]').prop('checked', data.friday);
            
            $('#edit-asa-start-month').val(data.startMonth);
            $('#edit-asa-end-month').val(data.endMonth);
            $('#asa-edit-modal').attr('asaId', id);
            $('#asa-edit-modal').modal('show');
        },
        error: function(xhr, status, error) {
            console.log('error: ' + error);
        }
    });
    return false;
}

function showAfterSchoolActivityDeleteModal(id) {
    $('#asa-delete-modal').attr('asaId', id);
    $('#asa-delete-modal').modal('show');
    return false;
}

function editAfterSchoolActivity() {
    var id = $('#asa-edit-modal').attr('asaId');
    var name = $('#edit-asa-name').val();
    var cost = $('#edit-asa-cost').val();
    var monday =  $('input[name="edit-asa-options-monday"]').prop('checked');
    var tuesday =  $('input[name="edit-asa-options-tuesday"]').prop('checked');
    var wednesday =  $('input[name="edit-asa-options-wednesday"]').prop('checked');
    var thursday =  $('input[name="edit-asa-options-thursday"]').prop('checked');
    var friday =  $('input[name="edit-asa-options-friday"]').prop('checked');
    var startMonth = $('#edit-asa-start-month').val();
    var endMonth = $('#edit-asa-end-month').val();
    $.ajax({
        url: '/afterschoolactivity/update',
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
            $('#asa-edit-modal').modal('hide');
            location.reload();
        },
        error: function(xhr, status, error) {
            console.log('error: ' + error);
        }
    });
}

function deleteAfterSchoolActivity() {
    var id = $('#asa-delete-modal').attr('asaId');
    $.ajax({
        url: '/afterschoolactivity/destroy',
        type: 'delete',
        data: {
            id: id
        },
        success: function(data) {
            $('#asa-delete-modal').modal('hide');
            location.reload();
        },
        error: function(xhr, status, error) {
            console.log('error: ' + error);
        }
    });
}

$(document).ready(function () {
    $('#asa-edit-modal').modal({show: false});
    $('#asa-delete-modal').modal({show: false});
});