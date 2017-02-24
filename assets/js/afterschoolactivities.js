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
                    + formatDay(asa.monday) + '</td><td>'
                    + formatDay(asa.tuesday) + '</td><td>'
                    + formatDay(asa.wednesday) + '</td><td>'
                    + formatDay(asa.thursday) + '</td><td>'
                    + formatDay(asa.friday) + '</td><td>'
                    + formatCost(asa.cost) + '</td><td>'
                    + asa.startMonth + '</td><td>'
                    + asa.endMonth + '</td><td>'
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
            $('input[name="edit-options-monday"]').filter('[value=none]').prop('checked', true);
            $('input[name="edit-options-tuesday"]').filter('[value=none]').prop('checked', true);
            $('input[name="edit-options-wednesday"]').filter('[value=none]').prop('checked', true);
            $('input[name="edit-options-thursday"]').filter('[value=none]').prop('checked', true);
            $('input[name="edit-options-friday"]').filter('[value=none]').prop('checked', true);

            $('#edit-afterschool-activity-name').val(data.name);
            $('#edit-afterschool-activity-cost').val(data.cost);
            $('input[name="edit-options-monday"]').filter('[value=' + data.monday + ']').prop('checked', true);
            $('input[name="edit-options-tuesday"]').filter('[value=' + data.tuesday + ']').prop('checked', true);
            $('input[name="edit-options-wednesday"]').filter('[value=' + data.wednesday + ']').prop('checked', true);
            $('input[name="edit-options-thursday"]').filter('[value=' + data.thursday + ']').prop('checked', true);
            $('input[name="edit-options-friday"]').filter('[value=' + data.friday + ']').prop('checked', true);
            
            $('#edit-afterschool-activity-start-month').val(data.startMonth);
            $('#edit-afterschool-activity-end-month').val(data.endMonth);
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
    var monday =  $('input[name="edit-options-monday"]:checked').val();
    var tuesday =  $('input[name="edit-options-tuesday"]:checked').val();
    var wednesday =  $('input[name="edit-options-wednesday"]:checked').val();
    var thursday =  $('input[name="edit-options-thursday"]:checked').val();
    var friday =  $('input[name="edit-options-friday"]:checked').val();
    var startMonth = $('#edit-afterschool-activity-start-month').val();
    var endMonth = $('#edit-afterschool-activity-end-month').val();
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