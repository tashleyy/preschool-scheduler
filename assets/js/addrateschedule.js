function createRateSchedule() {
    var name = $('#add-rate-schedule-name').val();
    $.ajax({
      url: '/rateschedule/create',
      type: 'post',
      data: {
         name: name
      },
      success: function(data) {
        document.location.href = "rateschedules";
        console.log('data: ' + data);
      },
      error: function(xhr, status, error) {
        console.log('error: ' + error);
      }
    });
    // return false;
}