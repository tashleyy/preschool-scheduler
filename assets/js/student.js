function displayTimePeriods() {
    
    $.ajax({
        url: '/timeperiod/find',
        type: 'get',
        success: function(data) {
            // Add table rows here
            var stuid = $('#student-id')[0].innerHTML;
            var today = new Date();
            //console.log(today);
            //console.log(today.getFullYear)
            var todayMAY = new MonthAndYear(today.getFullYear(), today.getMonth());
            for (var i = 0; i < data.length; i++) {
                var tp = data[i];
                console.log(tp);
                console.log(tp.student);
                if (tp.student) {
                    if (tp.student.id == stuid) {
                        // Construct HTML string of table row
                
                        var rowHtml = '<tr><td>' + tp.rateSchedule.name + '</td><td>'
                            + tp.startDate + '</td><td>'
                            + tp.endDate + '</td></tr>';
                        // Use jQuery to add it to table body
                        var tp_end = MonthAndYear.makeFromString(tp.endDate);
                        var tp_start = MonthAndYear.makeFromString(tp.startDate);
                        //console.log("END " + tp_end);
                        //console.log("Start " + tp_start);
                        //console.log("Today " + todayMAY);
                        if (MonthAndYear.lessThan(tp_end, todayMAY)) {
                            $('#past-time-period-table tbody').append(rowHtml);
                        } else if (MonthAndYear.lessThan(todayMAY, tp_start)) {
                            $('#future-time-period-table tbody').append(rowHtml);
                        } else {
                            $('#time-period-table tbody').append(rowHtml);
                        }
                    }
                }
            }
        },
        error: function(xhr, status, error) {
            console.log('error: ' + error);
        }
    });
}

$(document).ready(function() {
    displayTimePeriods();
});
