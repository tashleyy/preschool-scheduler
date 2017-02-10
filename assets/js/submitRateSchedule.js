function submitRateSchedule()
{
    $.ajax({
      url: 'rateschedulesubmit',
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
}