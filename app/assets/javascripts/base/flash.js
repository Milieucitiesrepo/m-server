// The two types of are 'alert' and 'notice'
function flash(type, message){
  $('body').prepend("<div id='flash' class='"+ type +"'>"+ message +"</div>");
  $("#flash").velocity('transition.slideDownIn').velocity('transition.slideUpOut', { delay: 2500 })
}
