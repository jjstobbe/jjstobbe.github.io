<template>
<div>
    <div id="WhoAmI">
        <img id="Professional" src="./img/JackHex.png" class="animated fadeIn"/>
        <div id="text" class= "animated fadeIn">
          <h2>Jack Stobbe</h2>
            <p>
              I&apos;m a 19 year old sophomore at the University of Nebraska-Lincoln.  I have had the privilege to be accepted into the Jeffrey S. Raikes School of Computer Science and Management, where I have been able to excel in my studies and work closely with other talented students.
            </p>
            <p>
              I have a passion for creation, learning, and innovation. I have been programming for the last 4 years and I&apos;ve been learning constantly. I&apos;m looking for an opportunity to further develop my  programming and design skills.
            </p>
        </div>
    </div>
    <div class="Divider"></div>
    <iframe id="Resume"></iframe>
</div>
</template>

<script>
    export default {
        name: 'about'
    }
</script>

<style>
    #WhoAmI {
      max-width: 80%;
      margin: 0 auto;
    }

    #WhoAmI h2{
      font-family: sans-serif;
      color: #3f3f3f;
      text-align: center;
      font-size: 3em;
      margin-bottom: 8px;
    }

    #WhoAmI p{
      font-weight: bold;
      color: #3f3f3f;
      font-size: 1.7em;
      margin-bottom: 10px;
    }

    .Divider {
      background-image: url("./img/HexDivider.png");
      background-size: 80px 5px;
      background-repeat: repeat-x;
      height: 10px;
      margin-bottom: 40px;
      margin-top: 40px;
    }


    #Professional {
      display: block;
      text-align: center;
      margin: 0 auto;
      max-width: 450px;
    }

    #Resume {
      display: block;
      margin: 0 auto;
      width: 70%;
      height: 1150px;

      /* Bottom Margin to move the footer down farther*/
      margin-bottom: 450px;
    }


    #Professional {
      /*Edits the animation for the zoomIn effect*/
      -webkit-animation-duration: 1s;
      -webkit-animation-delay: .3s;
    }

    #text {
      /*Edits the animation for the zoomIn effect*/
      -webkit-animation-duration: 1s;
      -webkit-animation-delay: .7s;
    }
</style>