$(window).on('load', function() {
     /*Once the page is completely loaded, the loading gif fades in 500ms (1 second)*/
     $('#loading').fadeOut(1000);
});

/*Animates on scroll*/
function isElementInViewport(elem) {
    var $elem = $(elem);

    // Get the scroll position of the page.
    var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html');
    var viewportTop = $(scrollElem).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    // Get the position of the element on the page.
    var elemTop = Math.round( $elem.offset().top );
    var elemBottom = elemTop + $elem.height();

    return ((elemTop < viewportBottom) && (elemBottom > viewportTop));
}

$(document).ready(function() {
    /* Every time the window is scrolled ... */
    $(window).scroll( function(){

        /* Check the location of each desired element */
        $('.hideme').each( function(i){

            var bottom_of_object = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();

            /* If the object is completely visible in the window, fade it it */
            if( bottom_of_window > bottom_of_object ){

                $(this).animate({'opacity':'1'},500);

            }

        });

    });

});

$(function() {
  $('.skillL').hover(function() {
    $(this).parent().siblings("img").css('background-color', 'yellow');
  }, function() {
    // on mouseout, reset the background colour
    $('#b').css('background-color', '');
  });
});