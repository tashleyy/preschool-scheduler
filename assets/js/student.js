function displayTimePeriods() {
    
    $.ajax({
        url: '/timeperiod/find',
        type: 'get',
        success: function(data) {
            // Add table rows here
            var stuid;
            if($('#student-id')[0]){
                stuid = $('#student-id')[0].innerHTML;
            }
            var today = new Date();
            //console.log(today);
            //console.log(today.getFullYear)
            var todayMAY = new MonthAndYear(today.getFullYear(), today.getMonth() + 1);
            for (var i = 0; i < data.length; i++) {
                var tp = data[i];
                if(stuid)
                {
                    if (tp.student.id == stuid) 
                    {
                        // Construct HTML string of table row
                    
                        var rowHtml = '<tr><th>Rate Schedule</th><th>Start Date</th><th>End Date</th></tr><tr><td>'
                        + tp.rateSchedule.name + '</td><td>'
                        + tp.startDate + '</td><td>'
                        + tp.endDate + '</td></tr>';
                                            

                        
                        var asas = ['', '', '', '', ''];
                        var days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
                        for (var i = 0; i <tp.afterSchoolActivities.length; i++) {
                            var asa = tp.afterSchoolActivities[i];
                            for (var j = 0; j < 5; j++) {
                                if (asa[days[j]])
                                {
                                    asas[j] += asa.name + ', ';
                                }
                            }
                        }            

                        var weeklyScheduleHtml = '<tr id="asa-monday-row"><th>Monday</th><td>' + tp.rateSchedule.monday + '</td><td class="asa-table-cell">' + asas[0] + '</td></tr>'
                        + '<tr id="asa-tuesday-row"><th>Tuesday</th><td>'     + tp.rateSchedule.tuesday   + '</td><td class="asa-table-cell">' + asas[1] + '</td></tr>'
                        + '<tr id="asa-wednesday-row"><th>Wednesday</th><td>' + tp.rateSchedule.wednesday + '</td><td class="asa-table-cell">' + asas[2] + '</td></tr>'
                        + '<tr id="asa-thursday-row"><th>Thursday</th><td>'   + tp.rateSchedule.thursday  + '</td><td class="asa-table-cell">' + asas[3] + '</td></tr>'
                        + '<tr id="asa-friday-row"><th>Friday</th><td>'       + tp.rateSchedule.friday    + '</td><td class="asa-table-cell">' + asas[4] + '</td></tr>';
	                
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
                            $('#current-weekly-schedule').append(weeklyScheduleHtml);
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
