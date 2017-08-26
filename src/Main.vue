<template>
    <div id="Container">
        <vue-particles
            color="#dedede"
            :particleOpacity="0.7"
            :particlesNumber="65"
            shapeType="circle"
            :particleSize="3.5"
            linesColor="#c5a47e"
            :linesWidth="1"
            :lineLinked="true"
            :lineOpacity="0.3"
            :linesDistance="150"
            :moveSpeed="1.5"
            :hoverEffect="true"
            hoverMode="grab"
            :clickEffect="true"
            clickMode="push"
        >
        </vue-particles>
        <Welcome></Welcome>
        <Experience></Experience>
        <Projects></Projects>
        <Contact></Contact>
    </div>
</template>

<script>
    import Welcome from './Welcome.vue'
    import Experience from './Experience.vue'
    import Contact from './Contact.vue'
    import Projects from './Projects.vue'
    
    export default {
        name: 'main',
        components: {
            Welcome,
            Experience,
            Projects,
            Contact
        }
    }
</script>

<style lang="sass">
$Background_2: #272727
$Background: #2b2b2b
$Primary: #c5a47e
$Secondary: #FFFFFF

@font-face 
    font-family: "RalewayR"
    src: url('./fonts/Raleway-Regular.ttf') format('opentype')

@font-face 
    font-family: "Raleway"
    src: url('./fonts/Raleway-Thin.ttf') format('opentype')

$background: #FFFFFF

a
    outline: none
    color: $Background
    text-decoration: none

#particles-js
    height: 100vh
    width: 100vw
    position: fixed
    z-index: -1
    display: block
    background: $Background
    box-shadow: 0 0 5px black

html
    overflow-x: hidden
    background-color: $Background
    
body
    margin: 0 auto
    text-align: center
    font-family: RalewayR

#Container h2
    font-family: RalewayR
    font-size: 3em
    
#Container p
    font-family: Raleway
    font-size: 1.7em
    font-weight: bold
    
::-webkit-scrollbar 
    width: 10px

 
::-webkit-scrollbar-track 
    background-color: #424242

 
::-webkit-scrollbar-thumb 
    background-color: #323232

.typed-cursor
    color: white
    font-size: 3em
    position: relative
    opacity: 0
    margin-left: 2px
    animation: blink .75s step-end infinite


@keyframes blink
    0% 
        opacity: 0
    50%
        opacity: 1
    100%
        opacity: 0
    
::selection
    background-color: darken(white, 20%)
</style>