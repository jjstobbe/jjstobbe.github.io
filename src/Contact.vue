<template>
    <div class="Wrapper" id="Contact">
        <div>
            <h3>Let's build something together</h3>
        </div>
        <div id="inputL">        
            <input id="name" placeholder="Name" type="text">
            <input id="email" placeholder="Email" type="text">
        </div>

        <div id="inputR">      
            <textarea id="content" placeholder="Message" rows="5"></textarea>
        </div>
        
        <button @click="SendEmail">Submit</button>
    </div>
</template>

<script>
    export default {
        name: 'contact',
        methods: {
            SendEmail(){
                var object = new Object();
                object.name = $('#name').val();
                object.email = $('#email').val();
                object.content = $('#content').val();
                
                var dataObject = JSON.stringify(object);
                $.ajax
                ({
                  type: "POST",
                  url: "https://baas.kinvey.com/appdata/kid_BJFBIVmX-/Messages",
                  data: dataObject,
                  headers: {
                    "Authorization": "Basic " + btoa("guest:guest"),
                    "Content-Type": "application/json"
                  },success: function(data){
                      console.log('success');
                  }
                }); 
            }
        }
    }
</script>

<style lang="sass" scoped>
$Background_2: #272727
$Background: #2b2b2b
$Primary: #c5a47e
$Secondary: #FFFFFF

h3
    color: white
    font-size: 3em
    border-bottom: 1px solid $Secondary
    display: inline-block
    padding: 0 30px
    
label
    color: white
    font-size: 1.2em
    
button
    display: block
    margin: 0 auto
    padding: 20px
    margin-top: 30px
    border: none
    font-size: 1.6em
    background: rgba($Background, 0.5)
    border: 1px solid $Primary
    color: white
    font-family: RalewayR
    transition: all 0.4s ease
    
button:hover
    color: white
    background: $Primary
    

#inputL
    text-align: left
    width: 180px
    display: inline-block
    padding: 5px 26px 5px 0
    vertical-align: top

input
    outline: none
    padding: 10px
    border: none
    width: 100%
    
textarea
    padding: 10px
    font-family: RalewayR
    
input:first-of-type
    margin-bottom: 31px

label
    margin-bottom: 5px
        
textarea
    width: 100%
    
#inputR
    width: 280px
    display: inline-block
    padding: 5px
    
.Wrapper
    display: block
    padding: 20px 0
    margin-bottom: 30px
    
input::-webkit-input-placeholder, textarea::-webkit-input-placeholder
    font-family: RalewayR
</style>