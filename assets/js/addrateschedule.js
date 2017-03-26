/* global showErrorOnElement, removeErrorFromElement, MonthAndYear */
// eslint-disable-next-line no-unused-vars
function validateForm() {
  let submitForm = true;
  const costString = $('#add-rs-cost').val();
  if (isNaN(parseInt(costString, 10))) {
    showErrorOnElement('add-rs-cost');
    submitForm = false;
  } else {
    removeErrorFromElement('add-rs-cost');
  }

  const startMonthString = $('#add-rs-start-month').val();
  const endMonthString = $('#add-rs-end-month').val();
  const startMonth = MonthAndYear.makeFromString(startMonthString);
  const endMonth = MonthAndYear.makeFromString(endMonthString);
  if (MonthAndYear.lessThan(endMonth, startMonth)) {
    showErrorOnElement('add-rs-start-month');
    showErrorOnElement('add-rs-end-month');
    submitForm = false;
  } else {
    removeErrorFromElement('add-rs-start-month');
    removeErrorFromElement('add-rs-end-month');
  }

  return submitForm;
}

// eslint-disable-next-line no-unused-vars
function createRateSchedule() {
  const name = $('#add-rs-name').val();
  const cost = $('#add-rs-cost').val();
  const monday = $('input[name="add-rs-options-monday"]:checked').val();
  const tuesday = $('input[name="add-rs-options-tuesday"]:checked').val();
  const wednesday = $('input[name="add-rs-options-wednesday"]:checked').val();
  const thursday = $('input[name="add-rs-options-thursday"]:checked').val();
  const friday = $('input[name="add-rs-options-friday"]:checked').val();
  const startMonth = $('#add-rs-start-month').val();
  const endMonth = $('#add-rs-end-month').val();

  $.ajax({
    url: '/rateschedule/create',
    type: 'post',
    data: {
      name,
      cost,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      startMonth,
      endMonth,
    },
    success(data) {
      document.location.href = 'rateschedules';
      console.log(`data: ${data}`);
    },
    error(xhr, status, error) {
      console.log(`error: ${error}`);
    },
  });
}
