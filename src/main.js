import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'

import VueParticles from 'vue-particles'
import Main from './Main.vue'
import Gallery from './Gallery.vue'
import Resume from './Resume.vue'

Vue.use(VueParticles);
Vue.use(VueRouter);

const routes = [
    {
        name: 'main',
        path: '/',
        component: Main
    },
    {
        name: 'gallery',
        path: '/Gallery',
        component: Gallery
    },
    {
        name: 'resume',
        path: '/Resume',
        component: Resume
    }
]

const router = new VueRouter({
    routes
});

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});