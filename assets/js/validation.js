// eslint-disable-next-line no-unused-vars
function showErrorOnElement(elementName, messageParam = null) {
  const div = $(`#${elementName}`).closest('div');
  div.addClass('has-error');
  div.addClass('has-feedback');

  let messageName = messageParam;
  if (messageName == null) {
    messageName = `#${elementName}-message`;
  }

  if ($(messageName) != null) {
    $(messageName).show();
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
