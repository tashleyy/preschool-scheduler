function displayRateSchedules() {
    $.ajax({
        url: '/rateschedule/find',
        type: 'post',
        success: function (data) {
            console.log('data: ' + data);
            // Add table rows here
            for (var i = 0; i < data.length; i++) {
                var rateSchedule = data[i];
                // Construct HTML string of table row

                // Use jQuery to add it to table body
            }
        },
        error: function (xhr, status, error) {
            console.log('error: ' + error);
        }
    });
}