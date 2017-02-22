function displayAfterSchoolActivities() {
    $.ajax({
        url: '/afterschoolactivity/find',
        type: 'get',
        success: function(data) {
            // Add table rows here
            for (var i = 0; i < data.length; i++) {
                var rs = data[i];
                // Construct HTML string of table row
                var rowHtml = '<tr><td>' + rs.name + '</td><td>'
                    + formatCost(rs.cost) + '</td></tr>';
                // Use jQuery to add it to table body
                $('#afterschool-activity-table tbody').append(rowHtml);
            }
        },
        error: function(xhr, status, error) {
            console.log('error: ' + error);
        }
    });
}

$(document).ready(displayAfterSchoolActivities);