/* global showErrorOnElement, removeErrorFromElement */
// eslint-disable-next-line no-unused-vars
function validateRSForm() {
  let submitForm = true;
  const costString = $('#add-rs-cost').val();
  if (isNaN(parseInt(costString, 10))) {
    showErrorOnElement('add-rs-cost');
    submitForm = false;
  } else {
    removeErrorFromElement('add-rs-cost');
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
