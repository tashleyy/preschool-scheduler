function displayStudents() {
    $.ajax({
        url: '/student/find',
        type: 'get',
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                var student = data[i];
                // Construct HTML string of table row
                var rowHtml = '<tr><td>' + student.name + '</td><td>'
                    + student.parentPhone1 + '</td><td>';
                if (student.rateSchedules && student.rateSchedules.length > 0) {
                    rowHtml += student.rateSchedules[0].id + '</td><td>';
                } else {
                    rowHtml += '</td><td>';
                }
                rowHtml += '<a href="#"><span class="glyphicon glyphicon-pencil"></span></a></td><td>'
                    + '<a href="#"><span class="glyphicon glyphicon-trash"></span></a></td></tr>';
                // Use jQuery to add it to table body
                $('#students-table tbody').append(rowHtml);
            }
        },
        error: function(xhr, status, error) {
            console.log('error: ' + error);
        }
    });
}

$(document).ready(displayStudents);