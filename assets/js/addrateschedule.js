function validateForm() {
  var submitForm = true;
  var costString = $('#add-rs-cost').val();
  if(isNaN(parseInt(costString))) {
    showErrorOnElement("add-rs-cost");
    submitForm = false;
  } else {
    removeErrorFromElement("add-rs-cost");
  }

  var startMonthString = $('#add-rs-start-month').val();
  var endMonthString = $('#add-rs-end-month').val();
  var startMonth = MonthAndYear.makeFromString(startMonthString);
  var endMonth = MonthAndYear.makeFromString(endMonthString);
  if (MonthAndYear.lessThan(endMonth, startMonth)) {
    showErrorOnElement("add-rs-start-month");
    showErrorOnElement("add-rs-end-month");
    submitForm = false;
  } else {
    removeErrorFromElement("add-rs-start-month");
    removeErrorFromElement("add-rs-end-month");
  }

  return submitForm;
}

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
}