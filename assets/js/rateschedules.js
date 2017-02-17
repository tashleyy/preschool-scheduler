function displayRateSchedules() {
    $.ajax({
        url: '/rateschedule/find',
        type: 'get',
        success: function(data) {
            // Add table rows here
            for (var i = 0; i < data.length; i++) {
                var rs = data[i];
                // Construct HTML string of table row
                var rowHtml = '<tr><td>' + rs.name + '</td><td>'
                    + formatDay(rs.monday) + '</td><td>'
                    + formatDay(rs.tuesday) + '</td><td>'
                    + formatDay(rs.wednesday) + '</td><td>'
                    + formatDay(rs.thursday) + '</td><td>'
                    + formatDay(rs.friday) + '</td><td>'
                    + rs.cost + '</td><td>'
                    + rs.startMonth + '</td><td>'
                    + rs.endMonth + '</td></tr>';
                // Use jQuery to add it to table body
                $('#rate-schedule-table tbody').append(rowHtml);
            }
        },
        error: function(xhr, status, error) {
            console.log('error: ' + error);
        }
    });
}

function formatDay(day) {
    if (day === 'full') {
        return 'F';
    }
    else if (day === 'half') {
        return 'H';
    }
    return ' ';
}

$(document).ready(displayRateSchedules);