import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'

import About from './About.vue'
import Experience from './Experience.vue'

Vue.use(VueRouter);

const routes = [
    {
        name: 'about',
        path: '/',
        component: About
    },
    {
        name: 'experience',
        path: '/Experience',
        component: Experience
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