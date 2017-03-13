function displayStudents() {
    $.ajax({
        url: '/student/find',
        type: 'get',
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                var student = data[i];
                // Construct HTML string of table row
                var rowHtml = '<tr><td><a href="/students/' + student.id + '">' + student.name + '</a></td><td>'
                    + student.parentPhone1 + '</td><td>';
                if (student.timePeriods && student.timePeriods.length > 0) {
                    //rowHtml += getCurrentTimePeriodString(student.timePeriods) + '</td><td>';
                } else {
                    rowHtml += '</td><td>';
                }
                rowHtml += '<a href="#" onclick="showStudentEditModal(\'' + student.id + '\')"><span class="glyphicon glyphicon-pencil"></span></a></td><td>'
                    + '<a href="#" onclick="showStudentDeleteModal(\'' + student.id + '\')"><span class="glyphicon glyphicon-trash"></span></a></td></tr>';
                // Use jQuery to add it to table body
                $('#students-table tbody').append(rowHtml);
            }
        },
        error: function(xhr, status, error) {
            console.log('error: ' + error);
        }
    });
}

function showStudentEditModal(id) {
    $.ajax({
        url: '/student/findone',
        type: 'get',
        data: {
            id: id
        },
        success: function(data) {
            var rs = [];
            var asa = [];
            if(data.rateSchedules)
            {
                for (var i = 0; i < data.rateSchedules.length; i++) {
                    rs.push(data.rateSchedules[i].id);
                }
            }
            if(data.afterSchoolActivities)
            {
                for (var i = 0; i < data.afterSchoolActivities.length; i++) {
                    asa.push(data.afterSchoolActivities[i].id);
                }
            }
            $('#edit-student-name').val(data.name);
            $('#edit-student-birthday').val(data.birthday);
            $('#edit-student-parent-1').val(data.parent1);
            $('#edit-student-parent-2').val(data.parent2);
            $('#edit-student-parent-phone-1').val(data.parentPhone1);
            $('#edit-student-parent-phone-2').val(data.parentPhone2);
            $('#edit-student-physician').val(data.physician);
            $('#edit-student-physician-phone').val(data.physicianPhone);
            $('#edit-student-rate-schedules').multiselect('deselectAll', false);
            $('#edit-student-after-school-activities').multiselect('deselectAll', false);
            $('#edit-student-rate-schedules').multiselect('select', rs);
            $('#edit-student-after-school-activities').multiselect('select', asa);
            $('#edit-student-start-date').val(data.startDate);
            $('#edit-student-end-date').val(data.endDate);

            $('#student-edit-modal').attr('studentId', id);
            $('#student-edit-modal').modal('show');
        },
        error: function(xhr, status, error) {
            console.log('error: ' + error);
        }
    })
}

function showStudentDeleteModal(id) {
    $('#student-delete-modal').attr('studentId', id);
    $('#student-delete-modal').modal('show');
    return false;
}

function editStudent() {
    var id = $('#student-edit-modal').attr('studentId');
    var name = $('#edit-student-name').val();
    var birthday = $('#edit-student-birthday').val();
    var parent1 = $('#edit-student-parent-1').val();
    var parent2 = $('#edit-student-parent-2').val();
    var parentPhone1 = $('#edit-student-parent-phone-1').val();
    var parentPhone2 = $('#edit-student-parent-phone-2').val();
    var physician = $('#edit-student-physician').val();
    var physicianPhone = $('#edit-student-physician-phone').val();
    var startDate = $('#edit-student-start-date').val();
    var endDate = $('#edit-student-end-date').val();
    $.ajax({
        url: '/student/update',
        type: 'put',
        data: {
            id: id,
            name: name,
            birthday: birthday,
            parent1: parent1,
            parent2: parent2,
            parentPhone1: parentPhone1,
            parentPhone2: parentPhone2,
            physician: physician,
            physicianPhone: physicianPhone,
            startDate: startDate,
            endDate: endDate
        },
        success: function(data) {
            $('#students-table tbody').html('');
            displayStudents();
            $('#student-edit-modal').modal('hide');
        },
        error: function(xhr, status, error) {
            console.log('error: ' + error);
        }
    });
}

function deleteStudent() {
    var id = $('#student-delete-modal').attr('studentId');
    $.ajax({
        url: '/student/destroy',
        type: 'delete',
        data: {
            id: id
        },
        success: function(data) {
            $('#students-table tbody').html('');
            displayStudents();
            $('#student-delete-modal').modal('hide');
        },
        error: function(xhr, status, error) {
            console.log('error: ' + error);
        }
    });
}

$(document).ready(function () {
    $('#student-edit-modal').modal({show: false});
    $('#student-delete-modal').modal({show: false});
    displayStudents();
});