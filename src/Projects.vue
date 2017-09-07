<template>
<div class="Wrapper">
    <div>
        <h2>Projects.</h2>
    </div>
    <div id="ArrowContainer">
        <transition name="fade" mode="out-in">
            <div class="Arrow Left" key="arrow1" v-on:click="offset -= 1" v-if="offset == 1"><img src="./img/arrow-right.png"> </div>
            <div class="Arrow Right" key="arrow2" v-on:click="offset += 1" v-if="offset == 0" ><img src="./img/arrow-right.png"></div>
        </transition>
    </div>
    <div class="CenterProject">
        <div class="Project">
            <router-link :to="'Gallery'">
            <figure class="fig">
              <img src="./img/WFF.png" />
              <div class="Overlay"><span>Water For Food</span></div>
              <figcaption>
                <h3>Graphic Design Projects</h3>
                <p>I've dabbled in graphic design. I've created things from assets for game design, to snapchat filters, to logos, to icons. Click to check out a gallery.</p>
              </figcaption>
            </figure>
        </router-link>
        </div><!--
        --><div class="Project">
            <figure class="fig">
              <img src="./img/Map.png" />
              <div class="Overlay"><span>Truck Optimization</span></div>
              <figcaption>
                <h3>Software Engineering Project</h3>
                <p>A team of fellow students and I built an application to find optimal truck routes using the Google Maps API. It takes in locations, groups them using K-Means clustering, and brute-forces the Traveling Salesman Problem to find an optimal path.</p>
              </figcaption>
            </figure>
        </div><!--
        --><div class="Project">
            <figure class="fig">
              <img src="./img/Website.png" />
              <div class="Overlay"><span>Interactive Resume</span></div>
              <figcaption>
                <h3>This Website</h3>
                <p>This website is obviously a project of mine. I spent about a week working on this site. It uses Vue components, Sass, ES2016, webpack, and particles.js.</p>
              </figcaption>
            </figure>
        </div><!--
        --><div class="Project">
            <figure class="fig">
              <img src="./img/Buildertrend.png" />
              <div class="Overlay"><span>Buildertrend</span></div>
              <figcaption>
                <h3>Feature Request Web App</h3>
                <p>I helped develop a Feature Request tracking application for buildertrend. We built it using C# .NET WebAPI and KnockoutJS. I learned a ton of Javascript and got more comfortable with C#.</p>
              </figcaption>
            </figure>
        </div><!--
        --><div class="Project">
            <figure class="fig">
              <img src="./img/IT_Innovation.png" />
              <div class="Overlay"><span>IT Innovation Cup</span></div>
              <figcaption>
                <h3>IT Innovation Cup</h3>
                <p>My team created a virtual reality driving simulator to
                    help driving students learn how to drive before actually entering a car</p>
              </figcaption>
            </figure>
        </div><!--
        --><div class="Project">
            <a @click="redirectToDashboard()">
                <figure class="fig">
                  <img src="./img/Dashboard.png" />
                  <div class="Overlay"><span>Personal Dashboard</span></div>
                  <figcaption>
                    <h3>Personal Dashboard</h3>
                    <p>I built a personal dashboard to keep track of the weather, my To-Do's and keep a calendar of events. I built it as a single-page web application to practice Javascript. It also has an authentication system and supports a variety of operations.</p>
                  </figcaption>
                </figure>
            </a>
        </div><!--
        --><div class="Project">
        <router-link :to="'Gallery'">
            <figure class="fig">
              <img src="./img/PhotoshopProjects.png" />
              <div class="Overlay"><span>Graphic Design</span></div>
              <figcaption>
                <h3>Graphic Design Projects</h3>
                <p>I've dabbled in graphic design. I've created things from assets for game design, to snapchat filters, to logos, to icons. Click to check out a gallery.</p>
              </figcaption>
            </figure>
        </router-link>
        </div><!--
        --><div class="Project">
        <a href="/Minesweeper">
            <figure class="fig">
              <img src="./img/Minesweeper.png" />
              <div class="Overlay"><span>Minesweeper</span></div>
              <figcaption>
                <h3>Minesweeper</h3>
                <p>I made a fully functional minesweeper clone in Knockout.js. I'll be adding more functionality to it soon. Click here to play!</p>
              </figcaption>
            </figure>
        </a>
        </div>
    </div>
</div>
</template>

<script>
    export default {
        name: 'projects',
        data: ()=> {
            return {
                offset: 0  
            }
        },
        watch: {
            offset: function (val) {
                if(val < 0) this.offset = 0;
                else if(val > 1) this.offset = 1;
                else {
                    $('.CenterProject').css('right',val*33.33+'vw');
                }
            }
        },
        methods: {
            redirectToDashboard: () => {    
                if (document.cookie.indexOf('authToken') != -1 ) {
                    window.location.href='/dashboard';
                }else{
                    var object = new Object();
                    object.username = 'guest'
                    object.password = 'guest'
                    var dataObject = JSON.stringify(object);
                    $.ajax
                    ({
                      type: "POST",
                      url: "https://baas.kinvey.com/user/kid_BJFBIVmX-/login",
                      data: dataObject,
                      headers: {
                        "Authorization": "Basic " + btoa("guest:guest"),
                        "Content-Type": "application/json"
                      },success: function(data){
                          document.cookie = "authToken="+data._kmd.authtoken;
                          window.location.href = "/dashboard";
                      }
                    });   
                }
            }
        }
    }
</script>

<style lang="sass" scoped>
$Background_2: #272727
$Background: #2b2b2b
$Primary: #c5a47e
$Secondary: #FFFFFF

$ImgWidth: 33.33vw
$ImgHeight: 22.22vw
$NumImages: 3

#ArrowContainer
    position: absolute
    width: 100vw
    height: 2*$ImgHeight

.Arrow
    position: absolute
    top: 50%    
    transform: translateY(-50%)
    z-index: 6
    width: 45px
    height: 45px
    font-size: 1em
    border-radius: 50px
    background-color: lighten($Background_2, 40%)
    box-shadow: 0 0px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)
    cursor: pointer
    opacity: 0.7
    transition: opacity 0.35s ease-in-out
    
    img
        width: 20px
        height: 20px
        margin-top: 12px
        filter: brightness(0) invert(1)
        box-shadow: none
        display: inline-block
        
    
.Arrow:hover
    opacity: 1
    
.fade-enter-active:hover, .fade-leave-active:hover
    opacity: 0
    
.Left
    left: 0
    margin-left: 30px
    
    img
        transform: rotate(180deg)
    
.Right
    right: 0
    margin-right: 30px

img
    width: $ImgWidth
    height: (2/3)*$ImgWidth
    display: block
    box-shadow: 0 0px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)
    
label
    font-weight: bold
    font-size: 1.2em

.Overlay
    padding: 20px
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 2
    background: linear-gradient(to bottom, rgba($Background, 0.3), transparent)
    color: white
    font-family: RalewayR
    text-transform: uppercase
    
    span
        opacity: 1
        padding: 5px 10px
        letter-spacing: 2px
        background: linear-gradient(to bottom, rgba($Background, 0.4), rgba($Background, 0.3))
        transition: all 0.5s ease
        

.Project
    display: inline-block
    text-align: left
    
h2
    color: $Primary
    border-bottom: 1px solid black
    display: inline-block
    padding: 0 30px
    
.CenterProject
    margin: 0 auto
    width: $ImgWidth*4
    text-align: left
    position: relative
    right: 0
    transition: all 0.5s ease-in-out
    
.Wrapper
    background-color: $Secondary
    
@media only screen and (max-width: 1200px)
    img
        width: 100vw
        height: auto
        
    #ArrowContainer
        display: none
        
    .Overlay span
        font-size: 20px
        
    .fig figcaption
        display: none
        
@media only screen and (max-width: 600px)
    #Container h2
        font-size: 2.5em
        
figure:hover 
    .Overlay
        span
            letter-spacing: 20px
            opacity: 0
            background: linear-gradient(to bottom, rgba($Background, 0.2), rgba($Background, 0))

.fade-enter-active, .fade-leave-active 
    transition: opacity 0.35s ease

.fade-enter, .fade-leave-to
    opacity: 0

    
/* Figure Animations below */
.fig
    cursor: pointer
    font-family: 'Raleway', Arial, sans-serif
    position: relative
    overflow: hidden
    margin: 0
    width: 100%
    background: transparent
    text-align: left

.fig * 
    -webkit-box-sizing: border-box
    box-sizing: border-box
    -webkit-transition: all 0.35s ease-in-out
    transition: all 0.35s ease-in-out

.fig figcaption 
    position: absolute
    width: 80%
    top: 5%
    left: 20px
    right: 40%
    padding: 15px 20px
    background-color: #ffffff
    box-shadow: 8px 8px 15px rgba(0, 0, 0, 0.3)
    transition: all 0.35s ease-in-out
    transition-delay: 0.25s
    z-index: 4
    opacity: 0

.fig h3 
    color: #000000
    margin: 0
    font-weight: 800
    text-transform: uppercase
    border-bottom: 1px solid #ddd
    padding: 7px

figure.fig figcaption p 
    font-size: 1.3em !important
    font-weight: 500

.fig:hover img,
.fig.hover img 
    transform: scale(1.02)

.fig:hover figcaption,
.fig.hover figcaption 
    opacity: 1
</style>