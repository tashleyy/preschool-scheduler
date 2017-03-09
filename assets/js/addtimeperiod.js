function displayAddPeriodRateScheduleOptions() {
    $.ajax({
        url: '/rateschedule/find',
        type: 'get',
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                var rs = data[i];
                var optionHtml = '<option ';
                optionHtml += 'value="' + rs.id + '">' + rs.name + '</option>';
                $('#add-period-rate-schedules').append(optionHtml);
            }
            $('#add-period-rate-schedules').multiselect();
        },
        error: function(xhr, status, error) {
            console.log('error: ' + error);
        }
    });
}

function displayAddPeriodAfterSchoolActivityOptions() {
    $.ajax({
        url: '/afterschoolactivity/find',
        type: 'get',
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                var asa = data[i];
                var optionHtml = '<option ';
                optionHtml += 'value="' + asa.id + '">' + asa.name + '</option>';
                $('#add-student-asas').append(optionHtml);
            }
            $('#add-student-asas').multiselect();
        },
        error: function(xhr, status, error) {
            console.log('error: ' + error);
        }
    });
}

function addTimePeriod(student) {
    var startDate = $('#add-period-start-day').val();
    var endDate = $('#add-period-end-day').val();
    var rs = $('#add-period-rate-schedules').val();
    var asa =  $('#add-period-asas').val();

    console.log(startDate);
    console.log(endDate);
    console.log(rs);
    console.log(asa);
    console.log(student);
    $.ajax({
        url: '/timeperiod/create',
        type: 'post',
        data: {
            startDate: startDate,
            endDate: endDate,
            rateSchedule: rs,
            afterSchoolActivities: [asa],
            student: student
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

$(document).ready(function() {
    displayAddPeriodRateScheduleOptions();
    displayAddPeriodAfterSchoolActivityOptions();
});

