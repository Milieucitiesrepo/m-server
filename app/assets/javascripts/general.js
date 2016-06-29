$(document).on('page:change', function(){

  $('.search-input').autocomplete({
    callback   : function(v){
      var googleLocationAutocomplete = new google.maps.places.AutocompleteService();
      var request = { input: v, types: ['address'], componentRestrictions: {country: 'ca'} };
      googleLocationAutocomplete.getPlacePredictions(request, function(predictions){
        data = predictions.map(function(prediction){ return prediction.description; });
        this.setData(data);
      }.bind(this));
    }
  });

  if($('#notice').length){
    Materialize.toast($('#notice').data("notice"), 3500, "teal");
  }

  if($('#alert').length){
    Materialize.toast($('#alert').data("alert"), 3500, "red darken-4");
  }

  $("#contact-councillor").on("ajax:success", function(){
    this.reset();
    Materialize.toast("Message successfully sent!", 3500, "teal");
  }).on("ajax:error", function(){
    this.reset();
    Materialize.toast("Message unsuccessfully sent!", 3500, "red darken-4");
  });

  $("#contact-file-lead").on("ajax:success", function(){
    this.reset();
    Materialize.toast("Message successfully sent!", 3500, "teal");
  }).on("ajax:error", function(){
    this.reset();
    Materialize.toast("Message unsuccessfully sent!", 3500, "red darken-4");
  });

  $("#contact-milieu").on("ajax:success", function(){
    this.reset();
    Materialize.toast("Message successfully sent!", 3500, "teal");
  }).on("ajax:error", function(){
    this.reset();
    Materialize.toast("Message unsuccessfully sent!", 3500, "red darken-4");
  });

  $("#contact-citizencity").on("ajax:success", function(){
    this.reset();
    Materialize.toast("Message successfully sent!", 3500, "teal");
  }).on("ajax:error", function(){
    this.reset();
    Materialize.toast("Message unsuccessfully sent!", 3500, "red darken-4");
  });

  $('.button-collapse').sideNav();
  $('select').material_select();
  $('.modal-trigger').leanModal();
  $('.datepicker').pickadate();

  $('.input-field').on('cocoon:after-insert', function(e, insertedItem) {
    $('select').material_select();
    $('.datepicker').pickadate();
  });

  $('.sign-out-button').click(function(){
    FB.getLoginStatus(function(response) {
      if (response.authResponse){
        FB.logout();
      };
    });
  });

});
