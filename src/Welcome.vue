<template>
<div>
    <div id="0" class="Splash">
        <div class="center">
            <div class="typedContainer">
                <h2 class="typed"></h2>
            </div>
            <router-link :to="'Resume'"><button>Resume</button></router-link>
            <button @click="ContactLink">Contact Me</button>
        </div>
    </div>
    <div id="line1"></div>
    <div id="line2"></div>
    <div id="line3"></div>
</div>
</template>

<script>
    import Typed from 'typed.js'
    var options = {
        strings: ['I\'m a Designer', 'I\'m a Developer', 'I\'m Jack Stobbe'],
        typeSpeed: 60,
        backSpeed: 40
    }
    
    export default {
        name: 'about',
        mounted: () =>{
            var typed = new Typed('.typed', options);
        },
        methods: {
            ContactLink(){
                //Scrolls to contact section /* Vue Router didn't like the href */
                $('html, body').animate({
                    scrollTop: $("#Contact").offset().top
                 }, 400);
            }
        }
    }
</script>

<style lang="sass" scoped>
$Background_2: #272727
$Background: #2b2b2b
$Primary: #c5a47e
$Secondary: #FFFFFF

#line1, #line2, #line3
    position: absolute
    top: 0
    left: 25%
    height: 15px
    width: 1px
    background: linear-gradient(to top, darken(white, 20%), transparent)
    animation: dash linear infinite;
    animation-duration: 10s
    z-index: 60
    
@keyframes dash
    0%
        top: 0
    100%
        top: 300vh;

#line2
    left: 50%
    animation-duration: 5s
    
#line3
    left: 75%
    animation-duration: 15s

p
    color: $Secondary

img
    margin: 40px 0
    width: 550px
    text-align: center
    
.center
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    
button
    padding: 10px
    background-color: rgba($Background, 0.2)
    border: 1px solid white
    color: white
    margin: 20px 10px
    font-size: 1.5em
    font-family: RalewayR
    cursor: pointer
    transition: all 0.8s ease
    outline: none
    
button:hover
    background-color: white
    color: black

.typedContainer
    width: 95vw
    
.Splash
    height: 100vh
    width: 100vw
    
    h2
        display: inline
        margin: 0 auto
        padding: 0 0 5px 0
        width: 450px
        font-size: 3.6em
        color: $Secondary
</style>
























