function createRateSchedule() {
    var name = $('#add-rate-schedule-name').val();
    var cost = '$' + $('#cost').val();
    var monday =  $('input[name="optionsMonday"]:checked').val();
    var tuesday =  $('input[name="optionsTuesday"]:checked').val();
    var wednesday =  $('input[name="optionsWednesday"]:checked').val();
    var thursday =  $('input[name="optionsThursday"]:checked').val();
    var friday =  $('input[name="optionsFriday"]:checked').val();
    var startMonth = $('#startMonth').val();
    var endMonth = $('#endMonth').val();
    $.ajax({
      url: '/rateschedule/create',
      type: 'post',
      data: {
         name: name,
         cost: cost,
         monday: monday,
         tuesday: tuesday,
         wednesday: wednesday,
         thursday: thursday,
         friday: friday,
         startMonth: startMonth,
         endMonth: endMonth
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