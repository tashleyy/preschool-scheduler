function displayTimePeriods() {
    console.log("displayTimePeriodsFunction");
    $.ajax({
        url: '/timeperiod/find',
        type: 'get',
        success: function(data) {
            // Add table rows here
            for (var i = 0; i < data.length; i++) {
                var tp = data[i];
                // Construct HTML string of table row
                
                var rowHtml = '<tr><td>' + tp.rateSchedule.name + '</td><td>'
                    + tp.startDate + '</td><td>'
                    + tp.endDate + '</td></tr>';
                // Use jQuery to add it to table body
                $('#time-period-table tbody').append(rowHtml);
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
