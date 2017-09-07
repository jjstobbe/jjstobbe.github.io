<template>
<div>
    <router-link :to="'/'"><div class="Back"><img src="./img/arrow-right.png"></div></router-link>
    <div id="wrapper">
        <div id="images">
          <ul>
            <li><img src="./img/Photoshop/HenryDoorlyGeofilter.png"></li>
            <li><img src="./img/PhotoshopProjects.png"></li>
            <li><img src="./img/Photoshop/Symbols.png"></li>
            <li><img src="./img/Photoshop/Landscape_02.png"></li>
            <li><img src="./img/Photoshop/WaveArt.png"></li>
            <li><img src="./img/Photoshop/PlaylistSlide3.png"></li>
            <li><img src="./img/Photoshop/TigerPoly3.png"></li>
            <li><img src="./img/Photoshop/MemorialSnapchatFinal5.2.png"></li>
          </ul>
        </div>
      </div>    
</div>
</template>

<script>
    export default {
        name: 'gallery'
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
        
        
li
    list-style: none

#images img
    max-width: 80%
    text-align: center
    
html
    text-align: center
    background-color: #2b2b2b
</style>