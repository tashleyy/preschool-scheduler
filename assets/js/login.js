/* global gapi */
// eslint-disable-next-line no-unused-vars
function onLogin(googleUser) {
  $('.g-signin2').css('display', 'none');
  $('.sign-out').css('display', 'block');
  const idToken = googleUser.getAuthResponse().id_token;
  $.ajax({
    url: '/user/login',
    type: 'post',
    data: {
      token: idToken,
    },
    success() {
      if (window.location.pathname === '/login') {
        document.location.href = 'home';
      }
    },
    error(xhr, status, error) {
      console.log(`error: ${error}`);
    },
  });
}

// eslint-disable-next-line no-unused-vars
function signOut() {
  const auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(() => {
    $.ajax({
      url: '/user/logout',
      type: 'post',
      success() {
        if (window.location.pathname === '/login') {
          $('.g-signin2').css('display', 'block');
          $('.sign-out').css('display', 'none');
        }
        document.location.href = 'login';
      },
      error(xhr, status, error) {
        console.log(`error: ${error}`);
      },
    });
  });
}
