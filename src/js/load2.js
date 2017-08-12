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

    var $current = $('#Hexagons ul li:nth-child(1)');
    $("#Hexagons ul li").click(function(){
        var $target = $(this);
        /*Select a hexagon when no other hexagon is selected*/

        if(!$(this).hasClass("current") && !$('#Hexagons ul li:not(:nth-child('+($target.index()+1)+')').hasClass("notCurrent")){
            $(this).addClass("current");
            $current = $(this);
            $('#Hexagons ul li:not(:nth-child('+($target.index()+1)+')').addClass("notCurrent");
            /*Adds a delay to the show*/
            $('#Hexagons ul li:not(:nth-child('+($target.index()+1)+')').animate({opacity: 0.7});

            /*Adds delay for content*/
            setTimeout(function(){
                $('#content li:nth-child('+($target.index()+1)+')').show();
                $('#content li:nth-child(8)').show();
                $('#content li:nth-child('+($target.index()+9)+')').show();
            }, 500);

            $('#content li:nth-child('+($(this).index()+1)+')').addClass("animated fadeInLeft");
            $('#content li:nth-child(8)').addClass("animated fadeIn");
            $('#content li:nth-child('+($(this).index()+9)+')').addClass("animated fadeInRight");
            $('html, body').animate({scrollTop: $("#lower").offset().top}, 2000);

            /*If you select a different hexagon while one is currently selected */
        }else if($(this).hasClass("notCurrent")){

            /*Changes opacity*/
            $(this).animate({opacity: 1});
            $current.animate({opacity: 0.7});


            /*Changes classes to match the new state*/
            $current.removeClass("current");
            $current.addClass("notCurrent");
            $(this).removeClass("notCurrent");
            $(this).addClass("current");

            /*Transitions out*/
            $('#content li:nth-child(8)').removeClass("fadeIn");
            $('#content li:nth-child(8)').addClass("animated fadeOut");

            $('#content li:nth-child('+($current.index()+1)+')').removeClass("fadeInLeft");
            $('#content li:nth-child('+($current.index()+1)+')').addClass("animated slideOutRight");

            $('#content li:nth-child('+($current.index()+9)+')').removeClass("fadeInRight");
            $('#content li:nth-child('+($current.index()+9)+')').addClass("animated slideOutLeft");

            /*Sets a delay so that animations complete*/
            setTimeout(function(){
                /*Removes the transition out animations*/
                $('#content li:nth-child('+($current.index()+1)+')').removeClass("slideOutRight");
                $('#content li:nth-child(8)').removeClass("fadeOut");
                $('#content li:nth-child('+($current.index()+9)+')').removeClass("slideOutLeft");

                $('#content li:nth-child('+($current.index()+1)+')').hide();
                $('#content li:nth-child(8)').hide();
                $('#content li:nth-child('+($current.index()+9)+')').hide();

                /*Transition in animations*/
                $('#content li:nth-child('+($target.index()+1)+')').show();
                $('#content li:nth-child(8)').show();
                $('#content li:nth-child('+($target.index()+9)+')').show();

                $('#content li:nth-child('+($target.index()+1)+')').addClass("animated fadeInLeft");
                $('#content li:nth-child(8)').addClass("animated fadeIn");
                $('#content li:nth-child('+($target.index()+9)+')').addClass("animated fadeInRight");

                /*redfines current to new value*/
                $current = $target;
            }, 500);

            /*Transition out animations*/


            /*Transition in animations*/


        }
    });
});
