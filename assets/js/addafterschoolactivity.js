function createAfterSchoolActivity() {
    var name = $('#add-afterschool-activity-name').val();
    var cost = $('#add-afterschool-activity-cost').val();
    var monday =  $('input[name="add-options-monday"]:checked').val();
    var tuesday =  $('input[name="add-options-tuesday"]:checked').val();
    var wednesday =  $('input[name="add-options-wednesday"]:checked').val();
    var thursday =  $('input[name="add-options-thursday"]:checked').val();
    var friday =  $('input[name="add-options-friday"]:checked').val();
    var startMonth = $('#add-afterschool-activity-start-month').val();
    var endMonth = $('#add-afterschool-activity-end-month').val();
    $.ajax({
      url: '/afterschoolactivity/create',
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
        document.location.href = 'afterschoolactivities';
        console.log('data: ' + data);
      },
      error: function(xhr, status, error) {
        console.log('error: ' + error);
      }
    });
    return false;
}