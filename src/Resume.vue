<template>
<div id="ResumeWrapper">
    <router-link :to="'/'"><div id="Back">🡄</div></router-link>
    <iframe id="Resume"></iframe>
</div>
</template>

<script>
    export default {
        name: 'resume',
        mounted: ()=>{
            $('#Resume').attr('src', require('./img/Resume_01.pdf'));
        }
    }
</script>

<style lang="sass">
html
    background-color: #2b2b2b
    
#Back
    position: fixed
    top: 0
    left: 0
    height: 100px
    width: 100px
    font-size: 3em
    text-align: center
    line-height: 100px
    color: white
    text-decoration: none
    

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