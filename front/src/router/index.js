import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
    {
        path: "/connexion",
        name: "Connexion",
        component: () => import("../components/connect"),
    },
    {
        path: "/inscription",
        name: "Inscription",
        component: () => import("../components/registre")
    },
    {
        path: "/home",
        name: "Home",
        component: () => import("../components/home")
    },
    {
        path: "/profil",
        name: "Profil",
        component: () => import("../components/profil")
    }
    ,
    {
        path: "/admin",
        name: "Admin",
        component: () => import("../components/admin")
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const publicPages = ["/connexion", "/inscription"]
    const authRequired = !publicPages.includes(to.path)
    const loggedIn = localStorage.getItem("userId")
    const loggedToken = localStorage.getItem("token")
    if (authRequired && !loggedIn && !loggedToken) {
        return next("/connexion");
    }
    next();
})

export default router