const sidebarBox = document.querySelector('#bar_box'),
  sidebarBtn = document.querySelector('#bar_btn'),
  pageWrapper = document.querySelector('#page-wrapper');

sidebarBtn.addEventListener('click', (event) => {
  sidebarBtn.classList.toggle('active');
  sidebarBox.classList.toggle('active');
});

pageWrapper.addEventListener('click', (event) => {
  if (sidebarBox.classList.contains('active')) {
    sidebarBtn.classList.remove('active');
    sidebarBox.classList.remove('active');
  }
});

window.addEventListener('keydown', (event) => {
  if (sidebarBox.classList.contains('active') && event.keyCode === 27) {
    sidebarBtn.classList.remove('active');
    sidebarBox.classList.remove('active');
  }
});


function showcontact() {
  $('#contact_container')
    .css('display', 'inherit')
    .addClass('animated slideInUp');
  setTimeout(function () {
    $('#contact_container')
      .removeClass('animated slideInUp');
  }, 500);
}

function closecontact() {
  $('#contact_container')
    .addClass('animated slideOutDown');
  setTimeout(function () {
    $('#contact_container')
      .removeClass('animated slideOutDown')
      .css('display', 'none');
  },500);}

$(document).ready(function() {
  setTimeout(function(){
    $("#loading").addClass("animated fadeOut");
    setTimeout(function(){
      $("#loading").removeClass("animated fadeOut").css("display","none");
      $("#box").css("display","none");
      $("#Img").removeClass("animated fadeIn");
      $("#contact").removeClass("animated fadeIn");
      $("#projects").removeClass("animated fadeIn");
    },700);
  },1200);
});
