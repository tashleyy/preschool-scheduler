function onLogin(googleUser) {
  $('.g-signin2').css('display', 'none');
  $('.sign-out').css('display', 'block');
  var idToken = googleUser.getAuthResponse().id_token;
  $.ajax({
    url: '/user/login',
    type: 'post',
    data: {
      token: idToken
    },
    success: function(data) {
      if (window.location.pathname == "/login") {
        document.location.href = "home";
      }
    },
    error: function(xhr, status, error) {
      console.log('error: ' + error);
    }
  });
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    $.ajax({
      url: '/user/logout',
      type: 'post',
      success: function(data) {
        if (window.location.pathname == "/login") {
          $('.g-signin2').css('display', 'block');
          $('.sign-out').css('display', 'none');
        }
        document.location.href = "login";
        console.log('data: ' + data);
      },
      error: function(xhr, status, error) {
        console.log('error: ' + error);
      }
    });
  });
}
