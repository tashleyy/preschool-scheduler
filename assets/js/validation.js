// eslint-disable-next-line no-unused-vars
function showErrorOnElement(elementName, customMessage = null) {
  const div = $(`#${elementName}`).closest('div');
  div.addClass('has-error');
  div.addClass('has-feedback');

  if ($(`#${elementName}-message`) != null) {
    if (customMessage != null) {
      $(`#${elementName}-message`).innerHTML = customMessage;
    }
    $(`#${elementName}-message`).show();
  }
}

// eslint-disable-next-line no-unused-vars
function removeErrorFromElement(elementName) {
  const div = $(`#${elementName}`).closest('div');
  div.removeClass('has-error');
  div.removeClass('has-feedback');

  if ($(`#${elementName}-message`) != null) {
    $(`#${elementName}-message`).hide();
  }
}
