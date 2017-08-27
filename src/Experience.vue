<template>
<div id='1' class="Wrapper">
    <div id="Experience">
        <h2>Technologies.</h2>
        <div class="FlexContainer">
            <div class="Left">
                <div class="innerL">
                    <span>Vue</span>
                    <span>Knockout</span>
                    <span>Sass / CSS</span>
                    <span>HTML5</span>
                    <span>C#</span>
                    <span>MVC Pattern</span>
                    <span>Java</span>
                    <span>JQuery</span>
                    <span>MySQL</span>
                    <span>Bootstrap</span>
                    <span>C</span>
                </div>
                <div class="innerR">
                    <label class="Star5"></label>
                    <label class="Star5"></label>
                    <label class="Star5"></label>
                    <label class="Star5"></label>
                    <label class="Star4"></label>
                    <label class="Star4"></label>
                    <label class="Star4"></label>
                    <label class="Star4"></label>
                    <label class="Star4"></label>
                    <label class="Star4"></label>
                    <label class="Star3"></label>
                </div>
            </div>
            <div class="Right">
                <div class="innerL">
                    <span>ES2015</span>
                    <span>REST APIs</span>
                    <span>Responisive Design</span>
                    <span>Git</span>
                    <span>NPM</span>
                    <span>Agile Development</span>
                    <span>Illustrator</span>
                    <span>Photoshop</span>
                    <span>Webpack</span>
                    <span>UNIX</span>
                </div>
                <div class="innerR">
                    <label class="Star5"></label>
                    <label class="Star5"></label>
                    <label class="Star4"></label>
                    <label class="Star4"></label>
                    <label class="Star4"></label>
                    <label class="Star4"></label>
                    <label class="Star4"></label>
                    <label class="Star4"></label>
                    <label class="Star4"></label>
                    <label class="Star3"></label>
                </div>
            </div>
        </div>
    </div>
    <div id="Jobs">
        <h2>Jobs.</h2>
        <div class="Job">
            <a href="https://buildertrend.com/"><h4>Buildertrend</h4></a>
            <span>May 2017 - August 2017</span>
            <label>This summer I had the opportunity to work at buildertrend! I worked on an application to handle all of the feature requests they recieve for their software. It is designed to streamline the Product and Development team's workflow. We built it using C# Web API with Knockout.js as a front-end. I learned quite a bit and I worked with some amazing people!</label>
        </div>
        <div class="Job">
            <a href="https://nufoundation.org/"><h4>Nebraska Foundation</h4></a>
            <span>March 2016 - May 2017</span>
            <label>My Freshman year I worked with the University of Nebraska Foundation. They had me do a huge variety of different things. From generic IT work, to web development, to SQL database maintenance, to Java bug fixes.</label>
        </div>
    </div>
</div>
</template>

<script>
    export default {
        name: 'Experience'
    }
</script>

<style lang="sass" scoped>
$Background_2: #272727
$Background: #2b2b2b
$Primary: #c5a47e
$Secondary: #FFFFFF


.Wrapper
    width: 100%
    background-color: $Secondary
    z-index: 1

#Experience
    color: black
    max-width: 800px
    margin: 0 auto
    
.FlexContainer
    display: flex
    margin: 0 auto 20px auto
    justify-content: center
    align-items: center

.Left, .Right
    display: flex
    justify-content: space-between
    width: 49%
    
.Left
    margin-right: 60px
    
span
    text-align: left
    display: block

#Jobs
    max-width: 800px
    margin: 0 auto
    padding-bottom: 40px
    
.Job
    width: 100%
    margin-bottom: 20px
        
    h4, label
        text-align: left
        display: block
        margin: 0
        
    h4
        font-size: 1.2em
    
    span
        font-size: 0.8em
        margin: 0 0 5px 0
        

@media only screen and (max-width: 800px) 
    #Jobs, #Experience
        margin: 0 10px
    
@media only screen and (max-width: 600px)    
    .Left, .Right
        width: 100%
        max-width: 350px
        margin: 20px
    
    h2
        font-size: 2.5em !important
    
    .FlexContainer
        flex-direction: column


span, label::after
    margin: 15px 0
    font-size: 1.4em
    display: block
    line-height: 20px
    
.Star5::after
    content: '★★★★★'
    
.Star4::after
    content: '★★★★☆'

.Star3::after
    content: '★★★☆☆'

h2
    padding: 0 30px
    color: $Primary
    display: inline-block
    border-bottom: 1px solid $Background
</style>