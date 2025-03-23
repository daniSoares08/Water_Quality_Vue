import { createRouter, createWebHistory } from "vue-router"
import Dashboard from "../views/Dashboard.vue"
import Sensors from "../views/Sensors.vue"
import Weather from "../views/Weather.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/dashboard" },
    { path: "/dashboard", name: "Dashboard", component: Dashboard },
    { path: "/sensors", name: "Sensors", component: Sensors },
    { path: "/weather", name: "Weather", component: Weather },
  ],
})

export default router
