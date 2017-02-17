function addStudent() {
    var name = $('#add-student-name').val();
    var phone = $('#add-student-phone').val();
    var rs = $('#add-student-rate-schedules').val();
    $.ajax({
        url: '/student/create',
        type: 'post',
        data: {
            name: name,
            phone: phone,
            rsId: rs
        },
        success: function(data) {
            document.location.href = 'students';
            console.log('data: ' + data);
        },
        error: function(xhr, status, error) {
            console.log('error: ' + error);
        }
    });
    return false;
}

function displayRateScheduleOptions() {
    $.ajax({
        url: '/rateschedule/find',
        type: 'get',
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                var rs = data[i];
                var optionHtml = '<option ';
                if (i == 0) {
                    optionHtml += 'selected ';
                }
                optionHtml += 'value="' + rs.id + '">' + rs.name + '</option>';
                $('#add-student-rate-schedules').append(optionHtml);
            }
        },
        error: function(xhr, status, error) {
            console.log('error: ' + error);
        }
    });
}

$(document).ready(displayRateScheduleOptions);