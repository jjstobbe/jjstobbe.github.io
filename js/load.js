$(window).load(function() {
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

// Check if it's time to start the animation.
function checkAnimation() {
    var $elem = $('#Java');
    // If the animation has already been started
    if ($elem.hasClass('animated bounce')) {
        return;
    }

    if (isElementInViewport($elem)) {
        // Start the animation
        $elem.addClass('animated bounce');
    }
}

// Capture scroll events
$(window).scroll(function(){
    checkAnimation();
});

$(document).ready(function (){
    $("#Hexagons ul li").click(function(){
        var $target = $(this);
        /*Select a hexagon when no other hexagon is selected*/

        if(!$(this).hasClass("current") && !$('#Hexagons ul li:not(:nth-child('+($target.index()+1)+')').hasClass("notCurrent")){
            $(this).addClass("current");
            $('#Hexagons ul li:not(:nth-child('+($target.index()+1)+')').addClass("notCurrent");
            /*Adds a delay to the show*/
            $('#Hexagons ul li:not(:nth-child('+($target.index()+1)+')').animate({opacity: 0.5});

            /*Adds delay for content*/
            setTimeout(function(){
                $('#content li:nth-child('+($target.index()+1)+')').show();
                $('#content li:nth-child(8)').show();
                $('#content li:nth-child('+($target.index()+9)+')').show();
            }, 500);

            $('#content li:nth-child('+($(this).index()+1)+')').addClass("animated slideInLeft");
            $('#content li:nth-child(8)').addClass("animated fadeIn");
            $('#content li:nth-child('+($(this).index()+9)+')').addClass("animated slideInRight");
            $('html, body').animate({scrollTop: $("#lower").offset().top}, 2000);


        }else if($(this).hasClass("current")){
            $('#Hexagons ul li:not(:nth-child('+($target.index()+1)+')').animate({opacity: 1});

            $(this).removeClass("current");
            $('#Hexagons ul li:not(:nth-child('+($target.index()+1)+')').removeClass("notCurrent");




            setTimeout(function(){
                $('#content li:nth-child('+($target.index()+1)+')').removeClass("animated slideOutRight");
                $('#content li:nth-child(8)').removeClass("animated fadeOut");
                $('#content li:nth-child('+($target.index()+9)+')').removeClass("animated slideOutLeft");

                $('#content li:nth-child('+($target.index()+1)+')').hide();
                $('#content li:nth-child(8)').hide();
                $('#content li:nth-child('+($target.index()+9)+')').hide();
            }, 500);

            /*Transition out animations*/
            $('#content li:nth-child(8)').removeClass("animated fadeIn");
            $('#content li:nth-child(8)').addClass("animated fadeOut");

            $('#content li:nth-child('+($(this).index()+1)+')').removeClass("animated slideInLeft");
            $('#content li:nth-child('+($(this).index()+1)+')').addClass("animated slideOutRight");

            $('#content li:nth-child('+($(this).index()+9)+')').removeClass("animated slideInRight");
            $('#content li:nth-child('+($(this).index()+9)+')').addClass("animated slideOutLeft");
        }
    });
});
