import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView";
import AdminPanel from "@/views/AdminPanel";
import CategoryView from "@/views/CategoryView";
import VersionView from "@/views/VersionView";
import ModView from "@/views/ModView";

const routes = [
    {path: '/', name: 'home', component: HomeView},
    {path: '/login', name: 'login', component: LoginView},
    {path: '/adminpanel', name: 'login', component: AdminPanel},
    {path: '/category', name: 'category', component: CategoryView},
    {path: '/version', name: 'version', component: VersionView},
    {path: '/mod', name: 'mod', component: ModView}

    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import('../views/AboutView.vue')
    // }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
