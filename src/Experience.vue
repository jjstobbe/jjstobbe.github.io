<template>
    <div>
        <div id="Java" class="skillL animated fadeIn" >
          <img src="./img/JavaHex2.png" />
          <p>
              Java was my first programming language. I have about 3 years of development experience. I'm most comfotable in application design. Check out the projects tab for more details!
          </p>
        </div>

        <div class="Divider"></div>

        <div id="Photoshop" class="skillR animated fadeIn">
          <a href="gallery.html"><img src="./img/PhotoshopHex2.png" /></a>
          <p>
            I have used photoshop for editing images for presentations, creating textures for game development, and even for making all of the images on this site.
          </p>
        </div>

        <div class="Divider"></div>

        <div id="C" class="skillL animated fadeIn">
          <img src="./img/CHex2.png" />
          <p>
            C is the second programming langage I learned. I have about 1 year worth of development experince. I've used C primarily for application development.
          </p>
        </div>

        <div class="Divider"></div>

        <div class="skillR hideme">
          <img src="./img/HTMLCSSHex2.png" />
          <p>
            This is my first shot at web development. I have a couple weeks of experience. I created this website from nothing out of HTML and CSS.
          </p>
        </div>

        <div class="Divider"></div>

        <div class="skillL hideme">
          <img src="./img/BlenderHex2.png" />
          <p>
            Blender is a 3D modeling application that I learned how to use for game development. I created many 3D models for a driving simulator. See the projects tab for more details!
          </p>
        </div>

        <div class="Divider"></div>

        <div class="skillR hideme">
          <img src="./img/JQueryHex2.png" />
          <p>
            I use JQuery to animate everything on this website! Only a few weeks of experience, but I'm learning quickly!
          </p>
        </div>

        <div class="Divider"></div>

        <div class="skillL hideme">
          <img src="./img/SQLHex2.png" />
          <p>
            I've had exposure to SQL from a few projects. I have a basic understanding of SQL, but I'm still getting better!
          </p>
        </div>

        <div id="divider1"><h1><span>But, where have I worked?</span></h1></div>

        <hr width="100%" style="margin-top:10px;  margin-bottom:10px;"/>

        <div id="WorkPlaces">
            <div id="Foundation" class="hideme" style="margin-top: 20px;">
            <img src="./img/FoundationHex2.png"/>
                <h2>University of Nebraska Foundation</h2>
                <h4>Information Technology Intern</h4>
                <p>
                    I am currently working as a software development/IT intern at the Unviersity of Nebraska Foundation. My responsibilities include general website
                    maintaince, optimization of service desk tasks, back-end Java application modification, etc.
                </p>
            </div>

            <hr width="100%" style="margin-top:70px;  margin-bottom:30px;"/>

            <div id="Chess" class="hideme">
                <img src="./img/ChessHex2.png" id="ChessImg"/>
                <div id="ChessText">
                  <h2>Omaha Central Chess</h2>
                  <h4>Teacher and tournament proctor</h4>
                  <p>
                      Last summer I taught many middle school students how to play chess as well as some basic strategy.
                      It was great to teach them about the game while also having some fun.
                  </p>
                </div>
            </div>
        </div>

        <hr width="100%" style="margin-top:10px;  margin-bottom:10px;"/>
    </div>
</template>

<script>
    export default {
        name: 'Experience'
    }
</script>

<style>
    #Java {
      -webkit-animation-duration: .5s;
      -webkit-animation-delay: .4s;
    }

    #Photoshop {
      -webkit-animation-duration: .5s;
      -webkit-animation-delay: .7s;
    }

    #C {
      -webkit-animation-duration: .5s;
      -webkit-animation-delay: 1s;
    }

    #Greeting {
      /*Edits the animation for the zoomIn effect*/
      -webkit-animation-duration: 1s;
      -webkit-animation-delay: .7s;
    }

    .deepshadow {
        color: #e0dfdc;
        letter-spacing: .1em;
        text-shadow: 0 -1px 0 #ffffff, 0 1px 0 #2e2e2e, 0 2px 0 #2c2c2c, 0 3px 0 #2a2a2a, 0 4px 0 #282828, 0 5px 0 #262626, 0 6px 0 #242424, 0 7px 0 #222222, 0 8px 0 #202020,
         0 9px 0 #1e1e1e, 0 10px 0 #1c1c1c, 0 11px 0 #1a1a1a, 0 12px 0 #181818, 0 13px 0 #161616, 0 14px 0 #141414, 0 15px 0 #121212, 0 22px 30px rgba(0, 0, 0, 0.9);
    }

    .hideme {
      opacity: 0;
    }

    .skillL {
      margin: 0 auto;
      max-width: 70%;
      min-width: 400px;
    }

    .skillR {

      margin: 0 auto;
      max-width: 70%;
      min-width: 400px;
    }

    .skillL img:hover{
      z-index: 2;
      -webkit-transform: scale(1.1);
      -moz-transform:    scale(1.1);
      -o-transform:      scale(1.1);
      -ms-transform:     scale(1.1);

      -webkit-transition: transform .3s ease-in-out;
    }

    .skillR img:hover{
      z-index: 2;
      -webkit-transform: scale(1.1);
      -moz-transform:    scale(1.1);
      -o-transform:      scale(1.1);
      -ms-transform:     scale(1.1);

      -webkit-transition: transform .3s ease-in-out;
    }

    .skillL p{
      color: 	#404040;
      font-weight: bold;
      display: table-cell;
      height: 240px;
      vertical-align: middle;
      text-align: right;
    }

    .skillR p{
      color: 	#404040;
      font-weight: bold;
      display: table-cell;
      height: 240px;
      vertical-align: middle;
      text-align: left;
    }

    .skillL img {
      display: inline-block;;
      vertical-align: middle;

      float: left;
      width: 170px;
      height: 185px;
      margin-right: 20px;
      margin-top: 25px;
    }

    .skillR img {
      display: table-cell;
      vertical-align: middle;

      float: right;
      width: 170px;
      height: 185px;
      margin-left: 20px;
      margin-top: 25px;
    }

    .Divider {
      background-image: url("./img/HexDivider.png");
      background-size: 80px 5px;
      background-repeat: repeat-x;
      height: 10px;
    }




    #divider1 {
      background-image: url('./img/TriangleDivider.png');
      padding:  0;
      height: 500px;
      margin-top: 10px;
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
      display: block;
      clear: both;
      position: relative;
      margin: 0 auto;
      max-width:70%;
      list-style: none;
    }

    #WorkPlaces img{
      float: left;
      position: relative;
      width: 200px;
      height: 220px;
      padding: 0px 50px 40px 0;
    }

    #WorkPlaces img:hover {
      z-index: 2;
      -webkit-transform: scale(1.1);
      -moz-transform:    scale(1.1);
      -o-transform:      scale(1.1);
      -ms-transform:     scale(1.1);

      -webkit-transition: transform .3s ease-in-out;
    }

    #WorkPlaces p{
      font-family: Raleway;
      font-weight: bold;
      color: 	#333333;
      text-align: left;
      font-size: 1.5em;
      margin-top: 5px;
    }

    #WorkPlaces h2{
      font-size: 1.7em;
    }

    #WorkPlaces h4{
      font-size: 1.1em;
    }
</style>