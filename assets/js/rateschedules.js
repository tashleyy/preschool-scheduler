function displayRateSchedules() {
    $.ajax({
        url: '/rateschedule/find',
        type: 'get',
        success: function (data) {
            // Add table rows here
            for (var i = 0; i < data.length; i++) {
                var rateSchedule = data[i];
                console.log(rateSchedule);
                // Construct HTML string of table row
                // Use jQuery to add it to table body
            }
        },
        error: function (xhr, status, error) {
            console.log('error: ' + error);
        }
    });
}