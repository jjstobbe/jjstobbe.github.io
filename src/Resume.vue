<template>
<div id="ResumeWrapper">
    <router-link :to="'/'"><div class="Back"><img src="./img/arrow-right.png"></div></router-link>
    <iframe id="Resume"></iframe>
</div>
</template>

<script>
    export default {
        name: 'resume',
        mounted: ()=>{
            $('#Resume').attr('src', require('./img/JackStobbeResume.pdf'));
        }
    }
</script>

<style lang="sass">
$Background_2: #272727
$Background: #2b2b2b
$Primary: #c5a47e
$Secondary: #FFFFFF
    
.Back
    position: fixed
    top: 0
    left: 0
    margin: 30px
    width: 50px
    height: 50px
    text-decoration: none
    border-radius: 50px
    background-color: lighten($Background_2, 20%)
    text-align: center
    
    img
        width: 20px
        height: 20px
        margin-top: 14px
        filter: brightness(0) invert(1)
        box-shadow: none
        display: inline-block
        transform: rotate(180deg)
        
html
    background-color: $Background
    
#Resume
    display: block
    margin: 0 auto
    max-width: 1500px
    width: 100%
    height: 1200px
    
@media only screen and (max-width: 900px) 
    #Resume
        margin: 0 10px
</style>