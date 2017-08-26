<template>
<div id="ResumeWrapper">
    <router-link :to="'/'"><div id="Back">🡠</div></router-link>
    <iframe id="Resume"></iframe>
</div>
</template>

<script>
    export default {
        name: 'resume',
        mounted: ()=>{
            $('#Resume').attr('src', require('./img/Resume_01.pdf'));
            $('#ResumeObject').attr('data', require('./img/Resume_01.pdf'));
        }
    }
</script>

<style lang="sass">
$Background_2: #272727
$Background: #2b2b2b
$Primary: #c5a47e
$Secondary: #FFFFFF

html
    background-color: $Background
    
#Back
    position: fixed
    top: 0
    left: 0
    margin: 30px
    width: 70px
    height: 70px
    font-size: 2em
    text-align: center
    line-height: 70px
    color: white
    text-decoration: none
    border-radius: 50px
    background-color: lighten($Background_2, 10%)
    

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