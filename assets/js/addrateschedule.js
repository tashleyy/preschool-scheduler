function createRateSchedule() {
    var name = $('#add-rate-schedule-name').val();
    var cost = $('#add-rate-schedule-cost').val();
    var monday =  $('input[name="add-options-monday"]:checked').val();
    var tuesday =  $('input[name="add-options-tuesday"]:checked').val();
    var wednesday =  $('input[name="add-options-wednesday"]:checked').val();
    var thursday =  $('input[name="add-options-thursday"]:checked').val();
    var friday =  $('input[name="add-options-friday"]:checked').val();
    var startMonth = $('#add-rate-schedule-start-month').val();
    var endMonth = $('#add-rate-schedule-end-month').val();
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
        document.location.href = 'rateschedules';
        console.log('data: ' + data);
      },
      error: function(xhr, status, error) {
        console.log('error: ' + error);
      }
    });
    return false;
}