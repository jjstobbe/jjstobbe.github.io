<template>
    <div>
        <app-nav></app-nav>
        <div class="wrapper">
            <router-view></router-view>
        </div>
        <div class="footer"></div>
    </div>
</template>

<script>
    import AppNav from './app-nav.vue';
    
    export default {
        name: 'app',
        components: {
            AppNav
        }
    }
    
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
</script>

<style>
* {
    margin: 0;
    padding: 0;
    -webkit-text-size-adjust: none;
}

html {
  height: 100%;
}

body {
  height: 100%;
  margin: 0;
  padding: 0;
  position: relative;
  font-family: sans-serif;
  background-color: #d6d6d6;
}

hr {
  margin: 0 auto;
}

#wrapper{
  min-height: 100%;
  height: auto !important;
  height: 100%;
  margin: 0 auto -420px;
  position: relative;
}

.footer, .push {
  clear: both;
  height: 420px;

  width:100%;
  background-image: url('./img/FooterImage3.png');
  background-position: center;
  background-size: cover;
  background-repeat: repeat-x;
}

li a{
  color: #dfdfdf;
  margin: 20px;
  padding: 3px;
  text-decoration: none;
}

header {
  display: inline-block;
  width: 100%;
  background-image: url('./img/TriangleBackground11.png');
  background-position: center;
  background-size: cover;
  z-index: 2;
  border: 0;
  margin: 0;
  padding: 0;
  min-height: 420px;
}

/*CSS for the loading screen*/
#loading {
     width: 100%;
     height: 100%;
     top: 0px;
     left: 0px;
     position: fixed;
     display: block;
     z-index: 99;
     text-align: center;
     background-color: #121212;
}

#loading-image {
     position: fixed;
     text-align: center;
     margin: 0 auto 0 auto;
     left: 0;
     right: 0;
     top: 100px;
     z-index: 100;
     background-color: rgb(55, 55, 55);
}

#Greeting {
  /*Edits the animation for the zoomIn effect*/
  -webkit-animation-duration: 1s;
  -webkit-animation-delay: .2s;
}

#Greeting h1 {
  text-align: center;
  color: #dfdfdf;
}

#Greeting h1 span{
  font-weight: lighter;
  position: relative;
  top: 100px;
  border-bottom: 1px solid #dfdfdf;
}

.deepshadow {
    color: #e0dfdc;
    letter-spacing: .1em;
    text-shadow: 0 -1px 0 #ffffff, 0 1px 0 #2e2e2e, 0 2px 0 #2c2c2c, 0 3px 0 #2a2a2a, 0 4px 0 #282828, 0 5px 0 #262626, 0 6px 0 #242424, 0 7px 0 #222222, 0 8px 0 #202020,
     0 9px 0 #1e1e1e, 0 10px 0 #1c1c1c, 0 11px 0 #1a1a1a, 0 12px 0 #181818, 0 13px 0 #161616, 0 14px 0 #141414, 0 15px 0 #121212, 0 22px 30px rgba(0, 0, 0, 0.9);
}

#Hexagons{
  max-width: 900px;
  margin: 0 auto;
}

#Hexagons ul{
  position: relative;
  margin: 0 auto;
  width: 400px;
  list-style: none;
}

#Hexagons li img{
  position: absolute;
  width: 200px;
  height: 220px;

  -webkit-transition: transform .3s ease-in-out;
}

#Hexagons img:hover {
  z-index: 2;
  -webkit-transform: scale(1.1);
  -moz-transform:    scale(1.1);
  -o-transform:      scale(1.1);
  -ms-transform:     scale(1.1);

  -webkit-transition: transform .3s ease-in-out;
}

#content li {
  text-align: center;
  display: none;
  font-size: 50px;
}

#divider1 {
  background-image: url('./img/TriangleDivider.png');
  padding:  0;
  height: 500px;
  background-position: center;
  background-repeat: repeat-x;
  background-size: contain;
}

#divider1 h1 {
  text-align: center;
  color: #dfdfdf;
}

#divider1 h1 span{
  font-weight: lighter;
  position: relative;
  top: 180px;
  border-bottom: 1px solid #dfdfdf;

  margin-top: 300px;
  margin-bottom: 300px;
}

#WorkPlaces {
  position: relative;
  margin: 0 auto;
  width: 800px;
  list-style: none;
  height: 530px;
}
#WorkPlaces img{
  position: absolute;
  width: 200px;
  height: 220px;
}
#WorkPlaces p{
  text-align: left;
  font-size: 25px;
  margin-top: 5px;
}

ul{
  list-style: none;
}
h1 {
  text-align: center;
  color: #15151A;
  font-size: 5em;
}

h3 {
  text-align: center;
  color: #15151A;
  font-size: 2em;
}

p {
  text-align: center;
  color: #15151A;
  font-size: 2em;
}

/*Navigation Bar*/
nav {
  margin: 0 auto 0 auto;
  text-align: center;
}

nav ul {
  list-style-position: inside;
  text-align: center;
  font-size: 2em;
  list-style: none;
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;

  background: transparent;
  /*Edits the animation for the pulse effect*/
  -webkit-animation-duration: 1s;
  -webkit-animation-delay: .5s;
}

nav ul li {
  display: inline-block;
  margin: 10px;
}

nav ul li a {
   color: #dfdfdf;
   margin: 20px;
   padding: 3px;
   text-decoration: none;
}

nav ul li a:hover:not(.active) {
  border-bottom: 2px solid #dfdfdf;
  color: white;
}

.active {
  border-bottom: 1px solid #dfdfdf;
  color: white;
}

/*Sets the highlight color*/
::selection {
  /*background: #ffb7b7;*/
  background: rgba(118, 121, 117, 0.79);
}
</style>