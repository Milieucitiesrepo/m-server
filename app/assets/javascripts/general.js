$(document).on('turbolinks:load', function(){

  window.onpopstate = function(e){
    if(e.state){
      Turbolinks.visit(e.state.path);
    }
  };

  if($('#notice').length){
    window.flash('notice', $('#notice').data('notice'));
  }

  if($('#alert').length){
    window.flash('alert', $('#alert').data('alert'));
  }

  $('#verify-role').on("ajax:success", function(){
    window.flash('notice', 'Verified!');
    Turbolinks.visit('/users');
  }).on('ajax:error', function(){
    window.flash('alert', 'Error verifying');
  });

  $('.modal-trigger').leanModal();

});

$(document).ready(function() {
  $.ajaxSetup({ cache: false });
});

$(document).on('click', 'a',function(e) {
  this.blur();
});

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
  results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
