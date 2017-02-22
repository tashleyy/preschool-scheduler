function createAfterSchoolActivity() {
    var name = $('#add-activity-name').val();
    var cost = $('#add-activity-cost').val();
   
    $.ajax({
      url: '/afterschoolactivity/create',
      type: 'post',
      data: {
         name: name,
         cost: cost
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