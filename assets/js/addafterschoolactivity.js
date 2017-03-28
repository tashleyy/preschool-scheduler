/* global showErrorOnElement, removeErrorFromElement */
// eslint-disable-next-line no-unused-vars
function createAfterSchoolActivity() {
  const name = $('#add-asa-name').val();
  const cost = $('#add-asa-cost').val();
  const monday = $('input[name="add-asa-options-monday"]').prop('checked');
  const tuesday = $('input[name="add-asa-options-tuesday"]').prop('checked');
  const wednesday = $('input[name="add-asa-options-wednesday"]').prop('checked');
  const thursday = $('input[name="add-asa-options-thursday"]').prop('checked');
  const friday = $('input[name="add-asa-options-friday"]').prop('checked');
  $.ajax({
    url: '/afterschoolactivity/create',
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
      document.location.href = 'afterschoolactivities';
      console.log(`data: ${data}`);
    },
    error(xhr, status, error) {
      console.log(`error: ${error}`);
    },
  });
}

// eslint-disable-next-line no-unused-vars
function validateASAForm() {
  let submitForm = true;
  const costString = $('#add-asa-cost').val();
  if (isNaN(parseInt(costString, 10))) {
    showErrorOnElement('add-asa-cost');
    submitForm = false;
  } else {
    removeErrorFromElement('add-asa-cost');
  }

  return submitForm;
}
