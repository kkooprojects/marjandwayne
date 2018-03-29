
$(window).scroll(function(e) {
  var s1 = $("#section1");
  var s1Top = s1.offset().top - parseInt(s1.css("margin-top"));
  var s2 = $("#section2");
  var s2Top = s2.offset().top - parseInt(s2.css("margin-top"));
  var s3 = $("#section3");
  var s3Top = s3.offset().top - parseInt(s3.css("margin-top"));

  var vh = $("#section0").height();
  var scrollTop = $(window).scrollTop();

  if (scrollTop > vh) {
    $("#header").addClass("header-fixed");
    $("#header").removeClass("header-float");

    if (scrollTop > s3Top) {
      $(".header-nav-item").removeClass("header-nav-selected");
      $(".header-nav-item:nth-child(3)").addClass("header-nav-selected");
    }
    else if (scrollTop > s2Top) {
      $(".header-nav-item").removeClass("header-nav-selected");
      $(".header-nav-item:nth-child(2)").addClass("header-nav-selected");
    }
    else if (scrollTop > s1Top) {
      $(".header-nav-item").removeClass("header-nav-selected");
      $(".header-nav-item:nth-child(1)").addClass("header-nav-selected");
    }
  }
  else {
    $("#header").addClass("header-float");
    $("#header").removeClass("header-fixed");
    $(".header-nav-item").removeClass("header-nav-selected");
  }
});

$(function() {

  $("#nav-s1").click(function() {
    var s1 = $("#section1");
    var s1Top = s1.offset().top - parseInt(s1.css("margin-top"))/3;
    $('html, body').animate({
      scrollTop:s1Top
    }, 500);
  });
  $(".header-nav-item:nth-child(2)").click(function() {
    var s2 = $("#section2");
    var s2Top = s2.offset().top - parseInt(s2.css("margin-top"))/3;
    $('html, body').animate({
      scrollTop: s2Top
    }, 500);
  });
  $(".header-nav-item:nth-child(3)").click(function() {
    var s3 = $("#section3");
    var s3Top = s3.offset().top - parseInt(s3.css("margin-top"))/3;
    $('html, body').animate({
      scrollTop: s3Top
    }, 500);
  });

  $("#rsvp-checkbox1").change(function() {
    if (this.checked) {
      $("#rsvp-checkbox2").prop('checked', false);
    }
  });
  $("#rsvp-checkbox2").change(function() {
    if (this.checked) {
      $("#rsvp-checkbox1").prop('checked', false);
    }
  });
});



// RSVP
function addGuest() {
  var guests = $(".rsvp-guest");
  if (guests.length >= 5)
    return;
  $(".rsvp-guests").append('<input name="guest' + (guests.length+1)
    + '" class="rsvp-guest" type="text" placeholder="Guest Name">');
}

function validateRsvp() {
  var validInputFound = false;

  $(".rsvp-guest").map(function() {
    if ($(this).val().trim().length > 0) {
      validInputFound = true;
    }
  });

  let checked1 = document.getElementById("rsvp-checkbox1").checked;
  let checked2 = document.getElementById("rsvp-checkbox2").checked;
  if (validInputFound === false) {
    $(".rsvp-valid-text").text("*Please enter guest names before submitting.");
    $(".rsvp-valid-text").css({ 'visibility': 'visible' });
    return false;
  }
  else if (checked1 == checked2) {
    $(".rsvp-valid-text").text("*Please check one box to indicate if you are coming.");
    $(".rsvp-valid-text").css({ 'visibility': 'visible' });
    return false;
  }
  else {
    return true;
  }
}

//map
function initMap() {
  var parktown = new google.maps.LatLng(52.131321,-106.652164);
  var mapOptions = {
    center: parktown,
    zoom: 14
  };
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);
  var marker = new google.maps.Marker({
    position: parktown,
    map: map
  });
  marker.addListener('click', function() {
    window.open("https://www.google.com/maps/place/Park+Town+Hotel/@52.131493,-106.652547,19z/data=!4m7!3m6!1s0x0:0xc5dd492a7888aa09!5m1!1s2018-03-29!8m2!3d52.1314609!4d-106.6527431?hl=en-US");
  });
}
