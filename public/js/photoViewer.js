const pv = '<div class="pv"></div>';
$(".pv-container").append(pv);

$(".pv").css({
  "display": "flex",
  "flex-flow": "column",
  "justify-content": "center",
  "background-color": "#333",
  "height": "100%",
  "width": "100%",
  "border-radius": "25px"
});

var imageContainer = '<div id="pv-img-container"></div>';
$(".pv").append(imageContainer);
$("#pv-img-container").css({
  "height": "90%",
  "width": "100%",
  "display": "flex",
  "flex-flow": "row",
  "justify-content": "center",
  "align-items": "center",
  "position": "relative"
});

var imageMain = '<img id="pv-img-main" src="%path%">';
$("#pv-img-container").append(imageMain.replace('%path%', imagePrefix+images[0]));
$("#pv-img-main").css({
  "max-height": "100%",
  "max-width": "100%",
  "z-order": "0"
});

var arrowLeft = '<div class="pv-arrow pv-arrow-left"><span></span><img src="left-arrow-01.svg"></div>';
var arrowRight = '<div class="pv-arrow pv-arrow-right"><span></span><img src="left-arrow-01.svg"></div>';
$("#pv-img-container").append(arrowLeft);
$("#pv-img-container").append(arrowRight);
$(".pv-arrow").css({
  "display": "none",
  "height": "100%",
  "width": "20%",
  "margin": "0",
  "position": "absolute",
  "z-order": "10",
  "background-color": "#555",
  "filter": "opacity(60%)",
  "text-align": "center",
  "user-select": "none"
});
$(".pv-arrow-left").css({
  "left": "0",
  "border-radius": "25px 0px 0px 0px"
});
$(".pv-arrow-left span").css({
  "display": "inline-block",
  "height": "100%",
  "vertical-align": "middle"
});
$(".pv-arrow-left img").css({
  "vertical-align": "middle",
  "width": "50%",
  "margin": "auto"
});
$(".pv-arrow-right").css({
  "right": "0",
  "border-radius": "0px 25px 0px 0px"
});
$(".pv-arrow-right span").css({
  "display": "inline-block",
  "height": "100%",
  "vertical-align": "middle"
});
$(".pv-arrow-right img").css({
  "vertical-align": "middle",
  "width": "50%",
  "margin": "auto",
  "filter": "FlipH",
  "transform": "scaleX(-1)"
});

var imageIndicator = '<div id="pv-img-indicator"></div>';
$(".pv").append(imageIndicator);
$("#pv-img-indicator").css({
  "background-color": "#555",
  "height": "10%",
  "width": "100%",
  "display": "flex",
  "flex-flow": "row",
  "justify-content": "space-around",
  "align-items": "center",
  "border-radius": "0px 0px 25px 25px"
});
for (var i = 0; i < images.length; i++) {
  $("#pv-img-indicator").append('<div class="pv-img-indicator-dot"></div>');
  $(".pv-img-indicator-dot").css({
    "border-radius": "50%",
    "background-color": "white",
    "height": "5px",
    "width": "5px"
  });
}
$(".pv-img-indicator-dot").first().css({
  "height": "10px",
  "width": "10px"
});

var image_i = 0;
$("#pv-img-container").on('touchend click', function(event) {
  event.preventDefault();

  var clientX;
  if (event.type == 'touchend') {
    $(this).off('click');
    clientX = event.changedTouches[0].clientX;


  }
  else {
    clientX = event.clientX;
  }


  $(".pv-img-indicator-dot").eq(image_i).animate({
    "height": "5px",
    "width": "5px"
  }, 'fast');

  if (clientX > event.currentTarget.offsetLeft + (event.currentTarget.offsetWidth/2)) {
    image_i++;
    if (image_i === images.length)
      image_i = 0;

    if (hoverRight === false) {
      $(".pv-arrow-right").stop().fadeIn('fast', function() {
        $(".pv-arrow-right").stop().fadeOut('slow');
      });
    }
  }
  else {
    image_i--;
    if (image_i === -1)
    image_i = images.length-1;

    if (hoverLeft === false) {
      $(".pv-arrow-left").stop().fadeIn('fast', function() {
        $(".pv-arrow-left").stop().fadeOut('slow');
      });
    }
  }


  var img = $("#pv-img-main");
  img.stop().fadeOut('fast', function() {
    img.attr('src', imagePrefix+images[image_i]);
    img.stop().fadeIn('fast');
  });

  // update indicator dots

  $(".pv-img-indicator-dot").eq(image_i).animate({
    "height": "10px",
    "width": "10px"
  }, 'fast');


});

var hoverLeft = false, hoverRight = false;
$("#pv-img-container").hover(
  function(event) {
    if (event.clientX > event.currentTarget.offsetLeft + (event.currentTarget.offsetWidth/2)) {
      hoverRight = true;
      $(".pv-arrow-right").stop().fadeIn('slow');
    }
    else {
      hoverLeft = true;
      $(".pv-arrow-left").stop().fadeIn('slow');
    }
  }, function(event) {
    hoverLeft = false;
    hoverRight = false;
    $(".pv-arrow-left").stop().fadeOut('slow');
    $(".pv-arrow-right").stop().fadeOut('slow');
});
$("#pv-img-container").mousemove(function(event) {
  if (event.clientX > event.currentTarget.offsetLeft + (event.currentTarget.offsetWidth/2)) {
    hoverRight = true;
    $(".pv-arrow-right").stop().fadeIn('slow');
    $(".pv-arrow-left").stop().fadeOut('slow');
  }
  else {
    hoverLeft = true;
    $(".pv-arrow-left").stop().fadeIn('slow');
    $(".pv-arrow-right").stop().fadeOut('slow');
  }
});


$.each(images, function(i,image) { $.get(imagePrefix + image); });
