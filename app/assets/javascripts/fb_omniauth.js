function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
};

function statusChangeCallback(response) {
  if (response.status === 'connected') {
    var uid = response.authResponse.userID;
    var accessToken = response.authResponse.accessToken;
    $.get( "/auth/facebook/callback" );
  } else if (response.status === 'not_authorized') {
    document.getElementById('fb-status').innerHTML = 'Please log ' +
      'into this app.';
  } else {
    document.getElementById('fb-status').innerHTML = 'Please log ' +
      'into Facebook.';
  }
};

$(function() {

  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  var FBKEY = document.getElementById('fb-status').dataset.fb;

  window.fbAsyncInit = function() {
    FB.init({
      appId      : FBKEY,
      cookie     : true,
      xfbml      : true,
      version    : 'v2.6'
    });
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  };
});
