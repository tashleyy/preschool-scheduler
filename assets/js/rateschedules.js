function displayRateSchedules() {
    $.ajax({
        url: '/rateschedule/find',
        type: 'get',
        success: function (data) {
            // Add table rows here
            for (var i = 0; i < data.length; i++) {
                var rs = data[i];
                console.log(rs);
                // Construct HTML string of table row
                var rowHtml = '<tr><td>' + rs.name + '</td><td>'
                    + rs.monday + '</td><td>'
                    + rs.tuesday + '</td><td>'
                    + rs.wednesday + '</td><td>'
                    + rs.thursday + '</td><td>'
                    + rs.friday + '</td><td>'
                    + rs.cost + '</td><td>'
                    + rs.startMonth + '</td><td>'
                    + rs.endMonth + '</td></tr>';
                // Use jQuery to add it to table body
                $('#rate-schedule-table tbody').append(rowHtml);
            }
        },
        error: function (xhr, status, error) {
            console.log('error: ' + error);
        }
    });
}

$(document).ready(displayRateSchedules);