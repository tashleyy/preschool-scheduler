function showErrorOnElement(elementName, customMessage = null)
{
  var div = $('#' + elementName).closest("div");
  div.addClass("has-error");
  div.addClass("has-feedback");
  
  if ($('#' + elementName + '-message') != null) {
    if (customMessage != null)
    {
      $('#' + elementName + '-message').innerHTML = customMessage;
    }
    $('#' + elementName + '-message').show();
  }
}

function removeErrorFromElement(elementName)
{
  var div = $('#' + elementName).closest("div");
  div.removeClass("has-error");
  div.removeClass("has-feedback");
  
  if ($('#' + elementName + '-message') != null) {
    $('#' + elementName + '-message').hide();
  }
}