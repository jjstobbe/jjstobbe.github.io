<template>
<div id='1' class="Wrapper">
    <div id="Experience">
        <h2>Technologies.</h2>
        <div class="FlexContainer">
            <div class="Left">
                <div class="innerL">
                    <span>Vue</span>
                    <span>C#</span>
                    <span>Knockout</span>
                    <span>Java</span>
                    <span>Sass / CSS</span>
                    <span>JQuery</span>
                    <span>SQL</span>
                </div>
                <div class="innerR">
                    <label class="Star5"></label>
                    <label class="Star5"></label>
                    <label class="Star5"></label>
                    <label class="Star5"></label>
                    <label class="Star5"></label>
                    <label class="Star5"></label>
                    <label class="Star5"></label>
                </div>
            </div>
            <div class="Right">
                <div class="innerL">
                    <span>Webpack</span>
                    <span>ES2015</span>
                    <span>REST APIs</span>
                    <span>UNIX</span>
                    <span>Illustrator</span>
                    <span>Photoshop</span>
                </div>
                <div class="innerR">
                    <label class="Star5"></label>
                    <label class="Star5"></label>
                    <label class="Star5"></label>
                    <label class="Star5"></label>
                    <label class="Star5"></label>
                    <label class="Star5"></label>
                </div>
            </div>
        </div>
    </div>
    <div id="Jobs">
        <h2>Jobs.</h2>
        <div class="Job">
            <h4>Buildertrend</h4>
            <span>May 2017 - August 2017</span>
            <label>This summer I had the opportunity to work at buildertrend! I worked no an application to handle all of the feature requests they recieve for their software. It is designed to streamline the Product and Development team's workflow. We built it using C# Web API with Knockout.js as a front-end. I learned quite a bit and I worked with some amazing people!</label>
        </div>
        <div class="Job">
            <h4>Nebraska Foundation</h4>
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