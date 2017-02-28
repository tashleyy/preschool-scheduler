function displayAfterSchoolActivities() {
    $.ajax({
        url: '/afterschoolactivity/find',
        type: 'get',
        success: function(data) {
            // Add table rows here
            for (var i = 0; i < data.length; i++) {
                var asa = data[i];
                // Construct HTML string of table row
                var rowHtml = '<tr><td>' + asa.name + '</td><td>'
                    + formatASADay(asa.monday) + '</td><td>'
                    + formatASADay(asa.tuesday) + '</td><td>'
                    + formatASADay(asa.wednesday) + '</td><td>'
                    + formatASADay(asa.thursday) + '</td><td>'
                    + formatASADay(asa.friday) + '</td><td>'
                    + formatCost(asa.cost) + '</td><td>'
                    + asa.startMonth + '</td><td>'
                    + asa.endMonth + '</td><td>'
                    + '<a href="#" onclick="showAfterSchoolActivityEditModal(\'' + asa.id + '\')"><span class="glyphicon glyphicon-pencil"/></a></td><td>'
                    + '<a href="#" onclick="showAfterSchoolActivityDeleteModal(\'' + asa.id + '\')"><span class="glyphicon glyphicon-trash"/></a></td></tr>';
                // Use jQuery to add it to table body
                $('#after-school-activity-table tbody').append(rowHtml);
            }
        },
        error: function(xhr, status, error) {
            console.log('error: ' + error);
        }
    });
}

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
            
            $('#edit-after-school-activity-name').val(data.name);
            $('#edit-after-school-activity-cost').val(data.cost);
            $('input[name="edit-asa-options-monday"]').prop('checked', data.monday);
            $('input[name="edit-asa-options-tuesday"]').prop('checked', data.tuesday);
            $('input[name="edit-asa-options-wednesday"]').prop('checked', data.wednesday);
            $('input[name="edit-asa-options-thursday"]').prop('checked', data.thursday);
            $('input[name="edit-asa-options-friday"]').prop('checked', data.friday);
            
            $('#edit-after-school-activity-start-month').val(data.startMonth);
            $('#edit-after-school-activity-end-month').val(data.endMonth);
            $('#after-school-activity-edit-modal').attr('asaId', id);
            $('#after-school-activity-edit-modal').modal('show');
        },
        error: function(xhr, status, error) {
            console.log('error: ' + error);
        }
    });
    return false;
}

function showAfterSchoolActivityDeleteModal(id) {
    $('#after-school-activity-delete-modal').attr('asaId', id);
    $('#after-school-activity-delete-modal').modal('show');
    return false;
}

function editAfterSchoolActivity() {
    var id = $('#after-school-activity-edit-modal').attr('asaId');
    var name = $('#edit-after-school-activity-name').val();
    var cost = $('#edit-after-school-activity-cost').val();
    var monday =  $('input[name="edit-asa-options-monday"]').prop('checked');
    var tuesday =  $('input[name="edit-asa-options-tuesday"]').prop('checked');
    var wednesday =  $('input[name="edit-asa-options-wednesday"]').prop('checked');
    var thursday =  $('input[name="edit-asa-options-thursday"]').prop('checked');
    var friday =  $('input[name="edit-asa-options-friday"]').prop('checked');
    var startMonth = $('#edit-after-school-activity-start-month').val();
    var endMonth = $('#edit-after-school-activity-end-month').val();
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
            $('#after-school-activity-table tbody').html('');
            displayAfterSchoolActivities();
            $('#after-school-activity-edit-modal').modal('hide');            
        },
        error: function(xhr, status, error) {
            console.log('error: ' + error);
        }
    });
}

function deleteAfterSchoolActivity() {
    var id = $('#after-school-activity-delete-modal').attr('asaId');
    $.ajax({
        url: '/afterschoolactivity/destroy',
        type: 'delete',
        data: {
            id: id
        },
        success: function(data) {
            $('#after-school-activity-table tbody').html('');
            displayAfterSchoolActivities();
            $('#after-school-activity-delete-modal').modal('hide');
        },
        error: function(xhr, status, error) {
            console.log('error: ' + error);
        }
    });
}

$(document).ready(function () {
    $('#after-school-activity-edit-modal').modal({show: false});
    $('#after-school-activity-delete-modal').modal({show: false});
    displayAfterSchoolActivities();
});