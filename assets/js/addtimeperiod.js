function addTimePeriod(student) {
    var startDate = $('#add-period-start-date').val();
    var endDate = $('#add-period-end-date').val();
    var rs = $('#add-period-rate-schedules').val();
    var asa =  $('#add-period-asas').val();

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