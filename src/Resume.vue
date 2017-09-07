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