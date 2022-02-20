function showcontact(){
    $("#contact_container").css("display","inherit").addClass("animated slideInUp");
    setTimeout(function(){
        $("#contact_container").removeClass("animated slideInUp");
    }, 500);}
function closecontact(){
    $("#contact_container").addClass("animated slideOutDown");
    setTimeout(function(){
        $("#contact_container").removeClass("animated slideOutDown").css("display","none");
    },500);}

$(document).ready(function() {
    setTimeout(function(){
    $("#loading").addClass("animated fadeOut");
    setTimeout(function(){
      $("#loading").removeClass("animated fadeOut").css("display","none");
      $("#box").css("display","none");
      $("#foodle").removeClass("animated fadeIn");
      $("#contact").removeClass("animated fadeIn");
      $("#projects").removeClass("animated fadeIn");
    },700);
    },1200);
});