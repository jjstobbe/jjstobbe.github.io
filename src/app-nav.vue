<template>
    <div id="wrapper">
        <div id="loading">
            <img id="loading-image" src="img/Loading2.3.gif"/>
        </div>
        <header>
            <nav>
                <ul>
                    <li>
                      <router-link
                        to="/"
                        active-class="active"
                        exact>About</router-link>
                    </li>
                    <li>
                      <router-link
                        to="experience"
                        active-class="active"
                        exact>Experience</router-link>
                    </li>
                </ul>
            </nav>
                <div id="Greeting" class="animated fadeIn" style="letter-spacing: .1em;">
            <h1><span>Who am I?</span></h1>
        </div>
        </header>
    </div>
</template>

<script>
    export default{
        name: 'app-nav'
    }
</script>