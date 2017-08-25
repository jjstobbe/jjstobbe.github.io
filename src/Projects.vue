<template>
<div class="Wrapper">
    <div class="Center">
        <div>
            <h2>Projects.</h2>
        </div>            
        <div class="Project">
            <figure class="fig">
              <img src="./img/Map.png" />
              <figcaption>
                <h3>Software Engineering Project</h3>
                <p>A team of fellow students and I built an application to find optimal truck routes using the Google Maps API. It takes in locations, groups them using K-Means clustering, and brute-forces the Traveling Salesman Problem to find an optimal path.</p>
              </figcaption>
            </figure>
        </div>
        <div class="Project website">
            <figure class="fig">
              <img src="./img/Website.png" />
              <figcaption>
                <h3>This Website</h3>
                <p>This website is obviously a project of mine. I spent about a week working on this site. It uses Vue components, Sass, ES2016, webpack, and particles.js.</p>
              </figcaption>
            </figure>
        </div>
        <div class="Project">
            <figure class="fig">
              <img src="./img/Buildertrend.png" />
              <figcaption>
                <h3>Feature Request Web App</h3>
                <p>I helped develop a Feature Request tracking application for buildertrend. We built it using C# .NET WebAPI and KnockoutJS. I learned a ton of Javascript and got more comfortable with C#.</p>
              </figcaption>
            </figure>
        </div>
        <div class="Project">
            <figure class="fig">
              <img src="./img/IT_Innovation.png" />
              <figcaption>
                <h3>IT Innovation Cup</h3>
                <p>My team created a virtual reality driving simulator to
                    help driving students learn how to drive before actually entering a car</p>
              </figcaption>
            </figure>
        </div>
        <div class="Project">
            <a @click="redirectToDashboard()">
                <figure class="fig">
                  <img src="./img/Dashboard.png" />
                  <figcaption>
                    <h3>Personal Dashboard</h3>
                    <p>I built a personal dashboard to keep track of the weather, my To-Do's and keep a calendar of events. I built it as a single-page web application to practice Javascript. It also has an authentication system and supports a variety of operations.</p>
                  </figcaption>
                </figure>
            </a>
        </div>
        <div class="Project">
            <figure class="fig">
              <img src="./img/Minesweeper.png" />
              <figcaption>
                <h3>Minesweeper Game</h3>
                <p>Just a simple minesweeper clone I made in a few hours. It's fully responsive and I will be adding modifications soon. Click to play</p>
              </figcaption>
            </figure>
        </div>
    </div>
</div>
</template>

<script>
    export default {
        name: 'projects',
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

img
    width: 30vw
    display: block
    border-left: 1px solid $Primary
    margin: 0 10px
    
label
    font-weight: bold
    font-size: 1.2em
    
.Project
    display: inline-block
    
h2
    color: $Primary
    border-bottom: 1px solid black
    display: inline-block
    padding: 0 30px
    
.Center
    max-width: 80vw
    margin: 0 auto
    
.Wrapper
    background-color: $Secondary
    padding: 30px 0
@media only screen and (max-width: 1300px)
    .Center
        max-width: 98vw
        
    img
        width: 90vw
        
.website img
    border: 2px solid black
    border-left: 1px solid $Primary
        
figure:hover img 
	opacity: .5
    
/* Figure Animations below */
.fig
    cursor: pointer
    font-family: 'Raleway', Arial, sans-serif
    position: relative
    overflow: hidden
    margin: 10px 1%
    max-height: 600px
    width: 100%
    background: transparent
    text-align: center

.fig * 
    -webkit-box-sizing: border-box
    box-sizing: border-box
    -webkit-transition: all 0.35s ease-in-out
    transition: all 0.35s ease-in-out

.fig figcaption 
    position: absolute
    top: 5%
    left: 20px
    right: 40%
    padding: 15px 20px
    background-color: #ffffff
    box-shadow: 8px 8px 15px rgba(0, 0, 0, 0.6)
    z-index: 1
    -webkit-transform: translateX(20px)
    transform: translateX(20px)
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
    -webkit-transform: translateX(20px)
    transform: translateX(20px)

.fig:hover figcaption,
.fig.hover figcaption 
    -webkit-transform: translateX(0px)
    transform: translateX(0px)
    opacity: 1
</style>