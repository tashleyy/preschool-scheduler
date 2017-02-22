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
                    + formatCost(asa.cost) + '</td><td>'
                    + '<a href="#" onclick="showAfterSchoolActivityEditModal(\'' + asa.id + '\')"><span class="glyphicon glyphicon-pencil"/></a></td><td>'
                    + '<a href="#" onclick="showAfterSchoolActivityDeleteModal(\'' + asa.id + '\')"><span class="glyphicon glyphicon-trash"/></a></td></tr>';
                // Use jQuery to add it to table body
                $('#afterschool-activity-table tbody').append(rowHtml);
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
            // Reset radio buttons
            
            $('#edit-afterschool-activity-name').val(data.name);
            $('#edit-afterschool-activity-cost').val(data.cost);
            $('#afterschool-activity-edit-modal').attr('asaId', id);
            $('#afterschool-activity-edit-modal').modal('show');
        },
        error: function(xhr, status, error) {
            console.log('error: ' + error);
        }
    });
    return false;
}

function showAfterSchoolActivityDeleteModal(id) {
    $('#afterschool-activity-delete-modal').attr('asaId', id);
    $('#afterschool-activity-delete-modal').modal('show');
    return false;
}

function editAfterSchoolActivity() {
    var id = $('#afterschool-activity-edit-modal').attr('asaId');
    var name = $('#edit-afterschool-activity-name').val();
    var cost = $('#edit-afterschool-activity-cost').val();
    $.ajax({
        url: '/afterschoolactivity/update',
        type: 'put',
        data: {
            id: id,
            name: name,
            cost: cost,
            
        },
        success: function(data) {
            $('#afterschool-activity-table tbody').html('');
            displayAfterSchoolActivities();
            $('#afterschool-activity-edit-modal').modal('hide');            
        },
        error: function(xhr, status, error) {
            console.log('error: ' + error);
        }
    });
}

function deleteAfterSchoolActivity() {
    var id = $('#afterschool-activity-delete-modal').attr('asaId');
    $.ajax({
        url: '/afterschoolactivity/destroy',
        type: 'delete',
        data: {
            id: id
        },
        success: function(data) {
            $('#afterschool-activity-table tbody').html('');
            displayAfterSchoolActivities();
            $('#afterschool-activity-delete-modal').modal('hide');
        },
        error: function(xhr, status, error) {
            console.log('error: ' + error);
        }
    });
}

$('#afterschool-activity-edit-modal').modal({show: false});
$('#afterschool-activity-delete-modal').modal({show: false});
$(document).ready(displayAfterSchoolActivities);