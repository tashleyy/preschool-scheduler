function createRateSchedule() {
    var name = $('#add-rs-name').val();
    var cost = $('#add-rs-cost').val();
    var monday =  $('input[name="add-rs-options-monday"]:checked').val();
    var tuesday =  $('input[name="add-rs-options-tuesday"]:checked').val();
    var wednesday =  $('input[name="add-rs-options-wednesday"]:checked').val();
    var thursday =  $('input[name="add-rs-options-thursday"]:checked').val();
    var friday =  $('input[name="add-rs-options-friday"]:checked').val();
    var startMonth = $('#add-rs-start-month').val();
    var endMonth = $('#add-rs-end-month').val();
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