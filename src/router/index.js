import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Visualization from '../views/Visualization.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/simulation',
        name: 'Simulation',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ '../views/Simulation.vue'),
    },
    {
        path: '/visualization',
        name: 'Visualization',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // component: () =>
        //     import(/* webpackChunkName: "about" */ '../views/Visualization.vue'),
        component: Visualization,
    },
    {
        path: '/eyeTracking',
        name: 'EyeTracking',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ '../views/EyeTracking.vue'),
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ '../views/About.vue'),
    },
    {
        path: '/records',
        name: 'Records',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ '../views/Records.vue'),
    },
    {
        path: '/guide',
        name: 'Guide',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ '../views/Guide.vue'),
    },
]

const router = new VueRouter({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior(to, from, savedPosition) {
        console.log(from);
        console.log(savedPosition);
        if (to.hash) {
            return {
                selector: to.hash,
                behavior: 'smooth',
            }
        }
    },
})

export default router
