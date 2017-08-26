<template>
<div>
    <router-link :to="'/'"><div id="Back">🡄</div></router-link>
    <div id="wrapper">
        <div id="images">
          <ul>
            <li><img src="./img/Photoshop/HenryDoorlyGeofilter.png"></li>
            <li><img src="./img/Photoshop/SquirelyPoly3.1.png"></li>
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
    
li
    list-style: none

#images img
    max-width: 80%
    text-align: center
    
html
    text-align: center
    background-color: #2b2b2b
</style>