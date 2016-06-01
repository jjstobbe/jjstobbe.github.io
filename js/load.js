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
        if(!$(this).hasClass("current")){
            $(this).addClass("current");

            /*Adds a delay to the show*/
            setTimeout(function(){
                $('#Hexagons ul li:not(:nth-child('+($target.index()+1)+')').hide();
                $('#Hexagons span').show();
                $('#Hexagons span').addClass("animated slideInRight");
                $('#Hexagons span').css('display','block');
            }, 500);
            $('#Hexagons ul li:not(:nth-child('+($(this).index()+1)+')').addClass("animated fadeOut");

            /*Adds delay for content*/
            setTimeout(function(){
                $('#content li:nth-child('+($target.index()+1)+')').show();
            }, 500);

            $('#content li:nth-child('+($(this).index()+1)+')').addClass("animated slideInLeft");


        }else{
            $('#Hexagons ul li:not(:nth-child('+($(this).index()+1)+')').removeClass("animated fadeOut");
            $('#Hexagons ul li:not(:nth-child('+($(this).index()+1)+')').addClass("animated fadeIn");
            $('#Hexagons ul li:not(:nth-child('+($(this).index()+1)+')').show();
            $(this).removeClass("current");
            $('#Hexagons span').hide();

            $('#content li:nth-child('+($(this).index()+1)+')').hide();
        }
    });
});
