import Vue from "vue";
import VueRouter from 'vue-router'

import Events from "./components/Events.vue";
import Register from "./components/Register.vue";
import Purchases from "./components/Purchases.vue";

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        name: "events",
        component: Events
    },
    {
        path: "/register",
        name: "register",
        component: Register
    },
    {
        path: "/purchases",
        name: "purchases",
        component: Purchases
    }
];

const router = new VueRouter({
    mode: "history",
    routes
});

export default router;