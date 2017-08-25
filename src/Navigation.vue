<template>
    <nav>
        <ul>
            <li :class="{ active: currentSlide == 0}" @click="currentSlide = 0"></li>
            <li :class="{ active: currentSlide == 1}" @click="currentSlide = 1"></li>
            <li :class="{ active: currentSlide == 2}" @click="currentSlide = 2"></li>
            <li :class="{ active: currentSlide == 3}" @click="currentSlide = 3"></li>
        </ul>
    </nav>
</template>

<script>
    export default{
        name: 'Navigation',
        data: ()=>{
            return {
                currentSlide: 0,
                moving: false
            }
        },
        watch: {
            currentSlide: function(newValue) {
                $('html, body').animate({
                    scrollTop: $("#"+newValue).offset().top
                }, 300);
                
                this.moving=true;
                setTimeout(()=>{ this.moving = false }, 320);
            }
        },
        created () {
            $(window).bind('mousewheel',(e)=>{
              e.preventDefault();
              if(!this.moving){
                  if(e.originalEvent.wheelDelta >= 0){
                    if(this.currentSlide > 0){
                        this.currentSlide--;
                    }
                  }else{
                      if(this.currentSlide < 3){
                        this.currentSlide++;
                      }
                  }   
              }
            });
            
            $(window).on('keydown', (e)=>{
                if(e.which == 38){
                    if(this.currentSlide > 0){
                        this.currentSlide--;
                    }
                }else if(e.which == 40) {
                    if(this.currentSlide < 3){
                        this.currentSlide++;
                    }
                }
            });
            
            $(document).ready(()=>{
                this.currentSlide = 0;
                $('html, body').animate({
                    scrollTop: $("#0").offset().top
                }, 1);
            });
            
            $(window).on('resize', (e)=>{
                this.moving=true;
                setTimeout(()=>{this.moving=false},320);
                $('html, body').animate({
                    scrollTop: $("#"+this.currentSlide).offset().top
                }, 1);
            });
        }
    }
</script>

<style lang="sass" scoped>
$Dark: #424242

nav
    position: fixed
    z-index: 100
    right: 0
    margin-right: 30px
    text-align: right
    font-size: 20px
    top: 50%;
    transform: translateY(-50%);

li
    height: 5px
    width: 5px
    border: 2px solid $Dark
    border-radius: 30px
    margin-top: 10px
    list-style: none
    cursor: pointer
        
li.active
    background-color: $Dark

</style>