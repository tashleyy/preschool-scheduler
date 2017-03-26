function createAfterSchoolActivity() {
    var name = $('#add-asa-name').val();
    var cost = $('#add-asa-cost').val();
    var monday =  $('input[name="add-asa-options-monday"]').prop('checked');
    var tuesday =  $('input[name="add-asa-options-tuesday"]').prop('checked');;
    var wednesday =  $('input[name="add-asa-options-wednesday"]').prop('checked');;
    var thursday =  $('input[name="add-asa-options-thursday"]').prop('checked');;
    var friday =  $('input[name="add-asa-options-friday"]').prop('checked');;
    var startMonth = $('#add-asa-start-month').val();
    var endMonth = $('#add-asa-end-month').val();
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
}