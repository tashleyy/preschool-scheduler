function displayStudents() {
    $.ajax({
        url: '/student/find',
        type: 'get',
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                console.log(data[i]);
            }
        },
        error: function(xhr, status, error) {
            console.log('error: ' + error);
        }
    });
}

$(document).ready(displayStudents);